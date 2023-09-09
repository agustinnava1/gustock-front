import Navbar from "../../components/navbar/Navbar";
import Sidebar, { SidebarItem } from "../../components/sidebar/Sidebar";
import { LayoutDashboard, MessageSquare, Bell, Package, Settings, HomeIcon, ShoppingCart, Clipboard } from 'lucide-react';

import './home.css';
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="d-flex flex-nowrap">
      <Sidebar>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<HomeIcon size={20} />} text="Inicio" active />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<LayoutDashboard size={20} />} type="button" data-bs-toggle="dropdown" aria-expanded="false" text="Panel" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<ShoppingCart size={20} />} text="Ventas" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<Package size={20} />} text="Productos" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<Clipboard size={20} />} text="Reposicion" />
        </NavLink>
        <hr className="mt-3"></hr>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<MessageSquare size={20} />} text="Mensajeria" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<Bell size={20} />} text="Notificaciones" />
        </NavLink>
        <hr className="mt-3"></hr>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<Settings size={20} />} text="Ajustes" />
        </NavLink>
      </Sidebar>
    </div>
  );
}

export default Home;