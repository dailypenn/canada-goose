import React from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'

import { PictureHeadline } from '../components/shared'
import { IMAGE_URL, TIME_AGO } from '../utils/helperFunctions'
import { QUERY_ARTICLE_BY_SLUG } from '../utils/constants'
import { useQuery } from '@apollo/client'

import { BODY_SERIF, GEOMETRIC_BOLD } from '../utils/fonts'
import { DP_RED } from '../utils/branding'
import { PublicationEnum } from '../../NavigationController'

// Converts array of authors to displayable format
const authorsString = authorArr => {
  const authorNames = authorArr.map(({ name }) => (name))

  if (authorNames.length == 0) return 'N/A'
  
  return authorNames.join(', ')
}

export const ArticleScreen = ({ navigation, route }) => {
  const { article } = route.params

  if (!article) {
    // TODO: Check that article is already fetched
    const { loading, error, data } = useQuery(QUERY_ARTICLE_BY_SLUG, {
      variables: { slug: article.slug },
    })
  }

  /* Currently author and image credits are not supported by
  GraphQL queries, so hard coding right now */
  // TODO: Fetch from CEO

  const photographer = 'Pitt Shure'
  return (
    <ScrollView>
      <PictureHeadline
        headline={article.headline}
        time={TIME_AGO(article.published_at)}
        imageUrl={IMAGE_URL(
          article.dominantMedia.attachment_uuid,
          article.dominantMedia.extension
        )}
        category="NEWS"
        publication={PublicationEnum.dp}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontFamily: GEOMETRIC_BOLD,
            fontSize: 16,
          }}
        >{`By: ${authorsString(article.authors)}`}</Text>
        <Text
          style={{
            fontFamily: GEOMETRIC_BOLD,
            fontSize: 16,
          }}
        >
          {'Photo Credit: ' + photographer}
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <HTML
          source={{ html: article.content }}
          contentWidth={useWindowDimensions().width}
          tagsStyles={{
            p: {
              fontSize: 18,

              lineHeight: 28,
              paddingBottom: 30,
              fontFamily: BODY_SERIF,
            },
            a: { fontSize: 18, color: DP_RED },
            img: { paddingBottom: 10 },
          }}
          ignoredTags={['div']}
        />
      </View>
    </ScrollView>
  )
}
