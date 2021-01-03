import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Grid from 'react-native-grid-component'
import { IMAGE_URL } from '../../utils/helperFunctions'
import { DiscoveryCell } from './DiscoveryCell'

const _renderItem = (data, i) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => navigate(data.name)}
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
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9
  },
  list: {
    flex: 1,
    paddingHorizontal: 10
  }
})

let navigate = () => {}

export const DiscoveryGrid = ({ sections, navigateToSectionScreen }) => {
  navigate = navigateToSectionScreen
  return (
    <View style={{ padding: 0 }}>
      <Grid
        style={styles.list}
        renderItem={_renderItem}
        renderPlaceholder={_renderPlaceholder}
        data={sections}
        numColumns={2}
      />
    </View>
  )
}
