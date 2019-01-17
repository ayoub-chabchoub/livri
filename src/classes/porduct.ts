class Product{


    constructor(private id , private name,private weight?:number, private unit?:string){

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


}