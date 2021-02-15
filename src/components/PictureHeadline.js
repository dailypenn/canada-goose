import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ImageView from 'react-native-image-viewing'

import { CategoryTag } from './CategoryTag'
import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../utils/fonts'
import { SafeAreaView } from 'react-native'
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },

  headline: {
    color: '#fff',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 26,
    marginBottom: 20,
    marginTop: 10,
    flexShrink: 1,
    lineHeight: 30,
  },

  blackHeadline: {
    color: '#000',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 26,
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
  isArticleView,
  photoCred,
}) => {
  const [visible, setIsVisible] = useState(false)

  if (
    imageUrl ==
      'https://snworksceo.imgix.net/dpn/null.sized-1000x1000.null?w=1000' ||
    imageUrl == 'https://snworksceo.imgix.net/dpn/.sized-1000x1000.?w=1000'
  ) {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ padding: 15 }}>
          <View style={styles.spacer} />
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <CategoryTag name={category} publication={publication} />
            <View style={styles.spacer} />
            <Text style={styles.blackTime}>{time}</Text>
          </View>
          <Text
            style={styles.blackHeadline}
            numberOfLines={isArticleView ? 10 : 4}
          >
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
      <TouchableOpacity
        style={styles.view}
        onPress={() => {
          setIsVisible(true)
        }}
        activeOpacity={0.9}
      >
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
          <Text style={styles.headline} numberOfLines={isArticleView ? 10 : 4}>
            {headline}
          </Text>
        </ImageBackground>
        <ImageView
          images={[{ uri: imageUrl }]}
          visible={visible}
          imageIndex={0}
          onRequestClose={() => {
            if (imageUrl) setIsVisible(false)
          }}
          FooterComponent={() => (
            <SafeAreaView>
              <Text
                style={{
                  color: 'white',
                  padding: 20,
                  fontFamily: GEOMETRIC_BOLD,
                  shadowRadius: 5,
                  fontSize: 16,
                }}
              >
                {photoCred}
              </Text>
            </SafeAreaView>
          )}
        />
      </TouchableOpacity>
    )
  }
}
