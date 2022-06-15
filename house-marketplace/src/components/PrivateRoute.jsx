import { Navigate, Outlet } from 'react-router-dom'
import  useAuthStatus  from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if(checkingStatus) {
    return <Spinner />
  }

  return  loggedIn ? <Outlet /> : <Navigate to='/sign-in'/>
}

export default PrivateRoute

// Protected rounts in react router dom v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks