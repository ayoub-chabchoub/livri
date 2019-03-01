import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CleanPage } from './clean';

@NgModule({
  declarations: [
    CleanPage,
  ],
  imports: [
    IonicPageModule.forChild(CleanPage),
  ],
})
export class CleanPageModule {}
