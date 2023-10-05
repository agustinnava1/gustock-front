import React, { useEffect, useRef, useState } from 'react'

import { Row } from 'primereact/row'
import { Card } from 'primereact/card'
import { Link } from "react-router-dom"
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { TieredMenu } from 'primereact/tieredmenu'
import { ColumnGroup } from 'primereact/columngroup'
import { usePagination } from '../../hooks/use.paginacion'

import { formatDate, formatCurrency } from "../../helper/format"

import StockService from '../../services/stock.servicio'
import ProductFilters from '../../helper/producto.filtros'
import ProductoService from '../../services/producto.servicio'

export const ProductosPagina = () => {
  const initialPagination = {
    pagina: 0,
    cantidad: 10,
    marca: null,
    rubro: null,
    proveedor: null,
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [totalStock, setTotalStock] = useState(0)
  const [listProducts, setListProducts] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { paginationState, onDropdownChange } = usePagination(initialPagination)
  const { proveedor, rubro, marca, cantidad } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters();

  useEffect(() => {
    ProductoService.getAll(paginationState).then(data => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
    })
  }, [])

  const generateRequest = (paginationState, page) => {
    const request = { ...paginationState, pagina: page || 0 };

    if (marca !== null) {
      request.marca = marca.descripcion;
    }

    if (rubro !== null) {
      request.rubro = rubro.descripcion;
    }

    if (proveedor !== null) {
      request.proveedor = proveedor.razonSocial;
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
    setRows(cantidad)

    const request = generateRequest(paginationState)

    ProductoService.getAllWithStock(request).then(data => {
      setTotalStock(data.totalStock)
      setListProducts(data.listItems)
      setTotalElements(data.totalElements)
    })
  };

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    ProductoService.getAllWithStock(request).then(data => {
      setListProducts(data.listItems)
    })
  };

  const getTotalStock = (id) => {
    
  }

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer={`Total stock: ${totalStock} unidades`} colSpan={8} footerStyle={{ textAlign: 'left' }} />
      </Row>
    </ColumnGroup>
  )

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-3'>Mis productos</h2>
      <span className='text-xl font-normal'>Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema</span>
      <Card className='!shadow border my-5'>
        <div className='flex flex-wrap'>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Proveedor</label>
            <Dropdown options={listProviders} optionLabel='razonSocial' filter
              name='proveedor' value={proveedor} onChange={onDropdownChange} emptyMessage='Sin registros'
              placeholder='Selecciona un proveedor' className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Rubro</label>
            <Dropdown options={listCategories} optionLabel='descripcion' filter
              name='rubro' value={rubro} onChange={onDropdownChange} emptyMessage='Sin registros'
              placeholder='Selecciona un rubro' className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Marca</label>
            <Dropdown options={listBrands} optionLabel='descripcion' filter
              name='marca' value={marca} onChange={onDropdownChange} emptyMessage='Sin registros'
              placeholder='Selecciona una marca' className='p-inputtext-sm w-full' />
          </div>
          <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
            <label className='block font-medium text-lg mb-2'>Cantidad</label>
            <Dropdown options={listQuantities}
              name='cantidad' value={cantidad} onChange={onDropdownChange} emptyMessage="Sin registros"
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
        <DataTable value={listProducts} footerColumnGroup={footerGroup}
          stripedRows emptyMessage='No se encontraron resultados' size='small'>
          <Column field='codigo' header='Código' style={{ width: '10%' }}></Column>
          <Column field='descripcion' header='Descripción' style={{ width: '30%' }}></Column>
          <Column field='precioEfectivo' header='Efectivo' style={{ width: '10%' }}
            body={(rowData) => rowData.precioEfectivo ? formatCurrency(rowData.precioEfectivo) : '$ 0'}>
          </Column>
          <Column field='precioDebito' header='Débito' style={{ width: '10%' }}
            body={(rowData) => rowData.precioDebito ? formatCurrency(rowData.precioDebito) : '$ 0'}>
          </Column>
          <Column field='precioCredito' header='Crédito' style={{ width: '10%' }}
            body={(rowData) => rowData.precioCredito ? formatCurrency(rowData.precioCredito) : '$ 0'}>
          </Column>
          <Column field='ultActPrecio' header='Ult. Precio' style={{ width: '10%' }}
            body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : ''}></Column>
          <Column header='Unidades' alignHeader={'center'} style={{ width: '10%' }}>
          </Column>
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
                <button className='bg-red-500 rounded text-xl text-white px-2 py-1' >
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