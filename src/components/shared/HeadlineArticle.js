import { View } from 'react-native'
import { Tagline } from './Tagline'
import React from 'react'
import { PictureHeadline } from './PictureHeadline'
import { IMAGE_URL } from '../../utils/helperFunctions'

export const HeadlineArticle = ({ data, publication }) => {
  const {
    article: {
      headline,
      published_at,
      abstract,
      dominantMedia: { attachment_uuid, extension }
    }
  } = data

  // TODO: CLEAN UP -- A LOT
  var splitAbstract = abstract.split('<p>')[1].split('</p>')[0]

  return (
    <View>
      <PictureHeadline
        headline={headline}
        time={published_at}
        imageUrl={IMAGE_URL(attachment_uuid, extension)}
        category="NEWS"
        publication={publication}
      />
      <Tagline tagline={splitAbstract} publication={publication} />
    </View>
  )
}
