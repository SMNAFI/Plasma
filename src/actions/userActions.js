import { USER_INFO_SET, USER_INFO_REMOVE } from '../constants/userConstants'

export const setUser = (uid, email, data) => async (dispatch) => {
  const { name, isAdmin, isDonar } = data
  console.log(uid, email, data)
  dispatch({
    type: USER_INFO_SET,
    payload: { uid, email, name, isAdmin, isDonar },
  })
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ uid, email, name, isAdmin, isDonar })
  )
}

export const removeUser = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_INFO_REMOVE,
  })
}
