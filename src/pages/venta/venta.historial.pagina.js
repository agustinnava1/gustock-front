import { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { addLocale } from 'primereact/api'
import { ClipboardList } from 'lucide-react'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'

import { usePagination } from '../../hooks/use.paginacion'
import { useCalculateTotal } from '../../hooks/venta.calcular'

import { calendarioEspañol } from '../../helper/configuracion.regional'
import { formatCurrency, formatDate, formatTime } from '../../helper/format'

import Swal from 'sweetalert2'
import VentaFilters from '../../helper/venta.filtros'
import VentaService from '../../services/venta.servicio'
import ListSalesExport from '../../components/export.sales.component'

export const VentaHistorialPagina = () => {

  const initialPagination = {
    shop: null,
    page: 0,
    recordsQuantity: 10,
    dateFrom: null,
    dateUntil: null,
    payment: null
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listItems, setListItems] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { shops, payments, quantities } = VentaFilters()
  const { paginationState, onDropdownChange, handleDate, setPaginationState } = usePagination(initialPagination)
  const { totalCash, totalDebit, totalCredit, totalCodeQr, totalFinal } = useCalculateTotal(listItems)

  const { shop, payment, recordsQuantity } = paginationState

  useEffect(() => {
    VentaService.getAll(paginationState).then(data => {
      setListItems(data.content)
      setTotalElements(data.totalElements)
    })
  }, [])

  const generateRequest = (paginationState, page) => {
    const request = {
      ...paginationState,
      page: page || 0,
      shop: shop?.nombre
    };

    return request;
  }

  const filter = () => {
    setFirst(0)
    setRows(recordsQuantity)

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
      text: "Se eliminará el registro de venta del sistema y los productos seran reintregrados al stock del local",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        VentaService.delete(id)
          .then((data) => {
            filter()
            Swal.fire('Eliminado', 'La venta ha sido eliminada del sistema.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al intentar eliminar la venta. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  }

  addLocale('es', calendarioEspañol)

  const resetFilters = () => {
    setPaginationState(initialPagination)
  }

  return (
    <div className='p-5'>
      <h2 className='text-2xl font-medium mb-2'>Historial de ventas</h2>
      <span>Gestioná y explorá el registro histórico de ventas en todas las sucursales</span>

      <div className='flex gap-5 my-5'>
        <ListSalesExport sales={listItems} />

        <Link to={`/venta/historial/rubro`}>
          <Card className='!shadow-none border'>
            <div className='flex gap-3'>
              <ClipboardList className='text-blue-500' />
              <span className='font-medium'>Historial por rubro</span>
            </div>
          </Card>
        </Link>

        <Link to={`/venta/historial/producto`}>
          <Card className='!shadow-none border'>
            <div className='flex gap-3'>
              <ClipboardList className='text-blue-500' />
              <span className='font-medium'>Historial por producto</span>
            </div>
          </Card>
        </Link>
      </div>

      <Card className='!shadow-none border mb-5'>
        <div className='flex gap-3'>
          <div className='flex-auto flex items-center gap-3 w-full mb-3 md:mb-0'>
            <label className='block font-medium text-lg mb-2'>Desde</label>
            <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione una fecha'
              name='dateFrom' onChange={handleDate} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto flex items-center gap-3 w-full mb-3 md:mb-0'>
            <label className='block font-medium text-lg mb-2'>Hasta</label>
            <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione una fecha'
              name='dateUntil' onChange={handleDate} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto flex items-center gap-3 w-full mb-3 md:mb-0'>
            <label className='block font-medium text-lg mb-2'>Local</label>
            <Dropdown options={shops} optionLabel='nombre' emptyMessage='Sin registros' placeholder='Selecciona un local'
              name='shop' value={shop} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto flex items-center gap-3 w-full mb-3 md:mb-0'>
            <label className='block font-medium text-lg mb-2'>Pago</label>
            <Dropdown options={payments} emptyMessage='Sin registros' placeholder='Selecciona un método'
              name='payment' value={payment} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto flex items-center gap-3 w-full mb-3 md:mb-0'>
            <label className='block font-medium text-lg mb-2'>Cantidad</label>
            <Dropdown options={quantities} emptyMessage='Sin registros' placeholder='Selecciona la cantidad'
              name='recordsQuantity' value={recordsQuantity} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto'>
            <Button label="Aplicar" onClick={filter} className='w-full' size='small' />
          </div>
        </div>
      </Card>

      <Card className='!shadow-none border mb-5'>
        <DataTable value={listItems} stripedRows emptyMessage='Sin registro de ventas' size='small'>
          <Column field='id' header='Código' className='font-medium rounded-tl-md' style={{ width: '5%' }}></Column>
          <Column field='shop' header='Local' style={{ width: '10%' }}></Column>
          <Column field='user' header='Usuario' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatDate(rowData.date)} header='Fecha' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatTime(rowData.time)} header='Hora' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.cashPayment)} header='Efectivo' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.debitPayment)} header='Débito' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.qrCodePayment)} header='Qr' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.creditPayment)} header='Crédito' style={{ width: '10%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.total)} header='Total' className='font-medium' style={{ width: '10%' }}></Column>
          <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex justify-center gap-2'>
                <Link to={`/venta/detalle/${rowData.id}`} target='_blank'>
                  <button className='text-gray-500 px-2 py-1'>
                    <i className='bi bi-eye-fill'></i>
                  </button>
                </Link>
                <button className='text-gray-500 px-2 py-1'
                  onClick={() => handleDelete(rowData.id)} >
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
        <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalElements}
          onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
      </Card>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <Card className='!shadow-none border'>
          <p className='text-lg text-blue-400 font-medium mb-2'>Total efectivo</p>
          <span className='text-xl'>{totalCash()}</span>
        </Card>
        <Card className='!shadow-none border'>
          <p className='text-lg text-blue-500 font-medium mb-2'>Total débito</p>
          <span className='text-xl'>{totalDebit()}</span>
        </Card>
        <Card className='!shadow-none border'>
          <p className='text-lg text-blue-600 font-medium mb-2'>Total código Qr</p>
          <span className='text-xl'>{totalCodeQr()}</span>
        </Card>
        <Card className='!shadow-none border'>
          <p className='text-lg text-blue-700 font-medium mb-2'>Total crédito</p>
          <span className='text-xl'>{totalCredit()}</span>
        </Card>
        <Card className='!shadow-none border'>
          <p className='text-lg text-blue-800 font-medium mb-2'>Total de ventas</p>
          <span className='text-xl'>{totalFinal()}</span>
        </Card>
      </div>
    </div>
  )
}