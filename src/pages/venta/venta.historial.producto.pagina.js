import { useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { addLocale } from 'primereact/api'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'

import { usePagination } from '../../hooks/use.paginacion'
import { formatDate, formatTime } from '../../helper/format'
import { calendarioEspañol } from '../../helper/configuracion.regional'

import VentaService from '../../services/venta.servicio'
import VentaFilters from '../../helper/venta.filtros'

export const VentaHistorialProductoPagina = () => {

  const initialPagination = {
    page: 0,
    shop: null,
    product: null,
    dateFrom: null,
    dateUntil: null,
    recordsQuantity: 'TODOS'
  }

  const [listItems, setListItems] = useState([])
  const [soldQuantity, setSoldQuantity] = useState(0)

  const { paginationState, onDropdownChange, onInputChange, handleDate, setPaginationState } = usePagination(initialPagination)

  const { shops } = VentaFilters()
  const { shop, product } = paginationState

  const generateRequest = (paginationState, page) => {
    const request = { ...paginationState,
       pagina: page || 0,
       shop: shop?.nombre
    }

    return request;
  }

  const filter = () => {
    const request = generateRequest(paginationState)

    VentaService.getAllByProduct(request).then(data => {
      setListItems(data.listItems.content)
      setSoldQuantity(data.soldQuantity)
    })
  }

  const resetFilters = () => {
    setPaginationState(initialPagination)
  }

  addLocale('es', calendarioEspañol)

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-5'>Historial de ventas por producto</h2>

      <div className='lg:flex gap-5'>
        <div className='lg:w-1/6'>
          <Card className='!shadow-none border mb-5'>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Producto</label>
              <InputText placeholder='Ingresá un código de producto'
                name='product' value={product} onChange={onInputChange} className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Fecha desde</label>
              <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione fecha desde'
                name='dateFrom' onChange={handleDate} className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Fecha hasta</label>
              <Calendar dateFormat='dd/mm/yy' locale='es' placeholder='Seleccione fecha hasta'
                name='dateUntil' onChange={handleDate} className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-5'>
              <label className='block font-medium text-lg mb-2'>Local</label>
              <Dropdown options={shops} optionLabel='nombre' emptyMessage='Sin registros' placeholder='Selecciona un local'
                name='shop' value={shop} onChange={onDropdownChange} className='p-inputtext-sm w-full' />
            </div>
            <div className='flex gap-3'>
              <Button label="Filtrar" onClick={filter} className='w-full' size='small' />
              <Button label="Limpiar" onClick={resetFilters} className='w-full' size='small' severity='secondary' />
            </div>
          </Card>

          <Card className='!shadow-none border mb-5'>
            <p className='text-lg text-blue-500 font-medium mb-2'>Total vendidos</p>
            <span className='text-xl'>{soldQuantity} unidades</span>
          </Card>

          <Link to={`/venta/historial`}>
            <Card className='!shadow-none border'>
              <div className='flex gap-3'>
                <ArrowLeft className='text-blue-500' />
                <span className='font-medium'>Volver a historial</span>
              </div>
            </Card>
          </Link>
        </div>

        <div className='lg:w-5/6'>
          <Card className='!shadow-none border'>
            <DataTable value={listItems} stripedRows emptyMessage='Sin registro de ventas' size='small'>
              <Column field='id' header='Código' className='font-bold' style={{ width: '5%' }}></Column>
              <Column field='shop' header='Local' style={{ width: '10%' }}></Column>
              <Column field='user' header='Usuario' style={{ width: '10%' }}></Column>
              <Column field={(rowData) => formatDate(rowData.date)} header='Fecha' style={{ width: '10%' }}></Column>
              <Column field={(rowData) => formatTime(rowData.time)} header='Hora' style={{ width: '10%' }}></Column>
              <Column header='Producto/s' style={{ width: '50%' }}
                body={(rowData) => (
                  <div>
                    {rowData.details.map((product, index) => (
                      <p className='m-auto' key={index}>
                        <span>{product.description}</span>
                      </p>
                    ))}
                  </div>
                )}>
              </Column>
              <Column header='Acciones' alignHeader={'center'} style={{ width: '5%' }}
                body={(rowData) => (
                  <div className='flex justify-center'>
                    <Link to={`/venta/detalle/${rowData.id}`} target='_blank'>
                      <button className='text-gray-500 px-2 py-1'>
                        <i className='bi bi-eye-fill'></i>
                      </button>
                    </Link>
                  </div>
                )}>
              </Column>
            </DataTable>
          </Card >
        </div>
      </div>
    </div >
  )
}