import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ClientsPage } from '../client-pages/clients/clients';
import { ProductsPage } from '../product-pages/products/products';
import { StockPage } from '../stock-pages/stock/stock';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClientsPage;
  tab3Root = ProductsPage;
  tab4Root = StockPage;

  constructor() {

  }
}
