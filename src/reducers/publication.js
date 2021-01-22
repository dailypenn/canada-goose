import { SWITCH_PUBLICATION, UPDATE_NAVIGATION } from '../actions'
import { PublicationEnum } from '../utils/constants'

const defaultState = {
  currPublication: PublicationEnum.dp,
  currNavigation: null
}

const PublicationReducer = (state = defaultState, action) => {
  const { type, currPublication, currNavigation } = action

  switch (type) {
    case SWITCH_PUBLICATION:
      return { ...state, currPublication }
    case UPDATE_NAVIGATION:
      return { ...state, currNavigation }
    default:
      return state
  }
}

export default PublicationReducer
