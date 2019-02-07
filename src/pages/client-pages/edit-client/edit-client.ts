import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import {Client} from '../../../classes/client';

/**
 * Generated class for the EditClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'age-edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClientPage {
 
   data = {
    name:'' ,
    address:'' ,
    ville:'' ,
    telephone:'' ,
    credit : 0 ,
    
  } 

  client:Client;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public sqlite:SQLite) {


        this.client =  this.navParams.get('client');
        this.data.name = this.client.NAME;
        this.data.address = this.client.ADDRESS;
        this.data.ville = this.client.VILLE;
        this.data.telephone   = this.client.TELEPHONE;
        this.data.credit = this.client.CREDIT; 
  }

  ionViewDidLoad() {
    
  }



update(){
  
  this.client.update(this.data);
  this.navCtrl.pop();

}

}