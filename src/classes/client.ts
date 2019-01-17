export class Client{

    constructor(private id:number,private name:string,private address?:string, private ville?:string, private telephone?:string,
         private credit?:number){

            
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
}