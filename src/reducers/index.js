import { combineReducers } from 'redux'

import PublicationReducer from './publication'
import {
  NewSavedArticleReducer,
  ReorderHomeSectionReducer,
  HomeSectionReducer,
} from './settings'

export default combineReducers({
  publication: PublicationReducer,
  reorderHomeSection: ReorderHomeSectionReducer,
  homeSection: HomeSectionReducer,
  newSavedArticle: NewSavedArticleReducer,
})
