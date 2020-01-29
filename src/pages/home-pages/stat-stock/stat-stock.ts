import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HomePage } from '../../home/home';

/**
 * Generated class for the StatStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stat-stock',
  templateUrl: 'stat-stock.html',
})
export class StatStockPage {


  total_stock:number=0;
  begin: string;
  end:string = HomePage.getDate();
  stock_list = [];
  constructor(public navCtrl: NavController, public navParams: NavParams , public sqlite:SQLite) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatStockPage');
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
    this.stock_list = [];
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
       /*   db.executeSql('SELECT productLiv.id_prd,products.name,productLiv.price,products.stock,productLiv.number FROM productLiv,products'+ 
         ' WHERE products.id_prd=productLiv.id_prd and productLiv.id_liv=?',[id] )
          .then((res) => {
              this.etat = res.rows.item(0)['sum(prix_nette)'];
              
            }
          )
        .catch(e => { 
        }); */
        db.executeSql('select product_stock.price, stock.date, product_stock.num from product_stock,stock '+
         'where stock.id=product_stock.id_stock and stock.date >= ? and stock.date <= ? order by stock.date desc;'/*  ' +
         'group by stock.date;' */,[this.begin,this.end])
          .then((res) => {

            console.log("then length=",res.rows.length);
            //console.dir
            let data = { date : res.rows.item(0)["date"],
                        stock_price: res.rows.item(0)["price"] * res.rows.item(0)["num"]};
            console.dir(res.rows.item(0));
            this.total_stock = data.stock_price; 
            for (let i=1;i<res.rows.length;i++){
              
              let product_total = res.rows.item(i)["price"] * res.rows.item(i)["num"];
              this.total_stock += product_total;
              if(/* this.stock_list.length != 0 && this.stock_list[this.stock_list.length-1] */data.date != res.rows.item(i)["date"]){
                    this.stock_list.push(Object.assign({}, data));
                    console.dir(this.stock_list);
                    data.date = res.rows.item(i)["date"];
                    data.stock_price = product_total;
                }else{
                    data.stock_price += product_total;
                }
            
            }
            if(this.stock_list.length == 0 || this.stock_list[this.stock_list.length-1].date != data.date) {
              this.stock_list.push(data);
            }

              console.dir(this.stock_list);
            }
          ) 
        .catch(e => { console.log("problem get stock");
        console.dir(e);
        });

    }).catch(e => {
    });
  }

}
