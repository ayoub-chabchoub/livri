import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ProductOrder } from '../../../classes/product_order';

/**
 * Generated class for the EtatStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etat-stock',
  templateUrl: 'etat-stock.html',
})
export class EtatStockPage {

  etat:number=0;
  begin: string;
  end:string = HomePage.getDate();
  products:ProductOrder[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , public sqlite:SQLite) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad stock');
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
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
        /*  db.executeSql('select sum(prix_nette) from stocks where date <= ? and date >= ?;',[this.end,this.begin])
          .then((res) => {
              this.etat = res.rows.item(0)['sum(prix_nette)'];
              
            }
          )
        .catch(e => { 
        }); */
        db.executeSql('select products.id_prd,products.name, product_stock.num, product_stock.price from products,stock,product_stock '+
         'where stock.id=product_stock.id_stock and products.id_prd=product_stock.id_prd and stock.date >= ? and stock.date <= ?; '
         ,[this.begin,this.end])
          .then((res) => {
            console.log("then length=",res.rows.length);
            this.products = [];
            for (let i=0;i<res.rows.length;i++){
              
                let index = this.findInTable(this.products,res.rows.item(i).id_prd);
               this.etat += res.rows.item(i).price * res.rows.item(i).num;
              if(index > -1) {
                this.products[index].NUM += res.rows.item(i).num;
                this.products[index].PRICE += res.rows.item(i).price * res.rows.item(i).num;
                
              } else {
                let product = new ProductOrder(res.rows.item(i).id_prd,res.rows.item(i).name);
                product.NUM = res.rows.item(i).num;
                product.PRICE = res.rows.item(i).price * res.rows.item(i).num;
                this.products.push(product);
                //this.products[i]
                console.dir(product);
              }
              
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

  findInTable(arr,id) {
    for(let i in arr) {
      console.dir(arr[i].id)
      console.dir(id)
      if (arr[i].id == id) {
        console.log("i="+i)
        return i;
        
      }
    }
    return -1;
  }

}
