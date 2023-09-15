import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AdminPage } from "../pages/admin.page";
import { LocalPage } from "../pages/local.page";
import { PanelPage } from "../pages/panel.page";
import { VentasPage } from "../pages/ventas.page";
import { AjustesPage } from "../pages/ajustes.page";
import { ProductosPage } from "../pages/productos.page";
import { ReposicionPage } from "../pages/reposicion.page";
import { MensajeriaPage } from "../pages/mensajeria.page";
import { NotificacionesPage } from "../pages/notificaciones.page";

export const AppRouter = () => {
  return (
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
  )
} 
