import { Client } from './../../../classes/client';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductOrder } from '../../../classes/product_order';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { HomePage } from '../../home/home';

/**
 * Generated class for the ClientStatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-stat',
  templateUrl: 'client-stat.html',
})
export class ClientStatPage {


  etat:number=0;
  begin: string;
  end:string = HomePage.getDate();
  products:ProductOrder[] = [];
  numbers = {}
  prices = {};
  names = {};
  ids = []
  total = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams , public sqlite:SQLite) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtatVentePage');
  }

  getEtatToday(){
    this.begin = HomePage.getDate();
    this.end = HomePage.getDate();
    console.log(this.begin ," ", this.end);
    this.getEtat();
  }

  getEtatMonth(){
    this.end = HomePage.getDate();
    this.begin = this.end.slice(0,8) + "01";
    console.log(this.begin ," ", this.end);
    this.getEtat();
  }

  getEtat(){
    this.numbers = {}
    this.prices = {};
    this.names = {};
    this.ids = []
    this.total = 0;
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    /* 
         db.executeSql('select sum(prix_nette) from livraisons where date <= ? and date >= ?;',[this.end,this.begin])
          .then((res) => {
              this.etat = res.rows.item(0)['sum(prix_nette)'];
              
            }
          )
        .catch(e => { 
        }); */
        let client:Client = this.navParams.get('client');

        db.executeSql('select products.id_prd,products.name,productLiv.price,productLiv.number from livraisons,products,productLiv '+
         'where products.id_prd=productLiv.id_prd and livraisons.id_liv=productLiv.id_liv and livraisons.date >= ? and livraisons.date <= ? '+
         'and livraisons.id_clt= ?;' ,[this.begin,this.end,client.ID])
         
          .then((res) => {
            console.log("then length=",res.rows.length);
            
          


            
            for (let i=0;i<res.rows.length;i++){
              console.dir(res.rows.item(i));
              
              let id_prd = res.rows.item(i).id_prd;
              console.log('id',id_prd);
              if (this.ids.indexOf(id_prd) == -1) {
                this.ids.push(id_prd);
              }
              
              this.total += (res.rows.item(i).price * res.rows.item(i).number);
              if (this.prices[id_prd]) {
                this.prices[id_prd] += (res.rows.item(i).price * res.rows.item(i).number);
                this.numbers[id_prd] += res.rows.item(i).number;
              } else {
                this.prices[id_prd] = (res.rows.item(i).price * res.rows.item(i).number);
                this.numbers[id_prd] = res.rows.item(i).number;
                this.names[id_prd] = res.rows.item(i).name;
              }
              console.log("numbers[id_prd]",this.numbers[id_prd]);
              
            }
            console.dir(this.ids);
            console.dir(this.names);
            console.dir(this.numbers);
            console.dir(this.prices);
            console.dir(this.total);
             this.ids.sort( function(a,b){
               
              if(this.prices[a] > this.prices[b]){
              return -1;
              }
              return 1;
            }.bind(this) ) 
              
            }
          ) 
        .catch(e => { console.log("problem get products");
        console.dir(e);
        });

    }).catch(e => {
    });
  }

  compare(a,b){
    if(this.prices[a] > this.prices[b]){
    return -1;
    }
    return 1;
  }

}
