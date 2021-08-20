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
    if (sessionStorage.getItem('sarch-token')) {
      this.token = sessionStorage.getItem('sarch-token');
    }
  }

  get user() {
    if (!this._user) {
      this.router.navigate(['/login']);
    }
    return this._user;
  }

  public login(user) {
    return apolloServer().mutate({
      mutation: gql`
          mutation login($loginInput: UserInput!) {
            login(input: $loginInput) {
              success
              message
              token
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
            success
            message
          }
        }
      `,
      variables: { userInput: user }
    })
  }

  public logout() {
    this.token = null;
    localStorage.clear();
    sessionStorage.removeItem('currentUser');
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(t): void {
    sessionStorage.setItem('sarch-token', t);
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
    this._user = JSON.parse(sessionStorage.getItem('currentUser')) || {};
    if (this.token && !this._user.name) {
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
        if (currentuser._id) {
          this._user = currentuser;
          sessionStorage.setItem('currentUser', JSON.stringify(currentuser))
          window.location.href = '/dashboard';
          return;
        }
        if (!currentuser.success) {
          this.router.navigate(['/login']);
        }
      }).catch(err => {
        this.router.navigate(['/login']);
      })
    }

    return this.token && this.token !== '';
  }
}
