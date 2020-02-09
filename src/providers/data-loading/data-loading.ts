import { ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../classes/product';
//import { ProductsPage } from '../../pages/product-pages/products/products';

/*
  Generated class for the DataLoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataLoadingProvider {

  valeur_stock = 0;
  products = [];
  constructor(public sqlite: SQLite,public toastCntrl:ToastController) {
    console.log('Hello DataLoadingProvider Provider');
    this.getProducts();

  }


  getProducts() {
    this.valeur_stock = 0;
    console.log("getdata provider")
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM products where deleted=0 ORDER BY name', [])
        .then(res => {

          this.products = [];

          console.log("products:getData");
          for (var index = 0; index < res.rows.length; index++) {
            //console.dir(res.rows.item(index));
            
            this.products.push(new Product(

              res.rows.item(index).id_prd,
              res.rows.item(index).name,
              res.rows.item(index).weight,
              res.rows.item(index).unit,
              res.rows.item(index).price,
              res.rows.item(index).stock,
              res.rows.item(index).pack,
              this.sqlite
            ));
            this.valeur_stock += res.rows.item(index).price * res.rows.item(index).stock;

          }

          /*    
          ProductsPage.products = products;
          console.log("ProductsPage.products");
          console.log(ProductsPage.products);

           home.ionViewDidEnter();
          home.remplireProducts(); */
        }).catch(e => console.log('error select'));
    }).catch(e => console.log('error creation of db'));

  }
}
