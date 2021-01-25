import React, { useEffect, useState } from 'react'
import { View, Image, Animated } from 'react-native'

export const LogoActivityIndicator = () => {
  const DP_LOGO = require('../static/logos/dp-logo-small-grey.png')
  const PLUS = require('../static/misc/plus.png')
  const [rotation] = useState(new Animated.Value(0))
  const degrees = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start()
  })

  return (
    <>
      <View style={{ flex: 1 }} />
      <View
        style={{
          width: 98,
          height: 100,
          justifySelf: 'center',
          opacity: 0.8,
          justifyContent: 'space-between',
          alignSelf: 'center',
          alignContent: 'center',
          borderRadius: 20,
          padding: 15,
          paddingLeft: 10,
          paddingRight: 12,
          flexDirection: 'row',
        }}
      >
        <Image
          source={DP_LOGO}
          style={{
            height: 50,
            width: 55,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: 8,
            paddingRight: 10,
          }}
        />
        <Animated.Image
          source={PLUS}
          style={{
            transform: [{ rotate: degrees }],
            width: 18,
            height: 18,
            alignSelf: 'center',
          }}
        ></Animated.Image>
      </View>
      <View style={{ flex: 1 }} />
    </>
  )
}
