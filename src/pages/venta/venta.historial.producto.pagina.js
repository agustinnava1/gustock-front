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
import { formatDate, formatTime } from '../../helper/format'

import VentaService from '../../services/venta.servicio'
import VentaFilters from '../../helper/venta.filtros'

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
  const [listItems, setListItems] = useState([])
  const [quantitySold, setQuantitySold] = useState(0)
  const [totalElements, setTotalElements] = useState(null)

  const { paginationState, onDropdownChange, onInputChange, handleDate } = usePagination(initialPagination)

  const { stores, quantities } = VentaFilters()
  const { local, producto, cantidad } = paginationState


  const generateRequest = (paginationState, page) => {
    const request = { ...paginationState, pagina: page || 0 };

    if (local !== null) {
      request.local = local.nombre;
    }

    return request;
  }

  const filter = () => {
    setFirst(0)
    setRows(cantidad)

    const request = generateRequest(paginationState)

    VentaService.getAllByProduct(request).then(data => {
      setListItems(data.listaVentas)
      setQuantitySold(data.vendidos)
      setTotalElements(data.totalElements)
    })
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    VentaService.getAllByProduct(request).then(data => {
      setListItems(data.listaVentas)
    })
  }

  addLocale('es', calendarioEspañol)

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer={`Total vendidos: ${quantitySold} unidades`} colSpan={8} footerStyle={{ textAlign: 'left' }} />
      </Row>
    </ColumnGroup>
  )

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-3'>Historial de ventas por producto</h2>
      <span className='text-xl font-normal'>Ingresá el código de un producto para obtener un listado de ventas que contienen a este</span>
      <Card className='!shadow border my-5'>
        <div className='flex flex-wrap'>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Producto</label>
            <InputText placeholder='Ingresá un código de producto'
              name='producto' value={producto} onChange={onInputChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Fecha desde</label>
            <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione fecha desde'
              name='fechaDesde' onChange={handleDate} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Fecha hasta</label>
            <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione fecha hasta'
              name='fechaHasta' onChange={handleDate} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Local</label>
            <Dropdown options={stores} optionLabel='nombre' emptyMessage='Sin registros' placeholder='Selecciona un local'
              name='local' value={local} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Cantidad</label>
            <Dropdown options={quantities} emptyMessage='Sin registros' placeholder='Selecciona la cantidad'
              name='cantidad' value={cantidad} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='me-3'>
            <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
            <Button label="Filtrar" onClick={filter} className='hover:!bg-blue-600' size='small' />
          </div>
          <div>
            <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
            <Link to={`/venta/historial`}>
              <Button label='Volver' className='hover:!bg-blue-600' size='small' />
            </Link>
          </div>
        </div>
      </Card >
      <Card className='!shadow border'>
        <DataTable value={listItems} footerColumnGroup={footerGroup}
          stripedRows emptyMessage='Sin registro de ventas' size='small'>
          <Column field='id' header='Código' className='font-bold' style={{ width: '5%' }}></Column>
          <Column field='local.nombre' header='Local' style={{ width: '10%' }}></Column>
          <Column field='usuario' header='Usuario' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatDate(rowData.fecha)} header='Fecha' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatTime(rowData.hora)} header='Hora' style={{ width: '10%' }}></Column>
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
        <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
          onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
      </Card >
    </div >
  )
}