import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../../classes/product';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  data = {
    name: '',
    weight: 0,
    unit: '',
    price: 0,

  }

  //index=0;
  //data1:any; // list of products
  product: Product;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast) {


    this.product = navParams.get('product');
    /*  console.log("edit constructor " + this.data1 + " " + navParams.get('id'))
     for (; this.index < this.data1.length ; this.index ++ ){
     
       if (this.data1[this.index].id == navParams.get('id') ){
 
         this.product =  this.data1[this.index]; */
    //this.data.id = this.data1[this.index].id;
    this.data.name = this.product.NAME;
    this.data.weight = this.product.WEIGHT;
    this.data.unit = this.product.UNIT;
    this.data.price = this.product.PRICE;

    /*         break
          }
          
        } */



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditemployeePage');
  }



  update() {
    this.product.update(this.data);


    //this.data1[this.index] = this.product; 
    this.navCtrl.pop();

  }
}
