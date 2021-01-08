import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { IMAGE_URL } from '../../utils/helperFunctions'
import { HorizontalArticleCell } from './HorizontalArticleCell'

export const ArticleList = ({
  articles,
  navigateToArticleScreen,
  publication,
}) => {
  return (
    <View>
      {articles.map(el => {
        const {
          article: {
            headline,
            dominantMedia: { attachment_uuid, extension },
          },
        } = el

        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigateToArticleScreen(el.article)}
          >
            <HorizontalArticleCell
              title={headline}
              category="Politics"
              imageURL={IMAGE_URL(attachment_uuid, extension)}
              publication={publication}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export const SearchArticleList = ({
  articles,
  navigateToArticleScreen,
  publication,
}) => {
  return (
    <View style={{ paddingLeft: 0 }}>
      {articles.map(el => {
        const {
          headline,
          dominantMedia: { attachment_uuid, extension },
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
                marginVertical: 10,
              }}
              title={headline}
              category="Politics"
              imageURL={IMAGE_URL(attachment_uuid, extension)}
              publication={publication}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
