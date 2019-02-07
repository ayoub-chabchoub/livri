import { Component } from '@angular/core';
import { NavController,  ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  date = HomePage.getDate();
  credit:number =0;
  constructor(public navCtrl: NavController,private sqlite:SQLite, private storage: Storage, private toastcntrl:ToastController) {

    this.storage.get("isDbHere")
      .then((data) => {
        
        if (data === null) {
          this.createDB();  
             
        }
      });

  }

  ionViewDidLoad(){
  
 }

   ionViewDidEnter(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
         db.executeSql('select sum(credit) from clients;',[])
          .then((res) => {
            
            this.credit = res.rows.item(0)['sum(credit)'];
           
            }
          ) 
        .catch(e => {
         
        });
    }).catch(e => {
      
        
      
    });

  } 

  static getDate(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let smm, sdd;

    if (dd < 10) {
      sdd = '0' + dd;
    }
    else { sdd = dd }

    if (mm < 10) {
      smm = '0' + mm;
    } else { smm = mm }

    return yyyy + '-' + smm + '-' + sdd;
  }

  private createDB() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS clients(id_clt INTEGER PRIMARY KEY,name TEXT,address TEXT, ville TEXT, telephone Text , credit FLOAT)'
        , []).then(() => {
          
          db.executeSql('CREATE TABLE IF NOT EXISTS livraisons(id_liv INTEGER PRIMARY KEY,date TEXT,id_clt INTEGER, ' +
            'remarque text ,prix_total FLOAT , montant FLOAT, CONSTRAINT fk_column' +
            ' FOREIGN KEY (id_clt) REFERENCES clients (id_clt) on delete cascade);'
            , []).then(() => {
              
              db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT);'
                , []).then(() => {
                
                db.executeSql('CREATE TABLE IF NOT EXISTS productLiv(id_prd INTEGER, id_liv INTEGER,name TEXT , price FLOAT , number INTEGER, '+
                'PRIMARY KEY (id_prd,id_liv) , '+
                'foreign key (id_prd) references products (id_prd),foreign key (id_liv) references livraisons (id_liv) on delete cascade);'
                , []).then(() => {this.showMessage('la base de données a été crée',8000);
                this.storage.set("isDbHere","true");
              }).catch(e => this.showMessage("problem sql 4 " + e));
                
             }).catch(e => this.showMessage("problem sql 3 " + e));
            }).catch(e => this.showMessage("problem sql 2 " + e));
        })
        .catch(e => this.showMessage("problem sql 1 " + e));
    })
      .catch(e => this.showMessage(e));

  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
  }

}
