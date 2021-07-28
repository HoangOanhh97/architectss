import { ApolloClient, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { environment } from './environments/environment';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: environment.api
});


client.query({
    query: gql`
        query getAllMembers {
            members {
                name
                role
            }
        }
`})
    .then(result => console.log('test: ', result));