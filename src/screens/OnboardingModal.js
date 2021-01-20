import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import {
  View,
  Button,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { DefaultStatusBar, GradientButton } from '../components'
import { DP_RED } from '../utils/branding'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { ImageBackground } from 'react-native'
import { Image } from 'react-native'
import { Easing } from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import { Dimensions } from 'react-native'

const ONBOARDING_CONTENT = [
  {
    text: 'This is the commentary for part one!',
    mediaUrl: 'tbd',
  },
  { text: 'This is the commentary of part 2!', mediaUrl: 'tbd' },
]

const MAX_GRADIENT_BUTTON_SIZE = Dimensions.get('screen').width * 0.9
const MIN_GRAIDENT_BUTTON_SIZE = Dimensions.get('screen').width * 0.2

const PageZero = () => {
  const DP_LOGO = require('../static/logos/dp-logo-small-red.png')
  const UTB_LOGO = require('../static/logos/utb-logo-small-blue.png')
  const STREET_LOGO = require('../static/logos/street-logo-small-teal.png')
  const [buttonWidth] = useState(new Animated.Value(0))
  const [buttonOpacity] = useState(new Animated.Value(0))
  const [buttonPosY] = useState(new Animated.Value(100))

  const [buttonPosX] = useState(new Animated.Value(0))
  const [logoPosX] = useState(new Animated.Value(0))
  const [logoPosY] = useState(new Animated.Value(0))
  const [logoOpacity] = useState(new Animated.Value(0))

  const enterZero = async () => {
    buttonPosX.setValue(0)
    logoPosX.setValue(0)
    const expandButton = Animated.timing(buttonWidth, {
      toValue: MAX_GRADIENT_BUTTON_SIZE,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    })

    const fadeInButton = Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    })

    const yMoveButton = Animated.timing(buttonPosY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    })

    const fadeInLogo = Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    })

    const yMoveLogo = Animated.timing(logoPosY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    })

    const buttonAnimations = Animated.parallel([
      fadeInButton,
      expandButton,
      yMoveButton,
    ])
    const logoAnimations = Animated.parallel([fadeInLogo, yMoveLogo])
    Animated.stagger(300, [logoAnimations, buttonAnimations]).start()
  }

  const exitZero = async () => {
    const EXIT_ANIM_TIME = 300
    // Alter Gradient Button Width
    const shrinkButton = Animated.timing(buttonWidth, {
      toValue: MIN_GRAIDENT_BUTTON_SIZE,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.in(Easing.cubic),
    }).start()

    const fadeOutButton = Animated.timing(buttonOpacity, {
      toValue: 0,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.in(Easing.cubic),
    }).start()

    const buttonXMove = Animated.timing(buttonPosX, {
      toValue: -200,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.in(Easing.cubic),
    }).start()

    const fadeOutLogo = Animated.timing(logoOpacity, {
      toValue: 0,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    })

    const logoXMove = Animated.timing(logoPosX, {
      toValue: -200,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.in(Easing.cubic),
    })

    // const buttonAnimations = Animated.parallel(
    //   fadeOutButton,
    //   shrinkButton,
    //   buttonXMove
    // ).start()
    const logoAnimations = Animated.parallel([fadeOutLogo, logoXMove]).start()

    // Animated.stagger(100, [logoAnimations, buttonAnimations]).start()

    setTimeout(() => {
      buttonPosY.setValue(150)
      logoPosY.setValue(150)
    }, EXIT_ANIM_TIME)
  }

  useEffect(() => {
    enterZero()
  })
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          width: '40%',
          alignSelf: 'center',
          position: 'absolute',
          top: Dimensions.get('screen').height * 0.15,
        }}
      >
        <Animated.View
          style={{
            width: '100%',
            aspectRatio: 1,
            backgroundColor: '#DDD',
            borderRadius: 20, // TODO: Remove later
            alignSelf: 'center',
            transform: [{ translateY: logoPosY }, { translateX: logoPosX }],
            opacity: logoOpacity,
          }}
        />
      </View>
      <GradientButton
        title="Get Started"
        iconName="caret-forward-outline"
        iconInFront={false}
        style={{
          opacity: buttonOpacity,
          width: buttonWidth,
          height: 60,
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          justifySelf: 'center',
          transform: [{ translateY: buttonPosY }, { translateX: buttonPosX }],
        }}
        onButtonPress={() => {
          exitZero()
          setTimeout(() => {
            enterZero()
          }, 1000)
        }}
      />
    </SafeAreaView>
  )
}

export const OnboardingModal = ({ isOnboarded, hasCompletedOnboarding }) => {
  const [isVisible, updateVisibility] = useState(isOnboarded)

  const NUM_PAGES = ONBOARDING_CONTENT.length
  let currPage = 0

  const MODAL_OPTIONS = {
    isVisible: isVisible,
    animationIn: 'fadeIn',
    animationInTiming: 500,
    animationOut: 'fadeOut',
    animationOutTiming: 1000,
  }
  return (
    <Modal
      {...MODAL_OPTIONS}
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        margin: 0,
        backgroundColor: 'white',
      }}
    >
      <DefaultStatusBar />
      <PageZero />
    </Modal>
  )
}
