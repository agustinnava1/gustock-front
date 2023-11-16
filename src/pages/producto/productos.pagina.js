import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from "react-router-dom"
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { ClipboardEdit, PackagePlus } from 'lucide-react'
import { usePagination } from '../../hooks/use.paginacion'

import { formatDate, formatCurrency } from "../../helper/format"

import Swal from 'sweetalert2'
import ProductFilters from '../../helper/producto.filtros'
import ProductService from '../../services/producto.servicio'
import ListProductsExport from '../../components/export.products.component'

export const ProductosPagina = () => {
  const initialPagination = {
    page: 0,
    brand: null,
    category: null,
    provider: null,
    recordsQuantity: 20
  }

  const [rows, setRows] = useState(20)
  const [first, setFirst] = useState(0)
  const [listProducts, setListProducts] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { paginationState, onDropdownChange, setPaginationState } = usePagination(initialPagination)
  const { provider, category, brand, recordsQuantity } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters()

  useEffect(() => {
    ProductService.getAllByFilters(paginationState).then(data => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
    })
  }, [])

  const generateRequest = (paginationState, page) => {
    const request = {
      ...paginationState,
      page: page || 0,
      brand: brand?.descripcion,
      category: category?.descripcion,
      provider: provider?.razonSocial,
    }

    return request
  }

  const filter = () => {
    setFirst(0)
    setRows(recordsQuantity)

    const request = generateRequest(paginationState)

    ProductService.getAllByFilters(request).then(data => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
    })
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    ProductService.getAllByFilters(request).then(data => {
      setListProducts(data.content)
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el producto del sistema de manera permanente, esto no afectará a las ventas registradas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#2493D8',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        ProductService.delete(id)
          .then((data) => {
            filter()
            Swal.fire('Eliminado', 'El producto "' + data + '" ha sido eliminado del sistema con éxito.', 'success')
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo más tarde.', 'error')
          })
      }
    })
  }

  const resetFilters = () => {
    setPaginationState(initialPagination)
  }

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-5'>Mis productos</h2>

      <div className='flex gap-5'>
        <div className='lg:w-1/6'>
          <Card className='!shadow-none border mb-5'>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Proveedor</label>
              <Dropdown value={provider} options={listProviders} onChange={onDropdownChange}
                name='provider' optionLabel='razonSocial' filter emptyFilterMessage='Sin resultados'
                placeholder='Selecciona un proveedor' className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Rubro</label>
              <Dropdown value={category} options={listCategories} onChange={onDropdownChange}
                name='category' optionLabel='descripcion' filter emptyFilterMessage='Sin registros'
                placeholder='Selecciona un rubro' className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Marca</label>
              <Dropdown value={brand} options={listBrands} onChange={onDropdownChange}
                name='brand' optionLabel='descripcion' filter emptyFilterMessage='Sin registros'
                placeholder='Selecciona una marca' className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-5'>
              <label className='block font-medium text-lg mb-2'>Cantidad</label>
              <Dropdown value={recordsQuantity} options={listQuantities} onChange={onDropdownChange}
                name='recordsQuantity' placeholder='Selecciona la cantidad' className='p-inputtext-sm w-full' />
            </div>
            <div className='flex gap-3'>
              <Button label='Filtrar' onClick={filter} className='w-full' size='small' />
              <Button label='Limpiar' onClick={resetFilters} severity='secondary' className='w-full' size='small' />
            </div>
          </Card>

          <ListProductsExport products={listProducts} />

          <Link to={`/producto/registrar`}>
            <Card className='!shadow-none border mb-5'>
              <div className='flex gap-3'>
                <PackagePlus className='text-blue-500' />
                <span className='font-medium'>Agregar producto</span>
              </div>
            </Card>
          </Link>

          <Link to={`/productos/modificacion/rapida`}>
            <Card className='!shadow-none border mb-5'>
              <div className='flex gap-3'>
                <ClipboardEdit className='text-blue-500' />
                <span className='font-medium'>Modificación rápida</span>
              </div>
            </Card>
          </Link>

          <Link to={`/productos/modificacion/masiva`}>
            <Card className='!shadow-none border'>
              <div className='flex gap-3'>
                <ClipboardEdit className='text-blue-500' />
                <span className='font-medium'>Modificación masiva</span>
              </div>
            </Card>
          </Link>
        </div>

        <div className='lg:w-5/6'>
          <Card className='!shadow-none border'>
            <DataTable value={listProducts} stripedRows emptyMessage='No se encontraron resultados' size='small'>
              <Column field='code' header='Código' className='rounded-tl-md' style={{ width: '10%' }}></Column>
              <Column field='description' header='Descripción' style={{ width: '45%' }}></Column>
              <Column field={(rowData) => formatCurrency(rowData.cashPrice)} header='Efectivo' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.debitPrice)} header='Débito' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.creditPrice)} header='Crédito' style={{ width: '10%' }} />
              <Column field='lastPrice' header='Ult. Precio' style={{ width: '10%' }}
                body={(rowData) => rowData.lastPrice ? formatDate(rowData.lastPrice) : '-'}></Column>
              <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
                body={(rowData) => (
                  <div className='flex gap-2'>
                    <Link to={`/producto/detalle/${rowData.id}`}>
                      <button className='text-gray-500 px-2 py-1'>
                        <i className='bi bi-eye-fill'></i>
                      </button>
                    </Link>
                    <Link to={`/producto/modificar/${rowData.id}`}>
                      <button className='text-gray-500 px-2 py-1'>
                        <i className='bi bi-pencil-fill'></i>
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
        </div>
      </div >
    </div>
  )
}