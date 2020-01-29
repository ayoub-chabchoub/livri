import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EtatStockPage } from './etat-stock';

@NgModule({
  declarations: [
    EtatStockPage,
  ],
  imports: [
    IonicPageModule.forChild(EtatStockPage),
  ],exports: [
    EtatStockPage
  ]
})
export class EtatStockPageModule {}
