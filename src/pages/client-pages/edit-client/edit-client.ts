import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ClientsPage } from '../clients/clients';

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
    id:0,
    name:'' ,
    address:'' ,
    ville:'' ,
    telephone:'' ,
    credit : 0 ,
    
  }
  
  index=0;
  data1:any; // list of clients
  constructor(public navCtrl: NavController, public navParams: NavParams ,public sqlite:SQLite,public toast:Toast) {

    
    this.data1 = navParams.get('this.data1')
    for (; this.index < this.data1.length ; this.index ++ ){
    
      if (this.data1[this.index].id == navParams.get('id') ){

        this.data.id = this.data1[this.index].id;
        this.data.name = this.data1[this.index].name;
        this.data.address = this.data1[this.index].address;
        this.data.ville = this.data1[this.index].ville;
        this.data.telephone   = this.data1[this.index].telephone;
        this.data.credit = this.data1[this.index].credit;
        break
      }
      
    }

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditemployeePage');
  }



update(){
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })  .then((db: SQLiteObject) => {
db.executeSql('UPDATE clients set name=?,address=?,ville=?,telephone=?, credit=? WHERE id_clt=?', [
  this.data.name,
  this.data.address,
  this.data.ville ,
  this.data.telephone ,
  this.data.credit ,
  this.data.id,
])
.then((res) => {
  console.log('Executed SQL insert');
  this.toast.show('Done data updated!','4000','center').subscribe(
    toast => {
      this.data1[this.index] = this.data; 
      this.navCtrl.pop();
    }
  );

})
        .catch(e => console.log(e));
}) .catch(e => console.log(e));

this.data1[this.index] = this.data; 
this.navCtrl.pop();

}


}
