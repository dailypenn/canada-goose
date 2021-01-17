import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'
import { DISPLAY_SERIF_BLACK } from '../utils/fonts'

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
    paddingTop: 5,
  },
})

// const titleStyle = publication => {
//   return {
//     ...{ color: PublicationPrimaryColor(publication) },
//     ...styles.title,
//   }
// }

export const SectionHeader = ({ title }) => (
  <View style={styles.view}>
    <Text style={styles.title}>{title}</Text>
  </View>
)
