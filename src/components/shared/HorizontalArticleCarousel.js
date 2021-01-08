import React from 'react'
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IMAGE_URL } from '../../utils/helperFunctions'
import VerticalArticleCard from './VerticalArticleCard'

const { width } = Dimensions.get('window');

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
      snapToInterval={0.9*width}
      snapToAlignment={"center"}
      contentContainerStyle={{
        width: `${90 * articles.length}%`,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 15,
      }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={100}
      decelerationRate="fast"
    >
      {articles.map((el) => {
        const {
          article: {
            headline,
            dominantMedia: { attachment_uuid, extension },
          },
        } = el
        return (
          <View style={styles.cardContainerView} key={headline}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={navigateToArticleScreen}
            >
              <VerticalArticleCard
                category="Politics"
                time="12 hrs ago"
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

// export default HorizontalArticleCarousel;
