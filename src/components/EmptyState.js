import React, { useContext } from 'react'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { PublicationEnum } from '../utils/constants'
import { BODY_SERIF } from '../utils/fonts'
import { ThemeContext } from './ThemeProvider'

const createStyles = (theme) => StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.45,
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
    color: theme.secondaryTextColor,
    width: '180%',
    marginTop: 20,
    fontSize: 16,
    fontFamily: BODY_SERIF,
    textAlign: 'center',
  },
})

export const EmptyStateEnum = Object.freeze({
  error: 'error',
  search: 'search',
  empty: 'empty',
})

export const EmptyState = ({ publication, type, caption }) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  let image;

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
