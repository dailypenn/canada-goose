import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'
import { GEOMETRIC_BOLD } from '../utils/fonts'

const styles = StyleSheet.create({
  title: {
    fontFamily: GEOMETRIC_BOLD,
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#fff',
  },
  view: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
})

const viewStyle = publication => {
  return {
    ...{ backgroundColor: PublicationPrimaryColor(publication) },
    ...styles.view,
  }
}

export const CategoryTag = ({ name, publication }) => (
  <View style={viewStyle(publication)}>
    <Text style={styles.title}>{name}</Text>
  </View>
)
