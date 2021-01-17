import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { IMAGE_URL, AUTHORS } from '../utils/helperFunctions'
import { HorizontalArticleCell } from './HorizontalArticleCell'
import { PrimaryHorizontalArticleCell } from './PrimaryHorizontalArticleCell'

export const ArticleList = ({
  articles,
  navigateToArticleScreen,
  publication
}) => (
  <View style={{ marginBottom: 5 }}>
    {articles.map((el, i) => {
      const {
        article: {
          headline,
          published_at,
          dominantMedia: { attachment_uuid, extension },
          authors,
          abstract
        }
      } = el
      const articlesLength = articles.length
      if (i == 0) {
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={1}
            onPress={() => navigateToArticleScreen(el.article)}
          >
            <PrimaryHorizontalArticleCell
              title={headline}
              imageURL={IMAGE_URL(attachment_uuid, extension, publication)}
              abstract={abstract}
            />
          </TouchableOpacity>
        )
      } else if (i == articlesLength - 1) {
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={1}
            onPress={() => navigateToArticleScreen(el.article)}
          >
            <HorizontalArticleCell
              title={headline}
              imageURL={IMAGE_URL(attachment_uuid, extension, publication)}
              timeAgo={published_at}
              authors={AUTHORS(authors)}
            />
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={1}
            onPress={() => navigateToArticleScreen(el.article)}
          >
            <HorizontalArticleCell
              title={headline}
              imageURL={IMAGE_URL(attachment_uuid, extension, publication)}
              timeAgo={published_at}
              authors={AUTHORS(authors)}
            />
            <View
              style={{
                borderBottomColor: '#CCC',
                borderBottomWidth: 1,
                marginHorizontal: 20
              }}
            />
          </TouchableOpacity>
        )
      }
    })}
  </View>
)

export const SearchArticleList = ({ articles, navigateToArticleScreen }) => (
  <View style={{ paddingLeft: 0 }}>
    {articles.map(el => {
      const {
        headline,
        published_at,
        dominantMedia: { attachment_uuid, extension },
        authors
      } = el
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigateToArticleScreen(el)}
          key={headline}
        >
          <HorizontalArticleCell
            style={{
              borderWidth: 4,
              borderColor: '#0F0',
              marginVertical: 10
            }}
            title={headline}
            imageURL={IMAGE_URL(attachment_uuid, extension)}
            timeAgo={published_at}
            authors={AUTHORS(authors)}
          />
          <View
            style={{
              borderBottomColor: '#CCC',
              borderBottomWidth: 1,
              marginHorizontal: 20
            }}
          />
        </TouchableOpacity>
      )
    })}
  </View>
)
