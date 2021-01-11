import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'
import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_REGULAR,
  BODY_SERIF
} from '../utils/fonts'
import { TIME_AGO } from '../utils/helperFunctions'

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontFamily: DISPLAY_SERIF_BOLD,
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: 20
  },
  abstract: {
    color: '#888',
    fontFamily: BODY_SERIF,
    flex: 100,
    fontSize: 14,
    paddingTop: 10
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 2,
    aspectRatio: 1.6
  },
  container: {
    //backgroundColor: 'rgba(220, 220, 220, 1.0)',
    padding: 20
  }
})

export const PrimaryHorizontalArticleCell = ({ imageURL, title, abstract }) => {
  var splitAbstract = abstract.split('<p>')[1].split('</p>')[0]

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imageURL }} />
        <Text style={styles.title} numberOfLines={5}>
          {title}
        </Text>
        <Text style={styles.abstract}>{splitAbstract}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#CCC',
          borderBottomWidth: 1,
          marginHorizontal: 20
        }}
      />
    </View>
  )
}