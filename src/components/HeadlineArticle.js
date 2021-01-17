import React from 'react'
import { View } from 'react-native'

import { Tagline } from './Tagline'
import { PictureHeadline } from './PictureHeadline'
import { IMAGE_URL, parseAbstract } from '../utils/helperFunctions'

export const HeadlineArticle = ({ data, publication }) => {
  // console.log(publication)
  const {
    headline,
    published_at,
    abstract,
    dominantMedia: { attachment_uuid, extension },
    tag
  } = data

  console.log(headline)

  // TODO: CLEAN UP -- A LOT
  const parsedAbstract = parseAbstract(abstract)

  return (
    <View>
      <PictureHeadline
        headline={headline}
        time={published_at}
        imageUrl={IMAGE_URL(attachment_uuid, extension, publication)}
        category={tag}
        publication={publication}
      />
      <Tagline tagline={parsedAbstract} publication={publication} />
    </View>
  )
}
