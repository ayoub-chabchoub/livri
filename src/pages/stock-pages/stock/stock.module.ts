
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockPage } from './stock';


@NgModule({
  declarations: [
    //StockPage,
    /* AjoutStockPage,
    StockDisplayPage,
    StatStockPage, */
    //EtatStockPage
  ],
  imports: [
    IonicPageModule.forChild(StockPage),
    //IonicSelectableModule
  ],entryComponents: [
    /* AjoutStockPage,
    StockDisplayPage,
    StatStockPage, */
    //EtatStockPage
  ]
})
export class StockPageModule {}
