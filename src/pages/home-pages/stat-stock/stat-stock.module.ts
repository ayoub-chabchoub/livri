import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatStockPage } from './stat-stock';

@NgModule({
  declarations: [
    StatStockPage,
  ],
  imports: [
    IonicPageModule.forChild(StatStockPage),
  ],exports: [
    StatStockPage
  ]
})
export class StatStockPageModule {}
