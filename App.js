import React, { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider } from 'react-redux'
import * as ScreenOrientation from 'expo-screen-orientation'

import TabNavigationController from './NavigationController'
import { loadFonts } from './src/utils/fonts'
import { LogoActivityIndicator, ThemeProvider } from './src/components'
import store from './src/reducers'

import {
  GET_HOME_FEED_ORDER_KEY,
  IS_ONBOARDED_KEY,
  SAVED_ARTICLES_KEY,
  LAST_VIEWED_PUBLICATION_KEY,
  NOTIF_PREFS_KEY,
  DISPLAY_PREFS_KEY,
  Storage,
} from './src/utils/storage'
import { PublicationEnum } from './src/utils/constants'
import { setInit, switchPublication } from './src/actions'
import { OnboardingModal } from './src/screens'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://graphql-295919.ue.r.appspot.com/graphql',
  cache: new InMemoryCache(),
})

const getAsyncStorage = () => {
  return dispatch => {
    AsyncStorage.multiGet([
      GET_HOME_FEED_ORDER_KEY(PublicationEnum.dp),
      GET_HOME_FEED_ORDER_KEY(PublicationEnum.street),
      GET_HOME_FEED_ORDER_KEY(PublicationEnum.utb),
      SAVED_ARTICLES_KEY,
      LAST_VIEWED_PUBLICATION_KEY,
      NOTIF_PREFS_KEY,
      DISPLAY_PREFS_KEY
    ]).then(result => {
      let lastViewedPublication = JSON.parse(result[4][1])
      if (lastViewedPublication != null) {

        dispatch(switchPublication(lastViewedPublication))
      }
      dispatch(setInit(result))
    })
  }
}
store.dispatch(getAsyncStorage())

const App = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [isOnboarded, hasCompletedOnboarding] = useState(true)
  const [attachOnboardingModalToDom, updateAttachment] = useState(true)

  useEffect(() => {
    const loadAssets = async () => {
      // await AsyncStorage.clear()
      await loadFonts()
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      )

      let onboarded = await Storage.getItem(IS_ONBOARDED_KEY)
      hasCompletedOnboarding(onboarded === true)
      updateAttachment(onboarded !== true)

      setAssetsLoaded(true)
    }
    loadAssets()
  }, [])

  if (assetsLoaded) {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          {attachOnboardingModalToDom ? (
            <OnboardingModal {...{ isOnboarded, hasCompletedOnboarding }} />
          ) : null}
          <ThemeProvider>
            <TabNavigationController />
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    )
  } else {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <LogoActivityIndicator />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App;
