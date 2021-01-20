import {
  UPDATE_HOME_SECTIONS,
  REORDER_HOME_SECTIONS,
  SAVE_NEW_ARTICLE,
  SET_INIT,
} from '../actions'

const defaultHomeSectionsState = {}

const HomeSectionReducer = (state = defaultHomeSectionsState, action) => {
  const { type, updates } = action

  const getNewData = updates => {
    if (updates == null) return {}
    data = {}
    updates.map(el => {
      data[el.publication] = el.newSections
    })
    return data
  }

  switch (type) {
    case SET_INIT:
      return Object.assign({}, getNewData(updates), state)
    case UPDATE_HOME_SECTIONS:
      return Object.assign({}, state, getNewData(updates))
    default:
      return state
  }
}

// when no publication's home sections were reordered
const defaultReorderedHomeSectionState = null

const ReorderHomeSectionReducer = (
  state = defaultReorderedHomeSectionState,
  action
) => {
  const { type, publication } = action

  switch (type) {
    case REORDER_HOME_SECTIONS:
      return publication
    default:
      return state
  }
}

const defaultNewSavedArticleState = false

const NewSavedArticleReducer = (
  state = defaultNewSavedArticleState,
  action
) => {
  const { type, b } = action

  switch (type) {
    case SAVE_NEW_ARTICLE:
      return b
    default:
      return state
  }
}

export { ReorderHomeSectionReducer, NewSavedArticleReducer, HomeSectionReducer }
