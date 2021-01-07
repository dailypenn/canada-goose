import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { TabNavigationController } from './NavigationController'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://graphql-295919.ue.r.appspot.com/graphql',
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <TabNavigationController />
  </ApolloProvider>
)

export default App
