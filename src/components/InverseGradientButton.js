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

export const InverseGradientButton = ({
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
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        activeOpacity={0.8}
        onPress={onButtonPress}
      >
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row-reverse',
            width: '100%',
            height: '100%',
          }}
        >
          <Text style={styles.text}>{title}</Text>
          <Ionicons
            name={iconName}
            size={24}
            color="#AAA"
            style={{
              alignSelf: 'center',
              paddingLeft: iconInFront ? 0 : 10,
              paddingRight: iconInFront ? 10 : 0,
            }}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: GEOMETRIC_BOLD,
    fontSize: 24,
    color: '#AAA',
    alignSelf: 'center',
  },
})
