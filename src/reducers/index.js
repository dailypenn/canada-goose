import { combineReducers } from 'redux'

import PublicationReducer from './publication'
import { NewSavedArticleReducer, ReorderHomeSectionReducer } from './settings'

export default combineReducers({
  publication: PublicationReducer,
  reorderHomeSection: ReorderHomeSectionReducer,
  newSavedArticle: NewSavedArticleReducer,
})
