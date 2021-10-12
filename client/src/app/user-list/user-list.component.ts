import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { HttpService } from '../core/http.sevice';
import { User } from '../classes/user';
import { AuthService } from '../core/auth.sevice';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
  providers: [HttpService]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  language:string;
  constructor(private httpService: HttpService, private translate: TranslateService, private toastr: ToastrService, public authService: AuthService, private router: Router) {
    this.refreshUsers();
    this.language="";
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
    this.language=this.translate.getDefaultLang()
    console.log(this.language)
      this.router.navigate([`/user-create/${this.language}` ]);
  }

}
