import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Home from './src/pages/index'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
)

export default App