import React, { useEffect } from 'react'
import { Text, View, useWindowDimensions, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'
import { useQuery } from '@apollo/client'
import { connect } from 'react-redux'

import { PictureHeadline } from '../components'
import { IMAGE_URL, AUTHORS } from '../utils/helperFunctions'
import { QUERY_ARTICLE_BY_SLUG } from '../utils/constants'
import { BODY_SERIF, GEOMETRIC_BOLD } from '../utils/fonts'
import { SAVED_ARTICLES_KEY, Storage } from '../utils/storage'
import { Alert } from 'react-native'
import { saveNewArticle } from '../actions'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ArticleScreenComp = ({
  navigation,
  route,
  publication,
  settings,
  dispatch,
}) => {
  const { article } = route.params
  const savedArticles = settings.savedArticles ? settings.savedArticles : []

  if (!article) {
    // TODO: Check that article is already fetched
    const { loading, error, data } = useQuery(QUERY_ARTICLE_BY_SLUG, {
      variables: { slug: article.slug },
    })
  }

  useEffect(() => {
    navigation.setParams({
      handleSave: handleSave,
      alreadySaved: savedArticles.some(obj => obj.slug == article.slug),
    })
  }, [settings.savedArticles])

  const handleSave = async alreadySaved => {
    const date = new Date()

    if (alreadySaved) {
      Alert.alert('TODO', 'UNSAVE')
      return
    }

    const newData = {
      slug: article.slug,
      article: article,
      saved_at: date,
      publication: publication,
    }

    let newSavedArticles = [...savedArticles]
    newSavedArticles.push(newData)
    console.log('saving', newData.article.headline)

    let saved_successfully = await Storage.setItem(
      SAVED_ARTICLES_KEY,
      newSavedArticles
    )

    if (saved_successfully) dispatch(saveNewArticle(newData))
    else Alert.alert('Oops', 'There was an error saving article :(')
  }

  /* Currently author and image credits are not supported by
  GraphQL queries, so hard coding right now */
  // TODO: Fetch from CEO
  const photographer = 'Pitt Shure'
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
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontFamily: GEOMETRIC_BOLD,
            fontSize: 16,
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
                article: { slug: PARSED_URL[1] },
                // TODO: Fix, for some reason this is not working
              })
            } else navigation.navigate('ArticleBrowser', { link: href })
          }}
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

ArticleScreenComp.navigationOptions = ({ route }) => ({
  title: '',
  animationEnabled: true,
  headerRight: () => {
    let icon = 'bookmark-outline'
    if (route.params.alreadySaved) icon = 'bookmark'

    return (
      <TouchableOpacity
        onPress={() => {
          route.params.handleSave(route.params.alreadySaved)
        }}
      >
        <Ionicons name={icon} size={24} color="black" />
      </TouchableOpacity>
    )
  },
})

const mapStateToProps = ({ publication, settings }) => ({
  publication,
  settings,
})

export const ArticleScreen = connect(mapStateToProps)(ArticleScreenComp)
