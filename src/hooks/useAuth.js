import { useSelector } from 'react-redux'

const useAuth = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  if (userInfo) return true

  return false
}

export default useAuth
