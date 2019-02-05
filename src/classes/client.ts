
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

export class Client{
 

    constructor(private id:number,private name:string,private address?:string, private ville?:string, private telephone?:string,
         private credit?:number,private livraisons?,public sqlite?:SQLite,public toast?:Toast){

            //livraisons = [];
            
    }

    get ID(){
        return this.id;
    }

    get NAME(){
        return this.name;
    }

    get ADDRESS(){
        return this.address
    }

    get VILLE(){
        return this.ville
    }

    get TELEPHONE(){
        return this.telephone
    }

    get CREDIT(){
        return this.credit
    }

    get LIVRAISONS(){
        return this.livraisons;
    }

    set LIVRAISON(livraison){
        this.livraisons = this.livraisons.concat(livraison);
    }

    set CREDIT(credit:number){
        this.credit = credit;
        this.update({ name:this.name,
            address: this.address,
            ville : this.ville,
            telephone :this.telephone,
            credit : this.credit
        })
    }

    clearLivraisons(){
        this.livraisons = [];
    }

    update(data: any): any {
        this.name = data.name;
        this.address = data.address;
        this.ville = data.ville;
        this.telephone = data.telephone;
        this.credit = data.credit;

        this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })  .then((db: SQLiteObject) => {
        db.executeSql('UPDATE clients set name=?,address=?,ville=?,telephone=?, credit=? WHERE id_clt=?', [
          data.name,
          data.address,
          data.ville ,
          data.telephone ,
          data.credit ,
          this.id,
        ])
        .then((res) => {
          console.log('Executed SQL update');
        /*  this.toast.show('Done data updated!','4000','center').subscribe(
             toast => {
              data1[this.index] = data; 
              this.navCtrl.pop();
            } 
          );*/
        
        })
                .catch(e => console.log(e));
        }) .catch(e => console.log(e));

    }

    delete(){

        this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
          db.executeSql('DELETE FROM clients WHERE id_clt=?', [this.id])
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
