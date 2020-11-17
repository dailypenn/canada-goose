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