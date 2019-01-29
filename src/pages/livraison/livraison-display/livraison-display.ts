import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Livraison } from '../../../classes/livraison';

/**
 * Generated class for the LivraisonDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-livraison-display',
  templateUrl: 'livraison-display.html',
})
export class LivraisonDisplayPage {

  livraison:Livraison;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.livraison = this.navParams.get("livraison")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivraisonDisplayPage');
  }

}
