import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { addLocale } from 'primereact/api'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'

import { formatCurrency } from '../../helper/format'
import { calendarioEspañol } from '../../helper/configuracion.regional'

import VentaFiltros from '../../helper/VentaFiltros'
import VentaServicio from '../../services/venta.servicio'

export const VentasPagina = () => {
  const [listaVentas, setListaVentas] = useState([])

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const [local, setLocal] = useState(null)
  const [cantidad, setCantidad] = useState(10)
  const [metodoPago, setMetodoPago] = useState(null)
  const [fechaDesde, setFechaDesde] = useState(null)
  const [fechaHasta, setFechaHasta] = useState(null)

  const [paginaActual, setPaginaActual] = useState(1)
  const [totalRegistros, setTotalRegistros] = useState(null)
  const [paginacionRequest, setPaginacionRequest] = useState({
    local: null,
    pagina: paginaActual,
    cantidad: null,
    fechaDesde: null,
    fechaHasta: null,
    metodoPago: null
  })

  const { listaLocales, listaMetodosPago, listaCantidades } = VentaFiltros()

  useEffect(() => {
    VentaServicio.listar().then(data => {
      setListaVentas(data.ventas.content)
      setTotalRegistros(data.totalRegistros)
    })
  }, [])

  const handleFechaDesde = (e) => {
    setFechaDesde(e.target.value)
    const fecha = new Date(e.target.value).toISOString().split('T')[0]
    paginacionRequest.fechaDesde = fecha
    setPaginacionRequest({ ...paginacionRequest })
  };

  const handleFechaHasta = (e) => {
    setFechaHasta(e.target.value)
    const fecha = new Date(e.target.value).toISOString().split('T')[0]
    paginacionRequest.fechaHasta = fecha
    setPaginacionRequest({ ...paginacionRequest })
  };

  const handleLocal = (e) => {
    setLocal(e.target.value)
    paginacionRequest.local = e.target.value.nombre
    setPaginacionRequest({ ...paginacionRequest })
  };

  const handleMetodoPago = (e) => {
    setMetodoPago(e.target.value);
    paginacionRequest.metodoPago = e.target.value
    setPaginacionRequest({ ...paginacionRequest })
  };

  const handleCantidad = (e) => {
    setCantidad(e.target.value);
    paginacionRequest.cantidad = e.target.value
    setPaginacionRequest({ ...paginacionRequest })
  };

  addLocale('es', calendarioEspañol)

  const filtrarVentas = () => {
    console.log(paginacionRequest)

    VentaServicio.listar(paginacionRequest).then(data => {
      setListaVentas(data.ventas.content)
      console.log(data.ventas.content)
    })
  };

  const cambiarPagina = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const pagina = Math.ceil((event.first + 1) / event.rows)
    setPaginaActual(pagina)

    filtrarVentas();
  };

  return (
    <div className="sm:w-auto w-full m-5">
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Mis ventas</h2>
      <span className="text-xl font-normal">Gestioná y explorá el registro histórico de ventas en todas las sucursales</span>
      <div className='flex justify-between my-5'>
        <div className='md:flex'>
          <div className='flex-auto me-3'>
            <Calendar dateFormat="dd/mm/yy" locale="es" placeholder='Seleccione fecha desde'
              value={fechaDesde} onChange={handleFechaDesde} className="p-inputtext-sm" />
          </div>
          <div className='flex-auto me-3'>
            <Calendar dateFormat="dd/mm/yy" locale="es" placeholder='Seleccione fecha hasta'
              value={fechaHasta} onChange={handleFechaHasta} className="p-inputtext-sm" />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaLocales} optionLabel='nombre' emptyMessage="Sin registros" placeholder="Selecciona un local"
              value={local} onChange={handleLocal} className='w-full p-inputtext-sm' />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaMetodosPago} emptyMessage="Sin registros" placeholder="Selecciona un método de pago"
              value={metodoPago} onChange={handleMetodoPago} className='w-full p-inputtext-sm' />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaCantidades} emptyMessage="Sin registros" placeholder="Selecciona la cantidad"
              value={cantidad} onChange={handleCantidad} className='flex-1 p-inputtext-sm' />
          </div>
          <div className='flex-auto'>
            <Button label="Filtrar" onClick={filtrarVentas} className='hover:!bg-blue-600' size='small' />
          </div>
        </div>
        <div>
          <Button label='Opciones' className='hover:!bg-blue-600' size='small' />
        </div>
      </div>
      <Card className="!rounded-lg !shadow-md mb-5">
        <DataTable value={listaVentas} emptyMessage="Sin registro de ventas" size="small">
          <Column field='id' header="N° Venta" style={{ width: '5%' }}></Column>
          <Column field={(rowData) => (rowData.fecha)} header="Fecha" style={{ width: '10%' }}></Column>
          <Column field={(rowData) => (rowData.hora)} header="Hora" style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.pagoEfectivo)} header="Efectivo" style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.pagoDebito)} header="Débito" style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.pagoCodigoQr)} header="Código Qr" style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.pagoCredito)} header="Crédito" style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.total)} header="Total" style={{ width: '10%' }}></Column>
          <Column field='local.nombre' header="Local" style={{ width: '10%' }}></Column>
          <Column field='usuario' header="Usuario" style={{ width: '10%' }}></Column>
          <Column header="Acciones" alignHeader={'center'} style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex justify-center'>
                <Link to={`/venta/detalle/${rowData.id}`} className='me-3'>
                  <button className='bg-blue-500 rounded text-xl text-white px-2 py-1'>
                    <i className='bi bi-eye-fill'></i>
                  </button>
                </Link>
                <button className='bg-red-500 rounded text-xl text-white px-2 py-1' >
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
        <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalRegistros}
          onPageChange={cambiarPagina} className='mt-5 !p-0'></Paginator>
      </Card>
    </div>
  )
}