import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import WebView from 'react-native-webview'

import { LogoActivityIndicator, ThemeContext } from '../components'

const WebViewContainer = ({ link }) => {
  const theme = useContext(ThemeContext)
  const [visible, setIsVisible] = useState(true)

  return (
    <View style={{ flex: 1, borderTopWidth: 0.6, borderTopColor: theme.borderColor }}>
      <WebView
        onLoad={() => setIsVisible(false)}
        style={{ flex: 1, backgroundColor: '#333333' }}
        source={{ uri: link }}
      />
      {visible && <LogoActivityIndicator />}
    </View>
  )
}

export const WebViewScreen = ({ route }) => (
  <WebViewContainer link={route.params.link} />
)
