import React, { useCallback, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'

import { ArticleList, LogoActivityIndicator } from '../components'
import { SECTIONS_QUERY } from '../utils/queries'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN
} from '../utils/helperFunctions'
import { updateNavigation } from '../actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const SectionScreenComp = ({
  route,
  navigation,
  currPublication,
  dispatchUpdateNavigation
}) => {
  const { slug } = route.params

  const { loading, error, data, refetch } = useQuery(SECTIONS_QUERY, {
    variables: { section: slug, publication: currPublication },
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    dispatchUpdateNavigation(navigation)

    return () => {
      dispatchUpdateNavigation(null)
    }
  }, [])

  // useEffect(() => {
  //   if (data) {
  //     console.log(`refetching ${slug} screen article`)
  //     refetch()
  //   }
  // }, [])

  // useFocusEffect(
  //   useCallback(() => {

  //   }, [])
  // )

  // const onRefresh = useCallback(() => {
  //   refetch()
  // })

  if (!data) return <LogoActivityIndicator />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const { sectionArticles: articles } = data

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
      }
    >
      <ArticleList
        articles={articles}
        navigateToArticleScreen={PARTIAL_NAVIGATE(
          navigation,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        )}
        publication={currPublication}
      />
    </ScrollView>
  )
}

const mapStateToProps = ({ publication }) => {
  const { currPublication } = publication

  return { currPublication }
}

const mapDispatchToProps = dispatch => ({
  dispatchUpdateNavigation: navigation => dispatch(updateNavigation(navigation))
})

export const SectionScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionScreenComp)
