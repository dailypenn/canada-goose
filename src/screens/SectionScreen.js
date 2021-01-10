import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { useQuery } from '@apollo/client'

import { ActivityIndicator, ArticleList } from '../components'
import { SECTIONS_QUERY } from '../utils/constants'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN
} from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const SectionView = ({ articles, publication, navigation }) => (
  <View style={styles.container}>
    <ScrollView scrollEventThrottle={16}>
      <ArticleList
        articles={articles}
        navigateToArticleScreen={PARTIAL_NAVIGATE(
          navigation,
          publication,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        )}
      />
    </ScrollView>
  </View>
)

export const SectionScreen = ({ route, navigation, screenProps }) => {
  const publicationState = screenProps.state
  const { slug } = route.params
  const { loading, error, data } = useQuery(SECTIONS_QUERY, {
    variables: { section: slug }
  })

  if (loading) return <ActivityIndicator />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const { edges: articles } = data.articles

  return (
    <SectionView
      articles={articles}
      publication={publicationState}
      navigation={navigation}
    />
  )
}
