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
  StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { Easing } from 'react-native'
import MaskedView from '@react-native-community/masked-view'

export const GradientButton = ({
  title,
  iconName,
  iconInFront,
  style,
  onButtonPress,
}) => {
  const GET_STARTED_BACKGROUND = require('../static/get-started-button-background.jpg')
  const [spinValue] = useState(new Animated.Value(0))

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
      }),
      {}
    ).start()
  })

  return (
    <Animated.View style={style}>
      <TouchableOpacity
        style={{
          height: 70,
          flexDirection: iconInFront ? 'row-reverse' : 'row',
          justifyContent: 'center',
        }}
        activeOpacity={0.8}
        onPress={onButtonPress}
      >
        <MaskedView
          style={styles.maskContainer}
          maskElement={<View style={styles.maskingView} />}
        >
          <Animated.Image
            style={[styles.image, { transform: [{ rotate: spin }] }]}
            source={GET_STARTED_BACKGROUND}
          />
        </MaskedView>

        <Text style={styles.text}>{title}</Text>
        <Ionicons
          name={iconName}
          size={24}
          color="white"
          style={{
            alignSelf: 'center',
            paddingLeft: iconInFront ? 0 : 10,
            paddingRight: iconInFront ? 10 : 0,
          }}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: GEOMETRIC_BOLD,
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },
  image: {
    width: '200%',
    aspectRatio: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 10000,
    paddingHorizontal: 5,
  },
  maskingView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  maskContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
})
