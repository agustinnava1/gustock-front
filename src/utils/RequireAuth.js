import { useContext } from "react"
import UserContext from "../user.context"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const parseRolesString = (rolesString) => {
  const matches = rolesString.match(/name=([^)]+)\)/)
  return matches ? matches[1] : null
}

const RequireAuth = ({ allowedRoles }) => {
  const [user] = useContext(UserContext)
  const location = useLocation()

  const userRole = user?.roles ? parseRolesString(user.roles) : null;

  return (
    userRole && allowedRoles?.includes(userRole)
      ? <Outlet />
      : user
        ? <Navigate to='/inicio' state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth