import { MyApp } from './../../app/app.component';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  password = "";

  constructor( private storage:Storage) {
    console.log('Hello AuthProvider Provider');

    let l = 'l';
    let g = 'g';
    let zero = '0';
    let e = 'e';
    let d = 'd';
    let c = 'c';
    let deux = '2';
    let cinq = '5';
    let w = 'w';
    let A = 'A';
    let o = 'o';

    this.password = d + o + l + c + e + deux + zero + cinq + l + o + w + A + g + e;

  }

  matchPassword(password) {
    if (password === this.password) {
      this.storage.set(MyApp.PASS_KEY,this.password);
      return true;
    }
    return false;
  }

}
