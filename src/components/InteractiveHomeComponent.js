import React, { useState } from 'react'
import { TouchableOpacity, Animated, Easing } from 'react-native'

export const InteractiveHomeComponent = ({ touchOpacProps, children }) => {
  const [zoom] = useState(new Animated.Value(1))
  const onPressIn = () => {
    Animated.timing(zoom, {
      toValue: 0.97,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () =>
    Animated.timing(zoom, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()

  return (
    <TouchableOpacity
      {...touchOpacProps}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={{ transform: [{ scale: zoom }] }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  )
}
