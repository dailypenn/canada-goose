import React, { useEffect, useState } from 'react'
import { Text, View, Button, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'
import { useLazyQuery } from '@apollo/client'

import { PictureHeadline, ActivityIndicator } from '../components'
import { IMAGE_URL, AUTHORS } from '../utils/helperFunctions'
import { PublicationEnum } from '../utils/constants'
import { BODY_SERIF, GEOMETRIC_BOLD } from '../utils/fonts'
import { SAVED_ARTICLES_KEY, Storage } from '../utils/storage'
import { UTB_RANDOM_ARTICLE } from '../utils/queries'

const ArticleScreenComp = ({ navigation, route, publication }) => {
  const [article, setArticle] = useState(route.params.article)

  const [getRandomArticle, { loading, data }] = useLazyQuery(UTB_RANDOM_ARTICLE, {
    fetchPolicy: 'cache-and-network'
  })

  // if (!article) {
  //   // TODO: Check that article is already fetched
  //   const { loading, error, data } = useQuery(QUERY_ARTICLE_BY_SLUG, {
  //     variables: { slug: article.slug },
  //   })
  // }

  useEffect(() => {
    if (publication === PublicationEnum.utb && !article) {
      getRandomArticle()
    }
  }, [])

  useEffect(() => {
    if (data) {
      setArticle(data.utbRandomArticle)
    }
  }, [data])

  const handleSave = async () => {
    const date = new Date()

    let saved_articles = await Storage.getItem(SAVED_ARTICLES_KEY)
    if (saved_articles == null) saved_articles = []

    if (saved_articles.some(x => x.slug == article.slug)) {
      Alert.alert('Oops', 'This article has already been saved!')
      return
    }
    let saved_successfully = await Storage.setItem(article.slug, article)

    if (saved_successfully) {
      saved_articles.push({
        publication,
        slug: article.slug,
        headline: article.headline,
        saved_at: date
      })
      Storage.setItem(SAVED_ARTICLES_KEY, saved_articles)
    } else {
      console.log('error saving article')
    }
  }

  /* Currently author and image credits are not supported by
  GraphQL queries, so hard coding right now */
  // TODO: Fetch from CEO
  const photographer = 'Pitt Shure'

  if (loading || !article) return <ActivityIndicator />

  return (
    <ScrollView>
      <PictureHeadline
        headline={article.headline}
        time={article.published_at}
        imageUrl={IMAGE_URL(
          article.dominantMedia.attachment_uuid,
          article.dominantMedia.extension,
          publication
        )}
        category={article.tag}
        publication={publication}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10
        }}
      >
        <Text
          style={{
            fontFamily: GEOMETRIC_BOLD,
            fontSize: 16
          }}
        >{`By: ${AUTHORS(article.authors)}`}</Text>
        {/* <Text
          style={{
            fontFamily: GEOMETRIC_BOLD,
            fontSize: 16,
          }}
        >
          {'Photo Credit: ' + photographer}
        </Text> */}
      </View>
      <View style={{ padding: 20 }}>
        <HTML
          onLinkPress={(e, href, _) => {
            // TODO: Find a better way to do this
            const PARSED_URL = href.split('thedp.com/article')
            if (PARSED_URL.length == 2) {
              navigation.navigate('', {
                article: { slug: PARSED_URL[1] }
                // TODO: Fix, for some reason this is not working
              })
            } else navigation.navigate('ArticleBrowser', { link: href })
          }}
          source={{ html: article.content }}
          // contentWidth={useWindowDimensions().width}
          tagsStyles={{
            p: {
              fontSize: 18,
              lineHeight: 28,
              paddingBottom: 30,
              fontFamily: BODY_SERIF
            },
            a: {
              fontSize: 18
            },
            img: { paddingBottom: 10 }
          }}
          ignoredTags={['div']}
        />
      </View>
    </ScrollView>
  )
}

ArticleScreenComp.navigationOptions = ({ route }) => ({
  title: '',
  animationEnabled: true,
  headerRight: () => (
    <Button
      title={'Save'}
      onPress={() => {
        route.params.handleSave()
      }}
    />
  )
})

const mapStateToProps = ({ publication }) => ({ publication })

export const ArticleScreen = connect(mapStateToProps)(ArticleScreenComp)
