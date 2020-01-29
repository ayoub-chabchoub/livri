
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


export class Product {


  constructor(private id, private name, private weight?: number, private unit?: string, public price?: number, public stock?: number, public sqlite?: SQLite) {

    if (!this.price) {
      this.price = 0;
    }
    if (!this.stock) {
      this.stock = 0;
    }


  }

  get ID() {
    return this.id
  }

  get NAME() {
    return this.name
  }

  get WEIGHT() {
    return this.weight
  }

  get UNIT() {
    return this.unit
  }

  get STOCK(): number {
    return this.stock;
  }

  set STOCK(stock: number) {
    this.stock = stock;
  }

  set ADD2STOCK(stock: number) {
    this.stock += stock;
  }



  get PRICE() {
    return this.price
  }



  update(data: any): any {
    this.name = data.name;
    this.weight = data.weight;
    this.unit = data.unit;
    this.price = data.price;
    this.stock = data.stock;


    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE products set name=?,weight=?,unit=?,price=?,stock=? WHERE id_prd=?', [
        data.name,
        data.weight,
        data.unit,
        data.price,
        data.stock,
        this.id,
      ])
        .then((res) => {

          console.log("update product success");

        })
        .catch(e => {
          console.log("update product failed");
          console.dir(e);
         });
    }).catch(e => { });

  }

  delete() {

    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('select count(*) from productLiv WHERE id_prd=?', [this.id])
          .then((res) => {
            let count = res.rows.item(0)["count(*)"];
            let sql;
            console.log("count ", count);
            if (count) {
              sql = 'update products set deleted=1 WHERE id_prd=?';
            } else {
              sql = 'delete from products WHERE id_prd=?';
            }
            console.log(sql);

            db.executeSql(sql, [this.id])
              .then(() => {
                console.log("request success");

              }).catch(e => {
                console.log("request failed");
               });
          }).catch(e => {
            console.log("select count(*) failed");
           });


      }).catch(e => { });

  }



}