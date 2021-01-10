import React, { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { TabNavigationController } from './NavigationController'
import { loadFonts } from './src/utils/fonts'
import { ActivityIndicator } from './src/components/shared'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://graphql-295919.ue.r.appspot.com/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    const loadAssets = async () => {
      await loadFonts()
    }

    loadAssets()
    
    setAssetsLoaded(true)
  }, [])

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

export default App
