
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

export class Product{


    constructor(private id , private name,private weight?:number, private unit?:string,public price?:number,public sqlite?:SQLite,public toast?:Toast){

    }

    get ID(){
        return this.id
    }

    get NAME(){
        return this.name
    }

    get WEIGHT(){
        return this.weight
    }

    get UNIT(){
        return this.unit
    }

    public get PRICE(){
      return this.price
  }

    update(data: any): any {
        this.name = data.name;
        this.weight = data.weight;
        this.unit = data.unit;
        this.price = data.price;


        /* this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })  .then((db: SQLiteObject) => {
        db.executeSql('UPDATE products set name=?,weight=?,unit=?,price=? WHERE id_prd=?', [
          data.name,
          data.weight,
          data.unit ,
          data.price ,
          this.id,
        ])
        .then((res) => {
          console.log('Executed SQL insert');
          this.toast.show('Done data updated!','4000','center').subscribe(
    /*         toast => {
              data1[this.index] = data; 
              this.navCtrl.pop();
    } *//*
          );
        
        })
                .catch(e => console.log(e));
        }) .catch(e => console.log(e)); */

    }

    delete(){

        this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
          db.executeSql('DELETE FROM products WHERE id_prd=?', [this.id])
                .then(() =>{
                  console.log('Executed SQL delete');
        
/*                   this.toast.show('Done data Deleted!','5000','center').subscribe(
                         toast => {
                           this.getData();
                         } 
                       ); */
        
        
                } ) .catch(e => console.log(e));
          }) .catch(e => console.log(e));
        
        }



}