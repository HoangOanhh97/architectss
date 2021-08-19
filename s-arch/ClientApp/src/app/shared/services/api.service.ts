import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { throwError } from 'rxjs';
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

  public postArticle(dataInsert) {
    return apolloServer().mutate({
      mutation: gql`
        mutation postArticle($dataInsert: NewsInput!) {
          postArticle(input: $dataInsert) {
            ... on News {
              _id
            }
            ... on Message {
              message
            }
          }
        }
      `,
      variables: { dataInsert }
    })
  }

  public updateArticle(dataToPut) {
    return apolloServer().mutate({
      mutation: gql`
        mutation updateArticle($dataToPut: NewsInput!) {
          updateArticle(input: $dataToPut) {
            ... on News {
              _id
            }
            ... on Message {
              message
            }
          }
        }
      `,
      variables: { dataToPut }
    })
  }

  public deleteArticle(id) {
    return apolloServer().mutate({
      mutation: gql`
        mutation deleteArticle($id: ID!) {
          deleteArticle(newId: $id) {
            success
            message
          }
        }
      `,
      variables: { id }
    })
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
        query getProjectById($idNumber: Int!) {
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

  public getProjectImages(projectId) {
    return apolloServer().query({
      query: gql`
        query getProjectImagesById($projectId: Int!) {
          getProjectImagesById(projectId: $projectId) {
            projectId
            url
          }
        }
      `,
      variables: { projectId }
    })
  }

  public getProjectMembers(projectId) {
    return apolloServer().query({
      query: gql`
        query getProjectMembersById($projectId: Int!) {
          getProjectMembersById(projectId: $projectId) {
            projectId
            memberId
            memberName
          }
        }
      `,
      variables: { projectId }
    })
  }
}
