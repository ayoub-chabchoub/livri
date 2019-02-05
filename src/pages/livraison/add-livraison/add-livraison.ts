import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Livraison } from '../../../classes/livraison';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { Product } from '../../../classes/product';
import { ProductOrder } from '../../../classes/product_order';
import { Client } from '../../../classes/client';

import { ProductsPage } from '../../product-pages/products/products';
import { products } from '../../../assets/Globals';
import { HomePage } from '../../home/home';
import { ClientsPageModule } from '../../client-pages/clients/clients.module';

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

/*   data = {
    date: '',
    remarque: '',
    prix_total: 0,
    montant: 0,

  } */
  textChangeDate = "changer"
  chDate = false;
  cDate: string;
  chTotal = false;

  product = [];
  products = [];
  productsOrigin = [];
  client: Client;
  //numbers = [];

  public form: FormGroup;

  @ViewChild('myselect') selectComponent: SelectSearchableComponent;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite,
    public toast: Toast, private _FB: FormBuilder, private toastcntrl: ToastController) {
    this.client = this.navParams.get("client");
    //this.products = [new ProductOrder(0,"ayoub",1,"KG",80),new ProductOrder(1,"ismail",1,"KG",60),new ProductOrder(2,"ala",1,"KG",300)];
    if(ProductsPage.products.length == 0){
        ProductsPage.getData(ProductsPage.products,sqlite,this,toastcntrl)
        
    }
    
    
    //this.productsOrigin = this.copyArray(this.products);
    /*  this.product.splice(0,1);
     console.dir("products");
     console.dir(this.products); */

    this.cDate = HomePage.getDate();
    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
    console.log(this.cDate);
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
    /* console.log("load add liv");
    console.dir(ProductsPage.products);
    this.products = this.product2ProductOrder(ProductsPage.products);
    console.log("this.products");
    
    console.dir(this.products); */
    
    this.removeInputField(0);
    this.product = [];


  }

  ionViewDidEnter() {
    console.log("enter 2 add liv");
    /* let i = 0;
    while (ProductsPage.products.length > this.productsOrigin.length) {

      for (; i < ProductsPage.products.length; i++) {

        if (!this.exist(ProductsPage.products[i], this.productsOrigin)) { 
        this.productsOrigin = this.productsOrigin.concat(this.product2ProductOrder([ProductsPage.products[i]]));
        this.products = this.products.concat(this.product2ProductOrder([ProductsPage.products[i]]));
        
        this.showMessage("ajout de " + ProductsPage.products[i].NAME,6000);
        break;
      }
      }
    }

    i = 0;
    while (ProductsPage.products.length < this.productsOrigin.length) {

      for (; i < this.productsOrigin.length; i++) {

        if (!this.exist(this.productsOrigin[i], ProductsPage.products)) { 
          
        this.productsOrigin.splice(i,1);
        let index = this.products.indexOf(this.productsOrigin[i])
        if(index > -1){
          this.showMessage("supp de " + this.products[index].NAME,6000)
        this.products.splice(index,1);
        
        } 
        break;
      } 
      }
    } */

    this.productsOrigin = this.product2ProductOrder(ProductsPage.products);
    this.remplireProducts();


  }
 /*  exist(arg0: any, productsOrigin: any[]): any {

    for (let i = 0; i < productsOrigin.length; i++) {
      if (arg0.ID == productsOrigin[i].ID) {
        return true;
      }
    }
    return false;
  } */



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
      //this.product.splice(0,1);
    } else {
      let toast = this.toastcntrl.create({
        message: 'remplir le dernier produit',
        duration: 2000
      });
      toast.present();
      console.dir("remplir le dernier produit");

    }

  }

  getTotalPrice() {
    //console.log('array ' + this.product.length);
    //console.dir(this.product);
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
    console.dir(msg);
  }

  saveDate() {
    this.showMessage("saveDate declenchée",6000);
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
          console.log('Executed SQL insert in livraisons');
          //this.navCtrl.pop();
           db.executeSql('select last_insert_rowid();',[])
          .then((res) => {
            console.dir(res.rows.item(0)["last_insert_rowid()"]);//[Object.keys(res.rows.item(0))[0]]);
            id_liv = res.rows.item(0)["last_insert_rowid()"]; //[Object.keys(res.rows.item(0))[0]];

            for (let i =0; i<this.product.length ; i++){
              if(id_liv){
              db.executeSql('INSERT INTO productLiv VALUES(? ,?,?,?,?)', [
                this.product[i].ID,
                id_liv,
                this.product[i].NAME,
                this.product[i].PRICE,
                this.product[i].NUM
              ]).then(res => console.dir("produit bien ajouté"))
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

         /* db.executeSql('select count(*) from livraisons;',[])
          .then((res) => {
            for (var index = 0; index < res.rows.length; index++) {
              this.showMessage("count = " + res.rows.item(index)['count(*)'],6000);
            }
          }); */
         
        }) 
        .catch(e => {
        });
    }).catch(e => {
      
          console.log(e);
      
    });
    //this.navParams.get("home").getData();

    /*  this.navParams.get("home").data.push(new Client(0, this.data.name,
      this.data.address,
      this.data.ville ,
      this.data.telephone ,
      this.data.credit,this.sqlite,this.toast));
*//*
          
          this.navCtrl.pop(); */
    //add to database
  /*   this.client.LIVRAISON = new Livraison(0, this.form.value.date, this.client.ID, this.product,
      this.form.value.remarque, this.form.value.total, this.form.value.montant, this.sqlite, this.toast); */

   /*  console.dir("resultat finale");
    console.dir(this.client);
    console.dir(this.form.value); */
    this.client.CREDIT += (this.form.value.total - this.form.value.montant);
    this.navCtrl.pop();

  }

  findMissing(array, array1) {
    for (let i = 0; i < array.length; i++) {
      if (array1.indexOf(array[i]) == -1) {
        return [array[i]];
      }
    }
    return [];

  }

  productSelection(event: { component: SelectSearchableComponent, value: any }) {
    //
   /*  console.dir('event', event);
    console.dir('form.value', this.form.value); 
    console.dir("this.product.length = " + this.product.length );
    console.dir(this.product[-1]);

    console.dir("avant " + this.products);
    this.products.splice(this.products.indexOf(event.value),1);
    if ((this.product.length + this.products.length) != this.productsOrigin.length || this.product.indexOf(undefined)> -1) {
      this.products = this.products.concat(this.findMissing(this.productsOrigin, this.product.concat(this.products)));
    }
    console.dir("apres " + this.products);*/

   /* this.products = this.copyArray(this.productsOrigin);
     this.product.forEach(function(x){
      let index = this.products.indexOf(x);
      if(index > -1){
        this.products.splice(index,1);
      }
    }); 
    for (let i in this.product){
      let index = this.products.indexOf(this.product[i]);
      if(index > -1){
        this.products.splice(index,1);
      }
    }*/

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
        //console.log("supp de " +products[i].NAME);
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
    //console.dir(this.product);
  }

  openFromCode() {

    this.selectComponent.open();

  }

}
