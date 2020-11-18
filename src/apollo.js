import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client'
import { concat } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from './config'

const httpLink = createHttpLink({
  uri: config.graphqlURL,
})

const authLink = setContext((_, { headers }) => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session) {
    return {
      headers: {
        ...headers,
        Authorization: session.token ? `Bearer ${session.token}` : "",
      }
    }
  } else {
    return {
      headers: {
        ...headers,
        Authorization: "",
      }
    }
  }
  
});

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache,
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler(error) {
    console.error('An error occurred in a request ', error);
  },
})