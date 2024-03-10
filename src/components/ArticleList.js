import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { IMAGE_URL, AUTHORS } from '../utils/helperFunctions'
import { HorizontalArticleCell } from './HorizontalArticleCell'
import { InteractiveHomeComponent } from './InteractiveHomeComponent'
import { PrimaryHorizontalArticleCell } from './PrimaryHorizontalArticleCell'

export const RenderArticleListItem = ({
  el,
  i,
  articlesLength,
  publication,
  navigateToArticleScreen,
}) => {
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
      {i === articlesLength - 1 ? null : (
        <View
          style={{
            borderBottomColor: '#CCC',
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
  const articlesLength = articles.length
  return (
    <View style={{ marginBottom: 5 }}>
      {articles.map((el, i) =>
        <React.Fragment key={i}>
          {RenderArticleListItem({
            el,
            i,
            articlesLength,
            publication,
            navigateToArticleScreen,
          })}
        </React.Fragment>
      )}
    </View>
  )
}

export const SearchArticleList = ({
  articles,
  navigateToArticleScreen,
  publication,
}) => (
  <View style={{ paddingLeft: 0 }}>
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
                borderWidth: 4,
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
              borderBottomColor: '#CCC',
              borderBottomWidth: 1,
              marginHorizontal: 20,
            }}
          />
        </React.Fragment>
      )
    })}
  </View>
)
