import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-display',
  templateUrl: 'product-display.html',
})
export class ProductDisplayPage {
  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("display constructor");
    this.product = this.navParams.get("product");
    console.log(this.product);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDisplayPage');
  }

}
