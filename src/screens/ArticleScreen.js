import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Share,
  Platform,
  ScrollView,
  Linking,
} from 'react-native'

import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { useLazyQuery } from '@apollo/client'
import * as Haptics from 'expo-haptics'

import {
  PictureHeadline,
  LogoActivityIndicator,
  HeadlineArticle,
  CustomHTML,
  ThemeContext
} from '../components'
import {
  IMAGE_URL,
  getArticlePubSlug,
  isValidURL,
  PREFIXED_AUTHORS,
} from '../utils/helperFunctions'
import { PublicationEnum } from '../utils/constants'
import {
  BODY_SERIF,
  BODY_SERIF_BOLD,
  BODY_SERIF_ITALIC,
  GEOMETRIC_BOLD,
} from '../utils/fonts'
import { SAVED_ARTICLES_KEY, Storage } from '../utils/storage'
import { saveNewArticle, unsaveArticle, updateNavigation } from '../actions'
import { ARTICLE_QUERY } from '../utils/queries'
import { userViewedArticleAnalytics } from '../utils/analytics'

const ArticleScreenComp = ({
  navigation,
  route,
  currPublication,
  settings,
  dispatch,
}) => {
  const theme = useContext(ThemeContext);
  const [article, setArticle] = useState(route.params.article)
  const [utbFetched, setUTBFetched] = useState(false)
  const savedArticles = settings.savedArticles ? settings.savedArticles : []
  const articlePublication = route.params.articlePublication
    ? route.params.articlePublication
    : currPublication
  const [fetchArticle, { loading, data }] = useLazyQuery(ARTICLE_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (route.params.articlePublication == null && article != null)
      userViewedArticleAnalytics(article.headline, article.slug)

    dispatch(updateNavigation(navigation))

    const { isUTBRandom } = route.params

    if (!article && route.params.articleSlug) {
      console.log('---this being called---')
      console.log(route.params.articleSlug)
      fetchArticle({
        variables: {
          publication: articlePublication,
          slug: route.params.articleSlug,
        },
      })
    } else if (isUTBRandom && !utbFetched) {
      console.log('---fetching utb random article---')
      fetchArticle({
        variables: { publication: PublicationEnum.utb, isRandom: true },
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
        currPublication,
        handlePress,
        handleShare,
        alreadySaved: savedArticles.some(obj => obj.slug == article.slug),
        article: article,
      })
    }
  }, [settings.savedArticles, article])

  const deleteHandler = async article => {
    const slug = article.slug
    const remainingArticles = savedArticles.filter(item => item.slug !== slug)
    let saved_successfully = await Storage.setItem(
      SAVED_ARTICLES_KEY,
      remainingArticles
    )
    if (saved_successfully) dispatch(unsaveArticle({ slug: article.slug }))
  }

  const saveHandler = async article => {
    //Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    const date = new Date()

    const newData = {
      slug: article.slug,
      article: article,
      saved_at: date,
      publication: articlePublication,
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
    if (!alreadySaved) {
      saveHandler(routeArticle)
    }
    else {
      deleteHandler(routeArticle)
    }
  }

  const handleShare = async () => {
    let domain
    switch (currPublication) {
      case PublicationEnum.dp:
        domain = 'thedp'
        break
      case PublicationEnum.street:
        domain = '34st'
        break
      default:
        domain = 'underthebutton'
        break
    }

    const URL = `https://${domain}.com/article/${article.slug}`
    try {
      const result = await Share.share({
        message: Platform.OS == 'ios' ? null : URL,
        url: Platform.OS == 'ios' ? URL : null,
      })

      if (result.action == Share.sharedAction) {
        // TODO: Analytics on shares
        console.log('Shared!')
      } else {
        // TODO: Analytics
        console.log('Dismissed Share!')
      }
    } catch (error) {
      alert(error)
    }
  }

  const onLinkPress = (_, href) => {
    console.log(href)

    const { publication, slug } = getArticlePubSlug(href)
    const { name } = route

    const browserScreenName =
      name === 'HomeArticle' ? 'HomeBrowser' : 'SectionBrowser'
    const ArticleScreenName =
      name === 'HomeArticle' ? 'HomeArticle' : 'SectionArticle'

    if (!slug && isValidURL(href)) {
      Linking.openURL(href)
      //navigation.navigate(browserScreenName, { link: href })
    } else if (slug && publication) {
      navigation.push(ArticleScreenName, {
        articleSlug: slug,
        articlePublication: publication,
      })
    }
  }

  if (loading || !article) return <LogoActivityIndicator />
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <HeadlineArticle
        data={article}
        publication={articlePublication}
        inArticleView={true}
      />
      <View
        style={{
          marginHorizontal: 20,
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: '#EEE',
          borderRadius: 5,
        }}
      >
        {Boolean(article.authors.length) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: article.dominantMedia.authors.length ? 10 : 0,
            }}
          >
            <Ionicons
              name={'newspaper'}
              size={18}
              style={{ paddingRight: 8 }}
              color="#444"
            />
            <Text
              style={{
                fontFamily: GEOMETRIC_BOLD,
                fontSize: 12,
                color: '#444',
              }}
            >
              {PREFIXED_AUTHORS('', article.authors)}
            </Text>
          </View>
        )}
        {Boolean(article.dominantMedia.authors.length) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name={'camera'}
              size={18}
              style={{ alignSelf: 'center' }}
              color="#444"
            />
            <Text
              style={{
                fontFamily: GEOMETRIC_BOLD,
                fontSize: 12,
                paddingLeft: 8,
                color: '#444',
              }}
            >
              {PREFIXED_AUTHORS('', article.dominantMedia.authors)}
            </Text>
          </View>
        )}
      </View>
      <CustomHTML
        {...{
          article: article,
          currPublication: currPublication,
          onLinkPress: onLinkPress,
        }}
      />
    </ScrollView>
  )
}

ArticleScreenComp.navigationOptions = ({ route }) => ({
  title: '',
  animationEnabled: true,
  headerRight: () => {
    const {
      params: { handlePress, handleShare, alreadySaved, article, articleSlug },
    } = route

    let icon = alreadySaved ? 'bookmark' : 'bookmark-outline'
    let shareIcon =
      Platform.OS == 'ios' ? 'share-outline' : 'share-social-outline'

    return (
      <View style={{ flexDirection: 'row', width: 90, marginRight: 15 }}>
        <TouchableOpacity onPress={() => handleShare()}>
          <Ionicons name={shareIcon} size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => handlePress(alreadySaved, article)}>
          <Ionicons name={icon} size={30} color="black" />
        </TouchableOpacity>
      </View>
    )
  },
})

const mapStateToProps = ({ publication, settings }) => {
  const { currPublication } = publication

  return { currPublication, settings }
}

export const ArticleScreen = connect(mapStateToProps)(ArticleScreenComp)
