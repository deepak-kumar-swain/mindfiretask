import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {loginRouting} from './login.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    loginRouting,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class LoginModule { }
