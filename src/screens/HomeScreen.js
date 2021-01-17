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
  GET_HOME_QUERIES
} from '../utils/helperFunctions'
import { GET_HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'

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
  publication,
  defaultSections,
  loading,
  refetch,
  reorderHomeSection,
}) => {
  const [offset, setOffset] = useState(0)
  // const [sections, setSections] = useState(defaultSections)

  const handleScroll = scrollData => {
    setOffset(scrollData.nativeEvent.contentOffset.y)
  }

  // TODO (liz): defaultSections cannot be stored inside useState
  // otherwise, redux won't update it for some reasons
  // a quick fix I can think of is to put this function inside HomeScreenComp
  // and pass the ordered sections to this component
  const loadHomeSectionOrder = async () => {
    let order = await Storage.getItem(
      GET_HOME_FEED_ORDER_KEY(publication)
    )
    if (order == null) return
    if (order == GET_HOME_SECTIONS(publication)) return

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

  // useEffect(() => {
  //   loadHomeSectionOrder()
  // }, [reorderHomeSection])

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
          <HeadlineArticle
            data={centerArticles[0]}
            publication={publication}
          />
        </TouchableOpacity>

        <HeaderLine publication={publication} />
        <SectionHeader
          title="Top Stories"
          publication={publication}
        />
        <HorizontalArticleCarousel
          articles={topArticles}
          navigateToArticleScreen={PARTIAL_NAVIGATE(
            navigation,
            'HomeArticle',
            NAVIGATE_TO_ARTICLE_SCREEN
          )}
          publication={publication}
        />

        {defaultSections.map((el, i) => {
          const { name, articles } = el
          return (
            <View key={i}>
              <HeaderLine publication={publication} />
              <SectionHeader
                title={GET_HOME_SECTION_NAME(
                  publication,
                  name
                )}
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
      <CustomHeader
        publication={publication}
        contentOffset={offset}
      />
    </View>
  )
}

const HomeScreenComp = ({ navigation, publication, reorderHomeSection }) => {
  console.log(`current publication is ${publication}`)
  console.log(`current reorderHomeSection is ${reorderHomeSection}`)

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

  const { loading, error, data, refetch } = useQuery(GET_HOME_QUERIES(publication))

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
    centerpiece: centerArticles,
    top: topArticles,
  } = data

  const defaultSections = HOME_SECTIONS.map(section => ({
    name: section,
    articles: data[section],
  }))

  return (
    <HomeView
      centerArticles={centerArticles}
      topArticles={topArticles}
      navigation={navigation}
      publication={publication}
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
