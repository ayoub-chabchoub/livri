import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
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
  

  static products:Product[] = [];
  data:any = [];
  datatmp:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,public sqlite:SQLite,public toast:Toast,
     public alertController:AlertController,private toastcntrl :ToastController) { 
    //this.data = globals.products;
  /*   if (this.data == globals.products){
      console.log("en references");
    }else{
      console.log("en valeurs");
    } */
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad")
    if(ProductsPage.products.length == 0){
      this.getData();
    }else{
      this.data = ProductsPage.products;
    }
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
    //if(this.data.length == 0){
     this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      /*   db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT)'
        , []).then(() => console.log('Executed SQL'))
              .catch(e => console.log(e)); */

        db.executeSql('SELECT * FROM products ORDER BY name',[] )
          .then(res=>{
            ProductsPage.showMessage('Executed SQL SELECT done' ,4000,this.toastcntrl);
          this.data = [];
          let p;
          for (var index = 0; index < res.rows.length; index++) {

            ProductsPage.showMessage("item = " + res.rows.item(index).name, 5000,this.toastcntrl);
            ProductsPage.showMessage("item = " + res.rows.item(index).price, 5000,this.toastcntrl);

            p =new Product(
              res.rows.item(index).id_prd ,
              res.rows.item(index).name ,
              res.rows.item(index).weight ,
              res.rows.item(index).unit ,
              res.rows.item(index).price ,
              this.sqlite
            )
            //ProductsPage.showMessage("prod = " + p,5000,this.toastcntrl);
            this.data.push(p);
          }

          this.data.sort(function(a, b){
            if (a.NAME > b.NAME) return 1;
            else return -1;
          });
    
          ProductsPage.products = this.data;
          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
      //this.data = globals.products;
      //this.showMessage("global___" + globals.products.length,7000);
      //this.showMessage("global___" + this.data.length,7000);
      


    /*   for(let i =0 ; i<this.data.length ;i++){
      ProductsPage.showMessage("data_ _" + this.data[i],5000,this.toastcntrl); 
      } */
  /*    for (var index = 0; index < globals.productstmp.length; index++) {

        //this.showMessage(res.rows.item(index).name, 8000);

        globals.products.push(new Product(
          globals.productstmp[index].id ,
          globals.productstmp[index].name ,
          globals.productstmp[index].weight ,
          globals.productstmp[index].unit ,
          globals.productstmp[index].price ,
          this.sqlite,
          this.toast
        ))

      }

      this.data = globals.products;
      this.showMessage("global " + globals.products.length,7000);
      this.data.sort(function(a, b){
        if (a.NAME > b.NAME) return 1;
        else return -1;
      });
      this.showMessage("data " + this.data,9000);

     }else{
      this.showMessage("this.data.length == 0" + globals.products + ";;;" + this.data);
    } */
  }

  static showMessage(msg,dur =2000 , toastcntrl){
    let toast = toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
    console.log(msg);
  }
   
  
  
      addProduct(){
        console.log("add product");
        this.navCtrl.push(AddProductPage,{home : this});
      }
  
      editProduct(product ){
        this.navCtrl.push(EditProductPage,{
          product : product
    /*       id:product.ID,
          data1 : this.data
          name:product.name,
          weight:product.weight ,
          unit:product.unit,
          telephone:product.telephone,
          credit:product.credit */

        });
      }

       showProduct(product){
        console.log("show product triggerred");
        this.navCtrl.push(ProductDisplayPage,{
          product:product,
          home:this
        });

      } 
  
  
        presentAlertConfirm(product) {
        let alert =  this.alertController.create({
          title: 'Confirm!',
          message: 'vous êtes sur, vous voulez supprimer ce produit?',
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
    index = ProductsPage.products.indexOf(product, 0);
    if (index > -1) {
      ProductsPage.products.splice(index, 1);
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

static getData(products: Product[],sqlite,home,toastcntrl): any {

  console.dir(sqlite);
    
  sqlite.create({
    name: 'data.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    /*   db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT)'
      , []).then(() => console.log('Executed SQL'))
            .catch(e => console.log(e)); */

      db.executeSql('SELECT * FROM products ORDER BY name',[] )
        .then(res=>{
          ProductsPage.showMessage('Executed SQL SELECT done' ,6000,toastcntrl);
        products = [];
        let p;
          //ProductsPage.showMessage("static select return length = " + res.rows.length, toast:ToastController)

        for (var index = 0; index < res.rows.length; index++) {

        //  ProductsPage.showMessage("item = " +res.rows.item(index).name, 5000);
        //  ProductsPage.showMessage("item = " +res.rows.item(index).price, 5000);

          p =new Product(
            res.rows.item(index).id_prd ,
            res.rows.item(index).name ,
            res.rows.item(index).weight ,
            res.rows.item(index).unit ,
            res.rows.item(index).price ,
            sqlite
          )
          ProductsPage.showMessage("prod = " + p.NAME,6000,toastcntrl);
          products.push(p);

        }

        products.sort(function(a, b){
          if (a.NAME > b.NAME) return 1;
          else return -1;
        });
        ProductsPage.products = products;
        ProductsPage.showMessage("ProductsPage.products = " +  ProductsPage.products.length + " local = " + products.length ,6000,toastcntrl);
        home.ionViewDidEnter();
        home.remplireProducts();
        }).catch(e => ProductsPage.showMessage('error select' ,6000,toastcntrl));
    }).catch(e => ProductsPage.showMessage('error creation of db' ,6000,toastcntrl));
    //this.data = globals.products;
    //this.showMessage("global___" + globals.products.length,7000);
    //this.showMessage("global___" + this.data.length,7000);
    
 /*    for(let i =0 ; i<this.data.length ;i++){
      ProductsPage.showMessage("data_ _" + this.data[i],5000); 
    } */
}
}
