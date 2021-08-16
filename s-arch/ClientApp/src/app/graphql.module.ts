import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
// Apollo
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import { environment } from 'src/environments/environment';
import { CommonService } from './shared/services/common.service';

const uri = environment.api; // <-- add the URL of the our GraphQL server here

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: uri,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('sarch-token') || null,
    'authorization': localStorage.getItem('sarch-token') || null,
  }
});

export function apolloServer(): ApolloClient<NormalizedCacheObject> {
  return client;
}

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [],
})

export class GraphQLModule {
  constructor() { }
}
