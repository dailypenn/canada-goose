import React from 'react'
import { View } from 'react-native'

import { Tagline } from './Tagline'
import { PictureHeadline } from './PictureHeadline'
import {
  IMAGE_URL,
  parseAbstract,
  PREFIXED_AUTHORS,
} from '../utils/helperFunctions'

export const HeadlineArticle = ({
  data,
  publication,
  afterPress,
  inArticleView,
}) => {
  const {
    headline,
    published_at,
    abstract,
    dominantMedia: { attachment_uuid, extension },
    tag,
  } = data

  const parsedAbstract = parseAbstract(abstract)

  return (
    <View>
      <PictureHeadline
        headline={headline}
        time={published_at}
        imageUrl={IMAGE_URL(attachment_uuid, extension, publication)}
        category={tag}
        publication={publication}
        photoCred={PREFIXED_AUTHORS('Credit: ', data.dominantMedia.authors)}
        afterPress={afterPress}
        inArticleView={inArticleView}
      />
      <Tagline tagline={parsedAbstract} publication={publication} />
    </View>
  )
}
