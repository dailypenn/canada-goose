import {
  UPDATE_HOME_SECTIONS,
  SET_INIT,
  SAVE_NEW_ARTICLE,
  UNSAVE_NEW_ARTICLE,
  UPDATE_NOTIF_PREF
} from '../actions'

const defaultSettingsState = {
  savedArticles: null,
  homeSectionPreferences: null,
  notifPreferences: null,
}

const SettingsReducer = (state = defaultSettingsState, action) => {
  const { type, updates } = action

  const getNewHomeSectionData = homeSectionPreferences => {
    if (homeSectionPreferences == null) return {}
    data = {}
    homeSectionPreferences.map(el => {
      data[el.publication] = el.newSections
    })
    return data
  }

  const getNewSavedArticleData = savedArticles => {
    return savedArticles ? savedArticles : []
  }

  const getNewNotifPreferencesData = savedNotifPreferences => {
    return savedNotifPreferences ? savedNotifPreferences : [true, true, false, false]
  }

  switch (type) {
    case SET_INIT:
      return {
        homeSectionPreferences: getNewHomeSectionData(
          updates.homeSectionPreferences
        ),
        savedArticles: getNewSavedArticleData(updates.savedArticles),
        notifPreferences: getNewNotifPreferencesData(updates.notifPreferences)
      }
    case UPDATE_HOME_SECTIONS:
      const { publication, newSections } = updates.homeSectionPreferences[0]
      return {
        ...state,
        homeSectionPreferences: {
          ...state.homeSectionPreferences,
          [publication]: newSections,
        },
      }
    case SAVE_NEW_ARTICLE:
      return {
        ...state,
        savedArticles: [...state.savedArticles, updates.actionArticle],
      }
    case UNSAVE_NEW_ARTICLE:
      const removeSlug = updates.actionArticle.slug
      console.log('removeslug', removeSlug)
      const remainingArticles = state.savedArticles.filter(
        item => item.slug !== removeSlug
      )

      return {
        ...state,
        savedArticles: remainingArticles,
      }
    case UPDATE_NOTIF_PREF:
      const newNotifPreferences = state.notifPreferences
      newNotifPreferences[updates.notifIndex] = updates.value
      return {
        ...state,
        notifPreferences: newNotifPreferences,
      }
    default:
      return state
  }
}

export default SettingsReducer