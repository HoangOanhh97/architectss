import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
// Apollo
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import { environment } from 'src/environments/environment';

const uri = environment.api; // <-- add the URL of the our GraphQL server here

const setHeaders = () => {
  let headers = { 'Content-Type': 'application/json' }
  if (sessionStorage.getItem('sarch-token')) {
    return {
      ...headers,
      ...{ 'authorization': `Bearer ${sessionStorage.getItem('sarch-token')}` }
    }
  }
  return headers;
}

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: uri,
  headers: setHeaders()
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
