import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { IMAGE_URL } from '../../utils/helperFunctions'
import { HorizontalArticleCell } from './HorizontalArticleCell'

export const ArticleList = ({
  articles,
  navigateToArticleScreen,
  publication
}) => {
  return (
    <View style={{ paddingLeft: 10 }}>
      {articles.map(el => {
        const {
          article: {
            headline,
            dominantMedia: { attachment_uuid, extension }
          }
        } = el
        return (
          <TouchableOpacity activeOpacity={1} onPress={navigateToArticleScreen} key={headline}>
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

const Divider = () => (
  <View
    style={{
      borderBottomColor: '#D3D3D3',
      borderBottomWidth: 1,
      paddingVertical: 3
    }}
  />
)

export const SearchArticleList = ({
  articles,
  navigateToArticleScreen,
  publication
}) => {
  return (
    <View style={{ paddingLeft: 10 }}>
      {articles.map(el => {
        const {
          headline,
          dominantMedia: { attachment_uuid, extension }
        } = el
        return (
          <TouchableOpacity activeOpacity={1} onPress={navigateToArticleScreen} key={headline}>
            <HorizontalArticleCell
              title={headline}
              category="Politics"
              imageURL={IMAGE_URL(attachment_uuid, extension)}
              publication={publication}
            />
            <Divider />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
