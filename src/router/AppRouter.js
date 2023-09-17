import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AdminPage } from "../pages/admin.page";
import { LocalPage } from "../pages/local.page";
import { PanelPage } from "../pages/panel.page";
import { AjustesPage } from "../pages/ajustes.page";
import { ReposicionPage } from "../pages/reposicion.page";
import { MensajeriaPage } from "../pages/mensajeria.page";
import { NotificacionesPage } from "../pages/notificaciones.page";

import { ProductosPage } from "../pages/producto/productos.page";
import { ProductoDetalle} from '../pages/producto/detalle.page';

import { VentasPage } from "../pages/venta/ventas.page";
import { RegistrarVenta } from '../pages/venta/venta.page';

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

        <Route exact path="/local/:nombre/venta/registrar" element={<RegistrarVenta />} />
        <Route exact path="/local/:nombre/devolucion/registrar" element={<ProductoDetalle />} />
        <Route exact path="/venta/detalle/:id" element={<ProductoDetalle />} />
        <Route exact path="/devolucion/detalle/:id" element={<ProductoDetalle />} />

        <Route exact path="/producto/registrar" element={<ProductoDetalle />} />
        <Route exact path="/producto/detalle/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/modificar/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/busqueda/:busqueda" element={<ProductoDetalle />} />
      </Routes>
  )
} 
