import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ClientsPage } from '../pages/client-pages/clients/clients';
import { EditClientPage } from '../pages/client-pages/edit-client/edit-client';
import { AddClientPage } from '../pages/client-pages/add-client/add-client';
import { ClientDisplayPage } from '../pages/client-pages/client-display/client-display';
import {SelectSearchableModule} from 'ionic-select-searchable';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { EtatVentePage } from '../pages/home-pages/etat-vente/etat-vente';
import { CleanPage } from '../pages/home-pages/clean/clean';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SQLite} from '@ionic-native/sqlite';
import { ProductsPage } from '../pages/product-pages/products/products';
import { EditProductPage } from '../pages/product-pages/edit-product/edit-product';
import { AddProductPage } from '../pages/product-pages/add-product/add-product';
import { ProductDisplayPage } from '../pages/product-pages/product-display/product-display';
import { AddLivraisonPage } from '../pages/livraison/add-livraison/add-livraison';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { LivraisonDisplayPage } from '../pages/livraison/livraison-display/livraison-display';
import {StockPage} from '../pages/stock-pages/stock/stock';
import {AjoutStockPage} from '../pages/stock-pages/ajout-stock/ajout-stock';
import {StockDisplayPage} from '../pages/stock-pages/stock-display/stock-display';

@NgModule({
  declarations: [
    MyApp,
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
    LivraisonDisplayPage,
    StockPage,
    AjoutStockPage,
    StockDisplayPage,
    EtatVentePage,
    CleanPage
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
    LivraisonDisplayPage,
    StockPage,
    AjoutStockPage,
    StockDisplayPage,
    EtatVentePage,
    CleanPage
  ],
  providers: [
    CallNumber,
    SQLite,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FavoriteProvider
    
  ]
})
export class AppModule {}
