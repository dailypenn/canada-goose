import React, { useCallback } from 'react'
import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'
import { useQuery } from '@apollo/client'

import { ActivityIndicator, ArticleList } from '../components'
import { SECTIONS_QUERY } from '../utils/constants'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN
} from '../utils/helperFunctions'
import { useFocusEffect } from '@react-navigation/core'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export const SectionScreen = ({ route, navigation }) => {
  const { slug } = route.params

  const { loading, error, data, refetch } = useQuery(
    SECTIONS_QUERY,
    {
      variables: { section: slug },
      notifyOnNetworkStatusChange: true
    }
  )

  useFocusEffect(
    useCallback(() => {
      if (data) {
        console.log(`refetching ${slug} screen article`)
        refetch()
      }
    }, [])
  )

  const onRefresh = useCallback(() => {
    refetch()
  })

  if (!data) return <ActivityIndicator />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const { edges: articles } = data.articles

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <ArticleList
        articles={articles}
        navigateToArticleScreen={PARTIAL_NAVIGATE(
          navigation,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        )}
      />
    </ScrollView>
  )
}
