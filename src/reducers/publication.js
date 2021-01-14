import { SWITCH_PUBLICATION } from '../actions'
import { PublicationEnum } from '../utils/constants'

const defaultState = PublicationEnum.dp

const PublicationReducer = (state = defaultState, action) => {
  const { type, publication } = action

  switch (type) {
    case SWITCH_PUBLICATION:
      return publication
    default:
      return state
  }
}

export default PublicationReducer