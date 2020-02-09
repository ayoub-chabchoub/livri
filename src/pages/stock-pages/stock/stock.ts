import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Stock } from '../../../classes/stock';
import { ProductOrder } from '../../../classes/product_order';


/**
 * Generated class for the StockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {
  noOfstck: number = 5;
  stockList: Stock[] = [];
  static stockModified:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite:SQLite,private toastcntrl:ToastController,
    private alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
    this.getData();
    StockPage.stockModified = false;
  }

  ionViewDidEnter(){
    if(StockPage.stockModified){
      this.getData();
    StockPage.stockModified = false;
    }

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
       
        db.executeSql('SELECT * FROM stock ORDER BY date DESC LIMIT ?',[ this.noOfstck] )
          .then(res=>{
         
          this.stockList = [];
          
          
          for (let index = 0; index < res.rows.length; index++) {
           /*  console.dir("this.getProductsOrders(res.rows.item(index).id)")
            console.dir(this.getProductsOrders(res.rows.item(index).id)); */
            console.log("stock id = ",res.rows.item(index).id);
            this.stockList.push(new Stock(
              res.rows.item(index).id ,
              res.rows.item(index).date ,
              
              this.getProductsOrders(res.rows.item(index).id),
              this.sqlite             
            ));
          }
          console.dir(this.stockList);
           
          }).catch(e => {console.log("problem with select");});
      }).catch(e =>{});
      


  }

  presentAlertConfirm(stock) {
    let alert =  this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer cette approvisionnement?',
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
            
            this.deleteStock(stock);
          }
        }
      ]
    });

     alert.present();
  }

  showLoadMoreButton(){
    if(this.stockList.length < this.noOfstck){
      return false;
    }
    return true;
  }

  loadStock(){
    this.noOfstck +=10;
    this.getData();
  }

  getProductsOrders(id){
    
    let products = [];
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        db.executeSql('select products.id_prd,products.name,product_stock.num ,products.stock,product_stock.price from products,product_stock where products.id_prd = product_stock.id_prd and id_stock=?',[id] )
          .then(res=>{
            
         
          let product;
          for (var index = 0; index < res.rows.length; index++) {
            
            product = new ProductOrder(
              res.rows.item(index).id_prd ,
              res.rows.item(index).name 
            );
            product.NUM = res.rows.item(index).num;
            product.PRICE = res.rows.item(index).price;
            product.STOCK = res.rows.item(index).stock;
            
            
            products.push(product);
           
          }
         
          }).catch(e => {console.log("select problem product_stock");
          console.dir(e);
          
            });
            
      }).catch(e => {}); 
      return products;
  }

  addStock(){
    this.navCtrl.push("AjoutStockPage",{ home :this});

  }

  stockStat(){
    this.navCtrl.push("StatStockPage", {});
  }

  stockStat1(){
    this.navCtrl.push("EtatStockPage", {});
  }


  showStock(stock){
    this.navCtrl.push("StockDisplayPage",{ stock : stock ,home:this});
  }

  deleteStock(stock){
    //delete from bd
    stock.delete();
    this.stockList.splice(this.stockList.indexOf(stock),1);
    //this.client.LIVRAISONS.splice(this.client.LIVRAISONS.indexOf(livraison,1),1);
    //this.client.CREDIT += (livraison.MONTANT - livraison.TOTALPRICE);

  }

}
