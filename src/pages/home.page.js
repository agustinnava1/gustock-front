import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header.component";
import Sidebar, { SidebarItem } from "../components/sidebar.component";
import { HomeIcon, LayoutDashboard, ShoppingCart, Package, Clipboard, MessageSquare, Bell, Settings } from 'lucide-react';

import { AdminPage } from "./admin.page";
import { LocalPage } from "./local.page";
import { PanelPage } from "./panel.page";
import { VentasPage } from "./ventas.page";
import { AjustesPage } from "./ajustes.page";
import { ProductosPage } from "./productos.page";
import { ReposicionPage } from "./reposicion.page";
import { MensajeriaPage } from "./mensajeria.page";
import { NotificacionesPage } from "./notificaciones.page";

export const Home = () => {
  return (
    <div className="flex">
      <Sidebar>
        <NavLink className="text-decoration-none" to={"/inicio"}>
          <SidebarItem icon={<HomeIcon size={20} />} text="Inicio" active />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/panel"}>
          <SidebarItem icon={<LayoutDashboard size={20} />} type="button" data-bs-toggle="dropdown" aria-expanded="false" text="Panel" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/ventas"}>
          <SidebarItem icon={<ShoppingCart size={20} />} text="Ventas" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/productos"}>
          <SidebarItem icon={<Package size={20} />} text="Productos" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/reposicion"}>
          <SidebarItem icon={<Clipboard size={20} />} text="Reposición" />
        </NavLink>
        <hr className="mt-3"></hr>
        <NavLink className="text-decoration-none" to={"/mensajeria"}>
          <SidebarItem icon={<MessageSquare size={20} />} text="Mensajería" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/notificaciones"}>
          <SidebarItem icon={<Bell size={20} />} text="Notificaciones" />
        </NavLink>
        <hr className="mt-3"></hr>
        <NavLink className="text-decoration-none" to={"/ajustes"}>
          <SidebarItem icon={<Settings size={20} />} text="Ajustes" />
        </NavLink>
      </Sidebar>
      <div className="grow">
        <Header></Header>
        <Routes>
          <Route path="/inicio" element={<AdminPage />} />
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/ventas" element={<VentasPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/reposicion" element={<ReposicionPage />} />
          <Route path="/mensajeria" element={<MensajeriaPage />} />
          <Route path="/notificaciones" element={<NotificacionesPage />} />
          <Route path="/ajustes" element={<AjustesPage />} />

          <Route exact path="/local/:id" element={<LocalPage />} />
        </Routes>
      </div>
    </div>
  )
}
