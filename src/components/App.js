import React, { useState } from 'react';
import '../styles/App.css';
import Header from './Header.js';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

function App() {
  // Apollo Client
  const httpLink = new HttpLink({
    uri: 'https://our-journey-backend.herokuapp.com/v1/graphql',
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Header />
    </ApolloProvider>
  );
}

export default App;
