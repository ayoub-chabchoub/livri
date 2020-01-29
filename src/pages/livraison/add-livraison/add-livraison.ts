import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
//import { SelectSearchableComponent } from 'ionic-select-searchable';
import { ProductOrder } from '../../../classes/product_order';
import { Client } from '../../../classes/client';

import { ProductsPage } from '../../product-pages/products/products';
import { HomePage } from '../../home/home';
import { IonicSelectableComponent } from 'ionic-selectable';

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
  remise:number = 0;

  public form: FormGroup;

@ViewChild('myselect') selectComponent: IonicSelectableComponent;//SelectSearchableComponent;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite,
     private _FB: FormBuilder, private toastcntrl: ToastController) {
    this.client = this.navParams.get("client");
    
    this.cDate = HomePage.getDate();
    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
   
    this.form = this._FB.group({
      remarque: [''],
      montant: [, Validators.required], /////// changes makes here
      date: [this.cDate],
      total: [0],
      remise: [0],
      totalNette: [0],
      products: this._FB.array([
        this.initProductFields()
      ])
    });

  }


  ionViewDidLoad() {

    this.removeInputField(0);
    this.product = [];

  }

  ionViewDidEnter() {
    if(ProductsPage.products.length == 0 || ProductsPage.products_modified){
      ProductsPage.getData(ProductsPage.products,this.sqlite,this.toastcntrl)
      
  } 
    if(ProductsPage.products.length == 0){
    var code = setInterval(function(){
      if(ProductsPage.products.length){
        this.productsOrigin = this.product2ProductOrder(ProductsPage.products);
        clearInterval(code);
      }
    },400
    );
     setTimeout(function(){
      clearInterval(code);
      
    },2500);
  }
    this.productsOrigin = this.product2ProductOrder(ProductsPage.products);
    this.remplireProducts();
  }

  product2ProductOrder(products) {

    let productOrders = [];
    for (let i = 0; i < products.length; i++) {

      productOrders = productOrders.concat(new ProductOrder(products[i].ID, products[i].NAME, products[i].WEIGHT, products[i].UNIT,
        products[i].PRICE,products[i].STOCK));

    }
    return productOrders;

  }

  set REMISE(remise){
    this.form.value.totalNette = this.form.value.total -remise;
  }

  // form methods begin

  initProductFields(): FormGroup {
    return this._FB.group({
      name: ['', Validators.required],
      number: [, Validators.required],
      price: [, Validators.required]

    });
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
      this.product[i].PRICE = this.getdefaultPrice(this.product[i].ID)
      this.products.push(this.product[i])
    }

    this.product.splice(i, 1);

  }

  getdefaultPrice(id){
    for(let i=0; i<ProductsPage.products.length;i++){
      if( ProductsPage.products[i].ID == id){
        return ProductsPage.products[i].PRICE;
      }
    }
  }

  productSelection(event: { component: IonicSelectableComponent, value: any }) {// SelectSearchableComponent

    this.remplireProducts();
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

  //form methods end

  getTotalPrice() {
    
    let total = 0;
    for (let j = 0; j < this.product.length; j++) {
      if (this.product[j]) {
        total += this.product[j].TOTAL;
      }
    }
    this.form.value.total = total;
    return [total, total - this.remise];
    
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
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let id_liv;
      console.log("total= " + this.form.value.total);
      console.log("remise= " + this.form.value.remise);
      db.executeSql('INSERT INTO livraisons VALUES(NULL,? ,?,?,?,?,?)', [
        this.form.value.date,
        this.client.ID,
        this.form.value.remarque,
        this.form.value.total,
        this.form.value.montant || 0 ,
        this.form.value.total - this.form.value.remise
      ])
        .then((res) => {                               //add res
          let r:number = (this.form.value.total - this.form.value.remise - this.form.value.montant);
          let r1:number = this.client.CREDIT;
          console.log(typeof r);
          console.log(typeof r1);
          r = Number(r);
          r1 = Number(r1);
          console.log(typeof r);
          console.log(typeof r1);
          this.client.CREDIT = r + r1;
          this.navCtrl.pop();
           db.executeSql('select last_insert_rowid();',[])
          .then((res) => {
            
            id_liv = res.rows.item(0)["last_insert_rowid()"]; 
            console.log(id_liv);
            for (let i =0; i<this.product.length ; i++){
              if(id_liv){
              db.executeSql('INSERT INTO productLiv VALUES(? ,?,?,?)', [
                this.product[i].ID,
                id_liv,
                this.product[i].PRICE,
                this.product[i].NUM
              ]).then(res => {console.dir(this.product);
              console.log(id_liv);
              console.log(this.product[i].STOCK);
              this.product[i].ADD2STOCK = -this.product[i].NUM;
              console.log(this.product[i].STOCK);
              db.executeSql('UPDATE products set stock=stock - ?  WHERE id_prd=?', [
                this.product[i].NUM,
                this.product[i].ID
              ])
                .then((res) => {
                  console.log("update products");
                  ProductsPage.products_modified = true;
                })
                .catch(e => {console.log("problem update products");});
                
             
              })
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
        .catch(e => {console.log("INSERT INTO livraisons problem");
        console.dir(e);
        });
    }).catch(e => {
      
          console.log(e);
      
    });

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

 

}
