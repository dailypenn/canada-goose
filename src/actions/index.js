// HOME SCREEN ACTIONS

import { PublicationEnum } from '../utils/constants'

export const SWITCH_PUBLICATION = 'SWITCH_PUBLICATION'

export const switchPublication = currPublication => ({
  type: SWITCH_PUBLICATION,
  currPublication
})

export const UPDATE_NAVIGATION = 'UPDATE_NAVIGATION'

export const updateNavigation = currNavigation => ({
  type: UPDATE_NAVIGATION,
  currNavigation
})

export const TOGGLE_SCROLL_TO_TOP = 'TOGGLE_SCROLL_TO_TOP'

export const toggleScrollToTop = () => ({ type: TOGGLE_SCROLL_TO_TOP })

export const SET_INIT = 'SET_INIT'
export const setInit = result => {
  return {
    type: SET_INIT,
    updates: {
      homeSectionPreferences: [
        {
          publication: PublicationEnum.dp,
          newSections: JSON.parse(result[0][1])
        },
        {
          publication: PublicationEnum.street,
          newSections: JSON.parse(result[1][1])
        },
        {
          publication: PublicationEnum.utb,
          newSections: JSON.parse(result[2][1])
        }
      ],
      savedArticles: JSON.parse(result[3][1])
    }
  }
}

export const UPDATE_HOME_SECTIONS = 'UPDATE_HOME_SECTIONS'
export const updateHomeSections = (publication, newSections) => {
  return {
    type: UPDATE_HOME_SECTIONS,
    updates: {
      homeSectionPreferences: [
        {
          publication: publication,
          newSections: newSections
        }
      ]
    }
  }
}

export const SAVE_NEW_ARTICLE = 'SAVE_NEW_ARTICLE'
export const saveNewArticle = item => {
  return {
    type: SAVE_NEW_ARTICLE,
    updates: {
      actionArticle: item
    }
  }
}

export const UNSAVE_NEW_ARTICLE = 'UNSAVE_NEW_ARTICLE'
export const unsaveArticle = item => {
  return {
    type: UNSAVE_NEW_ARTICLE,
    updates: {
      actionArticle: item
    }
  }
}
