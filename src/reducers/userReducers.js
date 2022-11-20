import { USER_INFO_SET, USER_INFO_REMOVE } from '../constants/userConstants'

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_INFO_SET:
      return { userInfo: action.payload }
    case USER_INFO_REMOVE:
      return {}
    default:
      return state
  }
}
