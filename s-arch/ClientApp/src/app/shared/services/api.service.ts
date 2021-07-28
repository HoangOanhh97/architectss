import { Injectable, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  books: any;
  loading: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.query<any>({
      query: gql`
          {
            members {
              name
            }
          }
        `
    })
      .subscribe(
        ({ data, loading }) => {
          this.books = data && data.books;
          this.loading = loading;
          console.log(this.books);
        }
      );
  }
}
