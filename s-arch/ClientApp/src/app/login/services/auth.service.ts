import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { throwError } from 'rxjs';
import { apolloServer } from 'src/app/graphql.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private handleError(error: Response) {
    return throwError(error);
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
}
