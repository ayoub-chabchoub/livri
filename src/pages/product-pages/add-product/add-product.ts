import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    weight:0  ,
    unit:''   ,
    price:0  ,

  } 
 
  
    constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,public toast:Toast) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad AddproductPage');
      
    }
  
  
  
    saveDate(){
  
       /*  this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO products VALUES(NULL,? ,?,?)', [
            this.data.name,
            this.data.weight,
            this.data.unit
          ])
          .then((res) => {                               //add res
            console.log('Executed SQL insert');
            this.toast.show('Done data inserted!','4000','center').subscribe(
              toast => {
                this.navCtrl.pop();
              }
            );

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
        this.navParams.get("home").refresh();  */
        
          this.navParams.get("home").data.push(new Product(0, this.data.name,
          this.data.weight,
          this.data.unit,
          this.data.price,this.sqlite,this.toast ));
        console.log("global.products")
        console.log(globals.products);
        this.navCtrl.pop();
        }
}
