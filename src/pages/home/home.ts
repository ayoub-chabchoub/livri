import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
//import { Constants } from '../../providers/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 /*  constructor(public navCtrl: NavController) {

  } */

   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Defines a FormGroup object for managing the template form
    */
   public form 			: FormGroup;

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
   }



   /**
    * Generates a FormGroup object with input field validation rules for
    * the technologies form object
    *
    * @public
    * @method initTechnologyFields
    * @return {FormGroup}
    */
   initTechnologyFields() : FormGroup
   {
      return this._FB.group({
         name 		: ['', Validators.required]
      });
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
      const control = <FormArray>this.form.controls.technologies;
      control.push(this.initTechnologyFields());
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
      const control = <FormArray>this.form.controls.technologies;
      control.removeAt(i);
   }



   /**
    * Receive the submitted form data
    *
    * @public
    * @method manage
    * @param val    {object}      The posted form data
    * @return {none}
    */
   manage(val : any) : void
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


}
