import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Sidebar, { SidebarItem } from "./components/sidebar.component";
import { HomeIcon, LayoutDashboard, ShoppingCart, Package, Clipboard, MessageSquare, Bell, Settings } from 'lucide-react';

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex">
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
          <SidebarItem icon={<Clipboard size={20} />} text="Reposición" />
        </NavLink>
        <hr className="mt-3"></hr>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<MessageSquare size={20} />} text="Mensajería" />
        </NavLink>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<Bell size={20} />} text="Notificaciones" />
        </NavLink>
        <hr className="mt-3"></hr>
        <NavLink className="text-decoration-none" to={"/"}>
          <SidebarItem icon={<Settings size={20} />} text="Ajustes" />
        </NavLink>
      </Sidebar>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;