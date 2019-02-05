import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { AddClientPage } from '../add-client/add-client';
import { EditClientPage } from '../edit-client/edit-client';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';


import { ClientDisplayPage } from '../client-display/client-display';
import { Client } from '../../../classes/client';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  data: any = [];
  datatmp: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast
    , public alertController: AlertController, private callNumber: CallNumber, private storage: Storage, private toastcntrl:ToastController) {

      /* this.storage.get("isDbExist")
      .then((data) => {
        this.showMessage(data);
        if (data === null) {
          this.createDB();  
          this.showMessage("data null");   
        }
      }); */

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
    
    /*  console.log("clients in storage:");
     console.log(this.storage.get("clients"));
     if(!this.storage.get("clients")){
       this.getData();
      
     }else{
       this.data = this.storage.get("clients");
       console.log("data from storage");
     }
     if(this.data.length == 0){
       this.getData();
     } */

     this.getData();
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
    this.data.sort(this.compare);
  }

  compare(a,b){
    if (a.NAME > b.NAME) return 1;
    else return -1;
  }

  /* private createDB() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS clients(id_clt INTEGER PRIMARY KEY,name TEXT,address TEXT, ville TEXT, telephone Text , credit FLOAT)'
        , []).then(() => {
          this.showMessage('Executed SQL 1');
          db.executeSql('CREATE TABLE IF NOT EXISTS livraisons(id_liv INTEGER PRIMARY KEY,date TEXT,id_clt INTEGER, ' +
            'remarque text ,prix_total FLOAT , montant FLOAT, CONSTRAINT fk_column' +
            ' FOREIGN KEY (id_clt) REFERENCES clients (id_clt) on delete cascade);'
            , []).then(() => {
              this.showMessage('Executed SQL 2',4000);
              db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT);'
                , []).then(() => {this.showMessage('Executed SQL 3',6000);
                
                db.executeSql('CREATE TABLE IF NOT EXISTS productLiv(id_prd INTEGER, id_liv INTEGER,name TEXT , price FLOAT , number INTEGER, '+
                'PRIMARY KEY (id_prd,id_liv) , '+
                'foreign key (id_prd) references products (id_prd),foreign key (id_liv) references livraisons (id_liv) on delete cascade);'
                , []).then(() => {this.showMessage('Executed SQL 4',8000);
                this.storage.set("isDbExist","true");
              }).catch(e => this.showMessage("problem sql 4 " + e));
                
             }).catch(e => this.showMessage("problem sql 3 " + e));
            }).catch(e => this.showMessage("problem sql 2 " + e));
        })
        .catch(e => this.showMessage("problem sql 1 " + e));
    })
      .catch(e => this.showMessage(e));

  } */

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  refresh() {
    this.getData();
  }

  call(client) {
    console.log("phone call " + client.TELEPHONE);
    this.callNumber.callNumber(client.TELEPHONE, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  getData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {


      db.executeSql('SELECT * FROM clients ORDER BY name', [])
        .then(res => {
          console.log('Executed SQL SELECT done');
          this.data = [];
          for (var index = 0; index < res.rows.length; index++) {

            this.data.push(new Client(
              res.rows.item(index).id_clt,
              res.rows.item(index).name,
              res.rows.item(index).address,
              res.rows.item(index).ville,
              res.rows.item(index).telephone,
              res.rows.item(index).credit,
              [],
              this.sqlite,
              this.toast
            ));
          }
        }).catch(e => this.showMessage("probleme in select " + e));
    }).catch(e => console.log(e));
    this.data.sort(this.compare);
    this.showMessage(this.data)
    //this.storage.set("clients",this.data);
  }


  addClient() {
    this.navCtrl.push(AddClientPage, { home: this });
  }

  editClient(client) {
    this.navCtrl.push(EditClientPage, {
      client : client
      /*          name:client.name,
               address:client.address ,
               ville:client.ville,
               telephone:client.telephone,
               credit:client.credit */

    });
  }

  showClient(client) {
    console.log("show client triggerred");
    this.navCtrl.push(ClientDisplayPage, {
      client: client,
      home:this
    });

  }


  presentAlertConfirm(client) {
    let alert = this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer ce client?',
      buttons: [
        {
          text: 'non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'oui',
          handler: () => {
            console.log('Confirm Ok');
            this.deleteClient(client);
          }
        }
      ]
    });

    alert.present();
  }

  deleteClient(client) {


    let index = this.data.indexOf(client, 0);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    client.delete();
  }

  copyArray(data) {
    let tmp = [];
    for (let i = 0; i < data.length; i++) {
      tmp.push(data[i]);
    }
    return tmp;

  }

  getItems(ev) {

    // set val to the value of the ev target
    var val = ev.target.value;
    if (this.datatmp.length == 0) {
      this.datatmp = this.copyArray(this.data)
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data = this.datatmp.filter((item) => {
        return (item.NAME.toLowerCase().indexOf(val.toLowerCase()) == 0);
      });
      this.data = this.data.concat(this.datatmp.filter((item) => {
        return (item.NAME.toLowerCase().indexOf(val.toLowerCase()) > 0);
      }));
      console.log("data " + this.data);
      console.log("datatmp " + this.datatmp);
    } else {
      this.data = this.copyArray(this.datatmp);
      this.datatmp = [];
    }

  }

}
