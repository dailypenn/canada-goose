import React from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PictureHeadline } from '../components/shared'
import { IMAGE_URL } from '../utils/helperFunctions'
import HTML from 'react-native-render-html'

// Converts array of authors to displayable format
const authorsString = (authorArr) => {
  if (authorArr.length == 0) return 'N/A'
  const lastAuth = authorArr[authorArr.length - 1]
  if (authorArr.length == 1) return lastAuth

  return (
    authorArr.slice(0, -1).join(', ') +
    `${authorArr.length == 2 ? '' : ','} and ${lastAuth}`
  )
}

export const ArticleScreen = ({ navigation, route }) => {
  const article = route.params.article
  if (!article) {
    // TODO: Check that article is already fetched
  }

  /* Currently author and image credits are not supported by
  GraphQL queries, so hard coding right now */
  // TODO: Fetch from CEO
  const authors = ['Ima Ryder', 'Nutha Ryder']
  const photographer = 'Pitt Shure'
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
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'HelveticaNeue-CondensedBold',
            fontSize: 16,
          }}
        >{`By: ${authorsString(authors)}`}</Text>
        <Text
          style={{
            fontFamily: 'HelveticaNeue-CondensedBold',
            fontSize: 16,
          }}
        >
          {'Photo Credit: ' + photographer}
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <HTML
          source={{ html: article.article.content }}
          contentWidth={useWindowDimensions().width}
          tagsStyles={{
            p: {
              fontSize: 16,
              lineHeight: 22,
              paddingBottom: 30,
              fontFamily: 'HelveticaNeue',
            },
            a: { fontSize: 16 },
            img: { paddingBottom: 10 },
          }}
        />
      </View>
    </ScrollView>
  )
}
