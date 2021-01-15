import { combineReducers } from 'redux'

import PublicationReducer from './publication'
import HomeSectionReorderedReducer from './settings'

export default combineReducers({
  publication: PublicationReducer,
  homeSectionReordered: HomeSectionReorderedReducer,
})
