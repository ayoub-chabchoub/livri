import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ClientsPage } from '../pages/client-pages/clients/clients';
import { EditClientPage } from '../pages/client-pages/edit-client/edit-client';
import { AddClientPage } from '../pages/client-pages/add-client/add-client';
import { ClientDisplayPage } from '../pages/client-pages/client-display/client-display';
import {SelectSearchableModule} from 'ionic-select-searchable';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SQLite} from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ProductsPage } from '../pages/product-pages/products/products';
import { EditProductPage } from '../pages/product-pages/edit-product/edit-product';
import { AddProductPage } from '../pages/product-pages/add-product/add-product';
import { ProductDisplayPage } from '../pages/product-pages/product-display/product-display';
import { AddLivraisonPage } from '../pages/livraison/add-livraison/add-livraison';
import { EditLivraisonPage } from '../pages/edit-livraison/edit-livraison';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { LivraisonDisplayPage } from '../pages/livraison/livraison-display/livraison-display';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AddLivraisonPage,
    HomePage,
    TabsPage,
    ClientsPage,
    EditClientPage,
    AddClientPage,
    ClientDisplayPage,
    ProductsPage,
    EditProductPage,
    AddProductPage,
    ProductDisplayPage,
    EditLivraisonPage,
    LivraisonDisplayPage,
  ],
  imports: [
    BrowserModule,
    
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AddLivraisonPage,
    HomePage,
    TabsPage,
    ClientsPage,
    EditClientPage,
    AddClientPage,
    ClientDisplayPage,
    ProductsPage,
    EditProductPage,
    AddProductPage,
    ProductDisplayPage,
    EditLivraisonPage,
    LivraisonDisplayPage
  ],
  providers: [
    CallNumber,
    Toast,
    SQLite,
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FavoriteProvider
    
  ]
})
export class AppModule {}
