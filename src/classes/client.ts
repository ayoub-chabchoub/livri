import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


export class Client{
 

    constructor(private id:number,private name:string,private address?:string, private ville?:string, private telephone?:string,
         private credit?:number,private livraisons?,public sqlite?:SQLite){

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

    get CREDIT():number{
        return this.credit;
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
        this.credit = data.credit || 0;

        this.sqlite.create({
            name: 'livri.db',
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
          
        
        })
                .catch(e => {});
        }) .catch(e => {});

    }

    delete(){

        this.sqlite.create({
            name: 'livri.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {

                db.executeSql("PRAGMA foreign_keys = ON;", [])
          .then(() => {
            console.log("PRAGMA foreign_keys = ON;");
          db.executeSql('DELETE FROM clients WHERE id_clt=?', [this.id])
                .then(() =>{
                  
 
                } ) .catch(e => {});
            } ) .catch(e => {console.log("problemPRAGMA foreign_keys = ON;")}); 
          }) .catch(e => {});
        
        }

       
}
