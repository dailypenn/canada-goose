import React from 'react'
import { Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { CategoryTag } from './CategoryTag'
import { PublicationPrimaryColor } from '../utils/branding'
import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../utils/fonts'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    aspectRatio: 0.8,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#000'
  },

  imageBackground: {
    flex: 1,
    paddingHorizontal: 15,
  },

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
  },

  textRow: {
    flexDirection: 'row',
  },

  title: {
    color: '#fff',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 20,
    marginBottom: 20,
    marginTop: 12,
    flexShrink: 1,
    lineHeight: 24,
  },

  category: {
    fontFamily: GEOMETRIC_BOLD,
    textTransform: 'uppercase',
    fontSize: 14,
  },

  time: {
    fontFamily: GEOMETRIC_REGULAR,
    textTransform: 'uppercase',
    fontSize: 14,
    color: '#fff',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: 'transparent',
  },

  spacer: {
    flex: 1,
  },
})

const categoryStyle = publication => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.category,
  }
}

const VerticalArticleCard = ({
  category,
  time,
  title,
  imageUrl,
  publication,
}) => {
  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: imageUrl }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.spacer} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CategoryTag name={category} publication={publication} />
            <View style={styles.spacer} />
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.title} numberOfLines={5}>
            {title}
          </Text>
        </ImageBackground>
      </View>
    </View>
  )
}

export default VerticalArticleCard