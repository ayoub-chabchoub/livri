//import { File } from '@ionic-native/file';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CleanPage } from './clean';
//import { ImportPage } from '../import/import';

/* 
import {PapaParseModule} from 'ngx-papaparse';
import {File} from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx' */

@NgModule({
  declarations: [
    //CleanPage,
    //ImportPage
  ],
  imports: [
    IonicPageModule.forChild(CleanPage),
  ],entryComponents: [
    //CleanPage
    //ImportPage 
  ]/* ,providers: [
    PapaParseModule,
    File,
    SocialSharing

  ] */
})
export class CleanPageModule {}
