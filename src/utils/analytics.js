import * as Analytics from 'expo-firebase-analytics'

export const publicationSwitchAnalytics = async (from, to) => {

  await Analytics.logEvent('PublicationSwitched', {
    from: from,
    to: to,
    purpose: 'user switched the publication',
  })
}

export const userViewedArticleAnalytics = async article => {
  await Analytics.logEvent('ArticleViewd', {
    headline: article.headline,
    slug: article.slug,
    purpose: 'user clicked on headline to read article',
  })
}

export const publicationAnalytics = async pub => {
  await Analytics.logEvent('PublicationRead', {
    publication: pub,
    purpose: 'user is reading content from this publication',
  })
}

export const deepLinkingAnalytics = async () => {
  await Analytics.logEvent('DeepLinked', {
    purpose: 'an inbound link to the app is triggered',
  })
}