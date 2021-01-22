import React, { useCallback } from 'react'
import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'

import { ActivityIndicator, ArticleList, DefaultStatusBar } from '../components'
import { SECTIONS_QUERY } from '../utils/queries'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
} from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

const SectionScreenComp = ({ route, navigation, publication }) => {
  const { slug } = route.params

  const { loading, error, data, refetch } = useQuery(SECTIONS_QUERY, {
    variables: { section: slug, publication },
    notifyOnNetworkStatusChange: true,
  })

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

  const { sectionArticles: articles } = data

  return (
    <>
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
          publication={publication}
        />
      </ScrollView>
    </>
  )
}

const mapStateToProps = ({ publication }) => ({ publication })

export const SectionScreen = connect(mapStateToProps)(SectionScreenComp)
