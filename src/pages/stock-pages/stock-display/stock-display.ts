import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Stock } from '../../../classes/stock';

/**
 * Generated class for the StockDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-display',
  templateUrl: 'stock-display.html',
})
export class StockDisplayPage {

  stock:Stock;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController:AlertController) {
    this.stock = this.navParams.get("stock")
   
  }

  ionViewDidLoad() {
    
  }

  presentAlertConfirmStock(){
    let alert =  this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer cette approvisionnement?',
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
            this.deleteStock();
          }
        }
      ]
    });

     alert.present();
  }

  deleteStock(): any {
    this.navParams.get("home").deleteStock(this.stock);
    this.navCtrl.pop();
  }

}
