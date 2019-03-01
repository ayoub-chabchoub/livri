import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { EtatVentePage } from '../home-pages/etat-vente/etat-vente';
import { CleanPage } from '../home-pages/clean/clean';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  date = HomePage.getDate();
  credit: number = 0;
  etat: number = 0;
  constructor(public navCtrl: NavController, private sqlite: SQLite, private storage: Storage, private toastcntrl: ToastController) {

    /* this.storage.get("isupdate7DbHere")
      .then((data) => {

        if (data === null) {
          this.updateDB();
          

        }
      }); */
    this.storage.get("isDbHere")
      .then((data) => {

        if (data === null) {
          this.createDB();

        }
      });
     
   

  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('select sum(credit) from clients;', [])
        .then((res) => {

          this.credit = res.rows.item(0)['sum(credit)'];

        }
        )
        .catch(e => {
        });

      db.executeSql('select sum(prix_nette) from livraisons where date=?;', [HomePage.getDate()])
        .then((res) => {

          this.etat = res.rows.item(0)['sum(prix_nette)'];
        }
        )
        .catch(e => {
          console.log("problem prix nette");
          console.dir(e);
        });
    }).catch(e => {
    });


  }

  static getDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let smm, sdd;

    if (dd < 10) {
      sdd = '0' + dd;
    }
    else { sdd = dd }

    if (mm < 10) {
      smm = '0' + mm;
    } else { smm = mm }

    return yyyy + '-' + smm + '-' + sdd;
  }

 /*  tmpUpdateDB(): any {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      
       db.executeSql("drop table if exists product_stock;",[]).
          then(() => { console.log("alter table good");
          db.executeSql("CREATE TABLE IF NOT EXISTS product_stock( name TEXT , num number , id_stock number REFERENCES stock(id) on delete cascade,id_prd number references products(id_prd),primary key(id_stock,id_prd));",[]).
          then(() => { console.log("create table good");

          this.showMessage('la base de données a été modifié tmp',8000);
          this.storage.set("istmp3updateDbHere","true");
           }).catch((e) => {console.log("create table not good tmp");
           console.dir(e);});
         
           }).catch((e) => {console.log("drop table not good tmp");
           console.dir(e);});
      
           db.executeSql("ALTER TABLE livraisons ADD COLUMN prix_nette Float",[]).
           then(() => { console.log("alter table good");
           this.showMessage('la base de données a été modifié',8000);
           this.storage.set("istmp4updateDbHere","true");
             }).catch((e) => {console.log("alter table not good")}); 
      db.executeSql("ALTER TABLE products ADD COLUMN deleted INTEGER DEFAULT 0", []).
        then(() => {
          console.log("alter table good");
        }).catch((e) => {
          console.log("alter table not good")
          this.showMessage('la base de données a été modifié', 8000);
          this.storage.set("isupdate6DbHere", "true");
        });
    });


  }*/


 /* updateDB(): any {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

       db.executeSql("CREATE TABLE IF NOT EXISTS stock(id integer primary key, date TEXT);", []).
         then(() => {
           console.log("create table stock good normal");
           db.executeSql("CREATE TABLE IF NOT EXISTS product_stock( name TEXT , num number , id_stock number REFERENCES stock(id) on delete cascade,id_prd number references products(id_prd),primary key(id_stock,id_prd));", []).
             then(() => {
               console.log("create table product_stock good normal");
               db.executeSql("ALTER TABLE products ADD COLUMN stock Float DEFAULT 0", []).
                 then(() => {
                   console.log("alter table good");
                   db.executeSql("ALTER TABLE livraisons ADD COLUMN prix_nette Float", []).
                     then(() => {
                       console.log("alter table good");
                       this.showMessage('la base de données a été modifié', 8000);
                       this.storage.set("isupdateDbHere", "true");
                     }).catch((e) => { console.log("alter table not good") });
                 }).catch((e) => { console.log("alter table not good") });
             }).catch((e) => { console.log("create table product_stock not good") });
         }).catch((e) => { console.log("create table stock not good") });

      db.executeSql('drop table if exists productLiv;', []
      ).then(() => {
        console.log("drop table if exists productLiv");
        db.executeSql('drop table if exists product_stock;', []
        ).then(() => {
          console.log("drop table product_stock");
          db.executeSql('drop table if exists livraisons;', []
          ).then(() => {
            console.log("drop table livraisons");
            db.executeSql('drop table if exists stock;', []
            ).then(() => {
              console.log("drop table stock");
              db.executeSql('drop table if exists products;', []
              ).then(() => {
                console.log("drop table products");
                db.executeSql('drop table if exists clients;', []
                ).then(() => {
                  console.log("drop table clients");

                  this.showMessage('la base de données a été modifié', 8000);
                  this.storage.set("isupdate7DbHere", "true");
                  this.createDB();
                }).catch((e) => {
                  console.log("problem drop table clients")
                });
              }).catch((e) => {
                console.log("problem drop table products")
              });
            }).catch((e) => {
              console.log("problem drop table stock")
            });
          }).catch((e) => {
            console.log("problem drop table livraisons")
          });
        }).catch((e) => {
          console.log("problem drop table product_stock")
        });
      }).catch((e) => {
        console.log("problem drop table productLiv")
      });

    });

  }*/

  private createDB() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS clients(id_clt INTEGER PRIMARY KEY,name TEXT,address TEXT, ville TEXT, telephone Text , credit FLOAT);'
        , []).then(() => {

          db.executeSql('CREATE TABLE IF NOT EXISTS livraisons(id_liv INTEGER PRIMARY KEY,date TEXT,id_clt INTEGER, ' +
            'remarque text ,prix_total FLOAT , montant FLOAT,prix_nette FLOAT, CONSTRAINT fk_column' +
            ' FOREIGN KEY (id_clt) REFERENCES clients (id_clt) on delete cascade);'
            , []).then(() => {

              db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT,stock FLOAT default 0,deleted INTEGER default 0);'
                , []).then(() => {

                  db.executeSql('CREATE TABLE IF NOT EXISTS productLiv(id_prd INTEGER, id_liv INTEGER, price FLOAT , number INTEGER, ' +
                    'PRIMARY KEY (id_prd,id_liv) , ' +
                    'foreign key (id_prd) references products (id_prd),foreign key (id_liv) references livraisons (id_liv) on delete cascade);'
                    , []).then(() => {
                      db.executeSql("CREATE TABLE IF NOT EXISTS stock(id integer primary key, date TEXT);", [])
                        .then(() => {
                          console.log("create table stock good")

                          db.executeSql("CREATE TABLE IF NOT EXISTS product_stock( num number , id_stock number REFERENCES stock(id) on delete cascade,id_prd number references products(id_prd),primary key(id_stock,id_prd));", []).
                            then(() => {
                              console.log("create table product_stock good");
                              this.showMessage('la base de données a été crée', 8000);
                              this.storage.set("isDbHere", "true");
                            }).catch((e) => console.dir("problem to create stock"));

                        }).catch((e) => console.dir("problem to create stock"));

                    }).catch(e => this.showMessage("problem sql 4 " + e));

                }).catch(e => this.showMessage("problem sql 3 " + e));
            }).catch(e => this.showMessage("problem sql 2 " + e));
        })
        .catch(e => this.showMessage("problem sql 1 " + e));
    })
      .catch(e => this.showMessage(e));

  }

  showMessage(msg, dur = 2000) {
    let toast = this.toastcntrl.create({
      message: msg,
      duration: dur
    });
    toast.present();
    console.log(msg);
  }

  etatDeVente() {
    this.navCtrl.push(EtatVentePage, {

    });
  }

  clean() {


    this.navCtrl.push(CleanPage, {});


  }

}
