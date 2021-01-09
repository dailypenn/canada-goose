import React from 'react'
import { Text } from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { TabNavigationController } from './NavigationController'

import { loadFonts } from './src/utils/fonts'
import { ActivityIndicator } from './src/components/shared'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://graphql-295919.ue.r.appspot.com/graphql',
  cache: new InMemoryCache(),
})

export default class App extends React.Component {
  state = {
    assetsLoaded: false,
  }

  async componentDidMount() {
    await loadFonts()
    this.setState({ assetsLoaded: true })
  }

  render() {
    const { assetsLoaded } = this.state

    if (assetsLoaded) {
      return (
        <ApolloProvider client={client}>
          <TabNavigationController />
        </ApolloProvider>
      )
    } else {
      return <ActivityIndicator />
    }
  }
}
