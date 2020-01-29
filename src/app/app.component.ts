import { AuthProvider } from './../providers/auth/auth';
import { LoginPage } from './../pages/login/login';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;
  password = "Livri"
  static PASS_KEY = "pass";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage:Storage,private authProvider:AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.storage.get(MyApp.PASS_KEY)
      .then(password => {
        if (authProvider.matchPassword(password)) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      })
      .catch(err => {
        console.dir(err);
        this.rootPage = LoginPage;
      })
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
