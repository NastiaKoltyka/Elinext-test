import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../core/http.sevice';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


import { User } from '../classes/user';
import { AuthService} from '../core/auth.sevice';

@Component({
  selector: 'app-datails-page',
  templateUrl: './datails-page.component.html',
  styleUrls: ['./datails-page.component.sass'],
  providers: [HttpService]
})
export class DatailsPageComponent implements OnInit {
  id: number;
  user:User;
  private routeSubscription: Subscription;
  constructor(public authService: AuthService, private httpService: HttpService, private route: ActivatedRoute,  private toastr: ToastrService, private router: Router) { 
    this.id = 0
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.user = new User('','','', [], '', []);
  }

  ngOnInit(): void {
    this.httpService.getUser(this.id).subscribe((data: User) => {
      this.user = data;
      this.toastr.success(`User details loaded`, 'Success!');
    }, error => {
      this.toastr.error(error.message, 'Error!');
    });
  }
  deleteUser(){
    this.httpService.deleteUser(this.id).subscribe(() => {
      this.router.navigate(['/users-list']);
      this.toastr.success(`User deleted`, 'Success!');

    }, error => {
      this.toastr.error(error.message, 'Error!');
    });
  }
  editUser(){
    this.router.navigate(['/user-edit', this.id]);
  }
  back(){
    this.router.navigate(['/users-list']);
  }

}
