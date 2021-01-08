import React from 'react'
import { Text } from 'react-native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { TabNavigationController } from './NavigationController'

import * as Font from 'expo-font'

const FONT_FOLDER = './src/static/fonts'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://graphql-295919.ue.r.appspot.com/graphql',
  cache: new InMemoryCache(),
})

export default class App extends React.Component {
  state = {
    assetsLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      Libertinus: require(`${FONT_FOLDER}/Libertinus/LibertinusSerif-Regular.otf`),
      LibertinusItalic: require(`${FONT_FOLDER}/Libertinus/LibertinusSerif-Italic.otf`),
      PlayfairDisplayBold: require(`${FONT_FOLDER}/PlayfairDisplay/PlayfairDisplay-Bold.ttf`),
      PlayfairDisplayMedium: require(`${FONT_FOLDER}/PlayfairDisplay/PlayfairDisplay-Medium.ttf`),
      PoppinsBold: require(`${FONT_FOLDER}/Poppins/Poppins-Bold.ttf`),
      PoppinsRegular: require(`${FONT_FOLDER}/Poppins/Poppins-Regular.ttf`),
    })

    this.setState({ assetsLoaded: true })
  }

  render() {
    const { assetsLoaded } = this.state

    if (assetsLoaded) {
      return (
        <ApolloProvider client={client}>
          <TabNavigationController />
        </ApolloProvider>
      )
    } else {
      return <Text>Loading Assets!</Text>
    }
  }
}
