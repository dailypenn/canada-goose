import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import * as Haptics from 'expo-haptics'
import Modal from 'react-native-modal'
import { Dimensions } from 'react-native'

export const PublicationModal = ({ screenProps, navigation }) => {
  const { currPublication, switchPublication } = screenProps

  const [isVisible, updateVisibility] = useState(false)

  const toggleVisibility = () => {
    updateVisibility(!isVisible)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      toggleVisibility()
    })

    return unsubscribe
  }, [navigation])

  const SCREEN_DIMENSIONS = Dimensions.get('screen')

  const onSwipeStart = () => {}

  const onSwipeComplete = () => {}

  const styles = StyleSheet.create({
    bar: {
      color: 'grey',
    },
    container: {
      margin: 0,
      justifyContent: 'flex-end',
      alignContent: 'center',
    },
    view: {
      backgroundColor: 'white',
      width: SCREEN_DIMENSIONS.width,
      height: 400,
      alignSelf: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      bottom: -20,
    },
  })

  const modalOptions = {
    isVisible: isVisible,
    hideModalContentWhileAnimating: true,
    deviceWidth: SCREEN_DIMENSIONS.width,
    deviceHeight: SCREEN_DIMENSIONS.height,
    swipeDirection: 'down',
    onSwipeComplete: toggleVisibility,
    backdropOpacity: 0.85,
    styles: styles.container,
  }

  return (
    <Modal {...modalOptions}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.view}>
        <View style={styles.bar} />
      </View>
    </Modal>
  )
}
