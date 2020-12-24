import React from "react";
import { View, TouchableOpacity } from "react-native";
import { IMAGE_URL } from "../../utils/helperFunctions";
import { HorizontalArticleCell } from "./HorizontalArticleCell";

export const ArticleList = ({ articles, navigateToArticleScreen }) => (
  <View>
    {articles.map((el) => {
      const {
        article: {
          headline,
          dominantMedia: { attachment_uuid, extension },
        },
      } = el;
      return (
        <TouchableOpacity activeOpacity={1} onPress={navigateToArticleScreen}>
          <HorizontalArticleCell
            title={headline}
            category="Politics"
            imageURL={IMAGE_URL(attachment_uuid, extension)}
          />
        </TouchableOpacity>
      );
    })}
  </View>
);

// export default ArticleList;
