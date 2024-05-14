import React from 'react'
import { View } from 'react-native'
import WebView from 'react-native-webview'

import { LogoActivityIndicator } from '../components'

const puzzleMeEmbed = `<iframe height="100%" width="100%" allow="web-share; fullscreen" style="border:none; width: 100% !important; position: static;display: block !important; margin: 0 !important;" src="https://amuselabs.com/pmm/date-picker?set=8a2bcb9778a08d0fc217aee1409a9e05467c363641513e2996bea49d0aee3177&embed=1" aria-label="Puzzle Me"> </iframe>`

export const CrosswordsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1, backgroundColor: '#333333' }}
        source={{ html: puzzleMeEmbed }}
        renderLoading={() => <LogoActivityIndicator />}
        startInLoadingState={true}
      />
    </View>
  )
}
