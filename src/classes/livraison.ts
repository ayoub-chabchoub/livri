import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ProductOrder } from './product_order';
import { ProductsPage } from '../pages/product-pages/products/products';


export class Livraison {

  constructor(private id: number, private date, private id_clt: number, private products?: ProductOrder[], private remarque?: string,
     private totalAchat?: number, private montant?: number,private totalNette?:number , public sqlite?: SQLite) {

  }

  get ID() {
    return this.id;
  }

  get DATE() {
    return this.date;
  }

  get ID_CLT() {
    return this.id_clt;
  }

  get PRODUCTS() {
    return this.products;
  }

  get REMARQUE() {
    return this.remarque;
  }

  get MONTANT() {
    return this.montant;
  }

  get TOTALPRICE() {
    return this.totalAchat;
  }

/* 
  update(data: any): any {
    this.date = data.date;
    this.id_clt = data.id_clt;


    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE products set date=?,id_clt=?,____  WHERE id_liv=?', [ //add news
        data.date,
        data.id_clt,
        this.id,
      ])
        .then((res) => {
          
        

        })
        .catch(e => {});
    }).catch(e => {});

  }
 */
  delete() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("PRAGMA foreign_keys = ON;", [])
          .then(() => {
            console.log("PRAGMA foreign_keys = ON;");

        db.executeSql('DELETE FROM livraisons WHERE id_liv=?', [this.id])
          .then(() => {
            for(let i in this.products){
              db.executeSql('update products set stock=stock + ? where id_prd=?', [this.products[i].NUM ,this.products[i].ID])
              .then(() => {
                  console.log('update products set stock=? where id_prd=?');
              }).catch(e => {
                console.log('update products set stock=? where id_prd=? problem');
              });
            }
            ProductsPage.products_modified = true;//////////////

          }).catch(e => {});
        })
        .catch((e) => {console.log("PRAGMA foreign_keys = ON; problem");
        console.dir(e);});
      }).catch(e => {});

  }

  get DISCOUNT(){
    return this.totalNette - this.totalAchat;
}

  get TOTALNETTE(){
      return this.totalNette;
  }

  set DISCOUNT(discount:number){
      this.totalNette = this.totalAchat -discount
  }

  set TOTALNETTE(total){
      this.totalNette = total;
}

}