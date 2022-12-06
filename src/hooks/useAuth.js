import { getAuth } from 'firebase/auth'

const useAuth = () => {
  const user = getAuth().currentUser

  if (user) return true

  return false
}

export default useAuth
