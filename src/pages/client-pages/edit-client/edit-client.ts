import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ClientsPage } from '../clients/clients';
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
  
  index=0;
  data1:any; // list of clients
  client:Client;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public sqlite:SQLite,public toast:Toast) {

    
    this.data1 = navParams.get('data1')
    console.log("edit constructor " + this.data1 + " " + navParams.get('id'))
    for (; this.index < this.data1.length ; this.index ++ ){
    
      if (this.data1[this.index].id == navParams.get('id') ){

        this.client =  this.data1[this.index];
        //this.data.id = this.data1[this.index].id;
        this.data.name = this.client.NAME;
        this.data.address = this.client.ADDRESS;
        this.data.ville = this.client.VILLE;
        this.data.telephone   = this.client.TELEPHONE;
        this.data.credit = this.client.CREDIT; 
        break
      }
      
    }

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditemployeePage');
  }



update(){
  
  this.client.update(this.data);
  

this.data1[this.index] = this.client; 
this.navCtrl.pop();

}


}
