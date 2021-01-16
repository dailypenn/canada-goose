import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import * as Haptics from 'expo-haptics'
import Modal from 'react-native-modal'
import { Dimensions } from 'react-native'
import { PublicationPrimaryColor } from '../utils/branding'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PublicationEnum } from '../utils/constants'

const SCREEN_DIMENSIONS = Dimensions.get('screen')
const PUBLICATIONS = [
  PublicationEnum.dp,
  PublicationEnum.street,
  PublicationEnum.utb,
]

const PublicationOption = ({ publication, isCurrent }) => {
  return (
    <TouchableOpacity activeOpacity={isCurrent ? 0.9 : 0.7}>
      <View
        style={{
          height: 70,
          width: '100%',
          backgroundColor: isCurrent
            ? PublicationPrimaryColor(publication)
            : null,
          borderColor: isCurrent ? null : PublicationPrimaryColor(publication),
          borderWidth: isCurrent ? null : 2,
          borderRadius: 5,
          marginBottom: 15,
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            textTransform: 'uppercase',
            fontFamily: GEOMETRIC_BOLD,
            fontSize: 16,
            color: isCurrent ? 'white' : PublicationPrimaryColor(publication),
          }}
        >
          {publication}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const PublicationModal = ({ screenProps, navigation }) => {
  const {
    state: { currPublication, switchPublication },
  } = screenProps

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

  const styles = StyleSheet.create({
    bar: {
      backgroundColor: '#CCC',
      width: 60,
      height: 5,
      alignSelf: 'center',
      borderRadius: 10,
      marginBottom: 20,
    },
    container: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    label: {
      fontFamily: GEOMETRIC_BOLD,
      fontSize: 20,
      color: '#444',
      marginBottom: 10,
    },
    view: {
      backgroundColor: 'white',
      width: SCREEN_DIMENSIONS.width,
      height: 400,
      alignSelf: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      bottom: -20,
      paddingTop: 10,
      paddingHorizontal: 20,
    },
  })

  const modalOptions = {
    isVisible: isVisible,
    hideModalContentWhileAnimating: true,
    deviceWidth: SCREEN_DIMENSIONS.width,
    deviceHeight: SCREEN_DIMENSIONS.height,
    swipeDirection: 'down',
    onSwipeComplete: toggleVisibility,
    onBackButtonPress: toggleVisibility,
    backdropOpacity: 0.85,
    styles: styles.container,
  }

  return (
    <Modal {...modalOptions}>
      <View style={{ flex: 1 }} onPress={() => toggleVisibility()}></View>
      <View style={styles.view}>
        <View style={styles.bar} />
        <Text style={styles.label}>
          <Ionicons name={'sync-circle-outline'} size={20} color="#444" />
          {' Switch Publication'}
        </Text>
        {PUBLICATIONS.map(el => (
          <PublicationOption
            publication={el}
            isCurrent={el == currPublication}
          />
        ))}
      </View>
    </Modal>
  )
}
