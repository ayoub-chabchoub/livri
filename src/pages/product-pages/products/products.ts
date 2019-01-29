import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

import { Toast } from '@ionic-native/toast';
import {Product} from '../../../classes/product';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { ProductDisplayPage } from '../product-display/product-display';
import * as globals from '../../../assets/Globals'
//import { AlertController } from '@ionic/angular';

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
  datatmp:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,public sqlite:SQLite,public toast:Toast, public alertController:AlertController) { 
    this.data = globals.products;
    if (this.data == globals.products){
      console.log("en references");
    }else{
      console.log("en valeurs");
    }
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad")
    this.getData();
  }

   ionViewDidEnter(){
    console.log("ionViewDidEnter")
    this.data.sort(function(a, b){
      if (a.NAME > b.NAME) return 1;
      else return -1;
    });
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
    if(this.data.length == 0){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT)'
        , []).then(() => console.log('Executed SQL'))
              .catch(e => console.log(e));

        db.executeSql('SELECT * FROM products ORDER BY name',[] )
          .then(res=>{
          console.log('Executed SQL SELECT done' );
          this.data = [];
          for (var index = 0; index < res.rows.length; index++) {

            globals.products.push(new Product(
              res.rows.item(index).id_prd ,
              res.rows.item(index).name ,
              res.rows.item(index).weight ,
              res.rows.item(index).unit ,
              res.rows.item(index).price ,
              this.sqlite,
              this.toast
            ))
          }
          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
      this.data = globals.products;
      this.data.sort(function(a, b){
        if (a > b) return 1;
        else return -1;
      });
    }
  }
  
  
      addProduct(){
        console.log("add product");
        this.navCtrl.push(AddProductPage,{home : this});
      }
  
      editProduct(product ){
        this.navCtrl.push(EditProductPage,{
          id:product.ID,
          data1 : this.data
 /*          name:product.name,
          weight:product.weight ,
          unit:product.unit,
          telephone:product.telephone,
          credit:product.credit */

        });
      }

       showProduct(product){
        console.log("show product triggerred");
        this.navCtrl.push(ProductDisplayPage,{
          product:product
        });

      } 
  
  
        presentAlertConfirm(product) {
        let alert =  this.alertController.create({
          title: 'Confirm!',
          message: 'vous êtes sur, vous voulez supprimer ce produit?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
                this.deleteProduct(product);
              }
            }
          ]
        });
    
         alert.present();
      }  
  
  deleteProduct(product){
     

    let index = this.data.indexOf(product, 0);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    product.delete();
  }

  copyArray(data){
    let tmp = [];
    for(let i=0;i<data.length;i++){
      tmp.push(data[i]);
    }
    return tmp;

  }

  getItems(ev){
   
    // set val to the value of the ev target
    var val = ev.target.value;
    if(this.datatmp.length == 0){
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
    }else{
      this.data = this.copyArray(this.datatmp);
      this.datatmp = [];
    }
    
}


}
