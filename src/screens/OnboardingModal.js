import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import {
  View,
  Button,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Animated,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  DefaultStatusBar,
  GradientButton,
  InverseGradientButton,
} from '../components'
import { DP_RED } from '../utils/branding'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { ImageBackground } from 'react-native'
import { Image } from 'react-native'
import { Easing } from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import { Dimensions } from 'react-native'
import { Touchable } from 'react-native'
import { Platform } from 'react-native'

const ONBOARDING_CONTENT = [
  {
    text: 'This is the commentary for part one!',
    mediaUrl: 'tbd',
  },
  { text: 'This is the commentary of part 2!', mediaUrl: 'tbd' },
]

const MAX_GRADIENT_BUTTON_SIZE = Dimensions.get('screen').width * 0.9
const MIN_GRAIDENT_BUTTON_SIZE = Dimensions.get('screen').width * 0.2
const MAX_PUB_OPACITY = 0.6

const PageZero = ({ onNextPage }) => {
  const DP_LOGO = require('../static/logos/dp-logo-small-grey.png')
  const UTB_LOGO = require('../static/logos/utb-logo-small-grey.png')
  const STREET_LOGO = require('../static/logos/street-logo-small-grey.png')
  const [buttonWidth] = useState(new Animated.Value(0))
  const [buttonOpacity] = useState(new Animated.Value(0))
  const [buttonPosY] = useState(new Animated.Value(100))
  const [buttonPosX] = useState(new Animated.Value(0))
  const [logoPosX] = useState(new Animated.Value(0))
  const [logoPosY] = useState(new Animated.Value(200))
  const [logoOpacity] = useState(new Animated.Value(0))
  const logoSkew = logoPosY.interpolate({
    inputRange: [0, 150],
    outputRange: ['0deg', '20deg'],
  })

  const [dpOpacity] = useState(new Animated.Value(0))
  const [streetOpacity] = useState(new Animated.Value(0))
  const [utbOpacity] = useState(new Animated.Value(0))

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
      duration: 1000,
      useNativeDriver: false,
    })

    const yMoveLogo = Animated.timing(logoPosY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    })

    const dpFade = Animated.timing(dpOpacity, {
      toValue: MAX_PUB_OPACITY,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    })

    const streetFade = Animated.timing(streetOpacity, {
      toValue: MAX_PUB_OPACITY,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    })

    const utbFade = Animated.timing(utbOpacity, {
      toValue: MAX_PUB_OPACITY,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    })

    Animated.sequence(
      [
        Animated.delay(200),
        Animated.stagger(100, [dpFade, streetFade, utbFade]),
      ],
      {}
    ).start()
    const buttonAnimations = Animated.parallel(
      [fadeInButton, expandButton, yMoveButton],
      {}
    )
    const logoAnimations = Animated.parallel([fadeInLogo, yMoveLogo], {})
    Animated.stagger(300, [logoAnimations, buttonAnimations], {}).start()
  }

  const exitZero = async () => {
    const EXIT_ANIM_TIME = 300
    // Alter Gradient Button Width
    await Animated.timing(buttonWidth, {
      toValue: MIN_GRAIDENT_BUTTON_SIZE,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.in(Easing.cubic),
    }).start()

    await Animated.timing(buttonOpacity, {
      toValue: 0,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.in(Easing.cubic),
    }).start()

    await Animated.timing(buttonPosX, {
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

    const dpFadeOut = Animated.timing(dpOpacity, {
      toValue: 0,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    })

    const streetFadeOut = Animated.timing(streetOpacity, {
      toValue: 0,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    })
    const utbFadeOut = Animated.timing(utbOpacity, {
      toValue: 0,
      duration: EXIT_ANIM_TIME,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    })

    Animated.stagger(100, [dpFadeOut, streetFadeOut, utbFadeOut]).start()
    Animated.parallel([fadeOutLogo, logoXMove], {}).start()
  }

  useEffect(() => {
    setTimeout(() => enterZero(), 500)
    return () => {
      exitZero()
    }
  }, [])
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
          top:
            Dimensions.get('screen').height *
            (Platform.OS == 'ios' ? 0.15 : 0.05),
        }}
      >
        <Animated.View
          style={{
            width: '100%',
            aspectRatio: 1,
            backgroundColor: '#DDD',
            borderRadius: 20, // TODO: Remove later
            alignSelf: 'center',
            transform: [
              { translateY: logoPosY },
              { translateX: logoPosX },
              { rotate: logoSkew },
            ],
            opacity: logoOpacity,
          }}
        >
          <ImageBackground
            source={require('../static/get-started-button-background.jpg')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              borderRadius: 20,
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../static/logos/dp-logo-small-white.png')}
              style={{
                width: '60%',
                height: '80%',
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </ImageBackground>
        </Animated.View>
        <View
          style={{
            width: '120%',
            height: 80,
            marginTop: 30,
            alignSelf: 'center',
            flexDirection: 'row',
            alignContent: 'space-between',
          }}
        >
          <Animated.Image
            source={DP_LOGO}
            style={[styles.pubLogo, { opacity: dpOpacity }]}
          />
          <Animated.Image
            source={STREET_LOGO}
            style={[styles.pubLogo, { opacity: streetOpacity }]}
          />
          <Animated.Image
            source={UTB_LOGO}
            style={[styles.pubLogo, { opacity: utbOpacity }]}
          />
        </View>
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
          bottom: Platform.OS == 'ios' ? 50 : 30,
          alignSelf: 'center',
          justifySelf: 'center',
          transform: [{ translateY: buttonPosY }, { translateX: buttonPosX }],
        }}
        onButtonPress={() => {
          exitZero()
          setTimeout(() => onNextPage(), 1000)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pubLogo: {
    flex: 1,
    resizeMode: 'contain',
    height: 50,
    aspectRatio: 1,
    marginHorizontal: 15,
  },
})

const InfoPage = ({ onNextPage, onPrevPage }) => {
  const [buttonAnim] = useState(new Animated.Value(0))
  const buttonPosX = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  })

  useEffect(() => {
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start()

    return () => {
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.in(Easing.cubic),
      })
    }
  })

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignContent: 'space-between',
          width: '100%',
          opacity: buttonAnim,
          height: 60,
          position: 'absolute',
          bottom: Platform.OS == 'ios' ? 50 : 30,
          justifyContent: 'center',
          justifySelf: 'center',
          alignSelf: 'center',
          transform: [{ translateX: buttonPosX }],
        }}
      >
        <InverseGradientButton
          title="Back"
          iconName="caret-back-outline"
          iconInFront={true}
          style={{ height: 60, width: 140 }}
          onButtonPress={onPrevPage}
        />
        <View style={{ flex: 1 }} />
        <GradientButton
          title="Next"
          iconName="caret-forward-outline"
          iconInFront={false}
          style={{ height: 60, width: 140 }}
        />
      </Animated.View>
    </SafeAreaView>
  )
}

export const OnboardingModal = ({ isOnboarded, hasCompletedOnboarding }) => {
  const [isVisible, updateVisibility] = useState(isOnboarded)
  const [pageNumber, updatePageNumber] = useState(0)

  const NUM_PAGES = ONBOARDING_CONTENT.length

  const MODAL_OPTIONS = {
    isVisible: isVisible,
    animationIn: 'fadeIn',
    animationInTiming: 500,
    animationOut: 'fadeOut',
    animationOutTiming: 1000,
  }

  let currPage =
    pageNumber == 0 ? (
      <PageZero
        onNextPage={() => {
          updatePageNumber(1)
        }}
      />
    ) : (
      <InfoPage
        onNextPage={() => updatePageNumber(pageNumber + 1)}
        onPrevPage={() => updatePageNumber(pageNumber - 1)}
      />
    )

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
      {currPage}
      <DefaultStatusBar />
    </Modal>
  )
}
