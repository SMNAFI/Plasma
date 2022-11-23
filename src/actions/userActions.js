import { USER_INFO_SET, USER_INFO_REMOVE } from '../constants/userConstants'

export const setUser = (data) => async (dispatch) => {
  // console.log(data)
  dispatch({
    type: USER_INFO_SET,
    payload: data,
  })
  localStorage.setItem('userInfo', JSON.stringify(data))
}

export const removeUser = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_INFO_REMOVE,
  })
}
