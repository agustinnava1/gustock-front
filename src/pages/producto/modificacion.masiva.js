import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

import { formatDate, formatCurrency } from "../../helper/format";
import ProductoService from '../../services/producto.servicio';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { usePagination } from '../../hooks/use.paginacion';
import ProductFilters from '../../helper/producto.filtros';
import { Paginator } from 'primereact/paginator';

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

  const { paginationState, onDropdownChange } = usePagination(initialPagination)
  const { provider, category, brand, recordsQuantity } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters();

  useEffect(() => {
    ProductoService.getAllByFilters(paginationState).then(data => {
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

    ProductoService.getAllByFilters(request).then(data => {
      setListProducts(data.listItems)
      setTotalElements(data.totalElements)
    })
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    ProductoService.getAllByFilters(request).then(data => {
      setListProducts(data.listItems)
    })
  }

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e
    rowData[field] = newValue
  }

  const editCell = (options) => {
    switch (options.field) {
      case 'priceEffective':
      case 'priceDebit':
      case 'priceCredit':
        return editPrice(options);
      default:
        return editText(options);
    }
  };

  const editText = (options) => {
    return <InputText type="text" className='p-inputtext-sm w-full'
      value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
  };

  const editPrice = (options) => {
    return <InputNumber mode='currency' currency='ARS' locale='es-AR' className='w-full'
      minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
      value={options.value} onValueChange={(e) => options.editorCallback(e.value)} />
  };

  const columns = [
    { field: 'description', header: 'Descripción', width: '25%' },
    { field: 'priceEffective', header: 'Precio Efectivo', width: '20%' },
    { field: 'priceDebit', header: 'Precio Débito', width: '20%' },
    { field: 'priceCredit', header: 'Precio Crédito', width: '20%' },
  ];

  return (
    <div className='p-5'>
      <h2 className="text-3xl font-medium mb-2">Modificación masiva de productos</h2>
      <span class="text-xl font-normal">Todos los campos a excepción del código son editables. Para guardar los cambios realizados presione el botón al final de la tabla "Guardar cambios"</span>
      <Card className='!shadow border mt-5'>
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
      <Card className='!shadow border mt-5'>
        <DataTable value={listProducts} stripedRows editMode="cell" size='small'>
          <Column field="code" header="Código" style={{ width: '10%' }}></Column>

          {columns.map(({ field, header }) => {
            return <Column key={field} field={field} header={header}
              editor={(opciones) => editCell(opciones)} onCellEditComplete={onCellEditComplete}
              body={(rowData) => field.includes('price') ? formatCurrency(rowData[field]) : rowData[field]} />
          })}

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
  );
}