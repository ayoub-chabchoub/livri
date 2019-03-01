import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutStockPage } from './ajout-stock';

@NgModule({
  declarations: [
    AjoutStockPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutStockPage),
  ],
})
export class AjoutStockPageModule {}
