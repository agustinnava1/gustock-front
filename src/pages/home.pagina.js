import { useContext, useRef, useState } from 'react'

import { Button } from 'react-bootstrap'
import { AppRouter } from '../router/AppRouter'
import { TieredMenu } from 'primereact/tieredmenu'
import { NavLink, useLocation } from 'react-router-dom'

import Header from '../components/header.component'
import { SearchComponent } from '../components/search.component'
import Sidebar, { SidebarItem } from '../components/sidebar.component'

import { HomeIcon, LayoutDashboard, ShoppingCart, Package, Clipboard, MessageSquare, Bell, Settings, Search, LogOut } from 'lucide-react';

import UserContext from '../user.context'
import removeCookie from '../hooks/remove.cookie'

const parseRolesString = (rolesString) => {
  const matches = rolesString.match(/name=([^)]+)\)/)
  return matches ? matches[1] : null
}

export const Home = () => {
  const location = useLocation()

  const [user, setUser] = useContext(UserContext)
  const [showSearch, setShowSearch] = useState(false)

  const userRole = user?.roles ? parseRolesString(user.roles) : null;

  const logOut = () => {
    setUser(null)
    removeCookie('jwt_authorization')
  }

  return (
    <div className="flex">
      <Sidebar>
        <NavLink className="text-decoration-none" to={"/inicio"}>
          <SidebarItem icon={<HomeIcon size={20} />} text="Inicio" active={location.pathname === '/inicio'} />
        </NavLink>

        {userRole === 'ROLE_ADMINISTRADOR' && (
          <div>
            <NavLink className="text-decoration-none" to={"/panel"}>
              <SidebarItem icon={<LayoutDashboard size={20} />} text="Panel" active={location.pathname === '/panel'} />
            </NavLink>
            <NavLink className="text-decoration-none" to={"/venta/historial"}>
              <SidebarItem icon={<ShoppingCart size={20} />} text="Ventas" active={location.pathname === '/ventas'} />
            </NavLink>
            <NavLink className="text-decoration-none" to={"/productos"}>
              <SidebarItem icon={<Package size={20} />} text="Productos" active={location.pathname === '/productos'} />
            </NavLink>
            <NavLink className="text-decoration-none" to={"/reposicion"}>
              <SidebarItem icon={<Clipboard size={20} />} text="Reposición" active={location.pathname === '/reposicion'} />
            </NavLink>
          </div>
        )}

        <NavLink className="text-decoration-none" onClick={() => setShowSearch(true)}>
          <SidebarItem icon={<Search size={20} />} text="Búsqueda" />
        </NavLink>
        <hr className="mt-3"></hr>
        <NavLink className="text-decoration-none" to={"/mensajeria"}>
          <SidebarItem icon={<MessageSquare size={20} />} text="Mensajería" active={location.pathname === '/mensajeria'} />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/notificaciones"}>
          <SidebarItem icon={<Bell size={20} />} text="Notificaciones" active={location.pathname === '/notificaciones'} />
        </NavLink>
        <hr className="mt-3"></hr>

        {userRole === 'ROLE_ADMINISTRADOR' && (
          <div>
            <NavLink className="text-decoration-none" to={"/ajustes"}>
              <SidebarItem icon={<Settings size={20} />} text="Ajustes" active={location.pathname === '/ajustes'} />
            </NavLink>
            <NavLink className="text-decoration-none" onClick={logOut}>
              <SidebarItem icon={<LogOut size={20} />} text="Salir" />
            </NavLink>
          </div>
        )}
      </Sidebar>
      <div className="w-full h-screen max-h-screen overflow-hidden grow">
        <div className="overflow-y-auto h-full">
          <AppRouter></AppRouter>
        </div>
      </div>
      <SearchComponent visible={showSearch} onHide={() => setShowSearch(false)} />
    </div>
  )
}
