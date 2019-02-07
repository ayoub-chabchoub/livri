import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Product } from './product';


export class Livraison {

  constructor(private id: number, private date, private id_clt: number, private products?: Product[], private remarque?: string, private totalAchat?: number, private montant?: number
    , public sqlite?: SQLite) {

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

  delete() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM livraisons WHERE id_liv=?', [this.id])
          .then(() => {
            

          }).catch(e => {});
      }).catch(e => {});

  }

}