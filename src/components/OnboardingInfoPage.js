import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { View, SafeAreaView, Animated } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { GradientButton, InverseGradientButton } from '.'
import { Easing } from 'react-native'
import { Platform, StyleSheet } from 'react-native'
import { HeaderLine } from './HeaderLine'
import { Text } from 'react-native'
import { Dimensions } from 'react-native'

const InfoPageContents = ({ content: { mediaUrl, text, title }, style }) => {
  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height:
            Dimensions.get('window').height -
            (Platform.OS == 'ios' ? 180 : 120),
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <View
        style={{
          width: '80%',
          aspectRatio: 2 / 3,
          backgroundColor: '#BBB',
          borderRadius: 30,
          borderColor: '#DDD',
          borderWidth: 30,
          alignSelf: 'center',
        }}
      />
    </Animated.View>
  )
}

export const OnboardingInfoPage = ({
  onNextPage,
  onPrevPage,
  currPage,
  ONBOARDING_CONTENT,
}) => {
  const NUM_PAGES = ONBOARDING_CONTENT.length
  const [buttonAnim] = useState(new Animated.Value(0))
  const [pageAnim] = useState(new Animated.Value(0))
  const pageVisibilities = [
    ONBOARDING_CONTENT.map(el => {
      const [state] = useState(new Animated.Value(0))
      return state
    }),
  ]

  const pagePosY = pageAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [200, 100, 0],
  })
  const buttonPosX = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  })

  const content = ONBOARDING_CONTENT
  console.log(content)

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(pageAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.exp),
      }),
    ]).start()
  })

  const backToStart = async () => {
    await Animated.stagger(200, [
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(pageAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.in(Easing.cubic),
      }),
    ]).start()
  }

  const forwardButtonPressed = () => {
    onNextPage()
  }

  const backButtonPressed = () => {
    if (currPage == 1) {
      backToStart()
      setTimeout(() => onPrevPage(), 700)
    } else {
      onPrevPage()
    }
  }

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <InfoPageContents
        content={ONBOARDING_CONTENT[currPage - 1]}
        style={{ transform: [{ translateY: pagePosY }], opacity: pageAnim }}
      />
      <Animated.View
        style={[
          styles.navigation,
          {
            opacity: buttonAnim,
            transform: [{ translateX: buttonPosX }],
          },
        ]}
      >
        <InverseGradientButton
          title="Back"
          iconName="caret-back-outline"
          iconInFront={true}
          style={{ height: 60, width: 140 }}
          onButtonPress={backButtonPressed}
        />
        <View style={{ flex: 1 }} />
        <GradientButton
          title={currPage == NUM_PAGES ? 'Start' : 'Next'}
          iconName={
            currPage == NUM_PAGES ? 'checkmark-circle' : 'caret-forward-outline'
          }
          iconInFront={false}
          onButtonPress={forwardButtonPressed}
          style={{ height: 60, width: 140 }}
        />
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  navigation: {
    height: 60,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 50 : 30,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignContent: 'space-between',
    width: '100%',
  },
})
