import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Livraison } from '../../../classes/livraison';
import { Client } from '../../../classes/client';
import { AddLivraisonPage } from '../../livraison/add-livraison/add-livraison';
import { LivraisonDisplayPage } from '../../livraison/livraison-display/livraison-display';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,public toast:Toast ,public alertController:AlertController) {
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
  } 

  getData(){
    /* this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS livraisons(id_liv INTEGER PRIMARY KEY,date TEXT,id_clt INTEGER, CONSTRAINT fk_column'+
          ' FOREIGN KEY (id_clt) '+
          ' REFERENCES clients (id_clt))'
        , []).then(() => console.log('Executed SQL'))
              .catch(e => console.log(e));

        db.executeSql('SELECT * FROM livraisons WHERE id_clt=? ORDER BY date DESC',[this.client.ID] )
          .then(res=>{
          console.log('Executed SQL SELECT done' );
          
          for (var index = 0; index < res.rows.length; index++) {

            this.client.LIVRAISON = new Livraison(
              res.rows.item(index).id_liv ,
              res.rows.item(index).date ,
              res.rows.item(index).id_clt ,
              this.getProductsOrders(res.rows.item(index).id_liv),
              res.rows.item(index).remarque ,
              res.rows.item(index).montant ,
              this.sqlite,
              this.toast
            )
          }
          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
      this.livraisons.sort(function(a, b){
        if (a > b) return 1;
        else return -1;
      }); */


  }

  presentAlertConfirm(livraison) {
    let alert =  this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer ce client?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.deleteLivraison(livraison);
          }
        }
      ]
    });

     alert.present();
  }  

  getProductsOrders(id){
      //
      //
    return [];
  }


  addLivraison(){
    this.navCtrl.push(AddLivraisonPage,{ client : this.client});

  }

  showLivraison(livraison){
    this.navCtrl.push(LivraisonDisplayPage,{ livraison : livraison});
  }

  deleteLivraison(livraison){
    //delete from bd
    
    this.client.LIVRAISONS.splice(this.client.LIVRAISONS.indexOf(livraison,1));
    this.client.CREDIT += (livraison.MONTANT - livraison.TOTALPRICE);

  }
}
