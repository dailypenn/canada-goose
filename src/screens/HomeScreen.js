import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  AppState,
} from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import { HOME_PAGE_QUERY } from '../utils/constants'
import {
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
} from '../utils/helperFunctions'
import { GET_HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'
import { useFocusEffect } from '@react-navigation/core'

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
  centerArticles,
  topArticles,
  navigation,
  publicationState,
  defaultSections,
  loading,
  refetch,
  reorderHomeSection,
}) => {
  const [offset, setOffset] = useState(0)
  const [sections, setSections] = useState(defaultSections)

  const handleScroll = scrollData => {
    setOffset(scrollData.nativeEvent.contentOffset.y)
  }

  const loadHomeSectionOrder = async () => {
    let order = await Storage.getItem(
      GET_HOME_FEED_ORDER_KEY(publicationState.currPublication)
    )
    if (order == null) return
    if (order == GET_HOME_SECTIONS(publicationState.currPublication)) return

    let newSections = []
    order.forEach(section => {
      defaultSections.forEach(item => {
        if (section == item.name) {
          newSections.push(item)
        }
      })
    })

    setSections(newSections)
  }

  useEffect(() => {
    loadHomeSectionOrder()
  }, [reorderHomeSection])

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
              centerArticles[0].article,
              publicationState
            )
          }
        >
          <HeadlineArticle
            data={centerArticles[0]}
            publication={publicationState.currPublication}
          />
        </TouchableOpacity>

        <HeaderLine publication={publicationState.currPublication} />
        <SectionHeader
          title="Top Stories"
          publication={publicationState.currPublication}
        />
        <HorizontalArticleCarousel
          articles={topArticles}
          navigateToArticleScreen={PARTIAL_NAVIGATE(
            navigation,
            publicationState,
            'HomeArticle',
            NAVIGATE_TO_ARTICLE_SCREEN
          )}
          publication={publicationState.currPublication}
        />

        {sections.map((el, i) => {
          const { name, articles } = el
          return (
            <View key={i}>
              <HeaderLine publication={publicationState.currPublication} />
              <SectionHeader
                title={GET_HOME_SECTION_NAME(
                  publicationState.currPublication,
                  name
                )}
                publication={publicationState.currPublication}
              />
              <ArticleList
                articles={articles}
                navigateToArticleScreen={PARTIAL_NAVIGATE(
                  navigation,
                  publicationState,
                  'HomeArticle',
                  NAVIGATE_TO_ARTICLE_SCREEN
                )}
              />
            </View>
          )
        })}
      </ScrollView>
      <CustomHeader
        publicationState={publicationState}
        contentOffset={offset}
      />
    </View>
  )
}

const HomeScreenComp = ({ navigation, publication, reorderHomeSection }) => {
  // const publicationState = screenProps.state
  console.log(`current publication is ${publication}`)
  console.log(`current reorderHomeSection is ${reorderHomeSection}`)

  const publicationState = {
    currPublication: 'The Daily Pennsylvanian',
  }

  const [lastActiveTime, setLastActiveTime] = useState(Date.now())
  const appState = useRef(AppState.currentState)
  const [appStateState, setAppStateState] = useState(appState.current)

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
    }

    if (appState.current.match(/active/)) {
      setLastActiveTime(Date.now())
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

  const { loading, error, data, refetch } = useQuery(HOME_PAGE_QUERY)

  useFocusEffect(
    useCallback(() => {
      // if appState === 'active' and last time on home screen is 5 mins ago, do refetch
      console.log('home screen focused')
      console.log(lastActiveTime)
      const timeElapsed = (Date.now() - lastActiveTime) / 1000
      console.log(timeElapsed)
      // if (data && appState.current === 'active' && timeElapsed >= 5) {
      //   console.log('refetching')
      //   refetch()
      // }

      console.log(Boolean(data))

      if (data) {
        console.log('refetching home screen articles')
        refetch()
      }

      return () => {
        console.log('home screen blurred')
        console.log(Date.now())
        setLastActiveTime(Date.now())
      }
    }, [])
  )

  // useFocusEffect(() => {
  //   const timeElapsed = (Date.now() - lastActiveTime) / 1000
  //   console.log(timeElapsed)

  //   if (data && appState.current === 'active' && timeElapsed >= 5) {
  //     console.log('refetching home screen articles')
  //     refetch()
  //   }

  //   // if (data) {
  //   //   console.log(`refetching home screen articles`)
  //   //   refetch()
  //   // }

  //   // return () => {
  //   //   console.log(Date.now())
  //   //   setLastActiveTime(Date.now())
  //   // }
  // }, [])

  if (!data) return <ActivityIndicator />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  let HOME_SECTIONS = GET_HOME_SECTIONS(publication)

  const {
    centerpiece: { edges: centerArticles },
    top: { edges: topArticles },
  } = data

  const defaultSections = HOME_SECTIONS.map(section => ({
    name: section,
    articles: data[section].edges,
  }))

  return (
    <HomeView
      centerArticles={centerArticles}
      topArticles={topArticles}
      navigation={navigation}
      publicationState={publicationState}
      defaultSections={defaultSections}
      loading={loading}
      refetch={refetch}
      reorderHomeSection={reorderHomeSection}
    />
  )
}

const mapStateToProps = ({ publication, reorderHomeSection }) => ({
  publication,
  reorderHomeSection,
})

export const HomeScreen = connect(mapStateToProps)(HomeScreenComp)
