import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  Animated,
  Image,
  Platform,
  StatusBar, SafeAreaView
} from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { Linking } from 'react-native'
import Constants from 'expo-constants';

import {
  SectionHeader,
  HeadlineArticle,
  HorizontalArticleCarousel,
  ArticleList,
  HeaderLine,
  EmptyState,
  LogoActivityIndicator,
  ThemeContext
} from '../components'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
  GET_HOME_SECTIONS,
  GET_HOME_SECTION_NAME,
  GET_HOME_QUERIES,
  getArticlePubSlug,
} from '../utils/helperFunctions'
import { PublicationEnum } from '../utils/constants'
import { toggleScrollToTop } from '../actions'
import { EmptyStateEnum } from '../components/EmptyState'
import { PublicationPrimaryColor } from '../utils/branding'
import { GEOMETRIC_BOLD } from '../utils/fonts'
import { publicationAnalytics, deepLinkingAnalytics } from '../utils/analytics'

const DP_HEADER_LOGO = require('../static/logos/dp-logo-large-black.png')
const ST_HEADER_LOGO = require('../static/logos/34st-header.png')
const UTB_HEADER_LOGO = require('../static/logos/utb-logo-large-black.png')

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
})

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return Constants.statusBarHeight;
  } else if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  } else {
    return 0;
  }
};

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
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)
  const scrollViewRef = useRef(null)
  const { centerpiece: centerArticles, top: topArticles } = data

  const sectionData = homeSections.map(section => ({
    name: section,
    articles: data[section],
  }))

  const onRefresh = useCallback(() => {
    refetch()
  })

  // Header constants
  const [scrollY, setScrollY] = useState(new Animated.Value(0))
  const minScroll = 10
  const AnimatedHeaderHeight = getStatusBarHeight() + 56
  const negativeHeaderHeight =
    Platform.OS === 'android'
      ? -AnimatedHeaderHeight
      : -(AnimatedHeaderHeight - getStatusBarHeight())
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
      }
    }, [scrollToTop])
  )

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          {
            height: AnimatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 2,
            backgroundColor: theme.backgroundColor
          },
          { transform: [{ translateY: translateY }] },
        ]}
      />
      <Animated.View
        style={[
          {
            height: AnimatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 3,
            backgroundColor: theme.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 6,
            borderBottomWidth: 1,
            borderBottomColor: theme.borderColor,
            opacity: opacity.interpolate({
              inputRange: [0, 0.5, 0.8, 1],
              outputRange: [0, 0, 1, 1],
            }),
            ...Platform.select({
              ios: {
                paddingTop: getStatusBarHeight() + 8,
              },
              android: {
                paddingTop: getStatusBarHeight(),
              },
            }),
          },
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <View style={{ height: 28 }}>
          <Image
            source={GET_HEADER_LOGO()}
            style={{ flex: 1, resizeMode: 'contain', tintColor: theme.primaryTextColor }}
          />
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={{
          paddingTop: Platform.select({
            android: 0,
            ios: 0,
          }),
        }}
        contentInset={{ top: 56 }}
        contentOffset={{
          x: 0,
          y: Platform.select({ android: 0, ios: -AnimatedHeaderHeight }),
        }}
        contentContainerStyle={{
          paddingTop: Platform.select({
            android: AnimatedHeaderHeight - 1,
            ios: 0
          })
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
        <HeadlineArticle
          data={centerArticles[0]}
          publication={publication}
          afterPress={() =>
            NAVIGATE_TO_ARTICLE_SCREEN(navigation, 'HomeArticle', {
              article: centerArticles[0],
            })
          }
          inArticleView={false}
        />

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
    </SafeAreaView>
  )
}

const HomeScreenComp = ({
  navigation,
  currPublication,
  scrollToTop,
  settings,
  dispatchToggleScrollToTop,
}) => {
  const theme = useContext(ThemeContext)
  const { homeSectionPreferences, _ } = settings

  let homeSections =
    homeSectionPreferences == null ||
    homeSectionPreferences[currPublication] == null
      ? GET_HOME_SECTIONS(currPublication)
      : homeSectionPreferences[currPublication]

  useEffect(() => {

    publicationAnalytics(currPublication)
  }, [currPublication])

  const navigate = url => {
    if (url && url.includes('article')) {
      deepLinkingAnalytics()
      const { publication, slug } = getArticlePubSlug(url)
      if (!navigation.isFocused()) {
        navigation.jumpTo('HomeStack')
        setTimeout(() => {
          navigation.push('HomeArticle', {
            articleSlug: slug,
            articlePublication: publication,
          })
        }, 300);
      } else {
        navigation.push('HomeArticle', {
          articleSlug: slug,
          articlePublication: publication,
        })
      }
    }
  }

  useEffect(() => {
    Linking.addEventListener('url', e => navigate(e.url))

    return () => {
      Linking.removeEventListener('url', e => navigate(e.url))
    }
  }, [])

  const { loading, error, data, refetch } = useQuery(
    GET_HOME_QUERIES(currPublication)
  )

  if (error) {
    console.log(error)
    return (
      <View
        style={{
          backgroundColor: theme.wallColor,
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
          onPress={() => refetch()}
          style={{
            activeOpacity: 0.8,
            width: 100,
            height: 50,
            backgroundColor: PublicationPrimaryColor(currPublication),
            marginTop: 20,
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
