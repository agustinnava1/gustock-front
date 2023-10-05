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
    pagina: 0,
    cantidad: 10,
    marca: null,
    rubro: null,
    proveedor: null,
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
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


  const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
      return false;
    }

    str = str.replace(/^0+/, '') || '0';
    let n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
      case 'precioEfectivo':
      case 'precioDebito':
      case 'precioCredito':
        if (isPositiveInteger(newValue)) rowData[field] = newValue;
        else event.preventDefault();
        break;

      default:
        if (newValue.trim().length > 0) rowData[field] = newValue;
        else event.preventDefault();
        break;
    }
  };

  const editarCelda = (options) => {
    switch (options.field) {
      case 'precioEfectivo':
      case 'precioDebito':
      case 'precioCredito':
        return editarPrecio(options);
      default:
        return editarTexto(options);
    }
  };

  const editarTexto = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} className='w-full' />;
  };

  const editarPrecio = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} className='w-full' />;
  };

  const columns = [
    { field: 'descripcion', header: 'Descripción', width: '25%' },
    { field: 'precioEfectivo', header: 'Precio Efectivo', width: '25%' },
    { field: 'precioDebito', header: 'Precio Débito', width: '25%' },
    { field: 'precioCredito', header: 'Precio Crédito', width: '25%' },
  ];

  return (
    <div className='p-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Modificación masiva de productos</h2>
      <span class="text-xl font-normal">Todos los campos a excepción del código son editables. Para guardar los cambios realizados presione el botón al final de la tabla "Guardar cambios"</span>

      <Card className='!shadow border mt-5'>
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
      <Card className='!shadow border mt-5'>
        <DataTable value={listProducts} stripedRows editMode="cell" size='small'>
          <Column field="codigo" header="Código" style={{ width: '10%' }}></Column>

          {columns.map(({ field, header }) => {
            return <Column key={field} field={field} header={header} style={{ width: '25%' }}
              body={field.includes('precio') && formatCurrency()}
              editor={(opciones) => editarCelda(opciones)} onCellEditComplete={onCellEditComplete} />
          })}
          
        </DataTable>
        <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
          onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
      </Card>
    </div>
  );
}