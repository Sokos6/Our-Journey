import React, { useState } from 'react';
import '../styles/App.css';
import Header from './Header.js';
// for authentication using auth0
import { useAuth0 } from '../auth/react-auth0-wrapper';

// for routing
import { Switch, Route } from 'react-router-dom';

// for apollo client
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

function App() {
  const { isAuthenticated, user } = useAuth0;

  // used state to get accessToken through getTokenSilently(),
  // the component re-renders when state changes, thus we have
  // our accessToken in apollo client instance.

  const [accessToken, setAccessToken] = useState('');

  const { getTokenSilently, loading } = useAuth0;
  if (loading) {
    return 'Loading...';
  }

  // Get Access token
  const getAccessToken = async () => {
    // getTokenSilently() returns a promise
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

  // Apollo Client
  const httpLink = new HttpLink({
    uri: 'https://our-journey-backend.herokuapp.com/v1/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {
        headers: {
          ...headers,
        },
      };
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Header />
    </ApolloProvider>
  );
}

export default App;
