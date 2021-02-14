import {
  DP_HOME_SECTIONS,
  STREET_HOME_SECTIONS,
  UTB_HOME_SECTIONS,
  PublicationEnum,
  DP_HOME_SECTIONS_TITLE,
  UTB_HOME_SECTIONS_TITLES,
  STREET_HOME_SECTIONS_TITLES,
} from './constants'
import {
  DP_HOME_PAGE_QUERY,
  STREET_HOME_PAGE_QUERY,
  UTB_HOME_PAGE_QUERY,
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

export const AUTHORS = authorArr => {
  const authorNames = authorArr.map(({ name }) => name)

  if (authorNames.length == 0) return 'N/A'

  return authorNames.join(', ')
}

export const PREFIXED_AUTHORS = (prefix, authorArr) => {
  if (!authorArr.length) {
    return ''
  }

  return `${prefix} ${AUTHORS(authorArr)}`
}

export const PARTIAL_NAVIGATE = (navigation, toScreen, f) => {
  return params => f(navigation, toScreen, params)
}

export const NAVIGATE_TO_ARTICLE_SCREEN = (navigation, toScreen, params) => {
  navigation.navigate(toScreen, params)
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
  console.log(publication, 'vs', PublicationEnum.street)

  switch (publication) {
    case PublicationEnum.dp:
      return DP_HOME_SECTIONS
    case PublicationEnum.street:
      console.log('street')
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

  return abstract.split('<p>')[1].split('</p>')[0].replace('&nbsp;', '')
}

export const getArticlePubSlug = href => {
  const URL_TO_PUB = {
    'https://www.thedp.com/article/': PublicationEnum.dp,
    'https://www.34st.com/article/': PublicationEnum.street,
    'https://www.underthebutton.com/article/': PublicationEnum.utb,
  }

  const URLs = Object.keys(URL_TO_PUB)

  for (let i = 0; i < URLs.length; i++) {
    const URL = URLs[i]
    if (href.includes(URL)) {
      const publication = URL_TO_PUB[URL]
      const slug = href.split(URL)[1]

      return { publication, slug }
    }
  }

  return {}
}

export const isValidURL = url => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return pattern.test(url)
}
