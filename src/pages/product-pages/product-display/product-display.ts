import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertController:AlertController) {
    console.log("display constructor");
    this.product = this.navParams.get("product");
    

  }

  ionViewDidLoad() {
    
  }

  editProduct(){
    this.navCtrl.push("EditProductPage",{
      product : this.product
    });
  }

  presentAlertConfirmProduct(){
    let alert =  this.alertController.create({
      title: 'Confirm!',
      message: 'vous êtes sur, vous voulez supprimer ce produit?',
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
            this.deleteProduct();
          }
        }
      ]
    });

     alert.present();
  }

  deleteProduct(): any {
    this.navParams.get("home").deleteProduct(this.product);
    this.navCtrl.pop();
  }

}
