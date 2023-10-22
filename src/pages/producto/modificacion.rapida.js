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
    brand: null,
    category: null,
    provider: null,
    recordsQuantity: 10
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

  const handleUpdatePrices = () => {
    const selectedProductIds = selectedProducts.map(product => product.idProduct)

    if (pctDebit === null && pctCredit === null && pctEffective === null) {
      Swal.fire('Error', 'Debe ingresar al menos un valor de porcentaje (Efectivo, Débito, Crédito).', 'error');
      return;
    }

    if (!option) {
      Swal.fire('Error', 'Debe seleccionar una acción a realizar (Aumentar o Disminuir).', 'error');
      return;
    }

    if (selectedProductIds.length === 0) {
      Swal.fire('Error', 'Debe seleccionar al menos un producto.', 'error');
      return;
    }

    const request = {
      action: option,
      pctDebit: pctDebit,
      pctCredit: pctCredit,
      pctEffective: pctEffective,
      productsIds: selectedProductIds
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
      <h2 className='text-3xl font-medium mb-2'>Actualización rápida de precios</h2>
      <span className='text-xl font-normal'>Presione la casilla para seleccionar un producto. Los artículos seleccionados se actualizarán al presionar "Actualizar".</span>
      <div className='flex gap-5 mt-5'>
        <Card title='Parámetros' subTitle='Defina un porcentaje y luego seleccione el tipo de acción que desea realizar'
          className='w-1/6 h-full !shadow border'>
          <div className='flex justify-between mb-3'>
            <label className='my-auto font-medium'>Efectivo</label>
            <InputNumber name='pctEffective' className='p-inputtext-sm' suffix="%"
              value={pctEffective} onChange={(e) => setPctEffective(e.value)} size={10} />
          </div>
          <div className='flex justify-between mb-3'>
            <label className='my-auto font-medium'>Débito</label>
            <InputNumber name='pctDebit' className='p-inputtext-sm' suffix="%"
              value={pctDebit} onChange={(e) => setPctDebit(e.value)} size={10} />
          </div>
          <div className='flex justify-between mb-3'>
            <label className='my-auto font-medium'>Crédito</label>
            <InputNumber name='pctCredit' className='p-inputtext-sm' suffix="%"
              value={pctCredit} onChange={(e) => setPctCredit(e.value)} size={10} />
          </div>
          <hr className='my-5'></hr>
          <div className='flex align-items-center mb-5'>
            <RadioButton inputId='increase' value='increase' onChange={(e) => setOption(e.value)} checked={option === 'increase'} />
            <label htmlFor='increase' className="ml-2">Aumentar</label>
          </div>
          <div className='flex align-items-center mb-5'>
            <RadioButton inputId='decrease' value='decrease' onChange={(e) => setOption(e.value)} checked={option === 'decrease'} />
            <label htmlFor='decrease' className='ml-2'>Disminuir</label>
          </div>
          <Button label='Actualizar' onClick={handleUpdatePrices} className='w-full hover:!bg-blue-600' size='small'></Button>
        </Card>
        <div className='w-5/6'>
          <Card className='!shadow border mb-5'>
            <div className='flex flex-wrap gap-3'>
              <div className='flex-auto w-32 md:w-36 mb-3 lg:mb-0'>
                <Dropdown options={listProviders} optionLabel='razonSocial' filter
                  name='provider' value={provider} onChange={onDropdownChange} emptyMessage='Sin registros'
                  placeholder='Selecciona un proveedor' className='p-inputtext-sm w-full' />
              </div>
              <div className='flex-auto w-32 md:w-36 mb-3 lg:mb-0'>
                <Dropdown options={listCategories} optionLabel='descripcion' filter
                  name='category' value={category} onChange={onDropdownChange} emptyMessage='Sin registros'
                  placeholder='Selecciona un rubro' className='p-inputtext-sm w-full' />
              </div>
              <div className='flex-auto w-32 md:w-36 mb-3 lg:mb-0'>
                <Dropdown options={listBrands} optionLabel='descripcion' filter
                  name='brand' value={brand} onChange={onDropdownChange} emptyMessage='Sin registros'
                  placeholder='Selecciona una marca' className='p-inputtext-sm w-full' />
              </div>
              <div className='flex-auto w-32 md:w-36 mb-3 lg:mb-0'>
                <Dropdown options={listQuantities}
                  name='recordsQuantity' value={recordsQuantity} onChange={onDropdownChange} emptyMessage="Sin registros"
                  placeholder='Selecciona la cantidad' className='p-inputtext-sm w-full' />
              </div>
              <div>
                <Button label='Filtrar' onClick={filter} className='hover:!bg-blue-600' size='small' />
              </div>
            </div>
          </Card>
          <Card className='!shadow border'>
            <DataTable value={listProducts} selectionMode={'checkbox'} emptyMessage="No se encontraron productos" size='small'
              selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="idProduct" >
              <Column selectionMode='multiple' className='rounded-tl-lg' style={{ width: '5%' }} />
              <Column field="idProduct" header="ID" style={{ width: '10%' }} />
              <Column field='code' header='Código' style={{ width: '10%' }} />
              <Column field='description' header='Descripción' style={{ width: '35%' }} />
              <Column field={(rowData) => formatCurrency(rowData.priceEffective)} header='Efectivo' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.priceDebit)} header='Débito' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.priceCredit)} header='Crédito' style={{ width: '10%' }} />
              <Column field='ultActPrecio' header='Ult. Precio' style={{ width: '15%' }}
                body={(rowData) => rowData.lastPrice ? formatDate(rowData.lastPrice) : ''} />
              <Column className='rounded-tr-md' alignHeader={'center'} style={{ width: '10%' }}
                body={(product) => (
                  <div className='flex justify-center'>
                    <button className='text-blue-500 border border-blue-500 rounded px-2 py-1'>
                      <i className='bi bi-eye-fill'></i>
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
    </div>
  );
}