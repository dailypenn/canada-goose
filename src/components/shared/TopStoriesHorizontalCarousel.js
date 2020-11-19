import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { IMAGE_URL } from '../../utils/helperFunctions'
import TopStoryCard from './TopStoryCard'

const TopStoriesHorizontalCarousel = ({ topStories }) => (
  <ScrollView
    style={{ flex: 1 }}
    horizontal={true}
    contentContainerStyle={{
      width: `${60 * 5}%`,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 20,
    }}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={100}
    decelerationRate="fast"
  >
    {topStories.map((el) => {
      const {
        article: {
          headline,
          dominantMedia: { attachment_uuid, extension },
        },
      } = el
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 20,
          }}
        >
          <TopStoryCard
            category="Politics"
            time="2 hrs ago"
            title={headline}
            imageUrl={IMAGE_URL(attachment_uuid, extension)}
          />
        </View>
      )
    })}
  </ScrollView>
)

const styles = StyleSheet.create({
  cellView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
})

export default TopStoriesHorizontalCarousel
