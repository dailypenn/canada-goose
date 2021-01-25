import React, { useEffect, useState } from 'react'
import { View, Image, Animated, StyleSheet } from 'react-native'

export const LogoActivityIndicator = () => {
  const DP_LOGO = require('../static/logos/dp-logo-small-grey.png')
  const PLUS = require('../static/misc/plus.png')
  const [rotation] = useState(new Animated.Value(0))
  const degrees = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    )

    animation.start()

    return () => {
      animation.stop()
    }
  })

  return (
    <>
      <View style={{ flex: 1 }} />
      <View style={styles.container}>
        <Image source={DP_LOGO} style={styles.logo} />
        <Animated.Image
          source={PLUS}
          style={[styles.plus, { transform: [{ rotate: degrees }] }]}
        ></Animated.Image>
      </View>
      <View style={{ flex: 1 }} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 98,
    height: 100,
    opacity: 0.8,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    padding: 15,
    paddingLeft: 10,
    paddingRight: 12,
    flexDirection: 'row',
  },
  logo: {
    height: 50,
    width: 55,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 8,
    paddingRight: 10,
  },
  plus: {
    width: 18,
    height: 18,
    alignSelf: 'center',
  },
})
