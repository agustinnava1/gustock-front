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

import Swal from 'sweetalert2'
import ProductFilters from '../../helper/producto.filtros'
import ProductService from '../../services/producto.servicio'

export const ProductosModificacionRapida = () => {
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
  const [selectedProducts, setSelectedProducts] = useState([])

  const { paginationState, onDropdownChange } = usePagination(initialPagination)
  const { provider, category, brand, recordsQuantity } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters();

  /* Params request to update prices */
  const [option, setOption] = useState(null)
  const [pctDebit, setPctDebit] = useState(null)
  const [pctCredit, setPctCredit] = useState(null)
  const [pctEffective, setPctEffective] = useState(null)

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

  const handleUpdatePrices = () => {
    const selectedProductIds = selectedProducts.map(product => product.id);
    const request = {
      productsIds: selectedProductIds,
      action: option,
      pctEffective: pctEffective,
      pctDebit: pctDebit,
      pctCredit: pctCredit
    }

    ProductService.updatePrices(request).then(data => {
      filter()
      Swal.fire('Actualizado', 'Se han actualizado ' + data + ' productos con éxito.', 'success')
    }).catch((error) => {
      Swal.fire('Error', 'Hubo un problema al intentar actualizar los productos. Por favor, inténtalo de nuevo más tarde.', 'error')
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
                <InputNumber name='pctEffective' className='p-inputtext-sm w-full' suffix="%"
                  value={pctEffective} onChange={(e) => setPctEffective(e.value)} />
              </div>
              <div className='mb-3'>
                <label className='block font-medium mb-3'>Débito</label>
                <InputNumber name='pctDebit' className='p-inputtext-sm w-full' suffix="%"
                  value={pctDebit} onChange={(e) => setPctDebit(e.value)} />
              </div>
              <div className='mb-3'>
                <label className='block font-medium mb-3'>Crédito</label>
                <InputNumber name='pctCredit' className='p-inputtext-sm w-full' suffix="%"
                  value={pctCredit} onChange={(e) => setPctCredit(e.value)} />
              </div>
            </div>
            <hr className='my-5'></hr>
            <div className='mb-5'>
              <div className='flex align-items-center mb-5'>
                <RadioButton inputId='increase' value='increase' onChange={(e) => setOption(e.value)} checked={option === 'increase'} />
                <label htmlFor='increase' className="ml-2">Aumentar</label>
              </div>
              <div className='flex align-items-center'>
                <RadioButton inputId='decrease' value='decrease' onChange={(e) => setOption(e.value)} checked={option === 'decrease'} />
                <label htmlFor='decrease' className='ml-2'>Disminuir</label>
              </div>
            </div>
            <Button label='Grabar' onClick={handleUpdatePrices} className='w-full hover:!bg-blue-600' size='small'></Button>
        </Card>
        <div className='w-5/6 ms-5 mt-5'>
          <Card className='!shadow border mb-5'>
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
                  name='recordsQuantity' value={recordsQuantity} onChange={onDropdownChange} emptyMessage="Sin registros"
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
            <DataTable value={listProducts} selectionMode={'checkbox'} emptyMessage="No se encontraron productos"
              selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" >
              <Column selectionMode='multiple' style={{ width: '5%' }} />
              <Column field="id" header="ID" style={{ width: '10%' }} />
              <Column field='codigo' header='Código' style={{ width: '10%' }} />
              <Column field='descripcion' header='Descripción' style={{ width: '35%' }} />
              <Column field={(rowData) => formatCurrency(rowData.precioEfectivo)} header='Efectivo' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.precioDebito)} header='Débito' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.precioCredito)} header='Crédito' style={{ width: '10%' }} />
              <Column field='ultActPrecio' header='Ult. Precio' style={{ width: '15%' }}
                body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : ''} />
            </DataTable>
            <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
              onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
          </Card>
        </div>
      </div>
    </div>
  );
}