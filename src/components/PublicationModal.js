import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import * as Haptics from 'expo-haptics'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { PublicationPrimaryColor } from '../utils/branding'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'
import { PublicationEnum } from '../utils/constants'
import { switchPublication, toggleScrollToTop } from '../actions'
import { StatusBar } from 'react-native'
import { publicationSwitchAnalytics } from '../utils/analytics'
import { InteractiveHomeComponent } from './InteractiveHomeComponent'

const SCREEN_DIMENSIONS = Dimensions.get('screen')
const PUBLICATIONS = [
  PublicationEnum.dp,
  PublicationEnum.street,
  PublicationEnum.utb,
]

const DP_LOGO_RED = require('../static/logos/dp-logo-small-red.png')
const DP_LOGO_WHITE = require('../static/logos/dp-logo-small-white.png')

const STREET_LOGO_TEAL = require('../static/logos/street-logo-small-teal.png')
const STREET_LOGO_WHITE = require('../static/logos/street-logo-small-white.png')

const UTB_LOGO_BLUE = require('../static/logos/utb-logo-small-blue.png')
const UTB_LOGO_WHITE = require('../static/logos/utb-logo-small-white.png')

const GET_SMALL_LOGO = publication => {
  switch (publication) {
    case PublicationEnum.dp:
      return DP_LOGO_WHITE
    case PublicationEnum.street:
      return STREET_LOGO_WHITE
    default:
      return UTB_LOGO_WHITE
  }
}

