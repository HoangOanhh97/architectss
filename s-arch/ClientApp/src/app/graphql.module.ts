import {NgModule} from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
// Apollo
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { ApolloClientOptions, InMemoryCache } from "@apollo/client/core";

const uri = 'https://48p1r2roz4.sse.codesandbox.io'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({uri}),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: createApollo,
    //   deps: [HttpLink],
    // },
  ],
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
