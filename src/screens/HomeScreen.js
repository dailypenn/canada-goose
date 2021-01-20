import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  RefreshControl,
  AppState,
} from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/core'

import {
  CustomHeader,
  SectionHeader,
  HeadlineArticle,
  HorizontalArticleCarousel,
  ArticleList,
  ActivityIndicator,
  HeaderLine,
} from '../components'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
  GET_HOME_SECTIONS,
  GET_HOME_SECTION_NAME,
  GET_HOME_QUERIES,
} from '../utils/helperFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    color: '#fff',
  },
})

const HomeView = ({
  navigation,
  publication,
  homeSections,
  data,
  loading,
  refetch,
}) => {
  const { centerpiece: centerArticles, top: topArticles } = data

  const sectionData = homeSections.map(section => ({
    name: section,
    articles: data[section],
  }))

  const [offset, setOffset] = useState(0)

  const handleScroll = scrollData => {
    setOffset(scrollData.nativeEvent.contentOffset.y)
  }

  const onRefresh = useCallback(() => {
    refetch()
  })

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={event => handleScroll(event)}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            NAVIGATE_TO_ARTICLE_SCREEN(
              navigation,
              'HomeArticle',
              centerArticles[0]
            )
          }
        >
          <HeadlineArticle data={centerArticles[0]} publication={publication} />
        </TouchableOpacity>

        <HeaderLine publication={publication} />
        <SectionHeader title="Top Stories" publication={publication} />
        <HorizontalArticleCarousel
          articles={topArticles}
          navigateToArticleScreen={PARTIAL_NAVIGATE(
            navigation,
            'HomeArticle',
            NAVIGATE_TO_ARTICLE_SCREEN
          )}
          publication={publication}
        />

        {sectionData.map((el, i) => {
          const { name, articles } = el
          return (
            <View key={i}>
              <HeaderLine publication={publication} />
              <SectionHeader
                title={GET_HOME_SECTION_NAME(publication, name)}
                publication={publication}
              />
              <ArticleList
                articles={articles}
                navigateToArticleScreen={PARTIAL_NAVIGATE(
                  navigation,
                  'HomeArticle',
                  NAVIGATE_TO_ARTICLE_SCREEN
                )}
                publication={publication}
              />
            </View>
          )
        })}
      </ScrollView>
      <CustomHeader publication={publication} contentOffset={offset} />
    </View>
  )
}

const HomeScreenComp = ({ navigation, publication, homeSection }) => {
  // const [lastActiveTime, setLastActiveTime] = useState(Date.now())
  const appState = useRef(AppState.currentState)
  const [appStateState, setAppStateState] = useState(appState.current)

  let homeSections =
    homeSection[publication] == null
      ? GET_HOME_SECTIONS(publication)
      : homeSection[publication]

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
    }

    if (appState.current.match(/active/)) {
      console.log('App has come to the background!')
    }

    appState.current = nextAppState
    setAppStateState(appState.current)
    console.log('AppState', appState.current)
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  useEffect(() => {
    console.log('update homeSection')
    // console.log(homeSection)
    homeSections = homeSection[publication]
  }, [homeSection])

  const { loading, error, data, refetch } = useQuery(
    GET_HOME_QUERIES(publication)
  )

  useFocusEffect(
    useCallback(() => {
      console.log('home screen focused')
      console.log(Boolean(data))

      if (data) {
        console.log('refetching home screen articles')
        refetch()
      }

      return () => {
        console.log('home screen blurred')
      }
    }, [data])
  )

  if (!data) return <ActivityIndicator />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  return (
    <HomeView
      navigation={navigation}
      publication={publication}
      homeSections={homeSections}
      data={data}
      loading={loading}
      refetch={refetch}
    />
  )
}

const mapStateToProps = ({ publication, homeSection }) => ({
  publication,
  homeSection,
})

export const HomeScreen = connect(mapStateToProps)(HomeScreenComp)
