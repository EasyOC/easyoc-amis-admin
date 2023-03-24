import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import defaultRequest from '../requests/defaultRequest';



const customFetch = (uri, options): any => {
  return defaultRequest.request({ url: uri, ...options });
};

const link = new HttpLink({ fetch: customFetch });

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;