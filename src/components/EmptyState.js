import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { PublicationEnum } from '../utils/constants'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'

export const EmptyStateEnum = Object.freeze({
  error: 'error',
  search: 'search',
  empty: 'empty',
})

const enumToString = pub => {
  switch (pub) {
    case PublicationEnum.dp:
      return 'dp'
    case PublicationEnum.street:
      return 'street'
    default:
      return 'utb'
  }
}

export const EmptyState = ({ publication, type, caption }) => {
  let image

  switch (type) {
    case EmptyStateEnum.error:
      switch (publication) {
        case PublicationEnum.dp:
          image = require('../static/empty-states/error/dp.png')
          break
        case PublicationEnum.street:
          image = require('../static/empty-states/error/street.png')
          break
        default:
          image = require('../static/empty-states/error/utb.png')
          break
      }
      break
    case EmptyStateEnum.empty:
      switch (publication) {
        case PublicationEnum.dp:
          image = require('../static/empty-states/empty/dp.png')
          break
        case PublicationEnum.street:
          image = require('../static/empty-states/empty/street.png')
          break
        default:
          image = require('../static/empty-states/empty/utb.png')
          break
      }
      break
    default:
      switch (publication) {
        case PublicationEnum.dp:
          image = require('../static/empty-states/search/dp.png')
          break
        case PublicationEnum.street:
          image = require('../static/empty-states/search/street.png')
          break
        default:
          image = require('../static/empty-states/search/utb.png')
          break
      }
      break
  }

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={{ flex: 1 }} />

      <Text
        style={[
          styles.caption,
          { paddingTop: type == EmptyStateEnum.search ? 20 : 0 },
        ]}
      >
        {caption}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    flexDirection: 'column-reverse',
  },
  caption: {
    width: '200%',
    marginTop: 20,
    fontSize: 14,
    fontFamily: GEOMETRIC_REGULAR,
    color: 'grey',
    textAlign: 'center',
  },
})
