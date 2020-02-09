import { DataLoadingProvider } from './../../../providers/data-loading/data-loading';
/* import { products } from './../../../../platforms/android/app/src/main/assets/www/assets/Globals';
import { products } from './../../../../www/assets/Globals'; */
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
//import { SelectSearchableComponent } from 'ionic-select-searchable';
import { HomePage } from '../../home/home';
import { ProductOrder } from '../../../classes/product_order';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { StockPage } from '../stock/stock';
import { IonicSelectableComponent } from 'ionic-selectable';

/**
 * Generated class for the AjoutStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-stock',
  templateUrl: 'ajout-stock.html',
})
export class AjoutStockPage {

  textChangeDate = "changer"
  chDate = false;
  cDate: string;

  products = [];
  product = [];
  
  public form: FormGroup;

  @ViewChild('myselect') selectComponent: IonicSelectableComponent;//SelectSearchableComponent ;//IonicSelectableComponent;
  productsOrigin: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _FB: FormBuilder, public dataLoading:DataLoadingProvider,
    public toastcntrl:ToastController,private sqlite:SQLite) {

    
    this.cDate = HomePage.getDate();
     this.form = this._FB.group({
  
      date: [this.cDate],
      
      products: this._FB.array([
        this.initProductFields()
      ])
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutStockPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AjoutStockPage');
    /*if(ProductsPage.products.length == 0 || ProductsPage.products_modified){
      ProductsPage.getData(ProductsPage.products,this.sqlite,this.toastcntrl)
      
  } 
    //if(ProductsPage.products.length == 0){
       var context = this;
    var code = setInterval(function(){
      console.log("ProductsPage.products.length test " + ProductsPage.products.length);
      console.dir(context.products);
      if(ProductsPage.products.length){
        context.productsOrigin = context.product2ProductOrder(ProductsPage.products);
        clearInterval(code);
        console.dir("productsOrigin");
        console.dir(context.productsOrigin);
        context.remplireProducts();
      }
    },400
    );
    
    setTimeout(function(){
      clearInterval(code);
      
    },3500); */
 // }

  }

  multiplyNumber(i) {
    this.product[i].NUM *= this.product[i].PACK;
  }

  ionViewDidEnter() {
    if(this.dataLoading.products.length){
      this.productsOrigin = this.product2ProductOrder(this.dataLoading.products);
      //clearInterval(code);
      console.dir("productsOrigin");
      console.dir(this.productsOrigin);
      this.remplireProducts();
    }
  
  }

  product2ProductOrder(products) {

    let productOrders = [];
    for (let i = 0; i < products.length; i++) {

      productOrders = productOrders.concat(new ProductOrder(products[i].ID, products[i].NAME, products[i].WEIGHT, products[i].UNIT,
        products[i].PRICE,products[i].STOCK,products[i].PACK));

    }
    return productOrders;

  }

  saveDate() {

    this.sqlite.create({
      name: 'livri.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let id_stck;
      db.executeSql('INSERT INTO stock VALUES(NULL,?)', [
        this.form.value.date/* ,
        this.client.ID,
        this.form.value.remarque,
        this.form.value.total,
        this.form.value.montant */
      ])
        .then((res) => {                               //add res
         console.log("insert into stock");
         console.log(this.form.value.date);
           db.executeSql('select last_insert_rowid();',[])
          .then((res) => {
            
            id_stck = res.rows.item(0)["last_insert_rowid()"]; 

            for (let i =0; i<this.product.length ; i++){
              if(id_stck){
                console.dir(this.product[i]);
              db.executeSql('INSERT INTO product_stock VALUES(?,?,?,?)', [
                this.product[i].NUM,
                id_stck,
                this.product[i].ID,
                this.product[i].PRICE
                
              ]).then(res => {
                console.log("success to add to product_stock");
                
                db.executeSql('update products set stock = stock + ? where id_prd = ?', [parseInt(this.product[i].NUM) ,
                this.product[i].ID])
                .then(() => {
                  console.log("product update");
                  console.log("this.product[i].STOCK");
                  console.log(this.product[i].STOCK);
                  this.product[i].STOCK += this.product[i].NUM;
                  console.log("this.product[i].STOCK");
                  console.log(this.product[i].STOCK);
                  StockPage.stockModified = true;
                  //ProductsPage.products_modified = true;
                  this.dataLoading.getProducts();
                  
                  this.navCtrl.pop();
                }).catch((e) => console.log("problem to update product"))
              })
              .catch(e=> {
                console.dir("problem of insert in product_stck");
                console.dir(e);
              });
            }else{
              console.dir("probleme pour recuperer id_stck");
            }
            }
          }).catch(e => {
            console.dir("problem while executing select last_insert_rowid();");
            console.dir(e);
          });
         
        }) 
        .catch(e => { console.log("problem to insert in stock");
        console.dir(e);
        });
    }).catch(e => {
      console.log("problem with db");
          console.log(e);
      
    });
   

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
      this.products.push(this.product[i])
    }

    this.product.splice(i, 1);
    this.remplireProducts();

  }

  productSelection(event: { component: IonicSelectableComponent, value: any }) {//SelectSearchableComponent

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

  changeDate() {
    this.chDate = !this.chDate;
    if (this.textChangeDate == "changer") {
      this.textChangeDate = "Aujourd'hui"
    } else {
      this.textChangeDate = "changer"
    }
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
