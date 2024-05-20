import { initializeApp } from 'firebase/app'
import analytics from "@react-native-firebase/analytics";

const firebaseConfig = {
  "appId": "1:240168290884:web:0a00114842ca4c79748a11",
  "apiKey": "AIzaSyBGPG00pugCHhpCKpMefQA9YgOMtkXXs1M",
  "authDomain": "the-daily-pennsylvanian.firebaseapp.com",
  "projectId": "the-daily-pennsylvanian",
  "storageBucket": "the-daily-pennsylvanian.appspot.com",
  "messagingSenderId": "240168290884",
  "measurementId": "G-4TX3M8YQK4"
}

const app = initializeApp(firebaseConfig);

export const publicationSwitchAnalytics = async (from, to) => {

  await analytics().logEvent('PublicationSwitched', {
    from: from,
    to: to,
    purpose: 'user switched the publication',
  })
}

export const userViewedArticleAnalytics = async article => {
  await analytics().logEvent('ArticleViewd', {
    headline: article.headline,
    slug: article.slug,
    purpose: 'user clicked on headline to read article',
  })
}

export const publicationAnalytics = async pub => {
  await analytics().logEvent('PublicationRead', {
    publication: pub,
    purpose: 'user is reading content from this publication',
  })
}

export const deepLinkingAnalytics = async () => {
  await analytics().logEvent('DeepLinked', {
    purpose: 'an inbound link to the app is triggered',
  })
}