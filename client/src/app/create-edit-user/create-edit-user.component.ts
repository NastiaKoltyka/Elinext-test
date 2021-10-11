import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { User } from '../classes/user';
import { AuthService } from '../core/auth.sevice';
import { HttpService } from '../core/http.sevice';
@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.sass']
})
export class CreateEditUserComponent implements OnInit {
  myForm!: FormGroup;
  id: number;
  user: User = new User('','','', [], '', []);
  private routeSubscription: Subscription;
  constructor(private router: Router, public authService: AuthService, private httpService: HttpService, private route: ActivatedRoute, private toastr: ToastrService,private location: Location) {
    this.id = 0
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.myForm = new FormGroup({
      "userName": new FormControl('', Validators.required),
      "userEmail": new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      "userPassword": new FormControl('', Validators.pattern("[0-9]{10}")),
      "phones": new FormArray([new FormControl('', Validators.pattern("[0-9]{10}"))]),
      "date": new FormControl('', Validators.pattern("[0-9]{10}")),
      "education": new FormControl('', Validators.pattern("[0-9]{10}")),
    });

    if (this.router.url !== '/user-create') {
      this.httpService.getUser(this.id).subscribe((data: User) => {
        this.user = data;
        let phonesArr = <FormArray>this.myForm.controls["phones"];
        while(phonesArr.length < this.user.phones.length) {
          phonesArr.push(new FormControl('', Validators.pattern("[0-9]{10}")));
        }
          this.myForm.patchValue({
          userName: this.user.name,
          userEmail: this.user.email,
          userPassword: this.user.password,
          phones: this.user.phones,
          date: this.user.date_of_birth,
          education: this.user.education,
        });
        this.toastr.success(`User details loaded`, 'Success!');

      }, error => {
        this.toastr.error(error.message, 'Error!');
      });
    }

  }
  submit() {
    console.log(this.myForm.value);

    if (this.router.url == '/user-create') {
      let user: User = new User(this.myForm.value.userName,this.myForm.value.userEmail,this.myForm.value.userPassword,this.myForm.value.phones,this.myForm.value.date,this.myForm.value.education );
      this.httpService.createUser(user).subscribe(() => {
        this.toastr.success('User added successfully', 'Success!');
        this.router.navigate(['/users-list']);
      },
        error => {
          this.toastr.error(error.message, 'Error!');
        });
    }
    else {
      let user: User = new User(this.myForm.value.userName,this.myForm.value.userEmail,this.myForm.value.userPassword,this.myForm.value.phones,this.myForm.value.date,this.myForm.value.education );
      this.httpService.updateUser(this.id, user).subscribe(() => {
        this.toastr.success('User update successfully', 'Success!');
        this.router.navigate([`/users/${this.id}`]);
      },
        error => {
          this.toastr.error(error.message, 'Error!');
        });
    }

  }
  addPhone() {
    (<FormArray>this.myForm.controls["phones"]).push(new FormControl("+38", Validators.required));
  }
  deletePhone() {
    let phonesArr = <FormArray>this.myForm.controls["phones"];
    phonesArr.removeAt(phonesArr.length-1);
  }
  
  getFormsControls(): FormArray {
    return this.myForm.controls['phones'] as FormArray;
  }
  backPage(){
    this.location.back();
  }
  ngOnInit(): void {
  }
}
