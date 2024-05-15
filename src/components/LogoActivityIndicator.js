import React, { useEffect, useState, useContext } from 'react'
import { View, Image, Animated, StyleSheet } from 'react-native'
import { ThemeContext } from "./ThemeProvider"

const createStyles = (theme) => StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: theme.wallColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
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

export const LogoActivityIndicator = () => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

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
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Image source={DP_LOGO} style={styles.logo} />
        <Animated.Image
          source={PLUS}
          style={[styles.plus, { transform: [{ rotate: degrees }] }]}
        ></Animated.Image>
      </View>
    </View>
  )
}
