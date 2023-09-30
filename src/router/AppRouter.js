import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AdminPagina } from '../pages/admin.pagina'

import { LocalPagina } from '../pages/local.pagina'
import { PanelPagina } from '../pages/panel.pagina'
import { AjustesPagina } from '../pages/ajustes.pagina'
import { ReposicionPagina } from '../pages/reposicion.pagina'
import { MensajeriaPagina } from '../pages/mensajeria.pagina'
import { NotificacionesPagina } from '../pages/notificaciones.pagina'

import { ProductoBusqueda } from '../pages/busqueda.pagina'
import { ProductosPagina } from '../pages/producto/productos.pagina'
import { ProductoDetalle } from '../pages/producto/producto.detalle.pagina'
import { ProductoRegistrar } from '../pages/producto/producto.registrar.pagina'
import { ProductosModificacionMasiva } from '../pages/producto/modificacion.masiva'
import { ProductosModificacionRapida } from '../pages/producto/modificacion.rapida'

import { VentasPagina } from '../pages/venta/ventas.pagina'
import { VentaDetalle } from '../pages/venta/venta.detalle.pagina'
import { RegistrarVenta } from '../pages/venta/venta.registrar.pagina'

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/inicio" element={<AdminPagina />} />
        <Route path="/panel" element={<PanelPagina />} />
        <Route path="/reposicion" element={<ReposicionPagina />} />
        <Route path="/mensajeria" element={<MensajeriaPagina />} />
        <Route path="/notificaciones" element={<NotificacionesPagina />} />
        <Route path="/ajustes" element={<AjustesPagina />} />

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

        <Route exact path="/producto/registrar" element={<ProductoRegistrar />} />
        <Route exact path="/producto/detalle/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/modificar/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/buscar/:criterio" element={<ProductoBusqueda />} />
      </Routes>
  )
} 
