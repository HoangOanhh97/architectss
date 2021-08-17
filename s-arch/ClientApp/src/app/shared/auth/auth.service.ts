import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { gql } from 'apollo-angular';
import { apolloServer } from 'src/app/graphql.module';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';
  _user: any;

  constructor(private router: Router, private commonService: CommonService) {
    if (localStorage.getItem('sarch-token')) {
      this.token = localStorage.getItem('sarch-token');
    }
  }

  get user() {
    if (!this._user) {
      this.router.navigate(['login']);
    }
    return this._user;
  }

  public login(user) {
    return apolloServer().mutate({
      mutation: gql`
          mutation login($loginInput: UserInput!) {
            login(input: $loginInput) {
              message
              token
              user {
                _id
                email
                name
                role
              }
              success
            }
          }
        `,
      variables: { loginInput: user }
    })
  }

  public register(user) {
    return apolloServer().mutate({
      mutation: gql`
        mutation login($userInput: UserInput!) {
          registerUser(input: $registerUserInput) {
            message
            token
            user {
              _id
              email
            }
          }
        }
      `,
      variables: { userInput: user }
    })
  }

  public logout() {
    this.token = null;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(t): void {
    localStorage.setItem('sarch-token', t);
    this.commonService.accessToken = t;
    this.token = t;
  }

  public getHttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    };
    return httpOptions;
  }

  public isAuthenticated() {
    this._user = JSON.parse(localStorage.getItem('currentUser')) || null;
    if (this.token && !this._user) {
      return apolloServer().query({
        query: gql`
          query Query($email: String!) {
            me(email: $email) {
              ... on User {
                _id
                name
                email
                role
              }
              ... on Message {
                success
                message
              }
            }
          }
        `,
        variables: { "email": this._user.email }
      }).then(response => {
        const currentuser = response.data.me;
        console.log(currentuser);
        if (currentuser._id) {
          localStorage.setItem('currentUser', JSON.stringify(currentuser));
          this._user = currentuser;
          this.router.navigate(['/']);
          return;
        } 
        if (!currentuser.success) {
          alert(currentuser.message);
          this.router.navigate(['login']);
        }
      }).catch(err => {
        alert(err);
        this.router.navigate(['login']);
      })
    }

    return this.token && this.token !== '';
  }
}
