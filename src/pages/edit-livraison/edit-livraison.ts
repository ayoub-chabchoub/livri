import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { Product } from '../../classes/product';

/**
 * Generated class for the EditLivraisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-livraison',
  templateUrl: 'edit-livraison.html',
})
export class EditLivraisonPage {

  @ViewChild('myselect') selectComponent:SelectSearchableComponent;
  product = null;
  products = [new Product(0,"ayoub"),new Product(1,"ismail"),new Product(2,"ala")];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   // this.products = 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLivraisonPage');
  }

  productSelection(event :{component: SelectSearchableComponent,value:any}){
    //
    console.log('event',event);
  }

  onClose(){ 
   /*  let toast = this.toastcntrl.create({
      message:'thanks',
      duration:2000
    });
    toast.present(); */
  }

  openFromCode(){
    
    this.selectComponent.open();

  }

}
