import { combineReducers } from 'redux'

import PublicationReducer from './publication'
import { ReorderHomeSectionReducer } from './settings'

export default combineReducers({
  publication: PublicationReducer,
  reorderHomeSection: ReorderHomeSectionReducer,
})
