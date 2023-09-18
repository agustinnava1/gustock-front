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
import { ProductoDetalle} from '../pages/producto/producto.detalle.page';

import { VentasPage } from "../pages/venta/ventas.page";
import { RegistrarVenta } from '../pages/venta/venta.page';
import { ProductosModificacionMasiva } from '../pages/producto/modificacion.masiva';
import { ProductosModificacionRapida } from '../pages/producto/modificacion.rapida';
import { ProductosRegistrar } from '../pages/producto/producto.registrar.page';

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/inicio" element={<AdminPage />} />
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/reposicion" element={<ReposicionPage />} />
        <Route path="/mensajeria" element={<MensajeriaPage />} />
        <Route path="/notificaciones" element={<NotificacionesPage />} />
        <Route path="/ajustes" element={<AjustesPage />} />

        <Route exact path="/local/:id" element={<LocalPage />} />

        <Route exact path="/local/:nombre/venta/registrar" element={<RegistrarVenta />} />
        <Route exact path="/local/:nombre/devolucion/registrar" element={<ProductoDetalle />} />
        <Route exact path="/venta/detalle/:id" element={<ProductoDetalle />} />
        <Route exact path="/devolucion/detalle/:id" element={<ProductoDetalle />} />

        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/productos/modificacion/rapida" element={<ProductosModificacionRapida />} />
        <Route path="/productos/modificacion/masiva" element={<ProductosModificacionMasiva />} />

        <Route exact path="/producto/registrar" element={<ProductosRegistrar />} />
        <Route exact path="/producto/detalle/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/modificar/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/buscar/:busqueda" element={<ProductoDetalle />} />
      </Routes>
  )
} 
