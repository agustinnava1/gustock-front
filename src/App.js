import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Sidebar, { SidebarItem } from "./components/sidebar.component";
import { HomeIcon, LayoutDashboard, ShoppingCart, Package, Clipboard, MessageSquare, Bell, Settings } from 'lucide-react';

import Home from "./pages/Home";
import Login from "./pages/Login";
import { Navbar } from "react-bootstrap";
import Header from "./components/header.component";

function App() {
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
        <div className="m-5">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/panel" element={<Home />} />
            <Route path="/ventas" element={<Home />} />
            <Route path="/productos" element={<Home />} />
            <Route path="/reposicion" element={<Home />} />
            <Route path="/mensajeria" element={<Home />} />
            <Route path="/notificaciones" element={<Home />} />
            <Route path="/ajustes" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;