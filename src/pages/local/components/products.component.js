import { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { Link } from 'react-router-dom'

import { addLocale } from 'primereact/api'
import { formatDate, formatCurrency } from '../../../helper/format'
import { calendarioEspañol } from '../../../helper/configuracion.regional'

import { usePagination } from '../../../hooks/use.paginacion'

import Swal from 'sweetalert2'

import StockService from '../../../services/stock.servicio'
import ProductFilters from '../../../helper/producto.filtros'
import ListStocksExport from '../../../components/export.stocks.component'

const ProductsComponent = ({ shop }) => {

  useEffect(() => {
    StockService.getAllByShop(shop, paginationState).then(data => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
      console.log(data.content)
    })
  }, []);

  addLocale('es', calendarioEspañol)

  const initialPagination = {
    page: 0,
    brand: null,
    category: null,
    provider: null,
    lastUpdate: null,
    orderByStock: null,
    recordsQuantity: 10
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listProducts, setListProducts] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { paginationState, handleDate, onDropdownChange, setPaginationState } = usePagination(initialPagination)
  const { provider, category, brand, lastUpdate, recordsQuantity, orderByStock } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters()

  const orderOptions = [
    { value: 'desc', description: 'Mayor a menor' },
    { value: 'asc', description: 'Menor a mayor' },
  ]

  const generateRequest = (paginationState, page) => {
    const request = {
      ...paginationState,
      page: page || 0,
      brand: brand?.descripcion,
      category: category?.descripcion,
      provider: provider?.razonSocial,
      orderByStock: orderByStock
    }

    return request
  }

  const filter = () => {
    setFirst(0)
    setRows(recordsQuantity)

    const request = generateRequest(paginationState)

    StockService.getAllByShop(shop, request).then(data => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
      console.log(request)
    })
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    StockService.getAllByShop(shop, request).then(data => {
      setListProducts(data.content)
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el registro del producto de este local.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        StockService.delete(id)
          .then((data) => {
            filter()
            Swal.fire('Eliminado', '"' + data + '"<br> ha sido eliminado del local.', 'success')
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const resetFilters = () => {
    setPaginationState(initialPagination)
  }

  return (
    <div className='lg:flex lg:justify-between gap-5'>
      <div className='lg:w-1/6'>
        <Card className='!shadow-none border mb-5'>
          <div className='mb-3'>
            <label className='block font-medium text-lg mb-2'>Proveedor</label>
            <Dropdown value={provider} options={listProviders} onChange={onDropdownChange}
              name='provider' optionLabel='razonSocial' filter emptyFilterMessage="Sin resultados"
              placeholder='Selecciona un proveedor' className='p-inputtext-sm w-full' />
          </div>
          <div className='mb-3'>
            <label className='block font-medium text-lg mb-2'>Rubro</label>
            <Dropdown value={category} options={listCategories} onChange={onDropdownChange}
              name='category' optionLabel='descripcion' filter emptyFilterMessage="Sin resultados"
              placeholder='Selecciona un rubro' className='p-inputtext-sm w-full' />
          </div>
          <div className='mb-3'>
            <label className='block font-medium text-lg mb-2'>Marca</label>
            <Dropdown value={brand} options={listBrands} onChange={onDropdownChange}
              name='brand' optionLabel='descripcion' filter emptyFilterMessage="Sin resultados"
              placeholder='Selecciona una marca' className='p-inputtext-sm w-full' />
          </div>
          <div className='mb-3'>
            <label htmlFor='stock' className='block font-medium text-lg mb-2'>Stock</label>
            <Dropdown value={orderByStock} options={orderOptions} onChange={onDropdownChange}
              name='orderByStock' optionLabel='description'
              placeholder='Selecciona un orden' className='p-inputtext-sm w-full' />
          </div>
          <div className='mb-3'>
            <label htmlFor='ultPrecio' className='block font-medium text-lg w-full mb-2'>Ult. Precio</label>
            <Calendar onChange={handleDate} locale='es' dateFormat='dd/mm/yy' name='lastUpdate'
              placeholder='Selecciona una fecha' className='p-inputtext-sm w-full' />
          </div>
          <div className='mb-5'>
            <label className='block font-medium text-lg mb-2'>Cantidad</label>
            <Dropdown value={recordsQuantity} options={listQuantities} onChange={onDropdownChange}
              name='recordsQuantity' placeholder='Selecciona la cantidad' className='p-inputtext-sm w-full' />
          </div>
          <div className='flex gap-3'>
            <Button label='Aplicar' onClick={filter} className='w-full' size='small' />
            <Button label='Limpiar' onClick={resetFilters} className='w-full' size='small' severity='secondary' />
          </div>
        </Card>

        <ListStocksExport stocks={listProducts} />
      </div>

      <div className='lg:w-5/6'>
        <Card className='!shadow-none border'>
          <DataTable value={listProducts} stripedRows size='small' emptyMessage='No se encontraron resultados'>
            <Column field='product.code' header='Código' className='rounded-tl-md' style={{ width: '10%' }} />
            <Column field='product.description' header='Descripción' style={{ width: '30%' }} />
            <Column field={(rowData) => formatCurrency(rowData.product.cashPrice)} header='Efectivo' style={{ width: '10%' }} />
            <Column field={(rowData) => formatCurrency(rowData.product.debitPrice)} header='Débito' style={{ width: '10%' }} />
            <Column field={(rowData) => formatCurrency(rowData.product.creditPrice)} header='Crédito' style={{ width: '10%' }} />
            <Column field={(rowData) => rowData.product.lastPrice ? formatDate(rowData.product.lastPrice) : '-'} header='Ult. Precio' style={{ width: '10%' }} />
            <Column field={(rowData) => formatDate(rowData.lastUpdate)} header='Ult. Stock' style={{ width: '10%' }} />
            <Column field='quantity' header='Unidades' style={{ width: '5%' }} />
            <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
              body={(rowData) => (
                <div className='flex gap-2'>
                  <Link to={`/producto/detalle/${rowData.product.id}`} target='_blank'>
                    <button className='bg-sky-500 text-white rounded px-2 py-1'>
                      <i className='bi bi-eye-fill'></i>
                    </button>
                  </Link>
                  <Link to={`/producto/modificar/${rowData.product.id}`} target='_blank'>
                    <button className='bg-yellow-500 text-white rounded px-2 py-1'>
                      <i className='bi bi-pencil-fill'></i>
                    </button>
                  </Link>
                  <button className='bg-red-500 text-white rounded px-2 py-1'
                    onClick={() => handleDelete(rowData.idStock)} >
                    <i className='bi bi-trash-fill'></i>
                  </button>
                </div>
              )}>
            </Column>
          </DataTable>
          <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
            onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
        </Card>
      </div>
    </div>
  )
}

export default ProductsComponent;