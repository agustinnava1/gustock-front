import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import UserContext from '../user.context'

import Sidebar, { SidebarItem } from '../components/sidebar.component'
import { HomeIcon, LayoutDashboard, ShoppingCart, Package, Clipboard, MessageSquare, Bell, Settings, LogOut } from 'lucide-react';

const Menu = () => {
  const location = useLocation()
  const [user] = useContext(UserContext)

  return (
    <Sidebar>
      <NavLink className='text-decoration-none' to={'/inicio'}>
        <SidebarItem icon={<HomeIcon size={30} />} text='Inicio' active={location.pathname === '/inicio'} />
      </NavLink>

      {user.rol === 'ROLE_ADMINISTRADOR' && (
        <div>
          <NavLink className='text-decoration-none' to={'/panel'}>
            <SidebarItem icon={<LayoutDashboard size={30} />} text='Panel' active={location.pathname === '/panel'} />
          </NavLink>
          <NavLink className='text-decoration-none' to={'/venta/historial'}>
            <SidebarItem icon={<ShoppingCart size={30} />} text='Ventas' active={location.pathname === '/ventas'} />
          </NavLink>
          <NavLink className='text-decoration-none' to={'/productos'}>
            <SidebarItem icon={<Package size={30} />} text='Productos' active={location.pathname === '/productos'} />
          </NavLink>
          <NavLink className='text-decoration-none' to={'/reposicion'}>
            <SidebarItem icon={<Clipboard size={30} />} text='Reposición' active={location.pathname === '/reposicion'} />
          </NavLink>
        </div>
      )}

      <hr className='mt-3'></hr>

      <NavLink className='text-decoration-none' to={'/mensajeria'}>
        <SidebarItem icon={<MessageSquare size={30} />} text='Mensajería' active={location.pathname === '/mensajeria'} />
      </NavLink>
      <NavLink className='text-decoration-none' to={'/notificaciones'}>
        <SidebarItem icon={<Bell size={30} />} text='Notificaciones' active={location.pathname === '/notificaciones'} />
      </NavLink>
      
      <hr className='mt-3'></hr>

      {user.rol === 'ROLE_ADMINISTRADOR' && (
        <NavLink className='text-decoration-none' to={'/ajustes'}>
          <SidebarItem icon={<Settings size={30} />} text='Ajustes' active={location.pathname === '/ajustes'} />
        </NavLink>
      )}
    </Sidebar>
  )
}

export default Menu;