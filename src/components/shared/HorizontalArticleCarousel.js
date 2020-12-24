import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IMAGE_URL } from "../../utils/helperFunctions";
import VerticalArticleCard from "./VerticalArticleCard";

const styles = StyleSheet.create({
  cardContainerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },
});

export const HorizontalArticleCarousel = ({
  articles,
  navigateToArticleScreen,
}) => (
  <ScrollView
    style={{ flex: 1 }}
    horizontal={true}
    contentContainerStyle={{
      width: `${60 * articles.length}%`,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 20,
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
      } = el;
      return (
        <View style={styles.cardContainerView}>
          <TouchableOpacity activeOpacity={1} onPress={navigateToArticleScreen}>
            <VerticalArticleCard
              category="Politics"
              time="2 hrs ago"
              title={headline}
              imageUrl={IMAGE_URL(attachment_uuid, extension)}
            />
          </TouchableOpacity>
        </View>
      );
    })}
  </ScrollView>
);

// export default HorizontalArticleCarousel;
