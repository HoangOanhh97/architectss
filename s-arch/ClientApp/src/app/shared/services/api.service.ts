import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { apolloServer } from 'src/app/graphql.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
  }

  private handleError(error: Response) {
    return throwError(error);
  }

  public getMembers() {
    return apolloServer().query({
      query: gql`
        query getMembers {
          getMembers {
            _id
            name
            role
            image
          }
        }
      `
    });
  }

  public getAwards() {
    return apolloServer().query({
      query: gql`
        query getAwards {
          getAwards {
            _id
            name
            content1
            content2
            content3
            imageUrl
          }
        }
      `
    });
  }

  public getNews() {
    return apolloServer().query({
      query: gql`
        query getNews {
          getNews {
            _id
            category
            title
            image
            descriptionHTML
          }
        }
      `
    });
  }

  public getProjectTypes() {
    return apolloServer().query({
      query: gql`
        query getProjectTypes {
          getProjectTypes {
            _id
            typeId
            typeName
            mainBg
          }
        }
      `
    })
  }

  public getProjects(filter?) {
    return apolloServer().query({
      query: gql`
        query getProjects($filter: String) {
          getProjects(filter: $filter) {
            idNumber
            name
            overallView
            overallView1920
            typeId
            typeName
            status
            done
          }
        }
      `,
      variables: { "filter": JSON.stringify(filter) }
    })
  }

  public getProjectById(idNumber) {
    return apolloServer().query({
      query: gql`
        query Query($idNumber: Int!) {
          getProjectById(idNumber: $idNumber) {
            _id
            idNumber
            name
            client
            acreage
            location
            country
            overallView
            overallView1920
            listView {
              projectId
              url
            }
            description1
            description2
            participants {
              projectId
              memberId
            }
            status
            yearDone
            typeId
            typeName
            done
          }
        }
      `,
      variables: { idNumber }
    })
  }
}
