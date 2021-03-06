import {
  UPDATE_HOME_SECTIONS,
  SET_INIT,
  SAVE_NEW_ARTICLE,
  UNSAVE_NEW_ARTICLE,
} from '../actions'

const defaultSettingsState = {
  savedArticles: null,
  homeSectionPreferences: null,
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

  switch (type) {
    case SET_INIT:
      return {
        homeSectionPreferences: getNewHomeSectionData(
          updates.homeSectionPreferences
        ),
        savedArticles: getNewSavedArticleData(updates.savedArticles),
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
    default:
      return state
  }
}

export default SettingsReducer
