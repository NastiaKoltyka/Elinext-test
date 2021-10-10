import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../classes/credentials';
import { User } from '../classes/user';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private host: string = 'http://127.0.0.1:3000/api/auth';
    user: User|undefined;
    constructor(private http: HttpClient) {
        if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user') as string);
        }
    }

    loginUser(user: Credentials): Promise<void> {
        return this.http.post(`${this.host}/login`, user)
            .toPromise()
            .then((data: any) => {
                this.user=data;
                localStorage.setItem('user', JSON.stringify(data));
            });
    }
    isLoggedIn() {
        return this.user!==undefined;
    }
    logOut() {
        this.user=undefined;
        localStorage.removeItem('user');
    }
}


