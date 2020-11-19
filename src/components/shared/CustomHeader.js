import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  Button,
} from 'react-native'
import { Header } from 'react-native-elements'

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)
const DP_LOGO = require('../../static/logos/thedp.png')

const styles = StyleSheet.create({
  barContent: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    position: 'absolute',
  },

  image: {
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: '#A61E21',
    alignSelf: 'center',
  },
  view: {
    width: '100%',
    backgroundColor: '#A61E21',
    alignContent: 'center',
    justifyContent: 'center',
  },
})

export const CustomHeader = () => {
  return (
    <Header backgroundColor={'#A61E21'} barStyle="light-content">
      <View />
      <Image source={DP_LOGO} style={styles.image} />
    </Header>
  )
}
