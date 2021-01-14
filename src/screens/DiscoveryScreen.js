import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'
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
    paddingVertical: 20
  }
})

const DiscoveryView = ({ navigation, publicationState }) => {
  navigateToSectionScreen = (section, slug) => {
    navigation.navigate('Section', {
      sectionName: section,
      slug
    })
  }

  return (
    <FlatGrid
      ListHeaderComponent={
        <SectionHeader
          title="Top Sections"
          publication={publicationState.currPublication}
        />
      }
      ListHeaderComponentStyle={styles.container}
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

const SearchView = ({ filter, publication, navigation }) => {
  const { loading, error, data } = useQuery(ARTICLES_SEARCH, {
    variables: { filter },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) return <ActivityIndicator />

  const { searchArticles: results } = data

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <SectionHeader title="Sections" />
      <SectionHeader title="Articles" />
      <SearchArticleList
        articles={results}
        navigateToArticleScreen={PARTIAL_NAVIGATE(
          navigation,
          publication,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        )}
      />
    </ScrollView>
  )
}

export const DiscoveryScreen = ({ navigation, screenProps }) => {
  const [filter, setFilter] = useState('')

  const publicationState = screenProps.state

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setFilter={setFilter} />
      {Boolean(filter) && (
        <SearchView
          filter={filter}
          publication={publicationState}
          navigation={navigation}
        />
      )}
      {!filter && (
        <DiscoveryView
          navigation={navigation}
          publicationState={publicationState}
        />
      )}
    </SafeAreaView>
  )
}
