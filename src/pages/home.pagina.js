import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { AppRouter } from '../router/AppRouter'
import { InputText } from 'primereact/inputtext'
import { NavLink, useLocation } from 'react-router-dom'

import Header from '../components/header.component'
import Sidebar, { SidebarItem } from '../components/sidebar.component'
import { HomeIcon, LayoutDashboard, ShoppingCart, Package, Clipboard, MessageSquare, Bell, Settings, Search, LogOut } from 'lucide-react';

export const Home = () => {
  const location = useLocation()
  const [mostrarBuscador, setMostrarBuscador] = useState(false)

  function Buscador() {
    return (
      <div className="card flex justify-content-center">
        <Dialog header='Buscar producto' className="bg-blue-500" visible={mostrarBuscador} style={{ width: '50vw' }}
          onHide={() => setMostrarBuscador(false)}>
          <InputText placeholder='Ingresa un código, código de barras o descripción'
            className="p-inputtext-lg w-full !shadow-none" autoFocus />
        </Dialog>
      </div>
    )
  }

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
        <NavLink className="text-decoration-none" to={"/productos"}>
          <SidebarItem icon={<Package size={20} />} text="Productos" active={location.pathname === '/productos'} />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/reposicion"}>
          <SidebarItem icon={<Clipboard size={20} />} text="Reposición" active={location.pathname === '/reposicion'} />
        </NavLink>
        <NavLink className="text-decoration-none" onClick={() => setMostrarBuscador(true)}>
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
      {mostrarBuscador && <Buscador />}
    </div>
  )
}