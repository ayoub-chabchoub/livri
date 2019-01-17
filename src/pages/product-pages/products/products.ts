import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {


  data:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,public sqlite:SQLite,public toast:Toast) {
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad")
    this.getData();
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    this.getData();
  }
  
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
  
  refresh(){
    this.getData();
  }
  
    getData(){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })  .then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS clients(id_clt INTEGER PRIMARY KEY,name TEXT,address TEXT, ville TEXT, telephone Text , credit FLOAT)'
    , []).then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
  
  
   db.executeSql('SELECT * FROM clients ORDER BY name',[] )
            .then(res=>{
              console.log('Executed SQL SELECT done' );
              this.data = [];
              for (var index = 0; index < res.rows.length; index++) {
  
                this.data.push({
                  id :res.rows.item(index).id_clt ,
                  name:res.rows.item(index).name ,
                  address:res.rows.item(index).address ,
                  ville:res.rows.item(index).ville ,
                  telephone:res.rows.item(index).telephone ,
                  credit:res.rows.item(index).credit ,
                })
              }
            })  .catch(e => console.log(e));
        }) .catch(e => console.log(e));
  
  
  
      }
  
  /* 
      addClient(){
        this.navCtrl.push(AddClientPage);
      }
  
      editClient(client ){
        this.navCtrl.push(EditClientPage,{
          id:client.id,
          name:client.name,
          address:client.address ,
          ville:client.ville,
          telephone:client.telephone,
          credit:client.credit

        });
      }

      showClient(client){
        this.navCtrl.push(ClientDisplayPage,{
          id:client.id,
          name:client.name,
          address:client.address ,
          ville:client.ville,
          telephone:client.telephone,
          credit:client.credit

        }); 

      }
  
  
  
  
  deleteClient(id){
  
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    db.executeSql('DELETE FROM clients WHERE id_clt=?', [id])
          .then(() =>{
            console.log('Executed SQL delete');
  
            this.toast.show('Done data Deleted!','5000','center').subscribe(
              toast => {
                this.getData();
              }
            );
  
  
          } ) .catch(e => console.log(e));
    }) .catch(e => console.log(e));
  
  }*/



}
