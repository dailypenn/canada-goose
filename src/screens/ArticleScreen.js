import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { useLazyQuery } from '@apollo/client'
import * as Haptics from 'expo-haptics'

import { PictureHeadline, ActivityIndicator } from '../components'
import { IMAGE_URL, AUTHORS, getArticlePubSlug, isValidURL } from '../utils/helperFunctions'
import { PublicationEnum } from '../utils/constants'
import { BODY_SERIF, GEOMETRIC_BOLD } from '../utils/fonts'
import { SAVED_ARTICLES_KEY, Storage } from '../utils/storage'
import { saveNewArticle, unsaveArticle, updateNavigation } from '../actions'
import { ARTICLE_QUERY } from '../utils/queries'

const ArticleScreenComp = ({
  navigation,
  route,
  currPublication,
  settings,
  dispatch
}) => {
  const [article, setArticle] = useState(route.params.article)
  const [utbFetched, setUTBFetched] = useState(false)
  const savedArticles = settings.savedArticles ? settings.savedArticles : []
  const articlePublication = route.params.articlePublication
    ? route.params.articlePublication
    : currPublication

  const [fetchArticle, { loading, data }] = useLazyQuery(ARTICLE_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  // if (!article) {
  //   // TODO: Check that article is already fetched
  //   const { loading, error, data } = useQuery(QUERY_ARTICLE_BY_SLUG, {
  //     variables: { slug: article.slug },
  //   })
  // }

  useEffect(() => {
    dispatch(updateNavigation(navigation))

    const { isUTBRandom } = route.params

    if (!article && route.params.articleSlug) {
      console.log('---this being called---')
      console.log(route.params.articleSlug)
      fetchArticle({
        variables: {
          publication: articlePublication,
          slug: route.params.articleSlug
        }
      })
    } else if (isUTBRandom && !utbFetched) {
      console.log('---fetching utb random article---')
      fetchArticle({
        variables: { publication: PublicationEnum.utb, isRandom: true }
      })
      setUTBFetched(true)
    }

    return () => {
      dispatch(updateNavigation(null))
    }
  }, [])

  useEffect(() => {
    if (data) {
      setArticle(data.article)
    }
  }, [data])

  useEffect(() => {
    if (article) {
      navigation.setParams({
        handlePress,
        alreadySaved: savedArticles.some(obj => obj.slug == article.slug),
        article: article
      })
    }
  }, [settings.savedArticles, article])

  const deleteHandler = async article => {
    // console.log('UNSAVEEEE')
    const slug = article.slug
    const remainingArticles = savedArticles.filter(item => item.slug !== slug)
    let saved_successfully = await Storage.setItem(
      SAVED_ARTICLES_KEY,
      remainingArticles
    )
    if (saved_successfully) dispatch(unsaveArticle({ slug: article.slug }))
  }

  const saveHandler = async article => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    const date = new Date()

    const newData = {
      slug: article.slug,
      article: article,
      saved_at: date,
      publication: articlePublication
    }

    let newSavedArticles = [...savedArticles]
    newSavedArticles.push(newData)

    let saved_successfully = await Storage.setItem(
      SAVED_ARTICLES_KEY,
      newSavedArticles
    )

    if (saved_successfully) dispatch(saveNewArticle(newData))
    else Alert.alert('Oops', 'There was an error saving article :(')
  }

  const handlePress = (alreadySaved, routeArticle) => {
    if (!alreadySaved) saveHandler(routeArticle)
    else deleteHandler(routeArticle)
  }

  /* Currently author and image credits are not supported by
  GraphQL queries, so hard coding right now */
  // TODO: Fetch from CEO
  const photographer = 'Pitt Shure'

  if (loading || !article) return <ActivityIndicator />

  console.log(`${article.slug} is being rendered`)

  return (
    <ScrollView>
      <PictureHeadline
        headline={article.headline}
        time={article.published_at}
        imageUrl={IMAGE_URL(
          article.dominantMedia.attachment_uuid,
          article.dominantMedia.extension,
          articlePublication
        )}
        category={article.tag}
        publication={articlePublication}
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
          onLinkPress={(_, href) => {
            const { publication, slug } = getArticlePubSlug(href)
            const { name } = route

            const browserScreenName =
              name === 'HomeArticle' ? 'HomeBrowser' : 'SectionBrowser'
            const ArticleScreenName =
              name === 'HomeArticle' ? 'HomeArticle' : 'SectionArticle'

            if (!slug && isValidURL(href)) {
              navigation.navigate(browserScreenName, { link: href })
            } else if (slug && publication) {
              navigation.push(ArticleScreenName, {
                articleSlug: slug,
                articlePublication: publication
              })
            }
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
  headerRight: () => {
    const {
      params: { handlePress, alreadySaved, article }
    } = route
    let icon = 'bookmark-outline'
    if (alreadySaved) icon = 'bookmark'

    return (
      <TouchableOpacity onPress={() => handlePress(alreadySaved, article)}>
        <View style={{ paddingRight: 10 }}>
          <Ionicons name={icon} size={25} color="black" />
        </View>
      </TouchableOpacity>
    )
  }
})

const mapStateToProps = ({ publication, settings }) => {
  const { currPublication } = publication

  return { currPublication, settings }
}

export const ArticleScreen = connect(mapStateToProps)(ArticleScreenComp)
