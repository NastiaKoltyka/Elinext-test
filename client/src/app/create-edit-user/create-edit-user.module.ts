import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditUserComponent } from './create-edit-user.component';

const routes: Routes = [
  { path: '', component:CreateEditUserComponent}]

@NgModule({
  declarations: [
    CreateEditUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CreateEditUserModule { }
