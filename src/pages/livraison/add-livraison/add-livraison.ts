import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Livraison } from '../../../classes/livraison';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { Product } from '../../../classes/product';
import { ProductOrder } from '../../../classes/product_order';
import { Client } from '../../../classes/client';
import * as globals from '../../../assets/Globals'
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

  data = {
    date:'' ,
    id_clt:0  ,
    remarque:''   ,
    montant :0 ,
    
  }
  textChangeDate = "changer"
  chDate = false;
  cDate:string;
  chTotal = false;

  product = [];
  products = [];
  productsOrigin =[];
  client:Client;
  //numbers = [];

  public form : FormGroup;
  
  @ViewChild('myselect') selectComponent:SelectSearchableComponent;
  

    constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,public toast:Toast,private _FB : FormBuilder,private toastcntrl:ToastController)
    {
      this.client = this.navParams.get("client");
      //this.products = [new ProductOrder(0,"ayoub",1,"KG",80),new ProductOrder(1,"ismail",1,"KG",60),new ProductOrder(2,"ala",1,"KG",300)];
      this.products = this.product2ProductOrder(globals.products);
      this.productsOrigin = this.copyArray(this.products);
     /*  this.product.splice(0,1);
      console.dir("products");
      console.dir(this.products); */
      
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      let smm,sdd;
      
      if (dd < 10) {
        sdd = '0' + dd;
      }
      else{sdd = dd}

      if (mm < 10) {
        smm = '0' + mm;
      }else{smm = mm}

      this.cDate = yyyy + '-' + smm + '-' + sdd;
       // Define the FormGroup object for the form
       // (with sub-FormGroup objects for handling
       // the dynamically generated form input fields)
       console.log(this.cDate);
       this.form = this._FB.group({
        
            
            remarque 		: [''],
            montant 		: [0, Validators.required],
            date: [this.cDate],
            total: [0],
          products     : this._FB.array([
             this.initProductFields()
          ])
       });
  
      }

      initProductFields() : FormGroup
      {
         return this._FB.group({
            name 		: ['', Validators.required],
            number:[0, Validators.required]
            
         });
      }

    ionViewDidLoad() {
      this.removeInputField(0);
      this.product = [];
      console.dir(this.product)
      console.log('ionViewDidLoad AddemployeePage');
      
      
    }

    ionViewDidEnter() {
      console.log("enter 2 add liv");
      let i =0;
      while (globals.products.length > this.productsOrigin.length){
        
        for (i=0 ; i<globals.products.length ; i++){
         
            if(!this.exist(globals.products[i],this.productsOrigin)){}
              this.productsOrigin = this.productsOrigin.concat(this.product2ProductOrder([ globals.products[i] ]));
              this.products = this.products.concat(this.product2ProductOrder([ globals.products[i] ]));
              console.log("ajout de :")
              console.dir(globals.products[i]);
              break ;
          
        }
      }
    
    }
  exist(arg0: any, productsOrigin: any[]): any {
    
    for (let i =0 ;i<productsOrigin.length ;i++){
      if (arg0.ID == productsOrigin[i].ID){
        return true;
      }
    }
    return false;
  }
 


    product2ProductOrder(products){
      
      let productOrders = [];
      for (let i = 0;i < products.length ; i++){

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


   addNewInputField() : void
   {
     if(this.product.length == 0 || this.product[this.product.length -1]){
      const control = <FormArray>this.form.controls.products;
      control.push(this.initProductFields());
      //this.product.splice(0,1);
      }else{
        let toast = this.toastcntrl.create({
          message:'remplir le dernier produit',
          duration:2000
        });
        toast.present();
        console.dir("remplir le dernier produit");

      }

   }

   getTotalPrice(){
     console.log('array '+this.product.length);
    console.dir(this.product);
     let total = 0;
    for(let j =0;j<this.product.length;j++){
      if(this.product[j]){
        total += this.product[j].TOTAL;
      }
    }
    this.form.value.total = total;
    return total;
   }

   changeDate(){
     this.chDate = !this.chDate;
     if(this.textChangeDate =="changer"){
      this.textChangeDate ="Aujourd'hui"
     }else{
      this.textChangeDate ="changer"
     }
   }

  changerTotal(){
    this.chTotal =!this.chTotal;
  }



   /**
    * Programmatically removes a recently generated technology input field
    *
    * @public
    * @method removeInputField
    * @param i    {number}      The position of the object in the array that needs to removed
    * @return {none}
    */
   removeInputField(i : number) : void
   {
      const control = <FormArray>this.form.controls.products;
      control.removeAt(i);
      if(this.product[i]){
      this.product[i].NUM = 0;
      this.products.push(this.product[i])
      }
      
      this.product.splice(i, 1);
      
   }
  
   copyArray(data){
    let tmp = [];
    for(let i=0;i<data.length;i++){
      tmp.push(data[i]);
    }
    return tmp;

  }
  
  
    saveDate(){
  
       /* this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO clients VALUES(NULL,? ,?,?,?,?)', [
            this.data.name,
            this.data.address,
            this.data.ville ,
            this.data.telephone ,
            this.data.credit
          ])
          .then((res) => {                               //add res
            console.log('Executed SQL insert');
            this.toast.show('Done data inserted!','4000','center').subscribe(
              toast => {
                this.navCtrl.pop();
              }
            );

          })
                  .catch(e => {
                    this.toast.show('Done data inserted!','4000','center').subscribe(
                      toast => {
                        console.log(e);
                      }
                    );
                  });
        }) .catch(e => {
          this.toast.show('Done data inserted!','4000','center').subscribe(
            toast => {
              console.log(e);
            }
          );
        }); 
        this.navParams.get("home").refresh();
        
        /*  this.navParams.get("home").data.push(new Client(0, this.data.name,
          this.data.address,
          this.data.ville ,
          this.data.telephone ,
          this.data.credit,this.sqlite,this.toast));
  *//*
        
        this.navCtrl.pop(); */
          //add to database
          this.client.LIVRAISON = new Livraison(0,this.form.value.date,this.client.ID,this.product,
              this.form.value.remarque, this.form.value.total, this.form.value.montant,this.sqlite,this.toast);
          
          console.dir("resultat finale");
          console.dir(this.client);
          console.dir(this.form.value);
          this.client.CREDIT += (this.form.value.total - this.form.value.montant);
          this.navCtrl.pop();

        }

        findMissing(array,array1){
          for(let i = 0 ;i<array.length ;i++){
            if(array1.indexOf(array[i]) == -1){
              return array[i];
            }
          }


        }

        productSelection(event :{component: SelectSearchableComponent,value:any}){
          //
          console.log('event',event);
          console.dir('form.value',this.form.value);

          //console.dir(this.product);
          this.products.splice(this.products.indexOf(event.value));
          if ((this.product.length + this.products.length)!=this.productsOrigin.length){
            this.products.push(this.findMissing(this.productsOrigin,this.product.concat(this.products)));
          }

        }

        onClose(){ 
          let toast = this.toastcntrl.create({
            message:'thanks',
            duration:2000
          });
          toast.present();
          //console.dir(this.product);
        } 

        openFromCode(){
          
          this.selectComponent.open();

        }

}
