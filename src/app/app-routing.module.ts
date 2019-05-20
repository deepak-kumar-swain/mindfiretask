import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', redirectTo: '/', pathMatch: 'full' },
  { path: '', loadChildren: './login/login.module#LoginModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
