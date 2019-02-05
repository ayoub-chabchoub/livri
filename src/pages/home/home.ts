import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  date = HomePage.getDate();
  credit:number =0;
  constructor(public navCtrl: NavController,private sqlite:SQLite, private storage: Storage, private toastcntrl:ToastController) {

    this.storage.get("isDbHere")
      .then((data) => {
        this.showMessage(data);
        if (data === null) {
          this.createDB();  
          this.showMessage("data null");   
        }
      });

  }

  ionViewDidLoad(){
  
 }

   ionViewDidEnter(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    
         db.executeSql('select sum(credit) from clients;',[])
          .then((res) => {
            console.log('select sum successful');
            this.credit = res.rows.item(0)['sum(credit)'];
            console.dir(res.rows.item(0));
            }
          ) 
        .catch(e => {
          console.log('select sum failed')
        });
    }).catch(e => {
      
          console.log(e);
          console.log('database cannot be opened');
      
    });

  } 

  static getDate(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let smm, sdd;

    if (dd < 10) {
      sdd = '0' + dd;
    }
    else { sdd = dd }

    if (mm < 10) {
      smm = '0' + mm;
    } else { smm = mm }

    return yyyy + '-' + smm + '-' + sdd;
  }

  private createDB() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS clients(id_clt INTEGER PRIMARY KEY,name TEXT,address TEXT, ville TEXT, telephone Text , credit FLOAT)'
        , []).then(() => {
          this.showMessage('Executed SQL 1');
          db.executeSql('CREATE TABLE IF NOT EXISTS livraisons(id_liv INTEGER PRIMARY KEY,date TEXT,id_clt INTEGER, ' +
            'remarque text ,prix_total FLOAT , montant FLOAT, CONSTRAINT fk_column' +
            ' FOREIGN KEY (id_clt) REFERENCES clients (id_clt) on delete cascade);'
            , []).then(() => {
              this.showMessage('Executed SQL 2',4000);
              db.executeSql('CREATE TABLE IF NOT EXISTS products(id_prd INTEGER PRIMARY KEY,name TEXT,weight FLOAT, unit TEXT ,price FLOAT);'
                , []).then(() => {this.showMessage('Executed SQL 3',6000);
                
                db.executeSql('CREATE TABLE IF NOT EXISTS productLiv(id_prd INTEGER, id_liv INTEGER,name TEXT , price FLOAT , number INTEGER, '+
                'PRIMARY KEY (id_prd,id_liv) , '+
                'foreign key (id_prd) references products (id_prd),foreign key (id_liv) references livraisons (id_liv) on delete cascade);'
                , []).then(() => {this.showMessage('Executed SQL 4',8000);
                this.storage.set("isDbHere","true");
              }).catch(e => this.showMessage("problem sql 4 " + e));
                
             }).catch(e => this.showMessage("problem sql 3 " + e));
            }).catch(e => this.showMessage("problem sql 2 " + e));
        })
        .catch(e => this.showMessage("problem sql 1 " + e));
    })
      .catch(e => this.showMessage(e));

  }

  showMessage(msg,dur =2000){
    let toast = this.toastcntrl.create({
      message:msg,
      duration:dur
    });
    toast.present();
  }

   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Defines a FormGroup object for managing the template form
    */
   public form 			: FormGroup;
 /*
  ////last add
  titleText: string = "";
  searchText: string = "";
  items: any[];
  filterItems: any[];
  selectedItems: any[] = [];
  displayOk: any = false;

   constructor(public navCtrl 		: NavController,
               public navParams 	: NavParams,
               private _FB          : FormBuilder, 
               public viewCtrl: ViewController)
   {

      // Define the FormGroup object for the form
      // (with sub-FormGroup objects for handling
      // the dynamically generated form input fields)
      this.form = this._FB.group({
         name       	  : ['', Validators.required],
         technologies     : this._FB.array([
            this.initTechnologyFields()
         ])
      });

      /////last add
      
         this.items = this.navParams.get("data");
         this.titleText = this.navParams.get("titleText");
         this.FilterItems();
   }*/



   /**
    * Generates a FormGroup object with input field validation rules for
    * the technologies form object
    *
    * @public
    * @method initTechnologyFields
    * @return {FormGroup}
    */
 /*   initTechnologyFields() : FormGroup
   {
      return this._FB.group({
         name 		: ['', Validators.required]
      });
   } */



   /**
    * Programmatically generates a new technology input field
    *
    * @public
    * @method addNewInputField
    * @return {none}
    */
 /*   addNewInputField() : void
   {
      const control = <FormArray>this.form.controls.technologies;
      control.push(this.initTechnologyFields());
   } */



   /**
    * Programmatically removes a recently generated technology input field
    *
    * @public
    * @method removeInputField
    * @param i    {number}      The position of the object in the array that needs to removed
    * @return {none}
    */
 /*   removeInputField(i : number) : void
   {
      const control = <FormArray>this.form.controls.technologies;
      control.removeAt(i);
   } */



   /**
    * Receive the submitted form data
    *
    * @public
    * @method manage
    * @param val    {object}      The posted form data
    * @return {none}
    */
  /* manage(val : any) : void
   {
      console.dir(val);
   }

   ///////////last add


   FilterItems() {
      this.filterItems = this.items;
      if (this.searchText.trim() !== '') {
        this.filterItems = this.filterItems.filter((item) => {
          return (item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
        });
      }
    }
  
    CheckChange(item: any) {
      for (let index = 0; index < this.filterItems.length; index++) {
        const element = this.filterItems[index];
        if (element.key == item.key) {
          this.filterItems[index].selected = true;
          this.selectedItems = element;
        }
        else {
          this.filterItems[index].selected = false;
        }
      }
    }
  
    CloseModel() {
      this.viewCtrl.dismiss(this.selectedItems);
    }

*/
}
