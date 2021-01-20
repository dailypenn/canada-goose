import { UPDATE_HOME_SECTIONS, SET_INIT, SAVE_NEW_ARTICLE } from '../actions'

const defaultSettingsState = {
  savedArticles: null,
  homeSectionPreferences: null,
}

const SettingsReducer = (state = defaultSettingsState, action) => {
  const { type, updates } = action

  const getNewHomeSectionData = updates => {
    if (updates == null) return {}
    data = {}
    updates.map(el => {
      data[el.publication] = el.newSections
    })
    return data
  }

  switch (type) {
    case SET_INIT:
      const newData = getNewHomeSectionData(updates.homeSectionPreferences)
      return {
        homeSectionPreferences: newData,
        savedArticles: updates.savedArticles,
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
      console.log('newly saved')
      return {
        ...state,
        savedArticles: [...state.savedArticles, updates.savedArticles[0]],
      }
    default:
      return state
  }
}

export { SettingsReducer }
