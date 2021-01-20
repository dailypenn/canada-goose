// HOME SCREEN ACTIONS

import { PublicationEnum } from '../utils/constants'

export const SWITCH_PUBLICATION = 'SWITCH_PUBLICATION'

export const switchPublication = publication => ({
  type: SWITCH_PUBLICATION,
  publication,
})

export const SET_INIT = 'SET_INIT'
export const setInit = result => {
  return {
    type: SET_INIT,
    updates: {
      homeSectionPreferences: [
        {
          publication: PublicationEnum.dp,
          newSections: JSON.parse(result[0][1]),
        },
        {
          publication: PublicationEnum.street,
          newSections: JSON.parse(result[1][1]),
        },
        {
          publication: PublicationEnum.utb,
          newSections: JSON.parse(result[2][1]),
        },
      ],
      savedArticles: JSON.parse(result[3][1]),
    },
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
          newSections: newSections,
        },
      ],
    },
  }
}

export const SAVE_NEW_ARTICLE = 'SAVE_NEW_ARTICLE'
export const saveNewArticle = item => {
  return {
    type: SAVE_NEW_ARTICLE,
    updates: {
      savedArticles: [item],
    },
  }
}
