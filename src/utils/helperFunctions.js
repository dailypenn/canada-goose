import moment from 'moment'

import {
  DP_HOME_SECTIONS,
  STREET_HOME_SECTIONS,
  UTB_HOME_SECTIONS,
  PublicationEnum,
  DP_HOME_SECTIONS_TITLE,
  UTB_HOME_SECTIONS_TITLES,
  STREET_HOME_SECTIONS_TITLES
} from './constants'
import {
  DP_HOME_PAGE_QUERY,
  STREET_HOME_PAGE_QUERY,
  UTB_HOME_PAGE_QUERY
} from './queries'

export const IMAGE_URL = (attachment_uuid, extension, publication) => {
  let ceo_prefix = ''
  switch (publication) {
    case PublicationEnum.dp:
      ceo_prefix = 'dpn'
      break
    case PublicationEnum.street:
      ceo_prefix = 'dpn-34s'
      break
    default:
      ceo_prefix = 'dpn-utb'
  }

  return `https://snworksceo.imgix.net/${ceo_prefix}/${attachment_uuid}.sized-1000x1000.${extension}?w=1000`
}

export const TIME_AGO = published_at =>
  moment(published_at, 'YYYY-MM-DD HH:mm:ss').fromNow()

export const AUTHORS = authorArr => {
  const authorNames = authorArr.map(({ name }) => name)

  if (authorNames.length == 0) return 'N/A'

  return authorNames.join(', ')
}

export const PARTIAL_NAVIGATE = (navigation, toScreen, f) => {
  return article => f(navigation, toScreen, article)
}

export const NAVIGATE_TO_ARTICLE_SCREEN = (navigation, toScreen, article) => {
  navigation.navigate(toScreen, { article })
}

export const navigateToSectionScreen = section => {
  navigation.navigate('Article', { article, publicationState })
}

export const GET_HOME_QUERIES = publication => {
  switch (publication) {
    case PublicationEnum.dp:
      return DP_HOME_PAGE_QUERY
    case PublicationEnum.street:
      return STREET_HOME_PAGE_QUERY
    default:
      return UTB_HOME_PAGE_QUERY
  }
}

export const GET_HOME_SECTIONS = publication => {
  switch (publication) {
    case PublicationEnum.dp:
      return DP_HOME_SECTIONS
    case PublicationEnum.street:
      return STREET_HOME_SECTIONS
    case PublicationEnum.utb:
      return UTB_HOME_SECTIONS
  }
}

export const GET_HOME_SECTION_NAME = (publication, section) => {
  switch (publication) {
    case PublicationEnum.dp:
      return DP_HOME_SECTIONS_TITLE[section]
    case PublicationEnum.utb:
      return UTB_HOME_SECTIONS_TITLES[section]
    case PublicationEnum.street:
      return STREET_HOME_SECTIONS_TITLES[section]
  }
}

export const parseAbstract = abstract => {
  if (!abstract) {
    return ''
  }

  return abstract.split('<p>')[1].split('</p>')[0]
}