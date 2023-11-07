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

import { usePagination } from '../../hooks/use.paginacion'
import { useCalculateTotal } from '../../hooks/venta.calcular'

import { calendarioEspañol } from '../../helper/configuracion.regional'
import { formatCurrency, formatDate, formatTime } from '../../helper/format'

import Swal from 'sweetalert2'
import VentaService from '../../services/venta.servicio'
import VentaFilters from '../../helper/venta.filtros'
import { Eye, Trash, Trash2 } from 'lucide-react'

export const VentaHistorialPagina = () => {
  const initialPagination = {
    local: null,
    pagina: 0,
    cantidad: 10,
    fechaDesde: null,
    fechaHasta: null,
    metodoPago: null
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listItems, setListItems] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { stores, paymentMethods, quantities } = VentaFilters()
  const { paginationState, onDropdownChange, handleDate } = usePagination(initialPagination)
  const { totalEfectivo, totalDebito, totalCredito, totalCodigoQr, totalFinal } = useCalculateTotal(listItems)

  const { local, metodoPago, cantidad } = paginationState

  useEffect(() => {
    VentaService.getAll(paginationState).then(data => {
      setListItems(data.content)
      setTotalElements(data.totalElements)
    })
  }, [])

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

    VentaService.getAll(request).then(data => {
      setListItems(data.content)
      setTotalElements(data.totalElements)
    })
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    VentaService.getAll(request).then(data => {
      setListItems(data.content)
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
        VentaService.delete(id)
          .then((data) => {
            setListItems(listItems.filter((item) => item.id !== id));
            Swal.fire('Eliminado', 'La venta #' + data + ' ha sido eliminada del sistema.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar la venta. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  }

  const exportToExcel = () => {
    const request = generateRequest(paginationState)
    VentaService.exportToExcel(request)
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

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-3'>Historial de ventas</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-5'>
        <Card className='!shadow-lg border-l-4 border-blue-400'>
          <p className='text-blue-400 font-medium mb-2'>Total efectivo</p>
          <span className='text-2xl'>{totalEfectivo()}</span>
        </Card>
        <Card className='!shadow-lg border-l-4 border-blue-500'>
          <p className='text-blue-500 font-medium mb-2'>Total débito</p>
          <span className='text-2xl'>{totalDebito()}</span>
        </Card>
        <Card className='!shadow-lg border-l-4 border-blue-600'>
          <p className='text-blue-600 font-medium mb-2'>Total código Qr</p>
          <span className='text-2xl'>{totalCodigoQr()}</span>
        </Card>
        <Card className='!shadow-lg border-l-4 border-blue-700'>
          <p className='text-blue-700 font-medium mb-2'>Total crédito</p>
          <span className='text-2xl'>{totalCredito()}</span>
        </Card>
        <Card className='!shadow-lg border-l-4 border-blue-800'>
          <p className='text-blue-800 font-medium mb-2'>Total de ventas</p>
          <span className='text-2xl'>{totalFinal()}</span>
        </Card>
      </div>

      <div className='lg:flex gap-5'>
        <Card className='!shadow-lg lg:w-1/5'>
          <div className='flex-auto mb-3'>
            <label className='block font-medium text-lg mb-2'>Fecha desde</label>
            <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione una fecha'
              name='fechaDesde' onChange={handleDate} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto mb-3'>
            <label className='block font-medium text-lg mb-2'>Fecha hasta</label>
            <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione una fecha'
              name='fechaHasta' onChange={handleDate} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto mb-3'>
            <label className='block font-medium text-lg mb-2'>Local</label>
            <Dropdown options={stores} optionLabel='nombre' emptyMessage='Sin registros' placeholder='Selecciona un local'
              name='local' value={local} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto mb-3'>
            <label className='block font-medium text-lg mb-2'>Tipo de pago</label>
            <Dropdown options={paymentMethods} emptyMessage='Sin registros' placeholder='Selecciona un método de pago'
              name='metodoPago' value={metodoPago} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto mb-3'>
            <label className='block font-medium text-lg mb-2'>Cantidad</label>
            <Dropdown options={quantities} emptyMessage='Sin registros' placeholder='Selecciona la cantidad'
              name='cantidad' value={cantidad} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto'>
            <Button label="Filtrar" onClick={filter} className='hover:!bg-blue-600' size='small' />
          </div>
          <div>
            <Button label='Opciones' iconPos='right' icon='pi pi-caret-down' className='hover:!bg-blue-600'
              onClick={(e) => menu.current.toggle(e)} size='small' />
            <TieredMenu model={items} popup ref={menu} breakpoint="767px" className='m-0 p-0' />
          </div>
        </Card>

        <Card className='!shadow-lg lg:w-5/6'>
          <DataTable value={listItems} stripedRows emptyMessage='Sin registro de ventas' size='small'>
            <Column field='id' header='Código' className='font-medium rounded-tl-md' style={{ width: '5%' }}></Column>
            <Column field='local.nombre' header='Local' style={{ width: '10%' }}></Column>
            <Column field='usuario' header='Usuario' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatDate(rowData.fecha)} header='Fecha' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatTime(rowData.hora)} header='Hora' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.pagoEfectivo)} header='Efectivo' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.pagoDebito)} header='Débito' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.pagoCodigoQr)} header='Qr' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.pagoCredito)} header='Crédito' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.total)} header='Total' className='font-medium' style={{ width: '10%' }}></Column>
            <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
              body={(rowData) => (
                <div className='flex justify-center gap-1'>
                  <Link to={`/venta/detalle/${rowData.id}`} target='_blank'>
                    <button className='text-blue-500 rounded p-2 hover:text-white hover:bg-blue-500'>
                      <Eye size={20} />
                    </button>
                  </Link>
                  <button className='text-red-500 rounded p-2 hover:text-white hover:bg-red-500'
                    onClick={() => handleDelete(rowData.id)} >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}>
            </Column>
          </DataTable>
          <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
            onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
        </Card>
      </div >
    </div>
  )
}