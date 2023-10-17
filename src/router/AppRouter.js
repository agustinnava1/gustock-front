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

import { VentaDetalle } from '../pages/venta/venta.detalle.pagina'
import { RegistrarVentaPagina } from '../pages/venta/venta.registrar.pagina'
import { VentaHistorialPagina } from '../pages/venta/venta.historial.pagina'
import { VentaHistorialProductoPagina } from '../pages/venta/venta.historial.producto.pagina'
import { VentaHistorialRubroPagina } from '../pages/venta/venta.historial.rubro.pagina'
import { RegistrarDevolucionPagina } from '../pages/venta/devolucion.registrar.pagina'

export const AppRouter = () => {
  return (
      <Routes>
        <Route exact path="/inicio" element={<AdminPagina />} />
        <Route exact path="/panel" element={<PanelPagina />} />
        <Route exact path="/reposicion" element={<ReposicionPagina />} />
        <Route exact path="/mensajeria" element={<MensajeriaPagina />} />
        <Route exact path="/notificaciones" element={<NotificacionesPagina />} />
        <Route exact path="/ajustes" element={<AjustesPagina />} />

        <Route exact path="/deposito/:name" element={<LocalPagina />} />
        <Route exact path="/local/:name" element={<LocalPagina />} />
        <Route exact path="/local/:name/venta/registrar" element={<RegistrarVentaPagina />} />
        <Route exact path="/local/:name/devolucion/registrar" element={<RegistrarDevolucionPagina />} />

        <Route exact path="/venta/detalle/:id" element={<VentaDetalle />} />
        <Route exact path="/devolucion/detalle/:id" element={<VentaDetalle />} />
        <Route exact path="/venta/historial" element={<VentaHistorialPagina />} />
        <Route exact path="/venta/historial/rubro" element={<VentaHistorialRubroPagina />} />
        <Route exact path="/venta/historial/producto" element={<VentaHistorialProductoPagina />} />

        <Route exact path="/productos" element={<ProductosPagina />} />
        <Route exact path="/productos/modificacion/rapida" element={<ProductosModificacionRapida />} />
        <Route exact path="/productos/modificacion/masiva" element={<ProductosModificacionMasiva />} />

        <Route exact path="/producto/registrar" element={<ProductoRegistrar />} />
        <Route exact path="/producto/detalle/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/modificar/:id" element={<ProductoDetalle />} />
        <Route exact path="/producto/buscar/:criterio" element={<ProductoBusqueda />} />
      </Routes>
  )
} 
