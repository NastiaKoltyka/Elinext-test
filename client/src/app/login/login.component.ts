import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { Credentials} from '../classes/credentials';
import { AuthService } from '../core/auth.sevice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginUser: Credentials;
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { 
    this.loginUser = new Credentials('', '')
  }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.loginUser.email = form.value.login;
    this.loginUser.password = form.value.password;
    this.authService.loginUser(this.loginUser)
      .then(() => {
        this.router.navigate(['/users-list']);
      })
      .catch(error => {
        this.toastr.error(error.message, 'Error!');
      });
  }

}
