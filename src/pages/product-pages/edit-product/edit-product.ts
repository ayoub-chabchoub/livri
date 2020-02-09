import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../../classes/product';
import { SQLite } from '@ionic-native/sqlite';

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
    stock:0,
    pack:1,

  }

  product: Product;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite) {


    this.product = navParams.get('product');
    this.data.name = this.product.NAME;
    this.data.weight = this.product.WEIGHT;
    this.data.unit = this.product.UNIT;
    this.data.price = this.product.PRICE;
    this.data.stock = this.product.STOCK;
    this.data.pack = this.product.PACK;

  }

  ionViewDidLoad() {
   
  }

  update() {
    this.product.update(this.data);
    this.navCtrl.pop();

  }
}
