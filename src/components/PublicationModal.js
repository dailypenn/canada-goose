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
  console.log(navigation)
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      margin: 0,
    },
    view: {
      backgroundColor: 'white',
      height: 300,
      width: '100%',
    },
  })

  const SCREEN_DIMENSIONS = Dimensions.get('screen')

  const onSwipeStart = () => {}

  const onSwipeComplete = () => {}

  const modalOptions = {
    isVisible: isVisible,
    hideModalContentWhileAnimating: true,
    deviceWidth: SCREEN_DIMENSIONS.width,
    deviceHeight: SCREEN_DIMENSIONS.height,
    swipeDirection: 'down',
    onSwipeComplete: toggleVisibility,
  }

  return (
    <Modal {...modalOptions}>
      <View style={styles.view}>
        <Button title="Cancel that shit" onPress={() => toggleVisibility()} />
      </View>
    </Modal>
  )
}
