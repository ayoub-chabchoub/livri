import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockDisplayPage } from './stock-display';

@NgModule({
  declarations: [
    StockDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(StockDisplayPage),
  ],exports: [
    StockDisplayPage
  ]
})
export class StockDisplayPageModule {}
