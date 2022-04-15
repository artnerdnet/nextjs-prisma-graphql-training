import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: "http://5b11-89-128-233-240.ngrok.io/api/graphql",
  cache: new InMemoryCache()
})

export default apolloClient;