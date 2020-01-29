import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsPage } from './clients';

@NgModule({
  declarations: [
    //ClientsPage,
   /*  ClientStatPage,
    EditClientPage,
    ClientDisplayPage,
    AddClientPage, */
  ],
  imports: [
    IonicPageModule.forChild(ClientsPage),
  ],entryComponents: [
    /* ClientStatPage,
    EditClientPage,
    ClientDisplayPage,
    AddClientPage, */
  ]
})
export class ClientsPageModule {}
