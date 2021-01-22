import React, { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-community/async-storage'
import { Provider } from 'react-redux'

import TabNavigationController from './NavigationController'
import { loadFonts } from './src/utils/fonts'
import { ActivityIndicator } from './src/components'
import RootReducer from './src/reducers'
import {
  GET_HOME_FEED_ORDER_KEY,
  SAVED_ARTICLES_KEY,
} from './src/utils/storage'
import { PublicationEnum } from './src/utils/constants'
import { setInit } from './src/actions'

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'http://localhost:5000/graphql',
  uri: 'https://graphql-295919.ue.r.appspot.com/graphql',
  cache: new InMemoryCache(),
})

const store = createStore(RootReducer, applyMiddleware(thunk))

const getAsyncStorage = () => {
  return dispatch => {
    AsyncStorage.multiGet([
      GET_HOME_FEED_ORDER_KEY(PublicationEnum.dp),
      GET_HOME_FEED_ORDER_KEY(PublicationEnum.street),
      GET_HOME_FEED_ORDER_KEY(PublicationEnum.utb),
      SAVED_ARTICLES_KEY,
    ]).then(result => {
      dispatch(setInit(result))
    })
  }
}
store.dispatch(getAsyncStorage())

const App = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    const loadAssets = async () => {
      await loadFonts()
      setAssetsLoaded(true)
    }
    loadAssets()
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
