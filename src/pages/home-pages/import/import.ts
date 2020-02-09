import { DataLoadingProvider } from './../../../providers/data-loading/data-loading';
import { StockPage } from './../../stock-pages/stock/stock';
import { ClientsPage } from './../../client-pages/clients/clients';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Papa } from 'ngx-papaparse';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-import',
  templateUrl: 'import.html',
})
export class ImportPage {

  tables = [{ table: 'products', filePath: null, data: null },
  { table: 'clients', filePath: null, data: null },
  { table: 'stock', filePath: null, data: null },
  { table: 'livraisons', filePath: null, data: null },
  { table: 'product_stock', filePath: null, data: null },
  { table: 'productLiv', filePath: null, data: null },
  ];
  t = 0;
  numOfTuples = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fileChooser: FileChooser, private loadingController: LoadingController
    , private filePath: FilePath, private file: File, private alertController: AlertController, private papa: Papa, private dataLoading:DataLoadingProvider,
    private sqlite: SQLite, private toastcntrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportPage');
  }


  importDb() {

    this.fileChooser.open()
      .then(uri => {
        console.log(uri);

        this.filePath.resolveNativePath(uri).then(resolvedFilePath => {

          let path = resolvedFilePath.substring(0, resolvedFilePath.lastIndexOf('/'));
          let file = resolvedFilePath.substring(resolvedFilePath.lastIndexOf('/') + 1, resolvedFilePath.length);
          let table = this.findInTables(file.slice(0, -4));
          table.filePath = resolvedFilePath;
          this.file.readAsText(path, file).then(res => console.dir(res))
            .catch(err => console.dir(err));

        })
          .catch(e => console.log(e));

      })
  }

  findInTables(tableName) {
    for (let table of this.tables) {

      if (table.table == tableName) {
        return table;
      }

    }
  }

  readFile(data, res) {
    //console.dir(res[1])
    //console.dir(res[1].papa)
    let result = data[1].papa.parse(res)
    console.dir(result);
    //t += result.data.length;
    return [result.data.slice(1), data[0]];
  }

  async import() {
    const loading = this.loadingController.create({
      content: "uploading data ..." ,
    });
    await loading.present();
   
    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.transaction(tx => {

        tx.executeSql('delete from productLiv;');
        tx.executeSql("delete from product_stock;");
        tx.executeSql("delete from livraisons;");
        tx.executeSql("delete from clients;");
        tx.executeSql("delete from stock;");
        //tx.executeSql("delete from ldjinj;");
        tx.executeSql("delete from products;");

        //loading.dismiss();
      }).then((res) => {
        console.log("tables deleted successufully");
        console.dir(res);

        //let order = [5, 3, 4, 2, 1, 0]
        for (let j in this.tables) {

          let path = this.tables[j].filePath.substring(0, this.tables[j].filePath.lastIndexOf('/'));
          let file = this.tables[j].filePath.substring(this.tables[j].filePath.lastIndexOf('/') + 1, this.tables[j].filePath.length);
          console.log(file);
          console.log(this.tables[j].table);
          this.file.readAsText(path, file).then(/* res => {
              //console.dir("file")
              //console.dir(res)
              let result = this.papa.parse(res)
              console.dir(result);
              //t += result.data.length;
              //this.tables[j].data = result.data.slice(1);
              return result.data.slice(1);
            } */
            this.readFile.bind(null, [j, this]))
            .then(res => {
              // db.transaction(db => {

              let data: any = res[0];
              console.dir("data");
              console.dir(data);
              this.t += data.length;
              this.numOfTuples += data.length;
              let k = res[1];
              for (let i = 0; i < data.length; i++) {

                let query = "insert into " + this.tables[k].table + " values (";
                for (let i = 0; i < data[0].length; i++) {
                  query += "?,";
                }

                query = query.slice(0, -1);
                query += ");";
                //console.dir(query);
                //console.dir(data);
                db.executeSql(query, data[i])
                  .then(res => {
                    this.t -= 1;
                    if (this.t == 0) {
                      this.showMessage("success", 6000)
                      this.navCtrl.pop();
                      ClientsPage.clients_modified = true;
                      //ProductsPage.products_modified = true;
                      this.dataLoading.getProducts();
                      StockPage.stockModified = true;
                      //success = true;
                      loading.dismiss();

                    } 
                  }).catch(err => {
                    console.log("err");
                    console.dir(err);
                  });
              }
            });
        }
      }).catch(res => {

        console.log("err")
        console.dir(res);
      });
    });
  }
  //for (let k in this.tables) {
  //insert data from file to database
  /* for (let i in this.tables[k].data) {
    //console.log("error = " + error);
    if (error) break
    let query = "insert into " + this.tables[k].table + " values (";
    for (let j in this.tables[k].data[i]) {
      query += "?,";
    }
    query = query.slice(0, -1);
    query += ");";
    //console.dir(query);
    //console.dir(data);
    db.executeSql(query, this.tables[k].data[i])
      .then(res => {
        t -= 1;
      }).catch(err => {
        console.log("err");
        console.dir(err);
      })
      
  } */
  //} 
  /*.then((res) => {
    console.log("ok", res);
    if (Number(i) == (this.tables[k].data.length - 1)) {
      t=+1;
      this.showMessage(t + "/6");
      if(t == 6){
        this.showMessage("success", 6000)
        this.navCtrl.pop();
        ClientsPage.clients_modified = true;
        ProductsPage.products_modified = true;
        StockPage.stockModified = true;
        //success = true;
        loading.dismiss();
      }
    }*/
  /* }).catch(err => {
     this.showMessage("unable to insert in " );//+ this.tables[j])
     console.dir(err);
     //console.dir(query);
     //console.dir(data[i]);
     success = false;
     error = true;
     loading.dismiss();

   });*/

  /* 
        for (let item of this.tables) {
          k += 1;
  
          while (!success) {
            console.log("while")
            if (error) break
          }
          if (error) break
          //success = false;
          console.log("afer while if")
  
        }
        return db; */
  /*  }).then(db => {
 
   }).catch(err => {
     // this.showMessage("unable to delete from " + this.tables[i]);
     // console.dir(this.tables[i]);
     console.dir(err);
     success = false;
     error = true
   
 
     .then(a => {
       //if (k == 6) {
       loading.dismiss();
       if (success) {
         this.showMessage("success", 6000)
         this.navCtrl.pop();
         ClientsPage.clients_modified = true;
         ProductsPage.products_modified = true;
         StockPage.stockModified = true;
       } else {
         this.showMessage("problème lors de l'importation de la base", 5000)
       }
       //} */


  //}

  presentAlertConfirm(first = true) {


    let msg = 'Vous êtes sur, vous voulez importer la nouvelle base de données?';
    if (!first) {
      msg = "Cette operation va supprimer tous vos données";
    }

    let alert = this.alertController.create({
      title: 'Confirm!',
      message: msg,
      buttons: [
        {
          text: 'non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'oui',
          handler: () => {
            if (first) {
              this.presentAlertConfirm(false);
            } else {
              this.import();
            }

          }
        }
      ]
    });

    alert.present();
  }

  showMessage(msg, dur = 2000) {
    console.dir(msg);
    let toast = this.toastcntrl.create({
      message: msg,
      duration: dur
    });
    toast.present();
  }

}
