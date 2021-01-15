// HOME SCREEN ACTIONS

export const SWITCH_PUBLICATION = 'SWITCH_PUBLICATION'

export const switchPublication = publication => ({
  type: SWITCH_PUBLICATION,
  publication,
})

// SETTINGS SCREEN ACTIONS
export const REORDER_HOME_SECTIONS = 'REORDER_HOME_SECTIONS'

export const reorderedHomeSections = publication => ({
  type: REORDER_HOME_SECTIONS,
  publication,
})

// ARTICLE SCREEN ACTIONS
export const SAVE_NEW_ARTICLE = 'SAVE_NEW_ARTICLE'

export const saveNewArticle = b => ({
  type: SAVE_NEW_ARTICLE,
  b,
})
