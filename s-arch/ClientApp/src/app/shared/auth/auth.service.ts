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
    // here you can check if user is authenticated or not through his token
    console.log(this.token);
    if (this.token && !this._user) {
      this.router.navigate(['/']);
    }
    // if (this.token && !this._user) {
    //   return apolloServer().query({
    //     query: gql`
    //       query me {
    //         me {
    //           _id
    //           name
    //           email
    //           role
    //           status {
    //             success
    //             message
    //           }
    //         }
    //       }
    //     `
    //   }).then(response => {
    //     console.log(response.data.me);
    //     if (response.data.me.status.success) {
    //       this._user = response.data.me;
    //     } else {
    //       alert(response.data.me.status.message)
    //       this.router.navigate(['login']);
    //     }
    //   }).catch(err => {
    //     this.router.navigate(['login']);
    //   })
    // }

    return this.token && this.token !== '';
  }
}
