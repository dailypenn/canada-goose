import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { HOME_PAGE_QUERY, HOME_SECTION_TITLES } from '../utils/constants'
import {
  CustomHeader,
  SectionHeader,
  HeadlineArticle,
  HorizontalArticleCarousel,
  ArticleList,
  ActivityIndicator,
} from '../components/shared'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
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
  centerArticles,
  topArticles,
  newsArticles,
  opinionArticles,
  sportsArticles,
  multimediaArticles,
  navigation,
  publicationState,
}) => {
  const [offset, setOffset] = useState(0)

  sections = [
    { name: HOME_SECTION_TITLES.News, articles: newsArticles },
    { name: HOME_SECTION_TITLES.Opinion, articles: opinionArticles },
    { name: HOME_SECTION_TITLES.Sports, articles: sportsArticles },
    { name: HOME_SECTION_TITLES.Multimedia, articles: multimediaArticles },
  ]

  // TODO: this function sld be put in helperFunctions.js

  navigateToArticleScreen = article => {
    navigation.navigate('Article', { article, publicationState })
  }

  const handleScroll = scrollData => {
    setOffset(scrollData.nativeEvent.contentOffset.y)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={event => handleScroll(event)}
        scrollEventThrottle={16}
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
          // onPress={() => navigateToArticleScreen(centerArticles[0].article)}
        >
          <HeadlineArticle
            data={centerArticles[0]}
            publication={publicationState.currPublication}
          />
        </TouchableOpacity>

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
              <SectionHeader
                title={name}
                publication={publicationState.currPublication}
              />
              <ArticleList
                articles={articles}
                navigateToArticleScreen={PARTIAL_NAVIGATE(
                  navigation,
                  publicationState.currPublication,
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

export const HomeScreen = ({ navigation, screenProps }) => {
  const publicationState = screenProps.state
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY)

  if (loading) return <ActivityIndicator />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const {
    centerpiece: { edges: centerArticles },
    top: { edges: topArticles },
    inOtherNews: { edges: newsArticles },
    inOtherOpinion: { edges: opinionArticles },
    inOtherSports: { edges: sportsArticles },
    inOtherMultimedia: { edges: multimediaArticles },
  } = data

  return (
    <HomeView
      centerArticles={centerArticles}
      topArticles={topArticles}
      newsArticles={newsArticles}
      opinionArticles={opinionArticles}
      sportsArticles={sportsArticles}
      multimediaArticles={multimediaArticles}
      navigation={navigation}
      publicationState={publicationState}
    />
  )
}
