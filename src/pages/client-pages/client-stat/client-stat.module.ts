import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientStatPage } from './client-stat';

@NgModule({
  declarations: [
    ClientStatPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientStatPage),
  ],exports:[
    ClientStatPage
  ]
})
export class ClientStatPageModule {}
