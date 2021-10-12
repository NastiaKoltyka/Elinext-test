import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserListComponent } from '../user-list/user-list.component';
import { DatailsPageComponent } from '../datails-page/datails-page.component'
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users-list', component: UserListComponent },
  { path: 'users/:id', component: DatailsPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'user-edit/:id/:lang', loadChildren: () => import('../create-edit-user/create-edit-user.module').then(m => m.CreateEditUserModule), canActivate: [AuthGuard],
    data: {
      role: true
    }
  },
    { path: 'user-create/:lang', loadChildren: () => import('../create-edit-user/create-edit-user.module').then(m => m.CreateEditUserModule), canActivate: [AuthGuard],
    data: {
      role: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
