import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, Text, View } from 'react-native'
import WebView from 'react-native-webview'

const { width, height } = Dimensions.get('window')

class WebViewContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: true }
    this.link = this.props.link
  }

  hideSpinner() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1, backgroundColor: '#333333' }}
          source={{ uri: this.link }}
        />
        {this.state.visible && (
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
}

export const WebViewScreen = ({ route }) => {
  return <WebViewContainer link={route.params.link} />
}
