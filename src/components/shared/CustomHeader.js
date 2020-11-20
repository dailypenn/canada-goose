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
    backgroundColor: '#A61E21',
    paddingTop: Platform.OS == 'ios' ? 50 : StatusBar.height,
    top: 0,
  },
})

export const CustomHeader = ({ contentOffset }) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: contentOffset < 150 ? 'transparent' : '#A61E21',
        paddingTop: Platform.OS == 'ios' ? 50 : StatusBar.height,
        top: 0,
        shadowColor: contentOffset < 150 ? null : '#000',
        shadowOffset:
          contentOffset < 150
            ? null
            : {
                height: 5,
              },
        shadowOpacity: contentOffset < 150 ? null : 0.5,
        shadowRadius: contentOffset < 150 ? null : 8,
        elevation: contentOffset < 150 ? null : 4,
      }}
    >
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
          shadowColor: '#505050',
          shadowOpacity: contentOffset < 150 ? '30%' : 0,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Image source={DP_LOGO} style={styles.image} />
      </SafeAreaView>
    </View>
  )
}
