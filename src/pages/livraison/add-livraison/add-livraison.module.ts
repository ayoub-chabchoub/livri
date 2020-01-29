import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLivraisonPage } from './add-livraison';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddLivraisonPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLivraisonPage),
    IonicSelectableModule
  ],exports: [
    AddLivraisonPage
  ]
})
export class AddLivraisonPageModule {}
