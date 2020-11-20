import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { Text } from 'react-native'

import {
  CustomHeader,
  PictureHeadline,
  Tagline,
  SectionHeader,
  HorizontalArticleCell,
  HeadlineArticle,
} from '../components/shared'
import { HOME_PAGE_QUERY } from '../utils/constants'
import { IMAGE_URL } from '../utils/helperFunctions'
import TopStoriesHorizontalCarousel from '../components/shared/TopStoriesHorizontalCarousel'
import { TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    color: '#fff',
  },
})

const CHAPTERS_QUERY = gql`
  query Chapters {
    chapters {
      id
      number
      title
    }
  }
`

const App = () => {
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY)
  const [contentOffset, updateOffset] = useState(true)

  if (loading) {
    return <Text> Loading... </Text>
  }

  const {
    most_recent: { edges: mostRecentArticles },
    top: { edges: topArticles },
    centerpiece: { edges: centerArticles },
  } = data

  const handleScroll = (scrollData) => {
    var offset = scrollData.nativeEvent.contentOffset.y
    updateOffset(offset)
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          onScroll={(event) => handleScroll(event)}
          scrollEventThrottle={16}
        >
          <HeadlineArticle data={centerArticles[0]} />
          <SectionHeader title="Top Stories" />
          <TopStoriesHorizontalCarousel topStories={topArticles} />
          <SectionHeader title="Most Recent" />
          {mostRecentArticles.map((el) => {
            const {
              article: {
                headline,
                dominantMedia: { attachment_uuid, extension },
              },
            } = el
            return (
              <HorizontalArticleCell
                title={headline}
                category="Politics"
                imageURL={IMAGE_URL(attachment_uuid, extension)}
              />
            )
          })}
        </ScrollView>
      </View>
      <CustomHeader contentOffset={contentOffset} />
    </View>
  )
}

export default App
