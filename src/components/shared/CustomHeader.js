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
    height: SCREEN_HEIGHT * 0.1,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    position: 'absolute',
  },

  header: {
    backgroundColor: '#A61E21',
  },

  image: {
    width: '60%',
    height: SCREEN_HEIGHT * 0.1,

    resizeMode: 'contain',
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
    <View style={styles.view}>
      <Image source={'../static/logos/thedp.png'} />
    </View>
  )
}
