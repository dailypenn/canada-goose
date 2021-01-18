import React, { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import TabNavigationController from './NavigationController'
import { loadFonts } from './src/utils/fonts'
import { ActivityIndicator } from './src/components'
import RootReducer from './src/reducers'

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'http://localhost:5000/graphql',
  uri: 'https://graphql-295919.ue.r.appspot.com/graphql',
  cache: new InMemoryCache()
})

const store = createStore(RootReducer)

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
        <Provider store={store}>
          <TabNavigationController />
        </Provider>
      </ApolloProvider>
    )
  } else {
    return <ActivityIndicator />
  }
}

export default App
