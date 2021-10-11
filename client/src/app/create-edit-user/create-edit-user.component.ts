import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.sass']
})
export class CreateEditUserComponent implements OnInit {
  previousUrl: string="";
  myForm: FormGroup;
  constructor(private router: Router) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.previousUrl = event.url;
    })
    if(this.previousUrl=='/user-create'){
      this.myForm = new FormGroup({
        "userName": new FormControl("", Validators.required),
        "userEmail": new FormControl("", [
          Validators.required,
          Validators.email
        ]),
        "userPassword": new FormControl("", Validators.pattern("[0-9]{10}")),
        "userPhone": new FormControl("", Validators.pattern("[0-9]{10}")),
        "date": new FormControl("", Validators.pattern("[0-9]{10}")),
        "education": new FormControl("", Validators.pattern("[0-9]{10}")),
      });
    }
    else{
      console.log(this.previousUrl)
      this.myForm = new FormGroup({
        "userName": new FormControl("cbnjcj", Validators.required),
        "userEmail": new FormControl("rggrg", [
          Validators.required,
          Validators.email
        ]),
        "userPassword": new FormControl("", Validators.pattern("[0-9]{10}")),
        "userPhone": new FormControl("", Validators.pattern("[0-9]{10}")),
        "date": new FormControl("", Validators.pattern("[0-9]{10}")),
        "education": new FormControl("", Validators.pattern("[0-9]{10}")),
      });
    }

}

  submit() {
    console.log(this.myForm);
  }

  ngOnInit(): void {

  }
}
