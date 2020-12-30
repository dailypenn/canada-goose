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
import { PublicationEnum } from '../../../NavigationController'
import { PublicationPrimaryColorRgba } from '../../utils/branding'
const DP_LOGO_WHITE = require('../../static/logos/dp-logo-small-white.png')
const DP_LOGO_RED = require('../../static/logos/dp-logo-small-red.png')
// half the height of the header
const HEADER_HALF = Math.round(Dimensions.get('window').height) * 0.09

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
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  view: {
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },

  safeAreaView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    height: HEADER_HALF,
    shadowOffset: {},
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 2,
  },
})

export const CustomHeader = ({ publicationState, contentOffset }) => {
  const fadeStart = 100
  const fadeEnd = 175
  const fadeDist = fadeEnd - fadeStart
  const dpRed = 'rgba(166, 30, 33)'
  const utbBlue = 'rgba(33, 60, 220)'

  const addOpacity = (rgbString, opacity) => {
    return rgbString.split(')')[0] + ',' + opacity * 0.8 + ')'
  }

  const getLogo = (publication) => {
    // TODO: Implement when we get all logos
    return DP_LOGO_WHITE
  }

  const animateMenu = () => {
    // TO DO: create animation here

    // TO DO: move this to where a publication is selected
    const newPub =
      publicationState.currPublication == PublicationEnum.utb
        ? PublicationEnum.dp
        : PublicationEnum.utb
    publicationState.switchPublication(newPub)
  }

  /** Function that determins top padding of header depending
   * on operating system and aspect ratio (if the iPhone has a
   * notch)
   */
  const calculateTopPadding = () => {
    // If Android, then make room for the status bar
    if (Platform.OS == 'android') return StatusBar.height

    const { width, height } = Dimensions.get('window')
    // If the iPhone has a notch,
    return height / width < 1.8 ? 10 : HEADER_HALF
  }

  return (
    <View
      style={{
        ...styles.view,
        ...{
          backgroundColor: addOpacity(
            PublicationPrimaryColorRgba(publicationState.currPublication),
            (contentOffset - fadeStart) / fadeDist
          ),
          paddingTop: calculateTopPadding(),
          shadowColor: contentOffset < fadeEnd ? null : '#000',
          shadowOffset: contentOffset < fadeEnd ? null : { height: 5 },
          shadowOpacity: contentOffset < fadeEnd ? null : 0.5,
          shadowRadius: contentOffset < fadeEnd ? null : 8,
          elevation: contentOffset < fadeEnd ? null : 4,
        },
      }}
    >
      <TouchableOpacity onPress={animateMenu} opacity={1}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={{
            ...styles.safeAreaView,
            ...{ shadowOpacity: 1 - (contentOffset - fadeStart) / fadeDist },
          }}
        >
          <Image
            source={getLogo(publicationState.currPublication)}
            style={styles.image}
          />
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  )
}
