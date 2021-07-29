import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { apolloServer } from 'src/app/graphql.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
  }

  public getAllMembers() {
    return apolloServer().query({
      query: gql`
      query getAllMembers {
        getAllMembers {
          id
          name
          role
          image
        }
      }`
    });
  }
}
