import React, { useState, useEffect } from 'react'

import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
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

  const { paginationState, onDropdownChange, setPaginationState } = usePagination(initialPagination)
  const { provider, category, brand, recordsQuantity } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters();

  /* Params request to update prices */
  const [option, setOption] = useState(null)
  const [pctCash, setPctCash] = useState(null)
  const [pctDebit, setPctDebit] = useState(null)
  const [pctCredit, setPctCredit] = useState(null)

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
    const selectedProductIds = selectedProducts.map(product => product.id)

    if (pctDebit === null && pctCredit === null && pctCash === null) {
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
      pctCash: pctCash,
      pctDebit: pctDebit,
      pctCredit: pctCredit,
      productsIds: selectedProductIds
    }

    ProductService.updatePrices(request).then(data => {
      filter()
      Swal.fire('Actualizado', 'Se han actualizado ' + data + ' productos con éxito.', 'success')
    }).catch((error) => {
      Swal.fire('Error', 'Hubo un problema al intentar actualizar los productos. Por favor, inténtelo de nuevo más tarde.', 'error')
    })
  }

  const resetFilters = () => {
    setPaginationState(initialPagination)
  }

  return (
    <div className='m-5'>
      <h2 className='text-3xl font-medium mb-5'>Actualización rápida de precios</h2>

      <div className='flex gap-5'>
        <div className='lg:w-1/6'>
          <Card className='!shadow-none border mb-5'>
            <div className='mb-3'>
              <label className='block font-medium text-lg mb-2'>Proveedor</label>
              <Dropdown options={listProviders} optionLabel='razonSocial' filter
                name='provider' value={provider} onChange={onDropdownChange} emptyFilterMessage='Sin resultados'
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
              <Button label='Limpiar' onClick={resetFilters} className='w-full' size='small' severity='secondary' />
            </div>
          </Card>

          <Card className='!shadow-none border mb-5'>
            <div className='flex justify-between mb-3'>
              <label className='my-auto font-medium'>Efectivo</label>
              <InputNumber name='pctEffective' className='p-inputtext-sm' suffix="%"
                value={pctCash} onChange={(e) => setPctCash(e.value)} size={10} />
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
            <div className='flex gap-3 mb-3'>
              <div className='flex align-items-center'>
                <RadioButton inputId='increase' value='increase' onChange={(e) => setOption(e.value)} checked={option === 'increase'} />
                <label htmlFor='increase' className="ml-2">Aumentar</label>
              </div>
              <div className='flex align-items-center'>
                <RadioButton inputId='decrease' value='decrease' onChange={(e) => setOption(e.value)} checked={option === 'decrease'} />
                <label htmlFor='decrease' className='ml-2'>Disminuir</label>
              </div>
            </div>
            <Button label='Actualizar' onClick={handleUpdatePrices} className='w-full' size='small'></Button>
          </Card>

          <Link to={`/productos`}>
            <Card className='!shadow-none border'>
              <div className='flex gap-3'>
                <ArrowLeft className='text-blue-500' />
                <span className='font-medium'>Volver a productos</span>
              </div>
            </Card>
          </Link>
        </div>

        <div className='w-5/6'>
          <Card className='!shadow-none border'>
            <DataTable value={listProducts} selectionMode={'checkbox'} emptyMessage="No se encontraron productos" size='small'
              selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" stripedRows>
              <Column selectionMode='multiple' className='rounded-tl-lg' style={{ width: '5%' }} />
              <Column field="id" header="ID" style={{ width: '10%' }} />
              <Column field='code' header='Código' style={{ width: '10%' }} />
              <Column field='description' header='Descripción' style={{ width: '35%' }} />
              <Column field={(rowData) => formatCurrency(rowData.cashPrice)} header='Efectivo' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.debitPrice)} header='Débito' style={{ width: '10%' }} />
              <Column field={(rowData) => formatCurrency(rowData.creditPrice)} header='Crédito' style={{ width: '10%' }} />
              <Column field='lastPrice' header='Ult. Precio' style={{ width: '15%' }}
                body={(rowData) => rowData.lastPrice ? formatDate(rowData.lastPrice) : ''} />
              <Column className='rounded-tr-md' alignHeader={'center'} style={{ width: '10%' }}
                body={(rowData) => (
                  <Link to={`/producto/detalle/${rowData.id}`}>
                    <div className='flex justify-center'>
                      <button className='bg-sky-500 text-white rounded px-2 py-1'>
                        <i className='bi bi-eye-fill'></i>
                      </button>
                    </div>
                  </Link>
                )}>
              </Column>
            </DataTable>
            <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
              onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
          </Card>
        </div>
      </div >
    </div >
  );
}