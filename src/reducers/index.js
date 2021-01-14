import { combineReducers } from 'redux'

import PublicationReducer from './publication'

export default combineReducers({
  publication: PublicationReducer
})
