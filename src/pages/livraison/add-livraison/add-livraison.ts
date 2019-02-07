import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { ProductOrder } from '../../../classes/product_order';
import { Client } from '../../../classes/client';

import { ProductsPage } from '../../product-pages/products/products';
import { HomePage } from '../../home/home';


/**
 * Generated class for the AddLivraisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-livraison',
  templateUrl: 'add-livraison.html',
})
export class AddLivraisonPage {

  textChangeDate = "changer"
  chDate = false;
  cDate: string;
  chTotal = false;

  product = [];
  products = [];
  productsOrigin = [];
  client: Client;

  public form: FormGroup;

  @ViewChild('myselect') selectComponent: SelectSearchableComponent;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite,
     private _FB: FormBuilder, private toastcntrl: ToastController) {
    this.client = this.navParams.get("client");
    if(ProductsPage.products.length == 0){
        ProductsPage.getData(ProductsPage.products,sqlite,this,toastcntrl)
        
    }
    
    this.cDate = HomePage.getDate();
    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
   
    this.form = this._FB.group({


      remarque: [''],
      montant: [, Validators.required], /////// changes makes here
      date: [this.cDate],
      total: [0],
      products: this._FB.array([
        this.initProductFields()
      ])
    });

  }

  initProductFields(): FormGroup {
    return this._FB.group({
      name: ['', Validators.required],
      number: [, Validators.required]

    });
  }

  ionViewDidLoad() {

    this.removeInputField(0);
    this.product = [];

  }

  ionViewDidEnter() {
    this.productsOrigin = this.product2ProductOrder(ProductsPage.products);
    this.remplireProducts();
  }

  product2ProductOrder(products) {

    let productOrders = [];
    for (let i = 0; i < products.length; i++) {

      productOrders = productOrders.concat(new ProductOrder(products[i].ID, products[i].NAME, products[i].WEIGHT, products[i].UNIT,
        products[i].PRICE));

    }
    return productOrders;

  }


  /**
   * Programmatically generates a new technology input field
   *
   * @public
   * @method addNewInputField
   * @return {none}
   */


  addNewInputField(): void {
    if (this.product.length == 0 || this.product[this.product.length - 1]) {
      const control = <FormArray>this.form.controls.products;
      control.push(this.initProductFields());
    } else {
      let toast = this.toastcntrl.create({
        message: 'remplir le dernier produit',
        duration: 2000
      });
      toast.present();

    }

  }

  getTotalPrice() {
    
    let total = 0;
    for (let j = 0; j < this.product.length; j++) {
      if (this.product[j]) {
        total += this.product[j].TOTAL;
      }
    }
    this.form.value.total = total;
    return total;
  }

  changeDate() {
    this.chDate = !this.chDate;
    if (this.textChangeDate == "changer") {
      this.textChangeDate = "Aujourd'hui"
    } else {
      this.textChangeDate = "changer"
    }
  }

  changerTotal() {
    this.chTotal = !this.chTotal;
  }



  /**
   * Programmatically removes a recently generated technology input field
   *
   * @public
   * @method removeInputField
   * @param i    {number}      The position of the object in the array that needs to removed
   * @return {none}
   */
  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.products;
    control.removeAt(i);
    if (this.product[i]) {
      this.product[i].NUM = 0;
      this.products.push(this.product[i])
    }

    this.product.splice(i, 1);

  }

  copyArray(data) {
    let tmp = [];
    for (let i = 0; i < data.length; i++) {
      tmp.push(data[i]);
    }
    return tmp;

  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
  }

  saveDate() {
    
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let id_liv;
      db.executeSql('INSERT INTO livraisons VALUES(NULL,? ,?,?,?,?)', [
        this.form.value.date,
        this.client.ID,
        this.form.value.remarque,
        this.form.value.total,
        this.form.value.montant
      ])
        .then((res) => {                               //add res
         
           db.executeSql('select last_insert_rowid();',[])
          .then((res) => {
            
            id_liv = res.rows.item(0)["last_insert_rowid()"]; 

            for (let i =0; i<this.product.length ; i++){
              if(id_liv){
              db.executeSql('INSERT INTO productLiv VALUES(? ,?,?,?,?)', [
                this.product[i].ID,
                id_liv,
                this.product[i].NAME,
                this.product[i].PRICE,
                this.product[i].NUM
              ]).then(res => {})
              .catch(e=> {
                console.dir("problem of insert in productLiv");
                console.dir(e);
              });
            }else{
              console.dir("probleme pour recuperer id_liv");
            }
            }
          }).catch(e => {
            console.dir("problem while executing select last_insert_rowid();");
            console.dir(e);
          });
         
        }) 
        .catch(e => {
        });
    }).catch(e => {
      
          console.log(e);
      
    });
   
    this.client.CREDIT += (this.form.value.total - this.form.value.montant);
    this.navCtrl.pop();

  }

  productSelection(event: { component: SelectSearchableComponent, value: any }) {

    this.remplireProducts();
  }

  remplireProducts(){
    this.products = this.copyArray(this.productsOrigin);
    let index = -1;
    for (let i in this.product){
      if(this.product[i]){
      index = this.getIndex(this.product[i],this.products);

      if(index > -1){
        this.products.splice(index,1);
      }
    }
    }
  }
  getIndex(arg0: any, products: any[]): any {

    for (let i in this.products){
      if(products[i].ID == arg0.ID){
        return(i);
        
      }
    }

    return -1;
  }

  onClose() {
    let toast = this.toastcntrl.create({
      message: 'thanks',
      duration: 2000
    });
    toast.present();
  }

  openFromCode() {
    this.selectComponent.open();
  }

}
