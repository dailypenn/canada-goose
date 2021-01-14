import React, { useEffect } from 'react'
import { Text, View, useWindowDimensions, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'
import { useQuery } from '@apollo/client'

import { PictureHeadline } from '../components'
import { IMAGE_URL, TIME_AGO, AUTHORS } from '../utils/helperFunctions'
import { QUERY_ARTICLE_BY_SLUG } from '../utils/constants'
import { BODY_SERIF, GEOMETRIC_BOLD } from '../utils/fonts'
import {
  SAVED_ARTICLES_KEY,
  SAVED_ARTICLE_PREFIX,
  Storage,
} from '../utils/storage'
import { SavedArticlesScreen } from './SavedArticlesScreen'

export const ArticleScreen = ({ navigation, route }) => {
  const { article, publicationState } = route.params

  if (!article) {
    // TODO: Check that article is already fetched
    const { loading, error, data } = useQuery(QUERY_ARTICLE_BY_SLUG, {
      variables: { slug: article.slug },
    })
  }

  useEffect(() => {
    navigation.setParams({ handleSave: handleSave })
  }, [])

  const handleSave = async () => {
    console.log('handle save')

    const date = new Date()

    // Storage.clearAll()
    // return

    let saved_articles = await Storage.getItem(SAVED_ARTICLES_KEY)
    if (saved_articles == null) saved_articles = []
    let saved_successfully = await Storage.setItem(article.slug, article)

    if (saved_successfully) {
      saved_articles.push({
        slug: article.slug,
        headline: article.headline,
        saved_at: date,
      })
      // console.log(saved_articles)
      Storage.setItem(SAVED_ARTICLES_KEY, saved_articles)
    } else {
      console.log('error saving article')
    }
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
        publication={publicationState.currPublication}
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
        >{`By: ${AUTHORS(article.authors)}`}</Text>
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
          onLinkPress={(e, href, _) =>
            navigation.navigate('ArticleBrowser', { link: href })
          }
          source={{ html: article.content }}
          contentWidth={useWindowDimensions().width}
          tagsStyles={{
            p: {
              fontSize: 18,
              lineHeight: 28,
              paddingBottom: 30,
              fontFamily: BODY_SERIF,
            },
            a: {
              fontSize: 18,
            },
            img: { paddingBottom: 10 },
          }}
          ignoredTags={['div']}
        />
      </View>
    </ScrollView>
  )
}

ArticleScreen.navigationOptions = ({ route }) => ({
  title: '',
  animationEnabled: false,
  headerRight: () => (
    <Button
      title={'Save'}
      onPress={() => {
        route.params.handleSave()
      }}
    />
  ),
})
