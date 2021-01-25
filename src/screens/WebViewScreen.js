import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'
import WebView from 'react-native-webview'
import { LogoActivityIndicator } from '../components'

const { width, height } = Dimensions.get('window')

const WebViewContainer = ({ link }) => {
  const [visible, setIsVisible] = useState(true)

  return (
    <View style={{ flex: 1 }}>
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
