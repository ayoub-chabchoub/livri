import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { StockPage } from '../../stock-pages/stock/stock';

/**
 * Generated class for the CleanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clean',
  templateUrl: 'clean.html',
})
export class CleanPage {

  shStck:boolean = false;
  shLiv:boolean = false;
  begin:string = "";
  end:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,public alertController:AlertController,
    public toastcntrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CleanPage');
  }

  showStocksClean(){
    this.shStck =true;
    this.shLiv =false;
    if(this.shStck){
      this.begin = "";
      this.end = "";
    }
  }

  showLivraisonsClean(){
    this.shStck =false;
    this.shLiv =true;
    if(this.shLiv){
      this.begin = "";
      this.end = "";
    }
  }

  
  cleanLivraison(){
    if(this.end){
     this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        
        db.executeSql('PRAGMA foreign_keys = ON;',[])
          .then((res) => { 
        
        let sql = 'delete from livraisons where date <= ?;';
        let data = [this.end];
        console.log("this.begin " + this.begin);
        if(this.begin){
        sql = sql.substr(0,sql.length-1) + ' and date >= ?' + sql.substr(sql.length-1);
        data.push(this.begin);
        }
        console.log(sql + " " + data);
          db.executeSql(sql,data)
          .then((res) => {
            console.log("liv deleted");
            
          }  
          ).catch(e => {
            console.log("problem");
        });
      }).catch((e)=>{
        console.log("problem2");
      });

    }).catch(e => {
    });
  }else{
    this.showMessage("Entrer une date de fin",6000)
  }

  }

  cleanStock(){
    if(this.end){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        //let sql = 'delete from product_stock where id_stock in (select id from stock where date <= ?);';
        db.executeSql('PRAGMA foreign_keys = ON;',[])
          .then((res) => { 
        
        let sql = 'delete from stock where date <= ?;';
        let data = [this.end];
        console.log("this.begin " + this.begin);
        if(this.begin){
        sql = sql.substr(0,sql.length-1) + ' and date >= ?' + sql.substr(sql.length-1);
        data.push(this.begin);
        }
        console.log(sql + " " + data);
          db.executeSql(sql,data)
          .then((res) => {
            console.log("product stocks deleted");
            console.dir(res.rows.item(0));
            StockPage.stockModified = true;
          }  
          ).catch(e => {
            console.log("problem");
        });
      }).catch((e)=>{
        console.log("problem2");
      });

    }).catch(e => {
    });

  }else{
    this.showMessage("Entrer une date de fin",6000)
  }
    
  }

  presentAlertConfirm(type) {


    let alert =  this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer ces ' + type + '?',
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
            if(type == "livraisons"){
              this.cleanLivraison();
            }else if('stocks'){
              this.cleanStock();

            }
          }
        }
      ]
    });

     alert.present();
  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
  }
}
