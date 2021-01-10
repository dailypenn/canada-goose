import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
  GET_SECTION_TITLE,
  HOME_PAGE_QUERY,
  HOME_SECTIONS,
} from '../utils/constants'
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
import { HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'

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
}) => {
  const [offset, setOffset] = useState(0)
  const [sections, setSections] = useState(defaultSections)

  const handleScroll = scrollData => {
    setOffset(scrollData.nativeEvent.contentOffset.y)
  }

  const loadHomeSectionOrder = async () => {
    let order = await Storage.getItem(HOME_FEED_ORDER_KEY)
    if (order == null) return
    if (order == Object.keys(sections)) return

    var newSections = []
    order.forEach(section => {
      defaultSections.forEach(item => {
        if (section == GET_SECTION_TITLE(item.name)) {
          newSections.push(item)
        }
      })
    })

    setSections(newSections)
  }

  useEffect(() => {
    loadHomeSectionOrder()
  }, [])

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

  const defaultSections = [
    { name: HOME_SECTIONS.News, articles: newsArticles },
    { name: HOME_SECTIONS.Opinion, articles: opinionArticles },
    { name: HOME_SECTIONS.Sports, articles: sportsArticles },
    { name: HOME_SECTIONS.Multimedia, articles: multimediaArticles },
  ]

  return (
    <HomeView
      centerArticles={centerArticles}
      topArticles={topArticles}
      navigation={navigation}
      publicationState={publicationState}
      defaultSections={defaultSections}
    />
  )
}
