
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';
import { Livraison } from '../../../classes/livraison';
import { Client } from '../../../classes/client';

import { ProductOrder } from '../../../classes/product_order';


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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite
    ,public alertController:AlertController, private toastcntrl:ToastController) {
    
    this.client = this.navParams.get("client");
    

  }

  ionViewDidLoad() {
    
  }

  ionViewDidEnter(){
    console.log("id = ",this.client.ID)
    this.getData();
  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
    
  }
  
  getData(){
    
     this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
       
        db.executeSql('SELECT * FROM livraisons WHERE id_clt=? ORDER BY date DESC LIMIT ?',[this.client.ID, this.noOfLiv] )
          .then(res=>{
         
          this.client.clearLivraisons();
          
          
          for (var index = 0; index < res.rows.length; index++) {

            this.client.LIVRAISON = new Livraison(
              res.rows.item(index).id_liv ,
              res.rows.item(index).date ,
              res.rows.item(index).id_clt ,
              this.getProductsOrders(res.rows.item(index).id_liv),
              res.rows.item(index).remarque ,
              res.rows.item(index).prix_total ,
              res.rows.item(index).montant ,
              res.rows.item(index).prix_nette ,
              this.sqlite
            )
          }
          }).catch(e => {});
      }).catch(e =>{});
      


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
            
          }
        }, {
          text: 'oui',
          handler: () => {
            
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
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql('SELECT productLiv.id_prd,products.name,productLiv.price,products.stock,productLiv.number FROM productLiv,products'+ 
        ' WHERE products.id_prd=productLiv.id_prd and productLiv.id_liv=?',[id] )
          .then(res=>{
  
          let product;
          for (var index = 0; index < res.rows.length; index++) {
            
            product = new ProductOrder(
              res.rows.item(index).id_prd ,
              res.rows.item(index).name ,
            );
            product.NUM = res.rows.item(index).number;
            product.PRICE = res.rows.item(index).price;
            product.STOCK = res.rows.item(index).stock;
            
            products.push(product);
            
           
          }
          }).catch(e => {
            });
      }).catch(e => {}); 

    return products;
  }


  addLivraison(){
    this.navCtrl.push("AddLivraisonPage",{ client : this.client,home :this});

  }

  showLivraison(livraison){
    this.navCtrl.push("LivraisonDisplayPage",{ livraison : livraison ,home:this});
  }

  deleteLivraison(livraison){
    //delete from bd
   
    livraison.delete();
    
    this.client.LIVRAISONS.splice(this.client.LIVRAISONS.indexOf(livraison),1);
    console.log("livraison.MONTANT ");
    console.log(livraison.MONTANT);
    console.log("livraison.TOTALNETTE");
    console.log(livraison.TOTALNETTE);
    this.client.CREDIT += (livraison.MONTANT - livraison.TOTALNETTE);

  }

  editClient(){
    this.navCtrl.push("EditClientPage", {
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
            
          }
        }, {
          text: 'oui',
          handler: () => {
            
            this.deleteClient();
          }
        }
      ]
    });

    alert.present();
  }

  clientStat() {
    this.navCtrl.push("ClientStatPage",{client:this.client});
  }
  
}
