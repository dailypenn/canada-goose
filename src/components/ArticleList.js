import React, { useContext } from 'react'
import { View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


import { IMAGE_URL, AUTHORS } from '../utils/helperFunctions'
import { HorizontalArticleCell } from './HorizontalArticleCell'
import { InteractiveHomeComponent } from './InteractiveHomeComponent'
import { PrimaryHorizontalArticleCell } from './PrimaryHorizontalArticleCell'
import { ThemeContext } from "./ThemeProvider";

export const RenderArticleListItem = ({
  el,
  i,
  articlesLength,
  publication,
  navigateToArticleScreen
}) => {
  const theme = useContext(ThemeContext)
  const {
    headline,
    published_at,
    dominantMedia: { attachment_uuid, extension },
    authors,
    abstract,
  } = el
  const CHILD_DATA = {
    title: headline,
    imageURL: IMAGE_URL(attachment_uuid, extension, publication),
    abstract: abstract,
    timeAgo: published_at,
    authors: AUTHORS(authors),
  }
  return (
    <>
      <InteractiveHomeComponent
        key={i}
        touchOpacProps={{
          activeOpacity: 1,
          onPress: () => navigateToArticleScreen({ article: el }),
        }}
      >
        {i ? (
          <HorizontalArticleCell {...CHILD_DATA} />
        ) : (
          <PrimaryHorizontalArticleCell {...CHILD_DATA} />
        )}
      </InteractiveHomeComponent>
      {i === articlesLength ? null : (
        <View
          style={{
            borderBottomColor: theme.borderColor,
            borderBottomWidth: 1,
            marginHorizontal: 20,
          }}
        />
      )}
    </>
  )
}

export const ArticleList = ({
  articles,
  navigateToArticleScreen,
  publication,
}) => {
  const articlesLength = articles.length - 1
  return (
    <View style={{ marginBottom: 5 }}>
      {articles.map((el, i) =>
        <React.Fragment key={i}>
          <RenderArticleListItem
            el={el}
            i={i}
            articlesLength={articlesLength}
            publication={publication}
            navigateToArticleScreen={navigateToArticleScreen}
          />
        </React.Fragment>
      )}
      <BannerAd unitId={TestIds.ADAPTIVE_BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  )
}

export const SearchArticleList = ({
  articles,
  navigateToArticleScreen,
  publication,
}) => {
  const theme = useContext(ThemeContext)
  return (
      <View style={{ paddingVertical: 10 }}>
        <BannerAd unitId={TestIds.ADAPTIVE_BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        {articles.map(el => {
          const {
            headline,
            published_at,
            dominantMedia: { attachment_uuid, extension },
            authors,
          } = el
          return (
              <React.Fragment key={headline}>
                <InteractiveHomeComponent
                    touchOpacProps={{
                      activeOpacity: 1,
                      onPress: () => navigateToArticleScreen({ article: el }),
                    }}
                    key={headline}
                >
                  <HorizontalArticleCell
                      style={{
                        borderWidth: 40,
                        borderColor: '#0F0',
                        marginVertical: 10,
                      }}
                      title={headline}
                      imageURL={IMAGE_URL(attachment_uuid, extension, publication)}
                      timeAgo={published_at}
                      authors={AUTHORS(authors)}
                  />
                </InteractiveHomeComponent>
                <View
                    style={{
                      borderBottomColor: theme.borderColor,
                      borderBottomWidth: 1,
                      marginHorizontal: 20,
                    }}
                />
              </React.Fragment>
          )
        })}
      </View>
  )
}
