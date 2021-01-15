import { REORDER_HOME_SECTIONS, SAVE_NEW_ARTICLE } from '../actions'

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

export { ReorderHomeSectionReducer, NewSavedArticleReducer }
