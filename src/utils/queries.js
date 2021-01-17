import { gql } from '@apollo/client'

export const DP_HOME_PAGE_QUERY = gql`
  query {
    centerpiece: homeArticles(first: 1, section: "centerpiece") {
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

    top: homeArticles(first: 5, section: "top") {
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

    news: homeArticles(first: 3, section: "app-front-news") {
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

    opinion: homeArticles(first: 3, section: "app-front-opinion") {
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

    sports: homeArticles(first: 3, section: "app-front-sports") {
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

    multimedia: homeArticles(first: 3, section: "app-front-multimedia") {
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
  }
`

export const STREET_HOME_PAGE_QUERY = gql`
  query {
    centerpiece: homeArticles(first: 1, section: "featured", publication: "street") {
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

    top: homeArticles(first: 5, section: "top", publication: "street") {
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

    focus: homeArticles(first: 3, section: "focus", publication: "street") {
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

    features: homeArticles(first: 3, section: "features", publication: "street") {
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

    ego: homeArticles(first: 3, section: "ego", publication: "street") {
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

    style: homeArticles(first: 3, section: "style", publication: "street") {
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
  }
`

export const UTB_HOME_PAGE_QUERY = gql`
  query {
    centerpiece: homeArticles(first: 1, section: "centerpiece", publication: "utb") {
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

    top: homeArticles(first: 5, section: "top", publication: "utb") {
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

    interactive: homeArticles(first: 3, section: "choose-your-own-adventure", publication: "utb") {
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

    news: homeArticles(first: 3, section: "news", publication: "utb") {
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

    opinion: homeArticles(first: 3, section: "opinion", publication: "utb") {
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
  }
`