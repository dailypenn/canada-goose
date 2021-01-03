import { gql } from '@apollo/client'

export const HOME_PAGE_QUERY = gql`
  query {
    centerpiece: articles(first: 1, section: "centerpiece") {
      hasNextPage
      edges {
        article {
          slug
          headline
          abstract
          content
          published_at
          dominantMedia {
            attachment_uuid
            extension
          }
        }
        cursor
      }
    }

    top: articles(first: 5, section: "top") {
      hasNextPage
      edges {
        article {
          slug
          headline
          abstract
          content
          published_at
          dominantMedia {
            attachment_uuid
            extension
          }
        }
        cursor
      }
    }

    most_recent: articles(first: 5, section: "news") {
      hasNextPage
      edges {
        article {
          slug
          headline
          abstract
          content
          published_at
          dominantMedia {
            attachment_uuid
            extension
          }
        }
        cursor
      }
    }
  }
`

export const ARTICLES_SEARCH = gql`
  query ($filter: String!) {
    searchArticles(filter: $filter) {
      headline
      dominantMedia {
        attachment_uuid
        extension
      }
    }
  }
`

export const DISCOVER_SECTIONS = [
  {
    "name": "academics",
    "img": ""
  },
  {
    "name": "administration",
    "img": ""
  },
  {
    "name": "identities",
    "img": ""
  },
  {
    "name": "politics",
    "img": ""
  },
  {
    "name": "student life",
    "img": ""
  },
  {
    "name": "sports",
    "img": ""
  },
  {
    "name": "staff editorials",
    "img": ""
  },
  {
    "name": "opinion columns",
    "img": ""
  }
]