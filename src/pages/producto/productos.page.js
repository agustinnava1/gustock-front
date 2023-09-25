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
import ProductoServicio from '../../services/producto.service'

export const ProductosPage = () => {
  const [listaProductos, setListaProductos] = useState([])
  const { listaProveedores, listaRubros, listaMarcas, listaCantidades } = ProductoFiltros();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)

  const [first, setFirst] = useState(0)
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
    const request = { ...paginacionRequest, pagina: 0 }
    ProductoServicio.listar(request).then(data => {
      setCantidad(data.size)
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  };

  const cambiarPagina = (event) => {
    setFirst(event.first)
    setCantidad(event.rows)

    const request = { ...paginacionRequest, pagina: event.page }
    ProductoServicio.listar(request).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  };

  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Listado de productos</h2>
      <span className="text-xl font-normal">Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema</span>
      <div className='flex justify-between my-5'>
        <div className='md:flex'>
          <div className='flex-auto me-3'>
            <Dropdown options={listaProveedores} optionLabel="razonSocial"
              value={proveedor} onChange={handleProveedor} emptyMessage="Sin registros"
              placeholder="Selecciona un proveedor" className='flex-1 p-inputtext-sm w-56' />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaRubros} optionLabel="descripcion"
              value={rubro} onChange={handleRubro} emptyMessage="Sin registros"
              placeholder="Selecciona un rubro" className='flex-1 p-inputtext-sm w-56' />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaMarcas} optionLabel="descripcion"
              value={marca} onChange={handleMarca} emptyMessage="Sin registros"
              placeholder="Selecciona una marca" className='flex-1 p-inputtext-sm w-56' />
          </div>
          <div className='flex-auto me-3'>
            <Dropdown options={listaCantidades} emptyMessage="Sin registros"
              value={cantidad} onChange={handleCantidad}
              placeholder="Selecciona la cantidad" className='flex-1 p-inputtext-sm w-52' />
          </div>
          <div className='flex-auto'>
            <Button label="Filtrar" onClick={filtrarVentas} className='hover:!bg-blue-600' size='small' />
          </div>
        </div>
        <div className="card flex justify-content-center">
          <TieredMenu model={items} popup ref={menu} breakpoint="767px" className='m-0 p-0' />
          <Button label="Opciones" iconPos='right' icon='pi pi-caret-down' className='hover:!bg-blue-600'
            onClick={(e) => menu.current.toggle(e)} size='small' />
        </div>
      </div>
      <Card className='drop-shadow !shadow-none mt-5'>
        <DataTable value={listaProductos} selectionMode="single" selection={productoSeleccionado}
          onSelectionChange={(e) => setProductoSeleccionado(e.value)} stripedRows size='small'>
          <Column field="codigo" header="Código" style={{ width: '10%' }}></Column>
          <Column field="descripcion" header="Descripción" style={{ width: '30%' }}></Column>
          <Column field="precioEfectivo" header="Efectivo" style={{ width: '10%' }}
            body={(rowData) => rowData.precioEfectivo ? formatCurrency(rowData.precioEfectivo) : '$ 0'}>
          </Column>
          <Column field="precioDebito" header="Débito" style={{ width: '10%' }}
            body={(rowData) => rowData.precioDebito ? formatCurrency(rowData.precioDebito) : '$ 0'}>
          </Column>
          <Column field="precioCredito" header="Crédito" style={{ width: '10%' }}
            body={(rowData) => rowData.precioCredito ? formatCurrency(rowData.precioCredito) : '$ 0'}>
          </Column>
          <Column field='ultActPrecio' header="Ult. Precio" style={{ width: '10%' }}
            body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : ''}></Column>
          <Column header="Unidades" alignHeader={'center'} style={{ width: '10%' }}></Column>
          <Column header="Acciones" alignHeader={'center'} style={{ width: '10%' }}
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
        <Paginator first={first} rows={cantidad} pageLinkSize={5} totalRecords={totalRegistros}
          onPageChange={cambiarPagina} className='mt-5 !p-0'></Paginator>
      </Card>
    </div>
  )
}