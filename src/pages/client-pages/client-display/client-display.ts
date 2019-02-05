import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Livraison } from '../../../classes/livraison';
import { Client } from '../../../classes/client';
import { AddLivraisonPage } from '../../livraison/add-livraison/add-livraison';
import { LivraisonDisplayPage } from '../../livraison/livraison-display/livraison-display';
import { ProductOrder } from '../../../classes/product_order';
import { EditClientPage } from '../edit-client/edit-client';

/**
 * Generated class for the ClientDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-display',
  templateUrl: 'client-display.html',
})
export class ClientDisplayPage {
  client: Client;
  noOfLiv : number =3;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,public toast:Toast 
    ,public alertController:AlertController, private toastcntrl:ToastController) {
    console.log("display constructor");
    this.client = this.navParams.get("client");
    console.log(this.client);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDisplayPage');
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    console.dir(this.client.LIVRAISONS);
    this.getData();
  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
    console.dir(msg);
  }
  
  getData(){
    
     this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      /*   db.executeSql('CREATE TABLE IF NOT EXISTS livraisons(id_liv INTEGER PRIMARY KEY,date TEXT,id_clt INTEGER, CONSTRAINT fk_column'+
          ' FOREIGN KEY (id_clt) '+
          ' REFERENCES clients (id_clt))'
        , []).then(() => console.log('Executed SQL'))
              .catch(e => console.log(e)); */
       
        db.executeSql('SELECT * FROM livraisons WHERE id_clt=? ORDER BY date DESC LIMIT ?',[this.client.ID, this.noOfLiv] )
          .then(res=>{
          console.log('Executed SQL SELECT done' );
          this.client.clearLivraisons();
          this.showMessage("res.length livraisons = " + res.rows.length , 6000);
          
          for (var index = 0; index < res.rows.length; index++) {

            this.client.LIVRAISON = new Livraison(
              res.rows.item(index).id_liv ,
              res.rows.item(index).date ,
              res.rows.item(index).id_clt ,
              this.getProductsOrders(res.rows.item(index).id_liv),
              res.rows.item(index).remarque ,
              res.rows.item(index).prix_total ,
              res.rows.item(index).montant ,
              this.sqlite,
              this.toast
            )
          }
          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
      


  }

  presentAlertConfirm(livraison) {
    let alert =  this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer cette livraison?',
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
            this.deleteLivraison(livraison);
          }
        }
      ]
    });

     alert.present();
  }

  showLoadMoreButton(){
    if(this.client.LIVRAISONS.length < this.noOfLiv){
      return false;
    }
    return true;
  }

  loadLivraisons(){
    this.noOfLiv +=10;
    this.getData();
  }

  getProductsOrders(id){
    
    let products = [];
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql('SELECT * FROM productLiv WHERE id_liv=?',[id] )
          .then(res=>{
          this.showMessage("res.length prod_liv = " + res.rows.length , 6000);
          console.log('Executed SQL SELECT productLiv done' );
          let product;
          for (var index = 0; index < res.rows.length; index++) {
            
            product = new ProductOrder(
              res.rows.item(index).id_prd ,
              res.rows.item(index).name ,
            );
            product.NUM = res.rows.item(index).number;
            product.PRICE = res.rows.item(index).price;
            console.log('product order:' );
            console.dir(product );
            products.push(product);
           
          }
       /*    console.dir("prod_livs=");
          console.dir(products); */
          }).catch(e => {console.log(e);
            console.dir("problem with prod_livs");});
      }).catch(e => console.log(e)); 

    return products;
  }


  addLivraison(){
    this.navCtrl.push(AddLivraisonPage,{ client : this.client,home :this});

  }

  showLivraison(livraison){
    this.navCtrl.push(LivraisonDisplayPage,{ livraison : livraison ,home:this});
  }

  deleteLivraison(livraison){
    //delete from bd
    livraison.delete();
    this.client.LIVRAISONS.splice(this.client.LIVRAISONS.indexOf(livraison,1),1);
    this.client.CREDIT += (livraison.MONTANT - livraison.TOTALPRICE);

  }

  editClient(){
    this.navCtrl.push(EditClientPage, {
      client : this.client
    });
  }

  deleteClient(){
    this.navParams.get("home").deleteClient(this.client);
    this.navCtrl.pop();
  }

  callNumber(){
    this.navParams.get("home").call(this.client);
  }

  presentAlertConfirmClient() {
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
            this.deleteClient();
          }
        }
      ]
    });

    alert.present();
  }
}
