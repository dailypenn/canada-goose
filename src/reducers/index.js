import { combineReducers } from 'redux'

import PublicationReducer from './publication'
import { NewSavedArticleReducer, HomeSectionReducer } from './settings'

export default combineReducers({
  publication: PublicationReducer,
  homeSection: HomeSectionReducer,
  newSavedArticle: NewSavedArticleReducer,
})
