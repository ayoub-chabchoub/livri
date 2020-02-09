import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { EtatVentePage } from '../home-pages/etat-vente/etat-vente';
import { CleanPage } from '../home-pages/clean/clean';
import { Papa } from 'ngx-papaparse';
import { File } from '@ionic-native/file';
//import { File } from '@ionic-native/file';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  date = HomePage.getDate();
  credit: number = 0;
  etat: number = 0;
  tablesNumber = 6;
  loading = null;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private storage: Storage, private toastcntrl: ToastController
    , private papa: Papa, private file: File, public loadingController:LoadingController) {//, private file: File) {

    this.storage.get("isDbHere")
      .then((data) => {

        if (data === null) {
          this.createDB();
        }

      });
     
       this.storage.get("isUpdate9DbHere")
      .then((data) => {

        if (data === null) {
          this.updateDB();
 
        }
      });

    /*   const ROOT_DIRECTORY = 'file:///';
      this.file.listDir("/data","")
      .then((res) => this.showMessage(res))
      .catch(e => this.showMessage(e)); */
 
     // this.file.createDir("/sdcard", 'mydir',false).then(_ => this.showMessage('Directory creeated')).catch(err => this.showMessage('Directory problem creation'));

 //     this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => this.showMessage('Directory exists')).catch(err => this.showMessage('Directory doesn\'t exist'));
/*
      console.log("dir:");
      console.log(this.file.);
      this.file.createFile(this.file.documentsDirectory + "/mydir", "livriDb.txt", false)
      .then((res)=>{this.showMessage("file created successfully");
      console.dir(res);
      })
      .catch(e => {this.showMessage("problem in file cration");
      console.dir(e);
    }
      ); */
/* 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

      console.log('file system open: ' + fs.name);
      fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {
  
          console.log("fileEntry is file?" + fileEntry.isFile.toString());
          // fileEntry.name == 'someFile.txt' 
          // fileEntry.fullPath == '/someFile.txt' 
          writeFile(fileEntry, null);
  
      }, onErrorCreateFile);

    }, onErrorLoadFs);
    function writeFile(fileEntry, dataObj) {
        // Create a FileWriter object for our FileEntry (log.txt). 
        fileEntry.createWriter(function (fileWriter) {
    
            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
                readFile(fileEntry);
            };
    
            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };
    
            // If data object is not passed in, 
            // create a new Blob instead. 
            if (!dataObj) {
                dataObj = new Blob(['some file data'], { type: 'text/plain' });
            }
    
            fileWriter.write(dataObj);
        }); 
    }*/


  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

    this.sqlite.create({
      name: 'livri.db',
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
      name: 'livri.db',
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


  updateDB(): any {
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

       db.executeSql("ALTER TABLE products add column pack number default 1;", []).
         then(() => {
           
          this.showMessage("base de données modifier avec succees");
          this.storage.set("isUpdate9DbHere", "true");
        
         }).catch((e) => { 
           this.showMessage("Alter table failed");
           console.dir(e);
           this.storage.set("isUpdate9DbHere", "true");
         });

    });

  }

  private createDB() {
    
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS clients(id_clt INTEGER PRIMARY KEY,name TEXT,address TEXT, ville TEXT, telephone Text , credit FLOAT);'
        , []).then(() => {

          db.executeSql('CREATE TABLE IF NOT EXISTS livraisons(id_liv INTEGER PRIMARY KEY,date TEXT,id_clt INTEGER, ' +
            'remarque text ,prix_total FLOAT , montant FLOAT,prix_nette FLOAT, CONSTRAINT fk_column' +
            ' FOREIGN KEY (id_clt) REFERENCES clients (id_clt) on delete cascade);'
            , []).then(() => {

              db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT,stock FLOAT default 0,deleted INTEGER default 0,pack number default 1);'
                , []).then(() => {

                  db.executeSql('CREATE TABLE IF NOT EXISTS productLiv(id_prd INTEGER, id_liv INTEGER, price FLOAT , number INTEGER, ' +
                    'PRIMARY KEY (id_prd,id_liv) , ' +
                    'foreign key (id_prd) references products (id_prd),foreign key (id_liv) references livraisons (id_liv) on delete cascade);'
                    , []).then(() => {
                      db.executeSql("CREATE TABLE IF NOT EXISTS stock(id integer primary key, date TEXT);", [])
                        .then(() => {
                          console.log("create table stock good")

                          db.executeSql("CREATE TABLE IF NOT EXISTS product_stock( num number , id_stock number REFERENCES stock(id) on delete cascade,id_prd number references products(id_prd), price number, primary key(id_stock,id_prd));", []).
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
    this.navCtrl.push(EtatVentePage, {});
  }

 
  clean() {

    this.navCtrl.push(CleanPage, {});
  }

  async exportDb() {
    
    this.loading = this.loadingController.create({
      content: "uploading data ...",
    });
    await this.loading.present();
    this.createCSV('clients')
    this.createCSV('livraisons')
    this.createCSV('products')
    this.createCSV('productLiv')
    this.createCSV('stock')
    this.createCSV('product_stock')
    
  }

  createCSV(table: String) {

    var tableList = []
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("select * from " + table + ";", [])
        .then(res => {
          console.dir("select");
          console.dir(res.rows);
          console.dir(res.rows.item(0));

          for (var index = 0; index < res.rows.length; index++) {

            tableList.push(res.rows.item(index));
          }
          console.dir("tableList")
          console.dir(tableList)

          this.file.createDir(this.file.externalRootDirectory, "Livri", true).then(
            dirEntry => {
              console.dir("dirEntry");
              console.dir(dirEntry);

              this.file.writeFile(dirEntry.nativeURL, table + '.csv', this.papa.unparse(tableList), { replace: true })
                .then(res => {
                  console.dir("writefile")
                  console.dir(res);
                  console.dir(res.nativeURL);

                  this.tablesNumber--;

                  if(!this.tablesNumber){
               
                    this.showMessage("la base de données a été exporté dans le dossier livri");
                    this.loading.dismiss();
                    this.tablesNumber = 6;

                  }
                  /* this.http.get(res.nativeURL, {responseType:'text'}).subscribe(
                    data => console.dir(data),
                    err => console.dir(err)
                    ) */

                  /* this.socialSharing.canShareViaEmail().then(res => {
                    console.dir("canShareViaEmail")
                    console.dir(res);
                  }).catch(err => {
                    console.dir("err canShareViaEmail");
                    console.dir(err);
         
                  }); 


                  this.socialSharing.share(null, null, res.nativeUrl, null).then(res => {
                    console.dir("social")
                    console.dir(res);
                  }).catch(err => {
                    console.dir("err social");
                    console.dir(err);

                  });*/
                }).catch(err => {
                  console.dir("err writefile");
                  console.dir(err);


                });
            }
          ).catch(err => {
            console.dir("err");
            console.dir(err);
          })



        }).catch(err => {
          console.dir("err sqliteObject");
          console.dir(err);
          console.dir(err.rows.item(0));

        });
    }).catch(err => {
      console.dir("err sqlite");
      console.dir(err);

    });


  }


}
