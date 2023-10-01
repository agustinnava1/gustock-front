import { useEffect, useState } from 'react'

import { useRef } from 'react'
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
import { TieredMenu } from 'primereact/tieredmenu'
import { ColumnGroup } from 'primereact/columngroup'

import { usePagination } from '../../hooks/venta.paginacion'
import { useCalculateTotal } from '../../hooks/venta.calcular'

import { calendarioEspañol } from '../../helper/configuracion.regional'
import { formatCurrency, formatoFechaCorto, formatoHora } from '../../helper/format'

import Swal from 'sweetalert2'
import VentaFiltros from '../../helper/VentaFiltros'
import VentaServicio from '../../services/venta.servicio'

export const VentaHistorialPagina = () => {
  const initialPagination = {
    local: null,
    pagina: 0,
    cantidad: 10,
    fechaDesde: null,
    fechaHasta: null,
    metodoPago: 'TODOS'
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listaVentas, setListaVentas] = useState([])
  const [totalRegistros, setTotalRegistros] = useState(null)
  const { listaLocales, listaMetodosPago, listaCantidades } = VentaFiltros()

  const { paginationState, onDropdownChange, handleDate } = usePagination(initialPagination)
  const { totalEfectivo, totalDebito, totalCredito, totalCodigoQr, totalFinal } = useCalculateTotal(listaVentas)

  const { local, metodoPago, cantidad } = paginationState

  useEffect(() => {
    VentaServicio.listar(paginationState).then(data => {
      setListaVentas(data.content)
      setTotalRegistros(data.totalElements)
    })
  }, [])

  const generarRequest = (paginationState, page) => {
    const request = { ...paginationState, pagina: page || 0 };

    if (local !== null) {
      request.local = local.nombre;
    }

    return request;
  }

  const filtrarVentas = () => {
    setFirst(0)
    setRows(cantidad)

    const request = generarRequest(paginationState)

    VentaServicio.listar(request).then(data => {
      setListaVentas(data.content)
      setTotalRegistros(data.totalElements)
    })
  }

  const cambiarPagina = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generarRequest(paginationState, event.page)

    VentaServicio.listar(request).then(data => {
      setListaVentas(data.content)
      setTotalRegistros(data.totalElements)
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará el registro de venta del sistema y cada producto será reintegrado al stock del local",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        VentaServicio.eliminar(id)
          .then((data) => {
            setListaVentas(listaVentas.filter((venta) => venta.id !== id));
            Swal.fire('Eliminado', 'La venta ha sido eliminada del sistema.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar la venta. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  }

  const exportarVentas = () => {
    const request = generarRequest(paginationState)
    VentaServicio.exportar(request)
  }

  addLocale('es', calendarioEspañol)

  const menu = useRef(null)

  const items = [
    {
      label: 'Historial por rubro',
      url: '/venta/historial/rubro',
    },
    {
      label: 'Historial por producto',
      url: '/venta/historial/producto',
    }
  ]

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer='Total:' colSpan={5} footerStyle={{ textAlign: 'left' }} />
        <Column footer={totalEfectivo} />
        <Column footer={totalDebito} />
        <Column footer={totalCodigoQr} />
        <Column footer={totalCredito} />
        <Column footer={totalFinal} />
        <Column />
      </Row>
    </ColumnGroup>
  )

  const paginatorLeft = <Button label='Exportar' type="button" icon="pi pi-download" size='small' className='!invisible' />
  const paginatorRight = <Button label='Exportar' type="button" icon="pi pi-download" size='small' onClick={exportarVentas} data-pr-tooltip="XLS" />

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-3'>Historial de ventas</h2>
      <span className='text-xl font-normal'>Gestioná y explorá el registro histórico de las ventas realizadas en todas las sucursales</span>
      <Card className='!shadow-none border my-5'>
        <div className='flex flex-wrap'>
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
            <Dropdown options={listaLocales} optionLabel='nombre' emptyMessage='Sin registros' placeholder='Selecciona un local'
              name='local' value={local} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Tipo de pago</label>
            <Dropdown options={listaMetodosPago} emptyMessage='Sin registros' placeholder='Selecciona un método de pago'
              name='metodoPago' value={metodoPago} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-20 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Cantidad</label>
            <Dropdown options={listaCantidades} emptyMessage='Sin registros' placeholder='Selecciona la cantidad'
              name='cantidad' value={cantidad} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='me-3'>
            <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
            <Button label="Filtrar" onClick={filtrarVentas} className='hover:!bg-blue-600' size='small' />
          </div>
          <div className='me-3'>
            <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
            <Button label='Opciones' iconPos='right' icon='pi pi-caret-down' className='hover:!bg-blue-600'
              onClick={(e) => menu.current.toggle(e)} size='small' />
            <TieredMenu model={items} popup ref={menu} breakpoint="767px" className='m-0 p-0' />
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
          <Column field={(rowData) => formatCurrency(rowData.pagoEfectivo)} header='Efectivo' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.pagoDebito)} header='Débito' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.pagoCodigoQr)} header='Qr' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.pagoCredito)} header='Crédito' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.total)} header='Total' style={{ width: '10%' }}></Column>
          <Column header='Acciones' style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex justify-center'>
                <Link to={`/venta/detalle/${rowData.id}`} className='me-3' target='_blank'>
                  <button className='bg-sky-500 rounded text-xl text-white px-2 py-1 hover:bg-sky-600'>
                    <i className='bi bi-eye-fill'></i>
                  </button>
                </Link>
                <button className='bg-red-500 rounded text-xl text-white px-2 py-1 hover:bg-red-600'
                  onClick={() => handleDelete(rowData.id)} >
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
        <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalRegistros}
          leftContent={paginatorLeft} rightContent={paginatorRight}
          onPageChange={cambiarPagina} className='mt-5 !p-0'></Paginator>
      </Card >
    </div >
  )
}