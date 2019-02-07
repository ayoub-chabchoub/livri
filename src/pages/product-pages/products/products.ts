import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import {Product} from '../../../classes/product';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { ProductDisplayPage } from '../product-display/product-display';



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

  constructor(public navCtrl: NavController, public navParams: NavParams ,public sqlite:SQLite,
     public alertController:AlertController) { 
 
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
    
     this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql('SELECT * FROM products ORDER BY name',[] )
          .then(res=>{
            
          this.data = [];
          let p;
          for (var index = 0; index < res.rows.length; index++) {

       

            p =new Product(
              res.rows.item(index).id_prd ,
              res.rows.item(index).name ,
              res.rows.item(index).weight ,
              res.rows.item(index).unit ,
              res.rows.item(index).price ,
              this.sqlite
            )
          
            this.data.push(p);
          }

          this.data.sort(function(a, b){
            if (a.NAME > b.NAME) return 1;
            else return -1;
          });
    
          ProductsPage.products = this.data;
          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
    
  }

  static showMessage(msg,dur =2000 , toastcntrl){
    let toast = toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
    
  }
   
  
  
      addProduct(){
        
        this.navCtrl.push(AddProductPage,{home : this});
      }
  
      editProduct(product ){
        this.navCtrl.push(EditProductPage,{
          product : product

        });
      }

       showProduct(product){
        
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
    
    }else{
      this.data = this.copyArray(this.datatmp);
      this.datatmp = [];
    }   
}

static getData(products: Product[],sqlite,home,toastcntrl): any {
 
  sqlite.create({
    name: 'data.db',
    location: 'default'
  }).then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM products ORDER BY name',[] )
        .then(res=>{
         
        products = [];
        let p;

        for (var index = 0; index < res.rows.length; index++) {

          p =new Product(
            res.rows.item(index).id_prd ,
            res.rows.item(index).name ,
            res.rows.item(index).weight ,
            res.rows.item(index).unit ,
            res.rows.item(index).price ,
            sqlite
          )
          
          products.push(p);

        }

        products.sort(function(a, b){
          if (a.NAME > b.NAME) return 1;
          else return -1;
        });
        ProductsPage.products = products;
        
        /* home.ionViewDidEnter();
        home.remplireProducts(); */
        }).catch(e => ProductsPage.showMessage('error select' ,6000,toastcntrl));
    }).catch(e => ProductsPage.showMessage('error creation of db' ,6000,toastcntrl));

}
}
