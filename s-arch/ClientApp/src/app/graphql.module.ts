import {NgModule} from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
// Apollo
import { Apollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from "@apollo/client/core";
import { environment } from 'src/environments/environment';

const uri = environment.api; // <-- add the URL of the our GraphQL server here
@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    // create Apollo
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
  }
}
