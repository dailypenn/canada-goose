import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PictureHeadline } from '../components/shared'
import { IMAGE_URL } from '../utils/helperFunctions'
import HTML from 'react-native-render-html'

export const ArticleScreen = ({ navigation, route }) => {
  console.log(navigation)
  console.log(route)

  const article = route.params.article
  // TODO: Check that article is already fetched

  return (
    <ScrollView>
      <PictureHeadline
        headline={article.article.headline}
        time={article.article.published_at}
        imageUrl={IMAGE_URL(
          article.article.dominantMedia.attachment_uuid,
          article.article.dominantMedia.extension
        )}
        category="NEWS"
      />
      <View style={{ padding: 20 }}>
        <HTML
          source={{ html: article.article.content }}
          contentWidth={10}
          tagsStyles={{ p: { fontSize: 16, paddingVertical: 5 } }}
        />
      </View>
    </ScrollView>
  )
}
