import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://whats-better.fun/graphql',
  credentials: "include",
  cache: new InMemoryCache(),
});

export default client;
