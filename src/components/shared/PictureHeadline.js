import React from 'react'
import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { CategoryTag } from './CategoryTag'

import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../../utils/fonts'

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    paddingHorizontal: 15,
  },

  headline: {
    color: '#fff',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    flexShrink: 1,
    lineHeight: 35,
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
  },
})

export const PictureHeadline = ({ headline, category, time, imageUrl, publication }) => (
  <View style={styles.view}>
    <ImageBackground style={styles.imageBackground} source={{ uri: imageUrl }}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.spacer} />
      <View style={{ flexDirection: 'row' }}>
        <CategoryTag
            name={category}
            publication={publication}
        />
        <View style={styles.spacer} />
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.headline} numberOfLines={4}>
        {headline}
      </Text>
    </ImageBackground>
  </View>
)
