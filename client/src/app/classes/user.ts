export class User {
    id:number;
    name:string;
    email:string;
    password:string;
    phones:string[];
    date_of_birth:string;
    education:string[];
    is_admin:boolean;

    

    constructor(name: string, email: string, password: string,phones:string[],date_of_birth:string,education:string[]) {
        this.id = 0;
        this.email=email;
        this.name = name;
        this.password=password;
        this.phones=phones;
        this.date_of_birth=date_of_birth;
        this.education=education;
        this.is_admin=false;
    }
}