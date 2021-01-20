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
    updates: [
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
  }
}

export const UPDATE_HOME_SECTIONS = 'UPDATE_HOME_SECTIONS'
export const loadHomeSections = publication => ({
  type: UPDATE_HOME_SECTIONS,
  publication,
})

// ARTICLE SCREEN ACTIONS
export const SAVE_NEW_ARTICLE = 'SAVE_NEW_ARTICLE'

export const saveNewArticle = b => ({
  type: SAVE_NEW_ARTICLE,
  b,
})
