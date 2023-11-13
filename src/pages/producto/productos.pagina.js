import React, { useEffect, useRef, useState } from 'react'

import { Card } from 'primereact/card'
import { Link, NavLink } from "react-router-dom"
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { usePagination } from '../../hooks/use.paginacion'

import { formatDate, formatCurrency } from "../../helper/format"

import Swal from 'sweetalert2'
import ProductFilters from '../../helper/producto.filtros'
import ProductService from '../../services/producto.servicio'
import ListProductsExport from '../../components/export.products.component'
import { TieredMenu } from 'primereact/tieredmenu'
import { ClipboardEdit, PackagePlus } from 'lucide-react'

export const ProductosPagina = () => {
  const initialPagination = {
    page: 0,
    brand: null,
    category: null,
    provider: null,
    recordsQuantity: 10
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listProducts, setListProducts] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { paginationState, onDropdownChange } = usePagination(initialPagination)
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
      text: "Se eliminará el producto del sistema de manera permanente, esto no afectará a las ventas registradas.",
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

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-5'>Mis productos</h2>

      <div className='flex gap-5'>
        <div className='lg:w-1/6'>
          <Card className='!shadow-none border mb-5'>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Proveedor</label>
              <Dropdown value={provider} options={listProviders} onChange={onDropdownChange}
                name='provider' optionLabel='razonSocial' emptyFilterMessage='Sin resultados' filter
                placeholder='Selecciona un proveedor' className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Rubro</label>
              <Dropdown options={listCategories} optionLabel='descripcion' filter
                name='category' value={category} onChange={onDropdownChange} emptyMessage='Sin registros'
                placeholder='Selecciona un rubro' className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Marca</label>
              <Dropdown options={listBrands} optionLabel='descripcion' filter
                name='brand' value={brand} onChange={onDropdownChange} emptyMessage='Sin registros'
                placeholder='Selecciona una marca' className='p-inputtext-sm w-full' />
            </div>
            <div className='mb-5'>
              <label className='block font-medium text-lg mb-2'>Cantidad</label>
              <Dropdown options={listQuantities}
                name='recordsQuantity' value={recordsQuantity} onChange={onDropdownChange} emptyMessage="Sin registros"
                placeholder='Selecciona la cantidad' className='p-inputtext-sm w-full' />
            </div>
            <div className='flex gap-3'>
              <Button label='Filtrar' onClick={filter} className='w-full' size='small' />
              <Button label='Limpiar' className='w-full' size='small' />
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
              <Column field='code' header='Código' className='rounded-tl-md font-medium' style={{ width: '10%' }}></Column>
              <Column field='description' header='Descripción' style={{ width: '30%' }}></Column>
              <Column field={(product) => formatCurrency(product.priceEffective)} header='Efectivo' style={{ width: '10%' }} />
              <Column field={(product) => formatCurrency(product.priceDebit)} header='Débito' style={{ width: '10%' }} />
              <Column field={(product) => formatCurrency(product.priceCredit)} header='Crédito' style={{ width: '10%' }} />
              <Column field='ultActPrecio' header='Ult. Precio' style={{ width: '10%' }}
                body={(product) => product.lastPrice ? formatDate(product.lastPrice) : '-'}></Column>
              <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
                body={(product) => (
                  <div className='flex gap-2'>
                    <Link to={`/producto/detalle/${product.id}`}>
                      <button className='bg-sky-500 text-white rounded px-2 py-1'>
                        <i className='bi bi-eye-fill'></i>
                      </button>
                    </Link>
                    <Link to={`/producto/modificar/${product.id}`}>
                      <button className='bg-yellow-500 text-white rounded px-2 py-1'>
                        <i className='bi bi-pencil-fill'></i>
                      </button>
                    </Link>
                    <button className='bg-red-500 text-white rounded px-2 py-1'
                      onClick={() => handleDelete(product.id)} >
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
      </div >
    </div>
  )
}