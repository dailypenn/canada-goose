import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
  CustomHeader,
  SectionHeader,
  HeadlineArticle,
  HorizontalArticleCarousel,
  ArticleList
} from '../components/shared'
import { HOME_PAGE_QUERY } from '../utils/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text1: {
    color: '#fff'
  }
})

const HomeLoading = () => {
  return <Text> Loading... </Text>
}

const HomeView = ({
  centerArticles,
  topArticles,
  inOtherNewsArticles,
  inOtherOpinionArticles,
  inOtherSportsArticles,
  inOtherMultimediaArticles,
  navigation,
  publicationState
}) => {
  const [offset, setOffset] = useState(0)

  sections = [
    { name: 'In Other News', articles: inOtherNewsArticles },
    { name: 'In Other Opinion', articles: inOtherOpinionArticles },
    { name: 'In Other Sports', articles: inOtherSportsArticles },
    { name: 'In Other Multimedia', articles: inOtherMultimediaArticles }
  ]

  // TODO: this function sld be put in helperFunctions.js
  navigateToArticleScreen = article => {
    navigation.navigate('Article', { article })
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
          onPress={() => navigateToArticleScreen(centerArticles[0].article)}
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
          navigateToArticleScreen={navigateToArticleScreen}
          publication={publicationState.currPublication}
        />

        {sections.map(el => {
          const { name, articles } = el
          return (
            <View>
              <SectionHeader
                title={name}
                publication={publicationState.currPublication}
              />
              <ArticleList
                articles={articles}
                navigateToArticleScreen={navigateToArticleScreen}
                publication={publicationState.currPublication}
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

  if (loading) return <HomeLoading />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

  const {
    centerpiece: { edges: centerArticles },
    top: { edges: topArticles },
    inOtherNews: { edges: inOtherNewsArticles },
    inOtherOpinion: { edges: inOtherOpinionArticles },
    inOtherSports: { edges: inOtherSportsArticles },
    inOtherMultimedia: { edges: inOtherMultimediaArticles }
  } = data

  return (
    <HomeView
      centerArticles={centerArticles}
      topArticles={topArticles}
      inOtherNewsArticles={inOtherNewsArticles}
      inOtherOpinionArticles={inOtherOpinionArticles}
      inOtherSportsArticles={inOtherSportsArticles}
      inOtherMultimediaArticles={inOtherMultimediaArticles}
      navigation={navigation}
      publicationState={publicationState}
    />
  )
}
