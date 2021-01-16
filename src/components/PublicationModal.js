import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

import { PublicationPrimaryColor } from '../utils/branding'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { PublicationEnum } from '../utils/constants'
import { switchPublication } from '../actions'

const SCREEN_DIMENSIONS = Dimensions.get('screen')
const PUBLICATIONS = [
  PublicationEnum.dp,
  PublicationEnum.street,
  PublicationEnum.utb,
]

const PublicationOption = ({ publication, isCurrent }) => {
  const TEXT_COLOR = PublicationPrimaryColor(publication)

  const styles = StyleSheet.create({
    container: {
      height: 70,
      width: '100%',
      borderRadius: 5,
      marginBottom: 15,
      justifyContent: 'flex-start' || 'center',
      alignContent: 'center',
      padding: 10,
      flexDirection: 'row',
    },
    publicationTitle: {
      textTransform: 'uppercase',
      fontFamily: GEOMETRIC_BOLD,
      fontSize: 16,
      lineHeight: 20,
      color: TEXT_COLOR,
    },
    subtitle: {
      fontFamily: GEOMETRIC_REGULAR,
      fontSize: 12,
      lineHeight: 14,
      color: TEXT_COLOR,
    },
    imagePlaceholder: {
      backgroundColor: TEXT_COLOR,
      aspectRatio: 1,
      marginRight: 10,
      borderRadius: 10,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />
      {/* Eventually will be repleaced with logos. TODO */}
      <View>
        <Text style={styles.publicationTitle}>{publication}</Text>
        <Text style={styles.subtitle}>{isCurrent ? 'Selected' : 'Switch'}</Text>
      </View>
    </View>
  )
}

const PublicationModalComp = ({
  navigation,
  publication,
  dispatchSwitchPublication,
}) => {
  const [isVisible, updateVisibility] = useState(false) // Whether or not the modal is visible
  const [currentlySwiping, updateSwipeStatus] = useState(false) // Flags when swipes have started, but this is not blocking out touchable opacity presses :(

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      updateVisibility(true)
    })

    return unsubscribe
  }, [navigation])

  // Function called when user selects a new publication
  const selectedPublication = pub => {
    if (!currentlySwiping) {
      if (pub != publication) {
        dispatchSwitchPublication(pub)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }
      updateVisibility(false)
    }
  }

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
      height: 370,
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
    swipeDirection: ['down'],
    onSwipeMove: () => updateSwipeStatus(true), // Block
    onSwipeCancel: () => setTimeout(() => updateSwipeStatus(false), 100), // Ensures no accidental press
    onSwipeComplete: () => updateVisibility(false),
    onBackButtonPress: () => updateVisibility(false),
    backdropOpacity: 0.85,
    styles: styles.container,
  }

  return (
    <Modal {...modalOptions}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.view}>
        <View style={styles.bar} />

        {PUBLICATIONS.map((el, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => selectedPublication(el)}
            disabled={currentlySwiping}
          >
            <PublicationOption
              publication={el}
              isCurrent={el == publication}
              id={index}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  )
}

const mapStateToProps = ({ publication }) => ({ publication })

const mapDispatchToProps = dispatch => ({
  dispatchSwitchPublication: publication =>
    dispatch(switchPublication(publication)),
})

export const PublicationModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationModalComp)
