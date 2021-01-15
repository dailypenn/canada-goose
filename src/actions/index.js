// HOME SCREEN ACTIONS

export const SWITCH_PUBLICATION = 'SWITCH_PUBLICATION'

export const switchPublication = publication => ({
  type: SWITCH_PUBLICATION,
  publication,
})

// SETTINGS SCREEN ACTIONS
export const REORDERED_HOME_SECTIONS = 'REORDERED_HOME_SECTIONS'

export const reorderedHomeSections = publication => ({
  type: REORDERED_HOME_SECTIONS,
  publication,
})