const PublicationOption = ({ publication, isCurrent }) => {
  const PUB_CONTENTS = pub => {
    let rtrn = {
      icon: isCurrent ? 'newspaper' : 'push',
      title: pub == PublicationEnum.dp ? 'The DP' : pub,
      color: isCurrent ? 'white' : PublicationPrimaryColor(pub),
      borderColor: isCurrent ? PublicationPrimaryColor(pub) : 'white',
    }
    switch (pub) {
      case PublicationEnum.dp:
        rtrn = {
          ...rtrn,
          ...{
            image: isCurrent ? DP_LOGO_WHITE : DP_LOGO_RED,
            subtitle: 'Student-Run News Since 1885',
          },
        }
        break
      case PublicationEnum.street:
        rtrn = {
          ...rtrn,
          ...{
            image: isCurrent ? STREET_LOGO_WHITE : STREET_LOGO_TEAL,
            subtitle: 'Arts, Culture, and More',
          },
        }
        break
      default:
        rtrn = {
          ...rtrn,
          ...{
            image: isCurrent ? UTB_LOGO_WHITE : UTB_LOGO_BLUE,
            subtitle: "Penn's Only Intentionally Satirical Publication",
          },
        }
    }
    return rtrn
  }

  const CONTENT = PUB_CONTENTS(publication)

  const styles = StyleSheet.create({
    container: {
      height: 65,
      width: '100%',
      borderRadius: 5,
      marginBottom: 10,
      justifyContent: 'flex-start',
      alignContent: 'center',
      paddingHorizontal: 15,
      flexDirection: 'row',
      borderWidth: 3,
      borderColor: CONTENT.borderColor,
      backgroundColor: CONTENT.borderColor,
    },
    border: {
      width: '100%',
      height: '100%',
    },
    publicationTitle: {
      textTransform: 'uppercase',
      fontFamily: GEOMETRIC_BOLD,
      fontSize: 16,
      lineHeight: 20,
      color: CONTENT.color,
    },
    subtitle: {
      fontFamily: GEOMETRIC_REGULAR,
      fontSize: 10,
      lineHeight: 14,
      color: CONTENT.color,
    },
    subContainer: {
      justifyContent: 'center',
    },
    image: {
      height: 50,
      width: 40,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginRight: 20,
      borderRadius: 10,
    },
    icon: {
      alignSelf: 'center',
    },
  })

  return (
    <View style={styles.container}>
      <View styles={styles.border} />
      <Image source={CONTENT.image} style={styles.image} />
      {/* Eventually will be repleaced with logos. TODO */}
      <View style={styles.subContainer}>
        <Text style={styles.publicationTitle}>{CONTENT.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {CONTENT.subtitle}
        </Text>
      </View>
      <View style={{ flex: 1, width: 40 }} />
      <Ionicons
        name={CONTENT.icon}
        size={30}
        color={CONTENT.color}
        style={styles.icon}
      />
    </View>
  )
}

const PublicationModalComp = ({
  navigation,
  publication,
  dispatchSwitchPublication,
  dispatchToggleScrollToTop,
}) => {
  const { currPublication, currNavigation } = publication
  const [isVisible, updateVisibility] = useState(false) // Whether or not the modal is visible
  const [currentlySwiping, updateSwipeStatus] = useState(false) // Flags when swipes have started, but this is not blocking out touchable opacity presses :(

  const [loadingPublication, updateLoadingStatus] = useState(false) // whether or not currently loading publication.
  const [switchPublicationLogo, updateSwitchLogo] = useState(DP_LOGO_WHITE)
  const [switchPublicationColor, updateSwitchColor] = useState('#000')

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      updateVisibility(true)
      updateLoadingStatus(false)
    })

    return unsubscribe
  }, [navigation])

  // Function called when user selects a new publication
  const selectedPublication = pub => {
    if (!currentlySwiping) {
      if (pub != currPublication) {
        publicationSwitchAnalytics(currPublication, pub)

        updateSwitchLogo(GET_SMALL_LOGO(pub))
        updateSwitchColor(PublicationPrimaryColor(pub))

        setTimeout(() => updateVisibility(false), 0)
        setTimeout(() => updateLoadingStatus(true), 500)
        setTimeout(() => updateLoadingStatus(false), 1800)

        setTimeout(() => dispatchSwitchPublication(pub), 800)

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        if (currNavigation) {
          console.log('------dismiss all screens------')
          setTimeout(() => currNavigation.popToTop(), 800)
        }
        setTimeout(() => dispatchToggleScrollToTop(), 1500)
      } else {
        setTimeout(() => updateVisibility(false), 0)
      }
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
    line: {
      marginVertical: 5,
      marginHorizontal: 0,
      borderRadius: 2,
      backgroundColor: '#DDD',
      height: 2,
    },
    view: {
      backgroundColor: 'white',
      width: SCREEN_DIMENSIONS.width,
      height: 300,
      alignSelf: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      bottom: -20,
      paddingTop: 10,
      paddingHorizontal: 10,
    },
  })

  const modalOptions = {
    isVisible: isVisible,
    hideModalContentWhileAnimating: true,
    useNativeDriverForBackdrop: true,
    useNativeDriver: true,
    deviceWidth: SCREEN_DIMENSIONS.width,
    deviceHeight: SCREEN_DIMENSIONS.height,
    swipeDirection: ['down'],
    onSwipeMove: () => {
      updateSwipeStatus(true)
    }, // Block
    onSwipeCancel: () => setTimeout(() => updateSwipeStatus(false), 100), // Ensures no accidental press
    onSwipeComplete: () => updateVisibility(false),
    onBackButtonPress: () => updateVisibility(false),
    backdropOpacity: 0.9,
    styles: styles.container,
  }

  const loadingModalOptions = {
    isVisible: loadingPublication,
    hideModalContentWhileAnimating: true,
    useNativeDriverForBackdrop: true,
    useNativeDriver: true,
    deviceWidth: SCREEN_DIMENSIONS.width,
    deviceHeight: SCREEN_DIMENSIONS.height,
    animationIn: 'fadeIn',
    animationInTiming: 300,
    animationOut: 'fadeOut',
    animationOutTiming: 200,
  }

  return (
    <>
      {isVisible && Platform.OS == 'android' ? (
        <StatusBar backgroundColor={'rgba(0, 0, 0, 1)'} animated={true} />
      ) : null}
      <Modal {...modalOptions} backdropTransitionOutTiming={0}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.view}>
          <View style={styles.bar} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => selectedPublication(currPublication)}
          >
            <PublicationOption publication={currPublication} isCurrent={true} />
          </TouchableOpacity>

          <View style={styles.line} />
          {PUBLICATIONS.map((el, index) => {
            return el == currPublication ? null : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => selectedPublication(el)}
                disabled={currentlySwiping}
                key={index}
              >
                <PublicationOption
                  publication={el}
                  isCurrent={false}
                  key={index}
                />
              </TouchableOpacity>
            )
          })}
        </View>
        {/* <Modal
          {...loadingModalOptions}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            margin: 0,
            backgroundColor: switchPublicationColor,
          }}
          backdropTransitionOutTiming={0}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={switchPublicationLogo}
              style={{
                width: '30%',
                resizeMode: 'contain',
                marginTop: '-40%',
              }}
            />
          </View>
        </Modal> */}
      </Modal>
      <Modal
        {...loadingModalOptions}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          margin: 0,
          backgroundColor: switchPublicationColor,
        }}
        backdropTransitionOutTiming={0}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={switchPublicationLogo}
            style={{
              width: '30%',
              resizeMode: 'contain',
              marginTop: '-40%',
            }}
          />
        </View>
      </Modal>
    </>
  )
}

const mapStateToProps = ({ publication }) => ({ publication })

const mapDispatchToProps = dispatch => ({
  dispatchSwitchPublication: publication =>
    dispatch(switchPublication(publication)),
  dispatchToggleScrollToTop: () => dispatch(toggleScrollToTop()),
})

export const PublicationModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationModalComp)
