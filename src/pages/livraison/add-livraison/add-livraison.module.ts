import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLivraisonPage } from './add-livraison';

@NgModule({
  declarations: [
    AddLivraisonPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLivraisonPage),
  ],
})
export class AddLivraisonPageModule {}
