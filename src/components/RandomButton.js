import React, { useState } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DP_RED } from '../utils/branding'

export const RandomButton = ({ onButtonPress }) => {
  const MAX_HEIGHT = 80
  const MIN_HEIGHT = 30

  const IN_DURATION = 30
  const OUT_DURATION = 150

  const [pressOffset] = useState(new Animated.Value(0))
  const [negPressOffset] = useState(new Animated.Value(MAX_HEIGHT))
  const onPress = () => {
    const anim = Animated.timing(pressOffset, {
      toValue: 0,
      duration: OUT_DURATION,
      useNativeDriver: false,
    })

    const negAnim = Animated.timing(negPressOffset, {
      toValue: MAX_HEIGHT,
      duration: OUT_DURATION,
      useNativeDriver: false,
    })

    Animated.parallel([anim, negAnim]).start()
    setTimeout(() => {
      onButtonPress()
    }, 50)
  }

  const onTouchIn = () => {
    const anim = Animated.timing(pressOffset, {
      toValue: MAX_HEIGHT - MIN_HEIGHT,
      duration: IN_DURATION,
      useNativeDriver: false,
    })

    const negAnim = Animated.timing(negPressOffset, {
      toValue: MIN_HEIGHT,
      duration: IN_DURATION,
      useNativeDriver: false,
    })

    Animated.parallel([anim, negAnim]).start()
  }
  return (
    <Pressable
      onPressIn={onTouchIn}
      onPressOut={onPress}
      style={{ backgroundColor: 'blue', top: -100 }}
    >
      <View
        style={{
          width: '85%',
          aspectRatio: 1,
          borderRadius: Dimensions.get('window').height,
          position: 'absolute',
          transform: [{ rotateX: '45deg' }],
          backgroundColor: 'grey',
          alignSelf: 'center',
        }}
      >
        <Animated.View
          style={{
            width: '80%',
            alignSelf: 'center',
            aspectRatio: 1,
            top: 40,
            borderRadius: Dimensions.get('window').height,
            backgroundColor: '#831A15',
          }}
        />
        <Animated.View
          style={{
            height: negPressOffset,
            bottom: '40%',
            width: '80%',
            top: 100,
            position: 'absolute',
            backgroundColor: '#831A15',
            transform: [{ translateY: pressOffset }],
            alignSelf: 'center',
          }}
        />
        <Animated.View
          style={{
            width: '80%',
            aspectRatio: 1,
            position: 'absolute',
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            top: -40,
            transform: [{ translateY: pressOffset }],
            borderRadius: Dimensions.get('window').height,
            backgroundColor: DP_RED,
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 30,
              fontFamily: 'ComicSans',
              padding: 20,
              textAlign: 'center',
              color: 'white',
              transform: [{ rotate: '20deg' }],
            }}
          >
            Random Content Generator 3000
          </Text>
        </Animated.View>
      </View>
    </Pressable>
  )
}
