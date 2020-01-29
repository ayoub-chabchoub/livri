import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutStockPage } from './ajout-stock';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AjoutStockPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutStockPage),
    IonicSelectableModule
  ],exports: [
    AjoutStockPage
  ]
})
export class AjoutStockPageModule {}
