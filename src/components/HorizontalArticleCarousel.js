import React from 'react'
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { IMAGE_URL, TIME_AGO } from '../utils/helperFunctions'
import VerticalArticleCard from './VerticalArticleCard'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  cardContainerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
})

export const HorizontalArticleCarousel = ({
  articles,
  navigateToArticleScreen,
  publication,
}) => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      horizontal={true}
      decelerationRate={0}
      snapToInterval={0.9 * width}
      snapToAlignment={'center'}
      contentContainerStyle={{
        width: `${90 * articles.length}%`,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 35,
      }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={100}
      decelerationRate="fast"
    >
      {articles.map((el, i) => {
        const {
          article: {
            headline,
            published_at,
            dominantMedia: { attachment_uuid, extension },
          },
        } = el
        return (
          <View style={styles.cardContainerView} key={i}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigateToArticleScreen(el.article)}
            >
              <VerticalArticleCard
                category="Politics"
                time={TIME_AGO(published_at)}
                title={headline}
                imageUrl={IMAGE_URL(attachment_uuid, extension)}
                publication={publication}
              />
            </TouchableOpacity>
          </View>
        )
      })}
    </ScrollView>
  )
}
