import { gql } from '@apollo/client'

export const ARTICLES_SEARCH = gql`
  query($filter: String!) {
    searchArticles(filter: $filter) {
      slug
      headline
      abstract
      content
      published_at
      authors {
        name
      }
      dominantMedia {
        attachment_uuid
        extension
      }
    }
  }
`

// Enum for the 3 publications included in this app
export const PublicationEnum = Object.freeze({
  dp: 'The Daily Pennsylvanian',
  street: '34th Street',
  utb: 'Under the Button',
})

export const DP_HOME_SECTIONS_TITLE = {
  news: 'In Other News',
  opinion: 'Opinion',
  sports: 'Sports',
  multimedia: 'Multimedia',
}

export const UTB_HOME_SECTIONS_TITLES = {
  interactive: 'Interactive',
  news: 'News',
  opinion: 'Opinion',
}

export const STREET_HOME_SECTIONS_TITLES = {
  focus: 'Focus',
  features: 'Features',
  ego: 'Ego',
  style: 'Style',
}

export const DP_HOME_SECTIONS = ['news', 'opinion', 'sports', 'multimedia']

export const UTB_HOME_SECTIONS = ['interactive', 'news', 'opinion']

export const STREET_HOME_SECTIONS = ['focus', 'features', 'ego', 'style']

export const FIVE_MUNITES = 5 * 60 * 1000
