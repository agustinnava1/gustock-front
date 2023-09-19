import { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { addLocale } from 'primereact/api'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { DataTable } from 'primereact/datatable'

import VentaFiltros from '../../helper/VentaFiltros'
import VentaServicio from '../../services/venta.servicio'

export const VentasPagina = () => {
  const [listaVentas, setListaVentas] = useState([])

  const [local, setLocal] = useState(null)
  const [cantidad, setCantidad] = useState(null)
  const [metodoPago, setMetodoPago] = useState(null)
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);

  const [paginacionRequest, setPaginacionRequest] = useState({
    local: null,
    cantidad: null,
    metodoPago: null,
    fechaDesde: null,
    fechaHasta: null,
  });

  const { listaLocales, listaMetodosPago, listaCantidades } = VentaFiltros();

  useEffect(() => {
    /*VentaServicio.listar().then(data => {
      setListaVentas(data)
    })*/
  }, [])

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  });

  const filtrarVentas = () => {
    setPaginacionRequest({
      local: local.nombre,
      cantidad: cantidad,
      metodoPago: metodoPago,
      fechaDesde: new Date(fechaDesde).toISOString().slice(0, 10),
      fechaHasta: new Date(fechaHasta).toISOString().slice(0, 10),
    })

    console.log(paginacionRequest)
  };

  return (
    <div className="sm:w-auto w-full m-5">
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Mis ventas</h2>
      <span className="text-xl font-normal">Gestioná y explorá el registro histórico de ventas en todas las sucursales</span>
      <div className='flex justify-between my-5'>
        <div className='md:flex'>
          <div className='flex-auto me-3'>
            <Calendar dateFormat="dd/mm/yy" locale="es" placeholder='Seleccione fecha desde'
              value={fechaDesde} onChange={(e) => setFechaDesde(e.value)} className="p-inputtext-sm" />
          </div>
          <div className='flex-auto me-3'>
            <Calendar dateFormat="dd/mm/yy" locale="es" placeholder='Seleccione fecha hasta'
              value={fechaHasta} onChange={(e) => setFechaHasta(e.value)} className="p-inputtext-sm" />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaLocales} optionLabel='nombre' emptyMessage="Sin registros" placeholder="Selecciona un local"
              value={local} onChange={(e) => setLocal(e.value)} className='w-full p-inputtext-sm' />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaMetodosPago} emptyMessage="Sin registros" placeholder="Selecciona un método de pago"
              value={metodoPago} onChange={(e) => setMetodoPago(e.value)} className='w-full p-inputtext-sm' />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaCantidades} emptyMessage="Sin registros" placeholder="Selecciona la cantidad"
              value={cantidad} onChange={(e) => setCantidad(e.value)} className='flex-1 p-inputtext-sm' />
          </div>
          <div className='flex-auto'>
            <Button label="Filtrar" onClick={filtrarVentas} className='hover:!bg-blue-600' size='small' />
          </div>
        </div>
        <div>
          <Button label='Opciones' className='hover:!bg-blue-600' size='small' />
        </div>
      </div>
      <Card className="drop-shadow !shadow-none mb-5">
        <DataTable tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin registro de ventas" size="small">
          <Column header="N° Venta" style={{ width: '5%' }}></Column>
          <Column header="Fecha" style={{ width: '10%' }}></Column>
          <Column header="Hora" style={{ width: '10%' }}></Column>
          <Column header="Efectivo" style={{ width: '10%' }}></Column>
          <Column header="Débito" style={{ width: '10%' }}></Column>
          <Column header="Código Qr" style={{ width: '10%' }}></Column>
          <Column header="Crédito" style={{ width: '10%' }}></Column>
          <Column header="Total" style={{ width: '10%' }}></Column>
          <Column header="Local" style={{ width: '10%' }}></Column>
          <Column header="Usuario" style={{ width: '10%' }}></Column>
          <Column header="Acciones" style={{ width: '5%' }}></Column>
        </DataTable>
      </Card>
    </div>
  )
}