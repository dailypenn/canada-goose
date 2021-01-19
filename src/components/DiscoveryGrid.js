import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Grid from 'react-native-grid-component'

import { DiscoveryCell } from './DiscoveryCell'
import { SECTIONS } from '../utils/constants'

const _renderItem = (data, i) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => navigate(data.name, data.slug)}
    style={styles.item}
    key={i}
  >
    <DiscoveryCell category={data.name} imageURL={data.image} />
  </TouchableOpacity>
)

const _renderPlaceholder = i => <View style={styles.item} key={i} />

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 100,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})

let navigate = () => {}

export const DiscoveryGrid = ({ navigateToSectionScreen }) => {
  navigate = navigateToSectionScreen
  return (
    <View style={{ padding: 0 }}>
      <Grid
        style={styles.list}
        renderItem={_renderItem}
        renderPlaceholder={_renderPlaceholder}
        keyExtractor={(item, index) => index}
        data={SECTIONS}
        numColumns={2}
      />
    </View>
  )
}
