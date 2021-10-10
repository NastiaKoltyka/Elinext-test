import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.sevice';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authService.isLoggedIn()) {
        if (this.authService.user?.is_admin!=route.data.role) {
          console.log(this.authService.user);
          console.log(route.data);
          this.toastr.error(`You don't have sufficient access rights to access this page `, 'Error!');
          return false;
        }
        return true;
      }
      else{
        return false
      }
    }
}
