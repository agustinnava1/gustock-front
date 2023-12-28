import { useContext } from "react"
import UserContext from "../user.context"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const [user] = useContext(UserContext)

  return (
    user.rol && allowedRoles?.includes(user.rol)
      ? <Outlet />
      : user
        ? <Navigate to='/inicio' state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth