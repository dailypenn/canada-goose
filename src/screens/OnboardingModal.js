import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import {
  View,
  SafeAreaView,
  StyleSheet,
  Animated,
  Image,
  Easing,
  Dimensions,
  Platform,
} from 'react-native'

import {
  DefaultStatusBar,
  GradientButton,
  OnboardingInfoPage,
} from '../components'

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
          <View
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
                marginTop: 10,
              }}
            />
          </View>
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

const ONBOARDING_CONTENT = [
  {
    text: 'This is the commentary for part one!',
    mediaUrl: 'tbd',
    title: 'Home Feed',
  },
  {
    text: 'This is the commentary of part 2!',
    mediaUrl: 'tbd',
    title: 'Switching Publications',
  },
]

const NUM_PAGES = ONBOARDING_CONTENT.length

export const OnboardingModal = ({ isOnboarded, hasCompletedOnboarding }) => {
  const [isVisible, updateVisibility] = useState(isOnboarded)
  const [pageNumber, updatePageNumber] = useState(0)

  const MODAL_OPTIONS = {
    isVisible: isVisible,
    animationIn: 'fadeIn',
    animationInTiming: 500,
    animationOut: 'fadeOut',
    animationOutTiming: 1500,
  }

  const onNextPage = () => {
    if (pageNumber == NUM_PAGES) updateVisibility(false)
    else updatePageNumber(pageNumber + 1)
  }

  let currPage =
    pageNumber == 0 ? (
      <PageZero
        onNextPage={() => {
          updatePageNumber(1)
        }}
      />
    ) : isVisible ? (
      <OnboardingInfoPage
        onNextPage={onNextPage}
        onPrevPage={() => updatePageNumber(pageNumber - 1)}
        currPage={pageNumber}
        ONBOARDING_CONTENT={ONBOARDING_CONTENT}
      />
    ) : null

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
