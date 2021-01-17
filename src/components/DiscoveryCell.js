import React from 'react'
import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { GEOMETRIC_BOLD } from '../utils/fonts'

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    aspectRatio: 4 / 3,
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#f00',
    overflow: 'hidden',
  },
  category: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: GEOMETRIC_BOLD,
    fontWeight: 'bold',
    opacity: 1.0,
  },
  spacer: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '75%',
  },
})

export const DiscoveryCell = ({ imageURL, category }) => {
  return (
    <ImageBackground style={styles.imageBackground} source={{ uri: imageURL }}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.5)']}
        style={styles.gradient}
      />
      <View style={styles.spacer}></View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.spacer}></View>
      </View>
    </ImageBackground>
  )
}
