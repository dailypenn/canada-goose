import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DP_LOGO_WHITE = require('../static/logos/dp-logo-small-white.png')
const DP_LOGO_RED = require('../static/logos/dp-logo-small-red.png')

// half the height of the header
const IOS_NOTCH_OFFSET = 44
const IOS_STATUS_BAR_OFFSET = 20

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },

  image: {
    height: '50%',
    width: 80,
    resizeMode: 'contain',
  },

  view: {
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },

  safeAreaView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 60,
    shadowOffset: {},
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 2,
  },
})

export const CustomHeader = ({ publication, contentOffset }) => {
  const FADE_START = 100
  const FADE_END = 175
  const FADE_DIST = FADE_END - FADE_START

  const isFocused = useIsFocused()

  const addOpacity = (rgbString, opacity) => {
    return rgbString.split(')')[0] + ',' + String(Math.min(opacity, 1)) + ')'
  }

  const getLogo = (publication, contentOffset) => {
    // TODO: Implement when we get all logos
    // Currently replacing red logo with white when fade is completed
    return contentOffset < FADE_END ? DP_LOGO_WHITE : DP_LOGO_RED
  }

  const animateMenu = () => {
    // TO DO: create animation here
  }

  /** Function that determins top padding of header depending
   * on operating system and aspect ratio (if the iPhone has a
   * notch)
   */
  const calculateTopPadding = () => {
    // If Android, then make room for the status bar
    if (Platform.OS === 'android') return StatusBar.currentHeight

    const { width, height } = Dimensions.get('window')
    // If the iPhone has a notch,
    return height / width < 1.8 ? IOS_STATUS_BAR_OFFSET : IOS_NOTCH_OFFSET
  }

  return (
    <View
      style={{
        ...styles.view,
        ...{
          backgroundColor: addOpacity(
            'rgba(255, 255, 255)',
            (contentOffset - FADE_START) / FADE_DIST
          ),
          paddingTop: calculateTopPadding(),
          shadowColor: contentOffset < FADE_END ? null : '#000',
          shadowOffset: contentOffset < FADE_END ? null : { height: 5 },
          shadowOpacity: contentOffset < FADE_END ? null : 0.5,
          shadowRadius: contentOffset < FADE_END ? null : 8,
          elevation: contentOffset < FADE_END ? null : 4,
        },
      }}
    >
      <TouchableOpacity onPress={animateMenu} opacity={1}>
        {isFocused ? (
          <StatusBar
            barStyle={
              contentOffset >= FADE_END ? 'dark-content' : 'light-content'
            }
            backgroundColor={contentOffset >= FADE_END ? '#EEE' : 'black'}
            animated={false}
          />
        ) : null}
        <SafeAreaView
          style={{
            ...styles.safeAreaView,
            ...{ shadowOpacity: 1 - (contentOffset - FADE_START) / FADE_DIST },
          }}
        >
          <Image
            source={getLogo(publication, contentOffset)}
            style={styles.image}
          />
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  )
}
