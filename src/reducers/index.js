import { applyMiddleware, combineReducers, createStore } from 'redux'

import PublicationReducer from './publication'
import SettingsReducer from './settings'
import thunk from 'redux-thunk'

const RootReducer = combineReducers({
  publication: PublicationReducer,
  settings: SettingsReducer,
})

const store = createStore(RootReducer, applyMiddleware(thunk))

export default store;
