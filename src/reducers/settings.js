import { REORDERED_HOME_SECTIONS } from '../actions'

// when no publication's home sections were reordered
const defaultState = null

const HomeSectionReorderedReducer = (state = defaultState, action) => {
  const { type, publication } = action

  switch (type) {
    case REORDERED_HOME_SECTIONS:
      return publication
    default:
      return state
  }
}

export default HomeSectionReorderedReducer
