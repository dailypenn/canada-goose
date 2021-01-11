import React from 'react'
import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { CategoryTag } from './CategoryTag'
import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../utils/fonts'

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    paddingHorizontal: 15,
  },

  headline: {
    color: '#fff',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    flexShrink: 1,
    lineHeight: 30,
  },

  blackHeadline: {
    color: '#000',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    flexShrink: 1,
    lineHeight: 30,
  },

  category: {
    color: '#fff',
    fontFamily: GEOMETRIC_REGULAR,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.75,
  },

  time: {
    color: '#fff',
    fontFamily: GEOMETRIC_BOLD,
    textTransform: 'uppercase',
    fontSize: 14,
    opacity: 0.75,
  },

  blackTime: {
    color: '#000',
    fontFamily: GEOMETRIC_BOLD,
    textTransform: 'uppercase',
    fontSize: 14,
    opacity: 0.75,
  },

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '75%',
  },

  spacer: {
    flex: 1,
  },

  view: {
    width: '100%',
    aspectRatio: 0.9,
    backgroundColor: '#fff',
  },
})

export const PictureHeadline = ({
  headline,
  category,
  time,
  imageUrl,
  publication,
}) => {
  if (imageUrl == "https://snworksceo.imgix.net/dpn/null.sized-1000x1000.null?w=1000" || imageUrl == "https://snworksceo.imgix.net/dpn/.sized-1000x1000.?w=1000") {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ padding: 15 }}>
          <View style={styles.spacer} />
          <View style={{ flexDirection: 'row' }}>
            <CategoryTag name={category} publication={publication} />
            <View style={styles.spacer} />
            <Text style={styles.blackTime}>{time}</Text>
          </View>
          <Text style={styles.blackHeadline} numberOfLines={4}>
            {headline}
          </Text>
          <View
            style={{
              borderBottomColor: '#CCC',
              borderBottomWidth: 1,
            }}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.view}>
        <ImageBackground style={styles.imageBackground} source={{ uri: imageUrl }}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.spacer} />
          <View style={{ flexDirection: 'row' }}>
            <CategoryTag name={category} publication={publication} />
            <View style={styles.spacer} />
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.headline} numberOfLines={4}>
            {headline}
          </Text>
        </ImageBackground>
      </View>
    )
  }
}
