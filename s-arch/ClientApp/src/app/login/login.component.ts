import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required)
    })

    this.loginForm.valueChanges.subscribe(response => {
      Object.keys(response).forEach(key => {
        this.getErrorMessage(key);
      })
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.user.email = this.loginForm.controls['email'].value;
    this.user.password = this.loginForm.controls['password'].value;
    this.authService.login(this.user).then(res => {
      if (res.data) {
        const result = res.data.login;
        this.authService.setToken(result.token);
        this.router.navigate(['/']);
      } else {
        console.log(res.errors);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  getErrorMessage(name) {
    if (this.loginForm.controls[name].hasError('required') || this.loginForm.controls[name].dirty) {
      return 'You must enter a value';
    }

    return this.loginForm.controls[name].hasError('email') ? 'Not a valid email' : null;
  }

}
