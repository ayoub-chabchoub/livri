import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController:AlertController) {
    this.livraison = this.navParams.get("livraison")
    console.log("livraisons.products");
    console.dir(this.livraison.PRODUCTS);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivraisonDisplayPage');
  }

  presentAlertConfirmLivraison(){
    let alert =  this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer cette livraison?',
      buttons: [
        {
          text: 'non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'oui',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteLivraison();
          }
        }
      ]
    });

     alert.present();
  }

  deleteLivraison(): any {
    this.navParams.get("home").deleteLivraison(this.livraison);
    this.navCtrl.pop();
  }

}
