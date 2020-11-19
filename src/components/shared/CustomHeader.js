import { LinearGradient } from 'expo-linear-gradient'
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
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },

  image: {
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  view: {
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    paddingTop: Platform.OS == 'ios' ? 50 : StatusBar.height,
    top: 0,
  },
})

export const CustomHeader = () => {
  return (
    <View style={styles.view}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          height: 50,
          shadowOffset: {
            height: 2,
          },
          shadowOpacity: '50%',
          shadowRadius: 2,
        }}
      >
        <Image source={DP_LOGO} style={styles.image} />
      </SafeAreaView>
    </View>
  )
}
