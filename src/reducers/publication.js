import {
  SWITCH_PUBLICATION,
  UPDATE_NAVIGATION,
  TOGGLE_SCROLL_TO_TOP,
} from '../actions'
import { PublicationEnum } from '../utils/constants'

const defaultState = {
  currPublication: PublicationEnum.dp,
  currNavigation: null,
  scrollToTop: false,
}

const PublicationReducer = (state = defaultState, action) => {
  const { type, currPublication, currNavigation } = action

  switch (type) {
    case SWITCH_PUBLICATION:
      return { ...state, currPublication }
    case UPDATE_NAVIGATION:
      return { ...state, currNavigation }
    case TOGGLE_SCROLL_TO_TOP:
      return { ...state, scrollToTop: !state.scrollToTop }
    default:
      return state
  }
}

export default PublicationReducer
