import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Toast } from '@ionic-native/toast';
import { Client } from '../../../classes/client';


/**
 * Generated class for the AddClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
})
export class AddClientPage {

  data = {
    name: '',
    address: '',
    ville: '',
    telephone: '',
    credit: 0
  }



  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toastcntrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddemployeePage');

  }



  saveDate() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO clients VALUES(NULL,? ,?,?,?,?)', [
        this.data.name,
        this.data.address,
        this.data.ville,
        this.data.telephone,
        this.data.credit
      ])
        .then((res) => {                               //add res
          console.log('Executed SQL insert');
          this.showMessage('Done data inserted!' + res);
          this.navParams.get("home").refresh();
              this.navCtrl.pop();

        })
        .catch(e => {
          this.showMessage('prob1 ' + e);
      


        });
    }).catch(e => {
      this.showMessage('prob ' + e);

          ///////
          this.navParams.get("home").data.push(new Client(0, this.data.name,
            this.data.address,
            this.data.ville,
            this.data.telephone,
            this.data.credit, [], this.sqlite, undefined));

            this.navCtrl.pop();
    });
/*     this.navParams.get("home").refresh();

    this.navParams.get("home").data.push(new Client(0, this.data.name,
      this.data.address,
      this.data.ville,
      this.data.telephone,
      this.data.credit, [], this.sqlite, this.toast));

    this.navCtrl.pop(); */
  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
  }
}
