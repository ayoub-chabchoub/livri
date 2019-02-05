import { Product } from "./product";
import { SQLite } from "@ionic-native/sqlite";
import { Toast } from '@ionic-native/toast';

export class ProductOrder extends Product{

    constructor(id , name,weight?:number,unit?:string,price?:number,private num?:number,private totalPrice?:number,sqlite?:SQLite,toast?:Toast){
        super(id,name,weight,unit,price,sqlite);
        if(!this.num){
            this.num = 0;
        }
        if (!this.price){
            this.price = 0;
        }
        this.totalPrice = this.num * this.price;
    }

    get TOTAL(){
        return this.totalPrice;
      }

    set NUM(num){
        this.num = num;
        if (this.price && this.num){
            this.totalPrice = this.num * this.price;
        }else{
            this.totalPrice = 0;
        }
    }
    get NUM(){
        return this.num;
    }
    get PRICE(){
        return this.price;
    }

    set PRICE(price:number){
        this.price = price;
        if (this.price && this.num){
            this.totalPrice = this.num * this.price;
        }else{
            this.totalPrice = 0;
        }

    }
   
}