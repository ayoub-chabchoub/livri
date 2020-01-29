import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDisplayPage } from './client-display';

@NgModule({
  declarations: [
    ClientDisplayPage,
    /* AddLivraisonPage,
    LivraisonDisplayPage, */
  ],
  imports: [
    IonicPageModule.forChild(ClientDisplayPage),
    //IonicSelectableModule
  ],exports: [
    /* AddLivraisonPage,
    LivraisonDisplayPage, */
    ClientDisplayPage
  ]
})
export class ClientDisplayPageModule {}
