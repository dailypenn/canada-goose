import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'
import WebView from 'react-native-webview'

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
      {visible && (
        <ActivityIndicator
          style={{
            height: 10,
            width: 10,
            position: 'absolute',
            top: height / 2 - 60,
            left: width / 2 - 5
          }}
          size="large"
        />
      )}
    </View>
  )
}

export const WebViewScreen = ({ route }) => (
  <WebViewContainer link={route.params.link} />
)
