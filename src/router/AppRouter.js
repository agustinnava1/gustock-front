import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AdminPagina } from '../pages/admin.pagina'
import { LocalPagina } from '../pages/local.pagina'

import { PanelPage } from '../pages/panel.page'
import { AjustesPage } from '../pages/ajustes.page'
import { ReposicionPage } from '../pages/reposicion.page'
import { MensajeriaPage } from '../pages/mensajeria.page'
import { NotificacionesPage } from '../pages/notificaciones.page'

import { ProductosPagina } from '../pages/producto/productos.pagina'
import { ProductoDetalle } from '../pages/producto/producto.detalle.page'

import { VentasPagina } from '../pages/venta/ventas.pagina'
import { RegistrarVenta } from '../pages/venta/venta.registrar.pagina'

import { ProductosModificacionMasiva } from '../pages/producto/modificacion.masiva'
import { ProductosModificacionRapida } from '../pages/producto/modificacion.rapida'
import { ProductosRegistrar } from '../pages/producto/producto.registrar.page'
import { VentaDetalle } from '../pages/venta/venta.detalle.pagina'

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/inicio" element={<AdminPagina />} />
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/reposicion" element={<ReposicionPage />} />
        <Route path="/mensajeria" element={<MensajeriaPage />} />
        <Route path="/notificaciones" element={<NotificacionesPage />} />
        <Route path="/ajustes" element={<AjustesPage />} />

        <Route exact path="/deposito/:nombre" element={<LocalPagina />} />
        <Route exact path="/local/:nombre" element={<LocalPagina />} />
        <Route exact path="/local/:nombre/venta/registrar" element={<RegistrarVenta />} />
        <Route exact path="/local/:nombre/devolucion/registrar" element={<ProductoDetalle />} />

        <Route path="/ventas" element={<VentasPagina />} />
        <Route exact path="/venta/detalle/:id" element={<VentaDetalle />} />
        <Route exact path="/devolucion/detalle/:id" element={<ProductoDetalle />} />

        <Route path="/productos" element={<ProductosPagina />} />
        <Route path="/productos/modificacion/rapida" element={<ProductosModificacionRapida />} />
        <Route path="/productos/modificacion/masiva" element={<ProductosModificacionMasiva />} />

        <Route exact path="/producto/registrar" element={<ProductosRegistrar />} />
        <Route exact path="/producto/detalle/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/modificar/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/buscar/:busqueda" element={<ProductoDetalle />} />
      </Routes>
  )
} 
