import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { HttpService } from '../core/http.sevice';
import { User } from '../classes/user';
import { AuthService } from '../core/auth.sevice';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
  providers: [HttpService]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private httpService: HttpService, private toastr: ToastrService, public authService: AuthService, private router: Router) {
    this.refreshUsers()
   }

  ngOnInit(): void {
  }
  refreshUsers(): void {
    this.httpService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      this.toastr.success(`Users loaded`, 'Success!');

    }, error => {
      this.toastr.error(error.message, 'Error!');
    });
  }
  createUser(){
    this.router.navigate(['/user-create']);
  }

}
