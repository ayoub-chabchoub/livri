import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ProductOrder } from '../../../classes/product_order';

/**
 * Generated class for the EtatVentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etat-vente',
  templateUrl: 'etat-vente.html',
})
export class EtatVentePage {

  etat:number=0;
  begin: string;
  end:string = HomePage.getDate();
  products:ProductOrder[] = [];

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
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
         db.executeSql('select sum(prix_nette) from livraisons where date <= ? and date >= ?;',[this.end,this.begin])
          .then((res) => {
              this.etat = res.rows.item(0)['sum(prix_nette)'];
              
            }
          )
        .catch(e => { 
        });
        db.executeSql('select products.id_prd,products.name,sum(productLiv.number) from products,livraisons,productLiv '+
         'where livraisons.id_liv=productLiv.id_liv and products.id_prd=productLiv.id_prd and livraisons.date >= ? and livraisons.date <= ? '+
         'group by products.id_prd;',[this.begin,this.end])
          .then((res) => {
            console.log("then length=",res.rows.length);
            this.products = [];
            for (let i=0;i<res.rows.length;i++){
            this.products.push(new ProductOrder(res.rows.item(i).id_prd,res.rows.item(i).name));
            this.products[i].NUM = res.rows.item(i)["sum(productLiv.number)"];
            console.dir(this.products[i]);
            }
             this.products.sort(function(a,b){
              if(a.NUM > b.NUM){
              return -1;
              }
              return 1;
            }) 
              
            }
          ) 
        .catch(e => { console.log("problem get products");
        console.dir(e);
        });

    }).catch(e => {
    });
  }

}
