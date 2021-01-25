import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  AppState,
  Animated,
  Image,
} from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import {
  SectionHeader,
  HeadlineArticle,
  HorizontalArticleCarousel,
  ArticleList,
  ActivityIndicator,
  HeaderLine,
  EmptyState,
  LogoActivityIndicator,
} from '../components'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
  GET_HOME_SECTIONS,
  GET_HOME_SECTION_NAME,
  GET_HOME_QUERIES,
} from '../utils/helperFunctions'
import { GET_HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'
import { PublicationEnum } from '../utils/constants'
import { toggleScrollToTop } from '../actions'
import { EmptyStateEnum } from '../components/EmptyState'
import { PublicationPrimaryColor } from '../utils/branding'
import { GEOMETRIC_BOLD } from '../utils/fonts'
import { publicationAnalytics } from '../utils/analytics'

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
  scrollToTop,
  dispatchToggleScrollToTop,
}) => {
  const scrollViewRef = useRef(null)
  const { centerpiece: centerArticles, top: topArticles } = data

  const sectionData = homeSections.map(section => ({
    name: section,
    articles: data[section],
  }))

  const onRefresh = useCallback(() => {
    refetch()
  })

  //Header consts
  const [scrollY, setScrollY] = useState(new Animated.Value(0))
  const minScroll = 10
  const AnimatedHeaderHeight = getStatusBarHeight(true) + 50
  const negativeHeaderHeight =
    Platform.OS === 'android'
      ? -AnimatedHeaderHeight
      : -(AnimatedHeaderHeight - getStatusBarHeight(true))
  const clampedScrollY = scrollY.interpolate({
    inputRange: [minScroll, minScroll + 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  })
  const minusScrollY = Animated.multiply(clampedScrollY, -1)
  const translateY = Animated.diffClamp(minusScrollY, negativeHeaderHeight, 0)
  const opacity = translateY.interpolate({
    inputRange: [negativeHeaderHeight, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const DP_HEADER_LOGO = require('../static/logos/dp-logo-large-black.png')
  const ST_HEADER_LOGO = require('../static/logos/34st-header.png')
  const UTB_HEADER_LOGO = require('../static/logos/utb-logo-large-black.png')

  const GET_HEADER_LOGO = () => {
    switch (publication) {
      case PublicationEnum.dp:
        return DP_HEADER_LOGO
      case PublicationEnum.street:
        return ST_HEADER_LOGO
      default:
        return UTB_HEADER_LOGO
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (scrollToTop && scrollViewRef) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0 })
        dispatchToggleScrollToTop()
        // refetch()
      }
    }, [scrollToTop])
  )

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            height: AnimatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 2,
            backgroundColor: '#fff',
            borderBottomColor: '#AAA',
            borderBottomWidth: 1,
          },
          { transform: [{ translateY: translateY }] },
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          {
            height: AnimatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 3,
            backgroundColor: '#fff',
            alignItems: 'center',
            //justifyContent: "center",
            borderBottomColor: '#DDD',
            borderBottomWidth: 1,
            paddingVertical: 4,
            opacity: opacity,
            //paddingTop: getStatusBarHeight(true) + 12,
            ...Platform.select({
              ios: {
                paddingTop: getStatusBarHeight(true) + 10,
              },
              android: {
                paddingTop: getStatusBarHeight(true),
              },
            }),
          },
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <View style={{ height: 28 }}>
          <Image
            source={GET_HEADER_LOGO()}
            style={{ flex: 1, resizeMode: 'contain' }}
          />
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={{
          paddingTop: Platform.select({
            android: 0, //AnimatedHeaderHeight,
            ios: 0,
          }),
        }}
        contentInset={{ top: AnimatedHeaderHeight }}
        contentOffset={{
          x: 0,
          y: Platform.select({ android: 0, ios: -AnimatedHeaderHeight }),
        }}
        contentContainerStyle={{
          paddingTop: Platform.select({
            android: AnimatedHeaderHeight,
            ios: 0,
          }),
        }}
        automaticallyAdjustContentInsets={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            progressViewOffset={AnimatedHeaderHeight}
          />
        }
        ref={scrollViewRef}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            NAVIGATE_TO_ARTICLE_SCREEN(navigation, 'HomeArticle', {
              article: centerArticles[0],
            })
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
      </Animated.ScrollView>
    </View>
  )
}

const HomeScreenComp = ({
  navigation,
  currPublication,
  scrollToTop,
  settings,
  dispatchToggleScrollToTop,
}) => {
  // const [lastActiveTime, setLastActiveTime] = useState(Date.now())
  const appState = useRef(AppState.currentState)
  const [appStateState, setAppStateState] = useState(appState.current)
  const { homeSectionPreferences, _ } = settings

  let homeSections =
    homeSectionPreferences == null ||
    homeSectionPreferences[currPublication] == null
      ? GET_HOME_SECTIONS(currPublication)
      : homeSectionPreferences[currPublication]

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
    console.log('LOGGING EVENT: PUBLICATION READ', currPublication)
    publicationAnalytics(currPublication)
  }, [currPublication])

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const { loading, error, data, refetch } = useQuery(
    GET_HOME_QUERIES(currPublication)
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

  if (error) {
    console.log(error)
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <EmptyState
          {...{
            publication: currPublication,
            type: EmptyStateEnum.error,
            caption:
              'Uh oh! We are unable to load your content. Please check your connection and try again.',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            refetch()
          }}
          style={{
            activeOpacity: 0.8,
            width: 100,
            height: 50,
            backgroundColor: PublicationPrimaryColor(currPublication),
            marginTop: 30,
            borderRadius: 10,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: 18,
              fontFamily: GEOMETRIC_BOLD,
              color: 'white',
            }}
          >
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  if (!data) return <LogoActivityIndicator />

  let HOME_SECTIONS = GET_HOME_SECTIONS(currPublication)

  const { centerpiece: centerArticles, top: topArticles } = data

  const defaultSections = HOME_SECTIONS.map(section => ({
    name: section,
    articles: data[section],
  }))

  return (
    <HomeView
      navigation={navigation}
      publication={currPublication}
      homeSections={homeSections}
      data={data}
      loading={loading}
      refetch={refetch}
      scrollToTop={scrollToTop}
      dispatchToggleScrollToTop={dispatchToggleScrollToTop}
    />
  )
}

const mapStateToProps = ({ publication, settings }) => {
  const { currPublication, scrollToTop } = publication

  return { currPublication, scrollToTop, settings }
}

const mapDispatchToProps = dispatch => ({
  dispatchToggleScrollToTop: () => dispatch(toggleScrollToTop()),
})

export const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenComp)
