import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddClientPage } from '../add-client/add-client';
import { EditClientPage } from '../edit-client/edit-client';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { ClientDisplayPage } from '../client-display/client-display';
import { Client } from '../../../classes/client';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  data: any = [];
  datatmp: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite
    , public alertController: AlertController, private callNumber: CallNumber, private storage: Storage, private toastcntrl:ToastController) {


  }

  ionViewDidLoad() {
     this.getData();
  }

  ionViewDidEnter() {
    
    this.data.sort(this.compare);
  }

  compare(a,b){
    if (a.NAME > b.NAME) return 1;
    else return -1;
  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
  }

  doRefresh(refresher) {
    
    this.getData();
    setTimeout(() => {
      
      refresher.complete();
    }, 2000);
  }


  refresh() {
    this.getData();
  }

  call(client) {
    this.showMessage("phone call " + client.TELEPHONE);
    this.callNumber.callNumber(client.TELEPHONE, true)
      .then(res => {})
      .catch(err => {});
  }

  getData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {


      db.executeSql('SELECT * FROM clients ORDER BY name', [])
        .then(res => {
          
          this.data = [];
          for (var index = 0; index < res.rows.length; index++) {

            this.data.push(new Client(
              res.rows.item(index).id_clt,
              res.rows.item(index).name,
              res.rows.item(index).address,
              res.rows.item(index).ville,
              res.rows.item(index).telephone,
              res.rows.item(index).credit,
              [],
              this.sqlite
            ));
          }
        }).catch(e => this.showMessage("probleme in select " + e));
    }).catch(e =>{});
    this.data.sort(this.compare);
   
    //this.storage.set("clients",this.data);
  }


  addClient() {
    this.navCtrl.push(AddClientPage, { home: this });
  }

  editClient(client) {
    this.navCtrl.push(EditClientPage, {
      client : client
      /*          name:client.name,
               address:client.address ,
               ville:client.ville,
               telephone:client.telephone,
               credit:client.credit */

    });
  }

  showClient(client) {
    
    this.navCtrl.push(ClientDisplayPage, {
      client: client,
      home:this
    });

  }


  presentAlertConfirm(client) {
    let alert = this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer ce client?',
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
            
            this.deleteClient(client);
          }
        }
      ]
    });

    alert.present();
  }

  deleteClient(client) {


    let index = this.data.indexOf(client, 0);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    client.delete();
  }

  copyArray(data) {
    let tmp = [];
    for (let i = 0; i < data.length; i++) {
      tmp.push(data[i]);
    }
    return tmp;

  }

  getItems(ev) {

    // set val to the value of the ev target
    var val = ev.target.value;
    if (this.datatmp.length == 0) {
      this.datatmp = this.copyArray(this.data)
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data = this.datatmp.filter((item) => {
        return (item.NAME.toLowerCase().indexOf(val.toLowerCase()) == 0);
      });
      this.data = this.data.concat(this.datatmp.filter((item) => {
        return (item.NAME.toLowerCase().indexOf(val.toLowerCase()) > 0);
      }));
      
    } else {
      this.data = this.copyArray(this.datatmp);
      this.datatmp = [];
    }

  }

}
