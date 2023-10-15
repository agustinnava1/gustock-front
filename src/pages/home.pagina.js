import { useRef, useState } from 'react'

import { Button } from 'react-bootstrap'
import { AppRouter } from '../router/AppRouter'
import { TieredMenu } from 'primereact/tieredmenu'
import { NavLink, useLocation } from 'react-router-dom'

import Header from '../components/header.component'
import { SearchComponent } from '../components/search.component'
import Sidebar, { SidebarItem } from '../components/sidebar.component'

import { HomeIcon, LayoutDashboard, ShoppingCart, Package, Clipboard, MessageSquare, Bell, Settings, Search, LogOut } from 'lucide-react';

export const Home = () => {
  const location = useLocation()

  const [showSearch, setShowSearch] = useState(false)

  const productMenu = useRef(null);
  const productItems = [
    {
      label: 'Ver productos',
      url: '/productos',
    },
    {
      label: 'Agregar producto',
      url: '/producto/registrar',
    },
    {
      label: 'Modificación rápida',
      url: '/productos/modificacion/rapida',
    },
    {
      label: 'Modificación masiva',
      url: '/productos/modificacion/masiva',
    },
  ];

  return (
    <div className="flex">
      <Sidebar>
        <NavLink className="text-decoration-none" to={"/inicio"}>
          <SidebarItem icon={<HomeIcon size={20} />} text="Inicio" active={location.pathname === '/inicio'} />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/panel"}>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Panel" active={location.pathname === '/panel'} />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/venta/historial"}>
          <SidebarItem icon={<ShoppingCart size={20} />} text="Ventas" active={location.pathname === '/ventas'} />
        </NavLink>

        <Button className="text-start text-decoration-none" onClick={(e) => productMenu.current.toggle(e)} >
          <SidebarItem icon={<Package size={20} />} text="Productos"
            active={location.pathname === '/productos' ||
                    location.pathname === '/producto/registrar' || 
                    location.pathname === '/productos/modificacion/rapida' || 
                    location.pathname === '/productos/modificacion/masiva'} />
          <TieredMenu model={productItems} popup ref={productMenu} breakpoint="767px" className='m-0 p-0' />
        </Button>

        <NavLink className="text-decoration-none" to={"/reposicion"}>
          <SidebarItem icon={<Clipboard size={20} />} text="Reposición" active={location.pathname === '/reposicion'} />
        </NavLink>
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
        <NavLink className="text-decoration-none" to={"/ajustes"}>
          <SidebarItem icon={<Settings size={20} />} text="Ajustes" active={location.pathname === '/ajustes'} />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<LogOut size={20} />} text="Salir" />
        </NavLink>
      </Sidebar>
      <div className="grow w-full">
        <Header></Header>
        <AppRouter></AppRouter>
      </div>
      <SearchComponent visible={showSearch} onHide={() => setShowSearch(false)} />
    </div>
  )
}
