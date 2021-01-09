import moment from 'moment'
import React from 'react'

export const IMAGE_URL = (attachment_uuid, extension) =>
  `https://snworksceo.imgix.net/dpn/${attachment_uuid}.sized-1000x1000.${extension}?w=1000`

export const TIME_AGO = published_at =>
  moment(published_at, 'YYYY-MM-DD HH:mm:ss').fromNow()

export const AUTHORS = authorArr => {
  const authorNames = authorArr.map(({ name }) => name)

  if (authorNames.length == 0) return 'N/A'

  return authorNames.join(', ')
}

export const PARTIAL_NAVIGATE = (navigation, publicationState, f) => {
  return article => f(article, navigation, publicationState)
}

export const NAVIGATE_TO_ARTICLE_SCREEN = (
  article,
  navigation,
  publicationState
) => {
  navigation.navigate('Article', { article, publicationState })
}

export const navigateToSectionScreen = section => {
  navigation.navigate('Article', { article, publicationState })
}
