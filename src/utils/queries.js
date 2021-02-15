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
        authors {
          name
        }
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
        authors {
          name
        }
      }
      tag
    }

    news: homeArticles(first: 5, section: "app-front-news") {
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
        authors {
          name
        }
      }
      tag
    }

    opinion: homeArticles(first: 5, section: "app-front-opinion") {
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
        authors {
          name
        }
      }
      tag
    }

    sports: homeArticles(first: 5, section: "app-front-sports") {
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
        authors {
          name
        }
      }
      tag
    }

    multimedia: homeArticles(first: 5, section: "app-front-multimedia") {
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
        authors {
          name
        }
      }
      tag
    }
  }
`

export const STREET_HOME_PAGE_QUERY = gql`
  query {
    centerpiece: homeArticles(first: 1, section: "featured", publication: "34th Street") {
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
        authors {
          name
        }
      }
      tag
    }

    top: homeArticles(first: 5, section: "top", publication: "34th Street") {
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
        authors {
          name
        }
      }
      tag
    }

    focus: homeArticles(first: 5, section: "focus", publication: "34th Street") {
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
        authors {
          name
        }
      }
      tag
    }

    features: homeArticles(first: 5, section: "features", publication: "34th Street") {
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
        authors {
          name
        }
      }
      tag
    }

    ego: homeArticles(first: 5, section: "ego", publication: "34th Street") {
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
        authors {
          name
        }
      }
      tag
    }

    style: homeArticles(first: 5, section: "style", publication: "34th Street") {
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
        authors {
          name
        }
      }
      tag
    }
  }
`

export const UTB_HOME_PAGE_QUERY = gql`
  query {
    centerpiece: homeArticles(first: 1, section: "centerpiece", publication: "Under the Button") {
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
        authors {
          name
        }
      }
      tag
    }

    top: homeArticles(first: 5, section: "top", publication: "Under the Button") {
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
        authors {
          name
        }
      }
      tag
    }

    interactive: homeArticles(first: 5, section: "choose-your-own-adventure", publication: "Under the Button") {
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
        authors {
          name
        }
      }
      tag
    }

    news: homeArticles(first: 5, section: "news", publication: "Under the Button") {
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
        authors {
          name
        }
      }
      tag
    }

    opinion: homeArticles(first: 5, section: "opinion", publication: "Under the Button") {
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
        authors {
          name
        }
      }
      tag
    }
  }
`

export const SECTIONS_QUERY = gql`
  query($section: String!, $publication: String!) {
    sectionArticles(section: $section, publication: $publication) {
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
        authors {
          name
        }
      }
      tag
    }
  }
`

export const ARTICLES_SEARCH = gql`
  query($filter: String!, $publication: String!) {
    searchArticles(filter: $filter, publication: $publication) {
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
        authors {
          name
        }
      }
      tag
    }
  }
`

export const ARTICLE_QUERY = gql`
  query($publication: String!, $slug: String, $isRandom: Boolean) {
    article(publication: $publication, slug: $slug, isRandom: $isRandom) {
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
        authors {
          name
        }
      }
      tag
    }
  }
`