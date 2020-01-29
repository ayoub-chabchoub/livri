import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivraisonDisplayPage } from './livraison-display';

@NgModule({
  declarations: [
    LivraisonDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(LivraisonDisplayPage),
  ],exports: [
    LivraisonDisplayPage
  ]
})
export class LivraisonDisplayPageModule {}
