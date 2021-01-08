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
          authors {
            name
          }
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
          authors {
            name
          }
          dominantMedia {
            attachment_uuid
            extension
          }
        }
        cursor
      }
    }

    inOtherNews: articles(first: 3, section: "app-front-news") {
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
        }
        cursor
      }
    }

    inOtherOpinion: articles(first: 3, section: "news") {
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
        }
        cursor
      }
    }

    inOtherSports: articles(first: 3, section: "news") {
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
        }
        cursor
      }
    }

    inOtherMultimedia: articles(first: 3, section: "news") {
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
        }
        cursor
      }
    }
  }
`

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

export const SECTIONS_QUERY = gql`
  query($section: String!) {
    articles(first: 10, section: $section) {
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

export const SECTIONS = [
  {
    name: 'Academics',
    slug: 'academics',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  },
  {
    name: 'Administration',
    slug: 'administration',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  },
  {
    name: 'Identities',
    slug: 'identities',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  },
  {
    name: 'Politics',
    slug: 'politics',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  },
  {
    name: 'Student Life',
    slug: 'student-life',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  },
  {
    name: 'Sports',
    slug: 'sports',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  },
  {
    name: 'Staff Editorials',
    slug: 'editorials',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  },
  {
    name: 'Opinion Columns',
    slug: 'columns',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B800%2C500%5D&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F05%2Fblue0517.jpg'
  }
]
