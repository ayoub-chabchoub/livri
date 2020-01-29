import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';

@NgModule({
  declarations: [
    //ProductsPage,
    /* EditProductPage,
    AddProductPage,
    ProductDisplayPage, */
  ],
  imports: [
    IonicPageModule.forChild(ProductsPage),
  ],entryComponents: [
   /*  EditProductPage,
    AddProductPage,
    ProductDisplayPage, */
  ]
})
export class ProductsPageModule {}
