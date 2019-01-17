import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDisplayPage } from './client-display';

@NgModule({
  declarations: [
    ClientDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientDisplayPage),
  ],
})
export class ClientDisplayPageModule {}
