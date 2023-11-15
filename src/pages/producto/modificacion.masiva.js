import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from "react-router-dom"
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ArrowLeft, Save } from 'lucide-react'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { InputNumber } from 'primereact/inputnumber'

import { usePagination } from '../../hooks/use.paginacion'

import ProductFilters from '../../helper/producto.filtros'
import ProductService from '../../services/producto.servicio'
import Swal from 'sweetalert2'

export const ProductosModificacionMasiva = () => {
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

  const { paginationState, onDropdownChange, setPaginationState } = usePagination(initialPagination)
  const { provider, category, brand, recordsQuantity } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters();

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

  const onInputTextChange = (rowData, name) => (e) => {
    const { value } = e.target

    setListProducts(prevList =>
      prevList.map(item => item.code === rowData.code ? { ...item, [name]: value } : item)
    )
  }

  const onInputNumberChange = (rowData, name) => (e) => {
    const { value } = e

    setListProducts(prevList =>
      prevList.map(item => item.code === rowData.code ? { ...item, [name]: value } : item)
    )
  }

  const handleUpdateProducts = () => {
    ProductService.updateProducts(listProducts).then(data => {
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
    <div className='p-5'>
      <h2 className="text-3xl font-medium mb-5">Modificación masiva de productos</h2>

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

          <Card className='!shadow-none border mb-5 cursor-pointer'
            onClick={handleUpdateProducts}>
            <div className='flex gap-3'>
              <Save className='text-blue-500' />
              <span className='font-medium'>Guardar cambios</span>
            </div>
          </Card>

          <Link to={`/productos`}>
            <Card className='!shadow-none border'>
              <div className='flex gap-3'>
                <ArrowLeft className='text-blue-500' />
                <span className='font-medium'>Volver a productos</span>
              </div>
            </Card>
          </Link>
        </div >

        <div className='w-5/6'>
          <Card className='!shadow-none border'>
            <DataTable value={listProducts} emptyMessage='No se encontraron resultados' stripedRows editMode="cell" size='small'>
              <Column field="code" header="Código" className='rounded-tl-md' style={{ width: '10%' }}></Column>

              <Column field="description" header="Descripción" style={{ width: '50%' }} body={(rowData) => (
                <InputText type="text" className='p-inputtext-sm w-full'
                  name='description' value={rowData.description} onChange={onInputTextChange(rowData, 'description')} />
              )}>
              </Column>

              <Column field="cashPrice" header="Precio efectivo" style={{ width: '10%' }} body={(rowData) => (
                <InputNumber mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='cashPrice' value={rowData.cashPrice} onChange={onInputNumberChange(rowData, 'cashPrice')} />
              )}>
              </Column>

              <Column field="debitPrice" header="Precio débito" style={{ width: '10%' }} body={(rowData) => (
                <InputNumber mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='debitPrice' value={rowData.debitPrice} onChange={onInputNumberChange(rowData, 'debitPrice')} />
              )}>
              </Column>

              <Column field="priceDebit" header="Precio crédito" style={{ width: '10%' }} body={(rowData) => (
                <InputNumber mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='priceDebit' value={rowData.creditPrice} onChange={onInputNumberChange(rowData, 'priceDebit')} />
              )}>
              </Column>

              <Column className='rounded-tr-md' alignHeader={'center'} style={{ width: '5%' }}
                body={(rowData) => (
                  <div className='flex justify-center'>
                    <button className='bg-sky-500 text-white rounded px-2 py-1'>
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