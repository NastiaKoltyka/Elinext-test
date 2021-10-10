import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../classes/user';
import { DeleteSuccess } from '../classes/delete-success';
import { AuthService } from './auth.sevice';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  host: string = 'http://127.0.0.1:3000/api/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.host}/users`);
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.host}/users/${userId}`);
  }
  deleteUser(userId: number): Observable<DeleteSuccess> {
    return this.http.delete<DeleteSuccess>(`${this.host}/users/${userId}`);
  }
  createUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.host}/users/`, user);
  }
  updateUser(userId: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.host}/users/${userId}`, user);
  }
}


