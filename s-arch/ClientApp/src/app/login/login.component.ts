import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface IUser {
  name: String,
  email: String,
  username: String,
  password: String
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: IUser = {
    name: '',
    email: '',
    username: '',
    password: '',
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['agency'])
  }

}
