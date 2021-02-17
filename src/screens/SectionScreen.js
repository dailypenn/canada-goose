import React, { useCallback, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'

import {
  ArticleList,
  RenderArticleListItem,
  LogoActivityIndicator,
} from '../components'
import { SECTIONS_QUERY } from '../utils/queries'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
} from '../utils/helperFunctions'
import { updateNavigation } from '../actions'
import { PublicationEnum } from '../utils/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

const SectionScreenComp = ({
  route,
  navigation,
  currPublication,
  dispatchUpdateNavigation,
}) => {
  const { slug } = route.params

  const { loading, error, data, refetch } = useQuery(SECTIONS_QUERY, {
    variables: { section: slug, publication: currPublication },
    notifyOnNetworkStatusChange: true,
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

  const articlesLength = articles.length - 1

  let newData = []
  articles.forEach((el, index) => {
    newData.push({ el: el, i: index })
  })

  const _renderItem = ({ item: { el, i } }) => (
    <RenderArticleListItem
      {...{
        el,
        i,
        articlesLength,
        publication: currPublication,
        navigateToArticleScreen: PARTIAL_NAVIGATE(
          navigation,
          'SectionArticle',
          NAVIGATE_TO_ARTICLE_SCREEN
        ),
      }}
    />
  )

  return (
    <FlatList
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => refetch()} />
      }
      data={newData}
      renderItem={_renderItem}
      keyExtractor={item => {
        item.el.headline
      }}
    ></FlatList>
  )
}

const mapStateToProps = ({ publication }) => {
  const { currPublication } = publication

  return { currPublication }
}

const mapDispatchToProps = dispatch => ({
  dispatchUpdateNavigation: navigation =>
    dispatch(updateNavigation(navigation)),
})

export const SectionScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionScreenComp)
