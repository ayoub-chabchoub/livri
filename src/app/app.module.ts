import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ClientsPage } from '../pages/client-pages/clients/clients';

//import {SelectSearchableModule} from 'ionic-select-searchable';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { EtatVentePage } from '../pages/home-pages/etat-vente/etat-vente';
import { CleanPage } from '../pages/home-pages/clean/clean';
import { EtatStockPage } from '../pages/stock-pages/etat-stock/etat-stock';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SQLite} from '@ionic-native/sqlite';
import { ProductsPage } from '../pages/product-pages/products/products';
import { FavoriteProvider } from '../providers/favorite/favorite';


//import { File } from '@ionic-native/file';
import { ImportPage } from '../pages/home-pages/import/import';


import {PapaParseModule} from 'ngx-papaparse';
import {File} from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { IonicSelectableModule } from 'ionic-selectable';
import { StockPage } from '../pages/stock-pages/stock/stock';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ClientsPage,
    ProductsPage,
    StockPage,
    EtatVentePage,
    CleanPage,
    ImportPage,
    //EtatStockPage
  ],
  imports: [
    BrowserModule,
    
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    //SelectSearchableModule,
    IonicSelectableModule,
    PapaParseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ClientsPage,
    ProductsPage,
    StockPage,
    EtatVentePage,
    CleanPage,
    ImportPage,
    //EtatStockPage

  ],
  providers: [
    CallNumber,
    SQLite,
    StatusBar,
    SplashScreen,
   // File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FavoriteProvider,
    FileChooser,
    FilePath,
    File,
    SocialSharing,
    AuthProvider
    
  ]
})
export class AppModule {}
