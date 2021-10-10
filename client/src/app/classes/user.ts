export class User {
    id:number;
    name:string;
    email:string;
    password:string;
    phone:string;
    date_of_birth:string;
    education:string[];
    is_admin:boolean;

    

    constructor(name: string, email: string, password: string) {
        this.id = 0;
        this.email=email;
        this.name = name;
        this.password=password;
        this.phone='';
        this.date_of_birth='';
        this.education=[];
        this.is_admin=false;
    }
}