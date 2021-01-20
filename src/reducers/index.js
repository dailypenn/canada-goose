import { combineReducers } from 'redux'

import PublicationReducer from './publication'
import { SettingsReducer } from './settings'

export default combineReducers({
  publication: PublicationReducer,
  settings: SettingsReducer,
})
