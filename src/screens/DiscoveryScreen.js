import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import { TouchableOpacity } from 'react-native'

import { SECTIONS } from '../utils/constants'
import { DiscoveryCell, SearchBar } from '../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20
  }
})

const DiscoveryView = ({ navigation }) => {
  const navigateToSectionScreen = (section, slug) => {
    navigation.navigate('Section', {
      sectionName: section,
      slug
    })
  }

  return (
    <FlatGrid
      // ListHeaderComponent={
      //   <SectionHeader
      //     title="Top Sections"
      //     publication={publicationState.currPublication}
      //   />
      // }
      // ListHeaderComponentStyle={styles.container}
      data={SECTIONS}
      renderItem={({ item, i }) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigateToSectionScreen(item.name, item.slug)}
          style={styles.item}
          key={i}
        >
          <DiscoveryCell category={item.name} imageURL={item.image} />
        </TouchableOpacity>
      )}
    />
  )
}

export const DiscoveryScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <SearchBar navigation={navigation} />
    <DiscoveryView navigation={navigation} />
  </SafeAreaView>
)
