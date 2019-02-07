
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


export class Product {


  constructor(private id, private name, private weight?: number, private unit?: string, public price?: number, public sqlite?: SQLite) {

    if(!this.price){
      this.price = 0;
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

  public get PRICE() {
    return this.price
  }

  update(data: any): any {
    this.name = data.name;
    this.weight = data.weight;
    this.unit = data.unit;
    this.price = data.price;


    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE products set name=?,weight=?,unit=?,price=? WHERE id_prd=?', [
        data.name,
        data.weight,
        data.unit,
        data.price,
        this.id,
      ])
        .then((res) => {
         

        })
        .catch(e => {});
    }).catch(e => {});

  }

  delete() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM products WHERE id_prd=?', [this.id])
          .then(() => {
           

          }).catch(e => {});
      }).catch(e => {});

  }



}