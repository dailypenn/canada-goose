import React, { useContext } from 'react'
import { View } from 'react-native'
import WebView from 'react-native-webview'

import { LogoActivityIndicator, ThemeContext } from '../components'

const WebViewContainer = ({ link }) => {
  const theme = useContext(ThemeContext)

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1, backgroundColor: theme.backgroundColor }}
        source={{ uri: link }}
        renderLoading={() => (
            <LogoActivityIndicator />
        )}
        startInLoadingState={true}
      />
    </View>
  )
}

export const WebViewScreen = ({ route }) => (
  <WebViewContainer link={route.params.link} />
)
