import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { RectButton, Swipeable } from 'react-native-gesture-handler'
import { GEOMETRIC_REGULAR } from '../utils/fonts'

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 14,
    fontFamily: GEOMETRIC_REGULAR,
    padding: 10,
  },
  rightAction: {
    backgroundColor: 'red',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export const RightSwipeDeleteRow = ({ children, deleteHandler }) => {
  let swipeableRow = null
  let button_width = 100

  const renderRightActions = progress => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [button_width, 0],
    })
    const pressHandler = () => {
      deleteHandler()
      swipeableRow.close()
    }
    return (
      <View style={{ width: button_width, flexDirection: 'row' }}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton style={styles.rightAction} onPress={pressHandler}>
            <Text style={styles.actionText}>Delete</Text>
          </RectButton>
        </Animated.View>
      </View>
    )
  }

  return (
    <Swipeable
      ref={ref => (swipeableRow = ref)}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  )
}
