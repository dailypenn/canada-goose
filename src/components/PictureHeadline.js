import React, { useState, useContext } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Easing,
  Animated,
  SafeAreaView, Platform
} from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import ImageView from 'react-native-image-viewing'
import { CategoryTag } from './CategoryTag'
import {
  DISPLAY_SERIF_BOLD,
  GEOMETRIC_BOLD,
  GEOMETRIC_REGULAR,
} from '../utils/fonts'
import { ImageBackground } from 'react-native'
import { ThemeContext } from "./ThemeProvider";

const createStyles = (theme) => StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 15,
  },
  picHeadline: {
    color: '#fff',
    fontFamily: DISPLAY_SERIF_BOLD,
    fontSize: 26,
    marginBottom: 20,
    marginTop: 10,
    flexShrink: 1,
    lineHeight: 30,
  },
  noPicHeadline: {
    color: theme.primaryTextColor,
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
    color: theme.primaryTextColor,
    fontFamily: GEOMETRIC_REGULAR,
    textTransform: 'uppercase',
    fontSize: 14,
    opacity: 0.75,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  spacer: {
    flex: 1,
  },
  view: {
    width: '100%',
    backgroundColor: theme.backgroundColor,
  },
  imageMask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  image: { width: '100%', height: '100%' },
})

export const PictureHeadline = ({
  headline,
  category,
  time,
  imageUrl,
  publication,
  photoCred,
  afterPress,
  inArticleView,
}) => {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  const [visible, setIsVisible] = useState(false)
  const [zoom] = useState(new Animated.Value(1.05))

  const onPressIn = () => {
    Animated.timing(zoom, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () =>
    Animated.timing(zoom, {
      toValue: 1.05,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()

  if (
    imageUrl ===
      'https://snworksceo.imgix.net/dpn/null.sized-1000x1000.null?w=1000' ||
    imageUrl === 'https://snworksceo.imgix.net/dpn/.sized-1000x1000.?w=1000'
  ) {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
          <View style={styles.spacer} />
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <CategoryTag name={category} publication={publication} />
            <View style={styles.spacer} />
            <Text style={styles.blackTime}>{time}</Text>
          </View>
          <Text
            style={styles.noPicHeadline}
            numberOfLines={inArticleView ? 10 : 4}
          >
            {headline}
          </Text>
          <View
            style={{
              borderBottomColor: theme.borderColor,
              borderBottomWidth: 1,
            }}
          />
        </View>
      </View>
    )
  } else {
    const child = (
      <>
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
        <Text style={styles.picHeadline} numberOfLines={inArticleView ? 10 : 4}>
          {headline}
        </Text>
      </>
    )

    return (
      <TouchableOpacity
        style={[styles.view, { aspectRatio: inArticleView ? 1.2 : 0.9 }]}
        onPress={() => {
          if (inArticleView) setIsVisible(true)
          else afterPress()
        }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}
      >
        {Platform.OS === 'ios' ? (
          <>
            <MaskedView
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              maskElement={<View style={styles.imageMask} />}
            >
              <Animated.Image
                style={{ ...styles.image, transform: [{ scale: zoom }] }}
                source={{ url: imageUrl }}
              />
            </MaskedView>
            <View style={styles.background}>{child}</View>
          </>
        ) : (
          <ImageBackground style={styles.background} source={{ uri: imageUrl }}>
            {child}
          </ImageBackground>
        )}

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
