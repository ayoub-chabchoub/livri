import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';


/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  data = {
    name:'' ,
    weight:''  ,
    unit:''   ,
    price:''  ,

  } 
 
  
    constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,private toastcntrl:ToastController) {
    }
  
    ionViewDidLoad() {
      
      
    }
  
    showMessage(msg,dur =2000){
      let toast = this.toastcntrl.create({
        message:msg,
        duration:dur
      });
      toast.present();
      
    }
  
    saveDate(){
  
       this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO products VALUES(NULL,? ,?,?,?)', [
            this.data.name,
            this.data.weight,
            this.data.unit,
            this.data.price
          ])
          .then((res) => {                               //add res
            this.showMessage('Produit ajouté');
            this.navParams.get("home").refresh();
            this.navCtrl.pop();
          })
                  .catch(e => {this.showMessage(e);
             
                  });
        }) .catch(e => {
          this.showMessage(e);
        });  

        }
}
