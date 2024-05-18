import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from 'react-native'

import { IMAGE_URL } from '../utils/helperFunctions'
import { InteractiveHomeComponent } from './InteractiveHomeComponent'
import VerticalArticleCard from './VerticalArticleCard'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  cardContainerView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
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
      snapToInterval={width - 60 + 20}
      snapToAlignment={'start'}
      contentContainerStyle={{
        paddingTop: 15,
        paddingBottom: 30,
        paddingHorizontal: 10,
      }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={100}
    >
      {articles.map((el, i) => {
        const {
          headline,
          published_at,
          dominantMedia: { attachment_uuid, extension },
          tag,
        } = el
        return (
          <View style={styles.cardContainerView} key={i}>
            <InteractiveHomeComponent
              touchOpacProps={{
                activeOpacity: 1,
                onPress: () => navigateToArticleScreen({ article: el }),
              }}
            >
              <VerticalArticleCard
                category={tag}
                time={published_at}
                title={headline}
                imageUrl={IMAGE_URL(attachment_uuid, extension, publication)}
                publication={publication}
              />
            </InteractiveHomeComponent>
          </View>
        )
      })}
    </ScrollView>
  )
}
