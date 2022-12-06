import { USER_INFO_SET, USER_INFO_REMOVE } from '../constants/userConstants'
import { getAuth, signOut } from 'firebase/auth'

export const setUser = (data) => async (dispatch) => {
  // console.log(data)
  dispatch({
    type: USER_INFO_SET,
    payload: data,
  })
  localStorage.setItem('userInfo', JSON.stringify(data))
}

export const removeUser = () => async (dispatch) => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem('userInfo')
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message)
    })

  dispatch({
    type: USER_INFO_REMOVE,
  })
}
