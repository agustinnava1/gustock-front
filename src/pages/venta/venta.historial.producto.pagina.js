import { useState } from 'react'

import { Link } from 'react-router-dom'

import { Row } from 'primereact/row'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { addLocale } from 'primereact/api'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { InputText } from 'primereact/inputtext'
import { ColumnGroup } from 'primereact/columngroup'

import { usePagination } from '../../hooks/venta.paginacion'

import { calendarioEspañol } from '../../helper/configuracion.regional'
import { formatoFechaCorto, formatoHora } from '../../helper/format'

import VentaFiltros from '../../helper/VentaFiltros'
import VentaServicio from '../../services/venta.servicio'

export const VentaHistorialProductoPagina = () => {
  const initialPagination = {
    local: null,
    pagina: 0,
    cantidad: 10,
    producto: null,
    fechaDesde: null,
    fechaHasta: null
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listaVentas, setListaVentas] = useState([])
  const [totalRegistros, setTotalRegistros] = useState(null)
  const { listaLocales, listaCantidades } = VentaFiltros()

  const { paginationState, onDropdownChange, onInputChange, handleDate } = usePagination(initialPagination)

  const { local, cantidad, producto } = paginationState

  const filtrarVentas = () => {
    setFirst(0)
    setRows(cantidad)

    let request
    if (local !== null) {
      request = { ...paginationState, pagina: 0, local: local.nombre }
    } else {
      request = { ...paginationState, pagina: 0 }
    }

    VentaServicio.listarPorProducto(request).then(data => {
      setListaVentas(data.content)
      setTotalRegistros(data.totalElements)
    })
  }

  const cambiarPagina = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    let request
    if (local !== null) {
      request = { ...paginationState, pagina: event.page, local: local.nombre }
    } else {
      request = { ...paginationState, pagina: event.page }
    }

    VentaServicio.listar(request).then(data => {
      setListaVentas(data.content)
      setTotalRegistros(data.totalElements)
    })
  }

  addLocale('es', calendarioEspañol)

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer='Total vendidos:' colSpan={10} footerStyle={{ textAlign: 'left' }} />
        <Column />
      </Row>
    </ColumnGroup>
  )

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-3'>Historial de ventas por producto</h2>
      <span className='text-xl font-normal'>Ingresá el código de un producto para obtener un listado de ventas que contienen a este</span>
      <Card className='!shadow-none border my-5'>
        <div className='flex justify-between'>
          <div className='md:flex flex-wrap'>
            <div className='flex-1 me-3'>
              <label className='block font-medium text-lg mb-2'>Producto</label>
              <InputText placeholder='Ingresá un código de producto' 
                name='producto' value={producto} onChange={onInputChange} className='p-inputtext-sm w-52' />
            </div>
            <div className='flex-1 me-3'>
              <label className='block font-medium text-lg mb-2'>Fecha desde</label>
              <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione fecha desde'
                name='fechaDesde' onChange={handleDate} className='p-inputtext-sm w-52' />
            </div>
            <div className='flex-1 me-3'>
              <label className='block font-medium text-lg mb-2'>Fecha hasta</label>
              <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione fecha hasta'
                name='fechaHasta' onChange={handleDate} className='p-inputtext-sm w-52' />
            </div>
            <div className='flex-1 me-3'>
              <label className='block font-medium text-lg mb-2'>Local</label>
              <Dropdown options={listaLocales} optionLabel='nombre' emptyMessage='Sin registros' placeholder='Selecciona un local'
                name='local' value={local} onChange={onDropdownChange} className='p-inputtext-sm w-52' />
            </div>
            <div className='flex-1 me-3'>
              <label className='block font-medium text-lg mb-2'>Cantidad</label>
              <Dropdown options={listaCantidades} emptyMessage='Sin registros' placeholder='Selecciona la cantidad'
                name='cantidad' value={cantidad} onChange={onDropdownChange} className='p-inputtext-sm w-52' />
            </div>
            <div className='flex-1'>
              <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
              <Button label="Filtrar" onClick={filtrarVentas} className='hover:!bg-blue-600' size='small' />
            </div>
          </div>
          <div>
            <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
            <Link to={`/venta/historial`}>
              <Button label='Volver' className='hover:!bg-blue-600' size='small' />
            </Link>
          </div>
        </div>
      </Card >
      <Card className='!shadow-none border'>
        <DataTable value={listaVentas} footerColumnGroup={footerGroup}
          stripedRows emptyMessage='Sin registro de ventas' size='small'>
          <Column field='id' header='Código' className='font-bold' style={{ width: '5%' }}></Column>
          <Column field='local.nombre' header='Local' style={{ width: '10%' }}></Column>
          <Column field='usuario' header='Usuario' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatoFechaCorto(rowData.fecha)} header='Fecha' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatoHora(rowData.hora)} header='Hora' style={{ width: '10%' }}></Column>
          <Column header='Producto/s' style={{ width: '50%' }}
            body={(rowData) => (
              <div>
                {rowData.detalle.map((producto, index) => (
                  <p className="m-auto" key={index}>
                    <span>{producto.descripcion}</span>
                  </p>
                ))}
              </div>
            )}>
          </Column>
          <Column header='Acciones' alignHeader={'center'} style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex justify-center'>
                <Link to={`/venta/detalle/${rowData.id}`} target='_blank'>
                  <button className='bg-sky-500 rounded text-xl text-white px-2 py-1 hover:bg-sky-600'>
                    <i className='bi bi-eye-fill'></i>
                  </button>
                </Link>
              </div>
            )}>
          </Column>
        </DataTable>
        <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalRegistros}
          onPageChange={cambiarPagina} className='mt-5 !p-0'></Paginator>
      </Card >
    </div >
  )
}