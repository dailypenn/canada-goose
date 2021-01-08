import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { PublicationPrimaryColor } from '../../utils/branding'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  view: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
  },
})

const viewStyle = (publication) => {
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
