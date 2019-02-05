import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Product } from './product';


export class Livraison {

  constructor(private id: number, private date, private id_clt: number, private products?: Product[], private remarque?: string, private totalAchat?: number, private montant?: number
    , public sqlite?: SQLite, public toast?: Toast) {

      

    /*  if(!id){
         this.sqlite.create({
             date: 'data.db',
             location: 'default'
           }).then((db: SQLiteObject) => {
               db.executeSql('INSERT INTO livraisons VALUES(NULL,? ,?)', [
                 this.date,
                 this.id_clt
               ])
               .then((res) => {
                 db.executeSql("SELECT id_liv FROM livraisons where date='?' and  id_clt='?'",[] )
                 .then(res=>{
                 console.log('Executed SQL SELECT done' );
                 this.data = [];
                 for (var index = 0; index < res.rows.length; index++) {
 
                     this.data.push(new Product(
                     res.rows.item(index).id_prd ,
                     res.rows.item(index).date ,
                     res.rows.item(index).id_clt ,
                     res.rows.item(index).unit ,
                     res.rows.item(index).price ,
                     this.sqlite,
                     this.toast
                     ))
                 }
                 }).catch(e => console.log(e));
                 console.log('Executed SQL insert');
                 this.toast.show('Done data inserted!','4000','center').subscribe(
                   toast => {
                     
                   }
                 );
     
               }).catch(e => {
                         this.toast.show('Done data inserted!','4000','center').subscribe(
                           toast => {
                             console.log(e);
                           }
                         );
                       });
             }) .catch(e => {
               this.toast.show('Done data inserted!','4000','center').subscribe(
                 toast => {
                   console.log(e);
                 }
               );
             }); 
             
     } */
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
          console.log('Executed SQL insert');
          this.toast.show('Done data updated!', '4000', 'center').subscribe(
            toast => {

            }

          );

        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));

  }

  delete() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM livraisons WHERE id_liv=?', [this.id])
          .then(() => {
            console.log('Executed SQL delete');

            this.toast.show('Done data Deleted!', '5000', 'center').subscribe(
              toast => {
               
              }
            );


          }).catch(e => console.log(e));
      }).catch(e => console.log(e));

  }

}