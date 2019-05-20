import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerShow = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
    } else {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get lf() { return this.loginForm.controls; }
  get rf() { return this.registerForm.controls; }

  openRegister() {
    this.registerShow = true;
  }

  closeRegister() {
    this.registerShow = false;
  }

  loginSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe(lgn => {
      if (lgn.success) {
        localStorage.setItem('token', lgn.token);
        this.snack.open('Login Successful', 'OK', {
          duration: 3600
        });
        this.router.navigate(['/home']);
      }
    });
  }

  registerSubmit() {
    this.authService.registerUser(this.registerForm.value).subscribe(lgn => {
      if (lgn.success) {
        this.registerShow = false;
        this.snack.open('Registration Successful, Please Login', 'OK', {
          duration: 3600
        });
      }
    });
  }

}
