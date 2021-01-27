import { PublicationPrimaryColor } from './branding'

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

export const SETTINGS_SECTIONS = [
  {
    id: 'account section',
    name: 'Personal',
    items: [
      {
        id: 'manage feed cell',
        icon: 'list',
        color: '#007aff',
        name: 'Manage Feed',
        screenName: 'ManageFeedScreen',
        props: {},
      },
      {
        id: 'saved article cell',
        icon: 'bookmarks',
        color: '#f6a327',
        name: 'Bookmarked Articles',
        screenName: 'SavedArticles',
        props: {},
      },
    ],
  },
  {
    id: 'settings section',
    name: 'Settings',
    items: [
      {
        id: 'noti cell',
        icon: 'notifications',
        color: '#f9423b',
        name: 'Notifications',
        screenName: 'Notification',
        props: {},
      },
      {
        id: 'privacy cell',
        icon: 'shield-checkmark',
        color: '#66d464',
        name: 'Privacy',
        screenName: 'WebView',
        props: { link: 'https://www.thedp.com/page/app-privacy' },
      },
    ],
  },
  {
    id: 'features section',
    name: 'Features',
    items: [
      {
        id: 'recruiting cell',
        icon: 'happy',
        color: '#c4c4c4',
        name: 'DP Tech & Design are Recruiting',
        screenName: 'WebView',
        props: { link: 'https://projects.thedp.com/2021/join/' },
      },
      {
        id: 'about cell',
        icon: 'people',
        color: '#c4c4c4',
        name: 'Operation Canada Goose',
        screenName: 'About',
        props: {},
      },
      {
        id: 'dp cell',
        icon: 'newspaper',
        color: PublicationPrimaryColor(PublicationEnum.dp),

        name: 'The Daily Pennsylvanian',
        screenName: 'WebView',
        props: { link: 'https://thedp.com' },
      },
      {
        id: 'street cell',
        icon: 'newspaper',
        color: PublicationPrimaryColor(PublicationEnum.street),
        name: '34th Street',
        screenName: 'WebView',
        props: { link: 'https://34st.com' },
      },
      {
        id: 'utb cell',
        icon: 'newspaper',
        color: PublicationPrimaryColor(PublicationEnum.utb),
        name: 'Under the Button',
        screenName: 'WebView',
        props: { link: 'https://underthebutton.com' },
      },
    ],
  },
  {
    id: 'external resources section',
    name: 'Settings',
    items: [
      {
        id: 'library cell',
        icon: 'library',
        color: '#66d464',
        name: '3rd party libraries',
        screenName: 'WebView',
        props: { link: 'https://www.thedp.com/page/third-party-library' },
      },
    ],
  },
]
