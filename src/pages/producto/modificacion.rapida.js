import React, { useState, useEffect } from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { RadioButton } from 'primereact/radiobutton'
import { InputNumber } from 'primereact/inputnumber'
import { usePagination } from '../../hooks/use.paginacion'

import { formatCurrency, formatDate } from '../../helper/format'

import ProductFilters from '../../helper/producto.filtros'
import ProductoService from '../../services/producto.servicio'

export const ProductosModificacionRapida = () => {
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
  const [selectedProducts, setSelectedProducts] = useState([])

  const { paginationState, onDropdownChange } = usePagination(initialPagination)
  const { proveedor, rubro, marca, cantidad } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters();

  const [option, setOption] = useState(null)

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

  const filter = () => {
    setFirst(0)
    setRows(cantidad)

    const request = generateRequest(paginationState)

    ProductoService.getAll(request).then(data => {
      setListProducts(data.listItems)
      setTotalElements(data.totalElements)
    })
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    ProductoService.getAll(request).then(data => {
      setListProducts(data.listItems)
    })
  }

  return (
    <div className='m-5'>
      <h2 className='sm:text-4xl text-5xl font-medium mb-3'>Actualización rápida de precios</h2>
      <span className='text-xl font-normal'>Presiona la casilla para seleccionar el producto. Los artículos seleccionados se actualizarán al presionar "Grabar"</span>
      <div className='flex'>
        <Card title='Parámetros' subTitle='Defina un porcentaje y luego seleccione que tipo de acción desea realizar'
          className='w-1/6 h-full !shadow border mt-5'>
          <div>
            <div className='mb-3'>
              <label className='block font-medium mb-3'>Efectivo</label>
              <InputNumber className='p-inputtext-sm w-full' suffix="%"></InputNumber>
            </div>
            <div className='mb-3'>
              <label className='block font-medium mb-3'>Débito</label>
              <InputNumber className='p-inputtext-sm w-full' suffix="%"></InputNumber>
            </div>
            <div className='mb-3'>
              <label className='block font-medium mb-3'>Crédito</label>
              <InputNumber className='p-inputtext-sm w-full' suffix="%"></InputNumber>
            </div>
          </div>
          <hr className='my-5'></hr>
          <div className='mb-5'>
            <div className='flex align-items-center mb-5'>
              <RadioButton inputId='aumentar' name='aumentar' value='aumentar' onChange={(e) => setOption(e.value)} checked={option === 'aumentar'} />
              <label htmlFor='aumentar' className="ml-2">Aumentar</label>
            </div>
            <div className='flex align-items-center'>
              <RadioButton inputId='disminuir' name='disminuir' value='disminuir' onChange={(e) => setOption(e.value)} checked={option === 'disminuir'} />
              <label htmlFor='disminuir' className='ml-2'>Disminuir</label>
            </div>
          </div>
          <Button label='Grabar' className='w-full hover:!bg-blue-600' size='small'></Button>
        </Card>
        <div className='w-5/6 ms-5 mt-5'>
          <Card className='!shadow border mb-5'>
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
                <Button label='Volver' className='hover:!bg-blue-600' size='small' />
              </div>
            </div>
          </Card>
          <Card className='!shadow border'>
            <DataTable value={listProducts} selectionMode={'checkbox'}
              selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" >
              <Column selectionMode='multiple' style={{ width: '5%' }}></Column>
              <Column field='codigo' header='Código' style={{ width: '10%' }}></Column>
              <Column field='descripcion' header='Descripción' style={{ width: '40%' }}></Column>
              <Column field='precioEfectivo' header='Efectivo' style={{ width: '10%' }}
                body={(rowData) => rowData.precioEfectivo ? formatCurrency(rowData.precioEfectivo) : ''}>
              </Column>
              <Column field='precioDebito' header='Débito' style={{ width: '10%' }}
                body={(rowData) => rowData.precioDebito ? formatCurrency(rowData.precioDebito) : ''}>
              </Column>
              <Column field='precioCredito' header='Crédito' style={{ width: '10%' }}
                body={(rowData) => rowData.precioCredito ? formatCurrency(rowData.precioCredito) : ''}>
              </Column>
              <Column field='ultActPrecio' header='Ult. Precio' style={{ width: '15%' }}
                body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : ''}></Column>
            </DataTable>
            <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
              onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
          </Card>
        </div>
      </div>
    </div>
  );
}