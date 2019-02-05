import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import {Product} from '../../../classes/product';
import * as globals from '../../../assets/Globals'

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
 
  
    constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,public toast:Toast,private toastcntrl:ToastController) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad AddproductPage');
      
    }
  
    showMessage(msg,dur =2000){
      let toast = this.toastcntrl.create({
        message:msg,
        duration:dur
      });
      toast.present();
      console.log(msg);
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
            this.showMessage('Executed SQL insert');
            /* this.toast.show('Done data inserted!','4000','center').subscribe(
              toast => {
                this.navCtrl.pop();
              } 
            );*/
            this.navParams.get("home").refresh();
            this.navCtrl.pop();
          })
                  .catch(e => {
                    this.toast.show('Done data inserted!','4000','center').subscribe(
                      toast => {
                        console.log(e);
                      }
                    );
                  });
        }) .catch(e => {
          this.toast.show('Done data inserted!','4000','center').subscribe(
            toast => {
              console.log(e);
            }
          );
        });  

       // globals.productstmp.push(new Product(0,this.data.name,this.data.weight,this.data.unit,this.data.price,this.sqlite,this.toast));

          
        
/*           this.navParams.get("home").data.push(new Product(0, this.data.name,
          this.data.weight,
          this.data.unit,
          this.data.price,this.sqlite,this.toast )); */

       
        }
}
