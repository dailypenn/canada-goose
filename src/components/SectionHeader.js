import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'
import { DISPLAY_SERIF_BLACK, GEOMETRIC_BOLD } from '../utils/fonts'

const styles = StyleSheet.create({
  title: {
    fontFamily: DISPLAY_SERIF_BLACK,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 0,
    lineHeight: 35,
  },
  view: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})

const titleStyle = publication => {
  return {
    ...{ color: PublicationPrimaryColor(publication) },
    ...styles.title,
  }
}

export const SectionHeader = ({ title, publication }) => (
  <View style={styles.view}>
    <Text style={titleStyle(publication)}>{title}</Text>
  </View>
)
