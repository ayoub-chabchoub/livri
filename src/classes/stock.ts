
import { ProductOrder } from "./product_order";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { ProductsPage } from "../pages/product-pages/products/products";


export class Stock {

  constructor(private id: number, private date: String, private products: ProductOrder[], private sqlite?: SQLite) {

  }

  get PRODUCTS() {
    return this.products;
  }

  get DATE() {
    return this.date;
  }

  delete() {
    console.log("delete stock id= ", this.id);
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        for (let i in this.products) {

          this.products[i].STOCK = this.products[i].STOCK - this.products[i].NUM;

          db.executeSql("update products set stock= stock - ? where id_prd=? ; ",
            [this.products[i].NUM, this.products[i].ID])
            .then(() => {
              ProductsPage.products_modified = true;
            })
            .catch((e) => {
              console.log("problem to update products");
              console.dir(e);
            });
        }

        /*  db.executeSql("delete from product_stock where id_stock=?;", [this.id])
           .then(() => {
             console.log("productstock deleted");*/
             console.log("this.id ",this.id);
        db.executeSql("PRAGMA foreign_keys = ON;", [])
          .then(() => {
            console.log("PRAGMA foreign_keys = ON;");

            db.executeSql('delete from stock where id=?;', [this.id])
              .then(res => {
                console.log("stock delete");

            
          }).catch(e => { console.log("problem with delete"); });

      })
      .catch((e) => {console.log("stock delete problem");
      console.dir(e);});
    /* })
  .catch((e) => console.log("productstock delete problem"));

*/
  }).catch(e => { console.dir("problem with data.db open") });
 

  }




}