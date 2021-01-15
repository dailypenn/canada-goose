export const STREET_HOME_PAGE_QUERY = gql`
  query {
    centerpiece: articles(first: 1, section: "featured", publication: "street") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    top: articles(first: 5, section: "top", publication: "street") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    focus: articles(first: 3, section: "focus", publication: "street") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    features: articles(first: 3, section: "features", publication: "street") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    ego: articles(first: 3, section: "ego", publication: "street") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    style: articles(first: 3, section: "style", publication: "street") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }
  }
`




export const UTB_HOME_PAGE_QUERY = gql`
  query {
    centerpiece: articles(first: 1, section: "centerpiece", publication: "utb") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    top: articles(first: 5, section: "top", publication: "utb") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    interactive: articles(first: 3, section: "choose-your-own-adventure", publication: "utb") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    news: articles(first: 3, section: "news", publication: "utb") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }

    opinion: articles(first: 3, section: "news", publication: "utb") {
      hasNextPage
      edges {
        article {
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
          tag
        }
        cursor
      }
    }
  }
`