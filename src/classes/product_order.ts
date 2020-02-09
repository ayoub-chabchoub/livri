import { Product } from "./product";
import { SQLite } from "@ionic-native/sqlite";

export class ProductOrder extends Product{

    constructor(id , name,weight?:number,unit?:string,price?:number,stock?:number,pack?:number,private num?:number,
         private totalPrice?:number,sqlite?:SQLite){
        super(id,name,weight,unit,price,stock,pack,sqlite);
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
    get NUM():number{
        return this.num;
    }

    get PACK(): number {
        return this.pack;
      }
    
    set PACK(pack: number) {
    this.pack = pack;
    }

    get PRICE(){
        return this.price;
    }

    set PRICE(price:number) {
        this.price = price;
        if (this.price && this.num) {
            this.totalPrice = this.num * this.price;
        } else {
            this.totalPrice = 0;
        }
    }
}