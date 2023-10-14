import React, { useEffect, useRef, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from "react-router-dom"
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { TieredMenu } from 'primereact/tieredmenu'
import { usePagination } from '../../hooks/use.paginacion'

import { formatDate, formatCurrency } from "../../helper/format"

import Swal from 'sweetalert2'
import ProductFilters from '../../helper/producto.filtros'
import ProductService from '../../services/producto.servicio'

export const ProductosPagina = () => {
  const initialPagination = {
    page: 0,
    recordsQuantity: 10,
    brand: null,
    category: null,
    provider: null,
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listProducts, setListProducts] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { paginationState, onDropdownChange } = usePagination(initialPagination)
  const { provider, category, brand, recordsQuantity } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters();

  useEffect(() => {
    ProductService.getAllByFilters(paginationState).then(data => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
    })
  }, [])

  const generateRequest = (paginationState, page) => {
    const request = { ...paginationState, page: page || 0 };

    if (brand !== null) {
      request.brand = brand.descripcion;
    }

    if (category !== null) {
      request.category = category.descripcion;
    }

    if (provider !== null) {
      request.provider = provider.razonSocial;
    }

    return request;
  }

  const menu = useRef(null);

  const items = [
    {
      label: 'Agregar producto',
      url: '/producto/registrar',
    },
    {
      label: 'Modificación rápida',
      url: '/productos/modificacion/rapida',
    },
    {
      label: 'Modificación masiva',
      url: '/productos/modificacion/masiva',
    },
  ];

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
      text: "Se eliminará el producto del sistema de manera permanente, esto no afectará a las ventas registradas sobre este mismo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        ProductService.delete(id)
          .then((data) => {
            setListProducts(listProducts.filter((product) => product.id !== id));
            Swal.fire('Eliminado', 'El producto ' + data + ' ha sido eliminado del sistema con éxito.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  }

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-3'>Mis productos</h2>
      <span className='text-xl font-normal'>Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema</span>
      <Card className='!shadow border my-5'>
        <div className='flex flex-wrap'>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Proveedor</label>
            <Dropdown options={listProviders} optionLabel='razonSocial' filter
              name='provider' value={provider} onChange={onDropdownChange} emptyMessage='Sin registros'
              placeholder='Selecciona un proveedor' className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Rubro</label>
            <Dropdown options={listCategories} optionLabel='descripcion' filter
              name='category' value={category} onChange={onDropdownChange} emptyMessage='Sin registros'
              placeholder='Selecciona un rubro' className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Marca</label>
            <Dropdown options={listBrands} optionLabel='descripcion' filter
              name='brand' value={brand} onChange={onDropdownChange} emptyMessage='Sin registros'
              placeholder='Selecciona una marca' className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Cantidad</label>
            <Dropdown options={listQuantities}
              name='quantity' value={recordsQuantity} onChange={onDropdownChange} emptyMessage="Sin registros"
              placeholder='Selecciona la cantidad' className='p-inputtext-sm w-full' />
          </div>
          <div className='me-3'>
            <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
            <Button label='Filtrar' onClick={filter} className='hover:!bg-blue-600 me-3' size='small' />
          </div>
          <div>
            <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
            <Button label='Opciones' iconPos='right' icon='pi pi-caret-down' className='hover:!bg-blue-600'
              onClick={(e) => menu.current.toggle(e)} size='small' />
            <TieredMenu model={items} popup ref={menu} breakpoint="767px" className='m-0 p-0' />
          </div>
        </div>
      </Card>
      <Card className='!shadow border mt-5'>
        <DataTable value={listProducts} stripedRows emptyMessage='No se encontraron resultados' size='small'>
          <Column field='codigo' header='Código' style={{ width: '10%' }}></Column>
          <Column field='descripcion' header='Descripción' style={{ width: '30%' }}></Column>
          <Column field={(rowData) => formatCurrency(rowData.precioEfectivo)} header='Efectivo' style={{ width: '10%' }} />
          <Column field={(rowData) => formatCurrency(rowData.precioDebito)} header='Débito' style={{ width: '10%' }} />
          <Column field={(rowData) => formatCurrency(rowData.precioCredito)} header='Crédito' style={{ width: '10%' }} />
          <Column field='ultActPrecio' header='Ult. Precio' style={{ width: '10%' }}
            body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : '-'}></Column>
          <Column header='Acciones' alignHeader={'center'} style={{ width: '10%' }}
            body={(rowData) => (
              <div className='flex justify-center'>
                <Link to={`/producto/detalle/${rowData.id}`} className='me-3'>
                  <button className='bg-blue-500 rounded text-xl text-white px-2 py-1'>
                    <i className='bi bi-eye-fill'></i>
                  </button>
                </Link>
                <Link to={`/producto/modificar/${rowData.id}`} className='me-3'>
                  <button className='bg-yellow-500 rounded text-xl text-white px-2 py-1'>
                    <i className='bi bi-pencil-fill'></i>
                  </button>
                </Link>
                <button className='bg-red-500 rounded text-xl text-white px-2 py-1'
                  onClick={() => handleDelete(rowData.id)} >
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
        <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
          onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
      </Card>
    </div >
  )
}