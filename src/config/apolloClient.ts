import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://ovz1.j930258.n03kn.vps.myjino.ru/graphql',
  cache: new InMemoryCache(),
});

export default client;
