import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { apolloServer } from 'src/app/graphql.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
  }

  public getMembers() {
    return apolloServer().query({
      query: gql`
      query getMembers {
        getMembers {
          id
          name
          role
          image
        }
      }`
    });
  }

  public getAwards() {
    return apolloServer().query({
      query: gql`
      query getAwards {
        getAwards {
          name
          content1
          content2
          content3
          imageUrl
        }
      }`
    });
  }
}
