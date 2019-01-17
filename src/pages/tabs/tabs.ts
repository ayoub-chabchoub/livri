import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { ClientsPage } from '../client-pages/clients/clients';
import { ProductsPage } from '../product-pages/products/products';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClientsPage;
  tab3Root = ProductsPage;

  constructor() {

  }
}
