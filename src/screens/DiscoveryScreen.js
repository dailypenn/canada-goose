import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import { TouchableOpacity } from 'react-native'

import { ARTICLES_SEARCH, SECTIONS } from '../utils/constants'
import {
  SectionHeader,
  SearchArticleList,
  DiscoveryCell,
  ActivityIndicator,
  SearchBar
} from '../components'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN
} from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20
  }
})

const DiscoveryView = ({ navigation, publicationState }) => {
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

export const DiscoveryScreen = ({ navigation, screenProps }) => {
  // const [filter, setFilter] = useState('')

  const publicationState = screenProps.state

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar publication={publicationState} navigation={navigation} />
      <DiscoveryView
        navigation={navigation}
        publicationState={publicationState}
      />
    </SafeAreaView>
  )
}
