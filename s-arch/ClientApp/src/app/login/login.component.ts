import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from '../shared/auth/auth.service';

export interface IUser {
  email: String,
  password: String
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: IUser = {
    email: '',
    password: '',
  };
  public loginForm: FormGroup;
  public hide = true;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService,
    private snackBar: MatSnackBar) {
    this.authService.logout();
    this.loginForm = this.fb.group({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.isEmpty(this.loginForm.controls['email'].value) || this.isEmpty(this.loginForm.controls['password'].value)) {
      this.snackBar.open(`You must be enter value.`, null, { duration: 2000, verticalPosition: 'top' });
    } else {
      this.user.email = this.loginForm.controls['email'].value;
      const pwd = encodeURIComponent(this.loginForm.controls['password'].value);
      this.user.password = btoa(unescape(pwd));

      this.authService.login(this.user).then(res => {
        const result = res.data?.login || {};
        if (result.success) {
          this.snackBar.open('Welcome!', null, { duration: 2000, verticalPosition: 'top' });
          this.authService.setToken(result.token);
          window.location.href = '/';
        } else {
          this.snackBar.open(result.message, null, { duration: 2000, verticalPosition: 'top' })
        }
      }).catch(error => {
        this.snackBar.open('Login Failed', null, { duration: 2000, verticalPosition: 'top' })
      })
    }
  }

  isEmpty(value: String = ''): Boolean {
    console.log(value.trim() === '' ? true : false)
    return value.trim() === '' ? true : false;
  }

  goToView() {
    sessionStorage.setItem('isGuest', 'true');
    window.location.href = '/';
  }

}
