import {
  UPDATE_HOME_SECTIONS,
  SET_INIT,
  SAVE_NEW_ARTICLE,
  UNSAVE_NEW_ARTICLE,
  UPDATE_NOTIF_PREF,
  DEFAULT_DISPLAY_PREF,
  UPDATE_DISPLAY_PREF,
} from '../actions'

const defaultSettingsState = {
  savedArticles: [],
  homeSectionPreferences: null,
  notifPreferences: null,
  displayPreference: DEFAULT_DISPLAY_PREF,
}

const SettingsReducer = (state = defaultSettingsState, action) => {
  const { type, updates } = action

  const getNewHomeSectionData = homeSectionPreferences => {
    if (homeSectionPreferences == null) return {}
    const data = {}
    homeSectionPreferences.map(el => {
      data[el.publication] = el.newSections
    })
    return data
  }

  const getNewSavedArticleData = savedArticles => {
    return savedArticles || []
  }

  const getNewNotifPreferencesData = savedNotifPreferences => {
    return savedNotifPreferences || [true, true, false, false]
  }

  const getNewDisplayPreferenceData = savedDisplayPreference => {
    return savedDisplayPreference || DEFAULT_DISPLAY_PREF;
  }

  switch (type) {
    case SET_INIT:
      return {
        homeSectionPreferences: getNewHomeSectionData(
          updates.homeSectionPreferences
        ),
        savedArticles: getNewSavedArticleData(updates.savedArticles),
        notifPreferences: getNewNotifPreferencesData(updates.notifPreferences),
        displayPreference: getNewDisplayPreferenceData(updates.displayPreference),
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
    case UPDATE_DISPLAY_PREF:
      const newDisplayPreference = updates.displayPreference
      return {
        ...state,
        displayPreference: newDisplayPreference
      }
    default:
      return state
  }
}

export default SettingsReducer