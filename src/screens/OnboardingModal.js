import React, { useState } from 'react'
import Modal from 'react-native-modal'
import {
  View,
  Button,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { DefaultStatusBar } from '../components'
import { DP_RED } from '../utils/branding'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'

const ONBOARDING_CONTENT = [
  {
    text: 'This is the commentary for part one!',
    mediaUrl: 'tbd',
  },
  { text: 'This is the commentary of part 2!', mediaUrl: 'tbd' },
]

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
        margin: 0,
      }}
    >
      <DefaultStatusBar />
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          title="Onboarding Modal! Comment me out if you think I'm annoying as shit"
          style={{ alignSelf: 'center', justifySelf: 'center' }}
          onPress={() => {
            updateVisibility(false)
            setTimeout(() => updateVisibility(true), 2000)
          }}
        />
        <View style={{ width: 100 }}>
          <TouchableOpacity
            style={{ backgroundColor: DP_RED, borderRadius: 10 }}
            activeOpacity={0.8}
          >
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: GEOMETRIC_BOLD,
                  fontSize: 20,
                  color: 'white',
                }}
              >
                Next
              </Text>
              <Ionicons
                name="arrow-forward-circle"
                size={20}
                color="white"
                style={{ alignSelf: 'center', paddingLeft: 10 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )
}
