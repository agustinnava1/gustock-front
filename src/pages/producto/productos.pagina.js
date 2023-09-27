import React, { useEffect, useRef, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from "react-router-dom"
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { TieredMenu } from 'primereact/tieredmenu'

import { formatDate, formatCurrency } from "../../helper/format"

import ProductoFiltros from '../../helper/ProductoFiltros'
import ProductoServicio from '../../services/producto.servicio'

export const ProductosPagina = () => {
  const [listaProductos, setListaProductos] = useState([])
  const { listaProveedores, listaRubros, listaMarcas, listaCantidades } = ProductoFiltros();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)

  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  const [cantidad, setCantidad] = useState(10)
  const [totalRegistros, setTotalRegistros] = useState(null)
  const [paginacionRequest, setPaginacionRequest] = useState({})

  useEffect(() => {
    ProductoServicio.listar(paginacionRequest).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  }, [])

  const handleCantidad = (e) => {
    setCantidad(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, cantidad: e.target.value })
  };

  const handleMarca = (e) => {
    setMarca(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, marca: e.target.value.descripcion })
  };

  const handleRubro = (e) => {
    setRubro(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, rubro: e.target.value.descripcion })
  };

  const handleProveedor = (e) => {
    setProveedor(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, proveedor: e.target.value.razonSocial })
  };

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
    {
      label: 'Exportar a excel',
      url: '/productos/modificacion/masiva',
    }
  ];

  const filtrarVentas = () => {
    setFirst(0)
    setRows(cantidad)

    const request = { ...paginacionRequest, pagina: 0 }
    ProductoServicio.listar(request).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  };

  const cambiarPagina = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = { ...paginacionRequest, pagina: event.page }
    ProductoServicio.listar(request).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  };

  return (
    <div className='p-5'>
      <h2 className='sm:text-4xl text-5xl font-medium mb-3'>Mis productos</h2>
      <span className='text-xl font-normal'>Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema</span>
      <div className='md:flex justify-between my-5'>
        <div className='md:flex'>
          <Dropdown options={listaProveedores} optionLabel='razonSocial' filter
            value={proveedor} onChange={handleProveedor} emptyMessage='Sin registros'
            placeholder='Selecciona un proveedor' className='flex-1 p-inputtext-sm w-56 me-3' />
          <Dropdown options={listaRubros} optionLabel='descripcion' filter
            value={rubro} onChange={handleRubro} emptyMessage='Sin registros'
            placeholder='Selecciona un rubro' className='flex-1 p-inputtext-sm w-56 me-3' />
          <Dropdown options={listaMarcas} optionLabel='descripcion' filter
            value={marca} onChange={handleMarca} emptyMessage='Sin registros'
            placeholder='Selecciona una marca' className='flex-1 p-inputtext-sm w-56 me-3' />
          <Dropdown options={listaCantidades}
            value={cantidad} onChange={handleCantidad} emptyMessage="Sin registros"
            placeholder='Selecciona la cantidad' className='flex-1 p-inputtext-sm w-52 me-3' />
          <Button label='Filtrar' onClick={filtrarVentas} className='hover:!bg-blue-600 me-3' size='small' />
        </div>
        <div className='card flex justify-content-center'>
          <TieredMenu model={items} popup ref={menu} breakpoint="767px" className='m-0 p-0' />
          <Button label='Opciones' iconPos='right' icon='pi pi-caret-down' className='hover:!bg-blue-600'
            onClick={(e) => menu.current.toggle(e)} size='small' />
        </div>
      </div>
      <Card className='!rounded-lg !shadow-md mt-5'>
        <DataTable value={listaProductos} selectionMode='single' selection={productoSeleccionado}
          onSelectionChange={(e) => setProductoSeleccionado(e.value)} stripedRows emptyMessage='No se encontraron resultados' size='small'>
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
          <Column header='Unidades' alignHeader={'center'} style={{ width: '10%' }}></Column>
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
        <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalRegistros}
          onPageChange={cambiarPagina} className='mt-5 !p-0'></Paginator>
      </Card>
    </div>
  )
}