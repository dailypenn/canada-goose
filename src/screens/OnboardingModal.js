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

import { DefaultStatusBar } from '../components'
import { DP_RED } from '../utils/branding'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { ImageBackground } from 'react-native'
import { Image } from 'react-native'
import { Easing } from 'react-native'
import MaskedView from '@react-native-community/masked-view'

const ONBOARDING_CONTENT = [
  {
    text: 'This is the commentary for part one!',
    mediaUrl: 'tbd',
  },
  { text: 'This is the commentary of part 2!', mediaUrl: 'tbd' },
]

export const OnboardingModal = ({ isOnboarded, hasCompletedOnboarding }) => {
  const [isVisible, updateVisibility] = useState(isOnboarded)
  const [spinValue] = useState(new Animated.Value(0))

  console.log('this is happening!')

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start()
  })

  const GET_STARTED_BACKGROUND = require('../static/get-started-button-background.jpg')
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
        margin: 0,
      }}
    >
      <DefaultStatusBar />
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            width: '80%',
            aspectRatio: 2 / 3,
            backgroundColor: '#DDD',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 50,
          }}
        />
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 50,
            height: 70,
          }}
        >
          <TouchableOpacity
            style={{
              height: 70,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            activeOpacity={0.8}
            onPress={() => {
              updateVisibility(false)
              setTimeout(() => updateVisibility(true), 2000)
            }}
          >
            <MaskedView
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                position: 'absolute',
                justifyContent: 'center',
              }}
              maskElement={
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: 20,
                  }}
                />
              }
            >
              <Animated.Image
                style={{
                  width: '200%',
                  aspectRatio: 1,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                  position: 'absolute',
                  borderRadius: 10000,
                  paddingHorizontal: 5,
                  transform: [{ rotate: spin }],
                }}
                source={GET_STARTED_BACKGROUND}
              />
            </MaskedView>

            <Text
              style={{
                fontFamily: GEOMETRIC_BOLD,
                fontSize: 24,
                color: 'white',
                alignSelf: 'center',
              }}
            >
              Get Started
            </Text>
            <Ionicons
              name="caret-forward-outline"
              size={24}
              color="white"
              style={{
                alignSelf: 'center',
                paddingLeft: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )
}
