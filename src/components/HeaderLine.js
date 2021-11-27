import React from 'react'
import { View, StyleSheet } from 'react-native'

import { PublicationPrimaryColor } from '../utils/branding'

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    marginTop: 5,
    paddingTop: 0,
    flexDirection: 'row',
  },
  coloredLine: {
    width: 120,
    height: 4,
  },
})

const lineStyle = publication => {
  return {
    ...{ backgroundColor: PublicationPrimaryColor(publication) },
    ...styles.coloredLine,
  }
}

export const HeaderLine = ({ publication }) => (
  <View style={styles.view}>
    <View style={lineStyle(publication)} />
    <View
      style={{
        borderTopColor: '#CCC',
        borderTopWidth: 2,
        flex: 1,
      }}
    />
  </View>
)
