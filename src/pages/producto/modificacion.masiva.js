import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

import { formatDate, formatCurrency } from "../../helper/format";
import ProductoServicio from '../../services/producto.service';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export const ProductosModificacionMasiva = () => {

  const [listaProductos, setListaProductos] = useState([])

  const columns = [
    { field: 'descripcion', header: 'Descripcion' },
    { field: 'precioEfectivo', header: 'Efectivo' },
    { field: 'precioDebito', header: 'Débito' },
    { field: 'precioCredito', header: 'Crédito' }
  ];

  useEffect(() => {
    ProductoServicio.listar().then((data) => setListaProductos(data));
  }, []);

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

  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Modificación masiva de productos</h2>
      <span class="text-xl font-normal">Todos los campos a excepción del código son editables. Para guardar los cambios realizados presione el botón al final de la tabla "Guardar cambios"</span>

      <Card className='drop-shadow !shadow-none mt-5'>
        <div className='flex justify-between mb-5'>
          <div className='md:flex w-2/3'>
            <Dropdown placeholder="Selecciona un proveedor" className='flex-1 me-3' />
            <Dropdown placeholder="Selecciona un rubro" className='flex-1 me-3' />
            <Dropdown placeholder="Selecciona una marca" className='flex-1 me-3' />
            <Dropdown placeholder="Selecciona la cantidad" className='flex-1 me-3' />
            <Button label="Filtrar" className='flex-1 me-3' />
          </div>
          <div className='w-1/6 text-end'>
            <Button label="Opciones" />
          </div>
        </div>
        <DataTable value={listaProductos} editMode="cell" size='small'
          stripedRows paginator rows={15} rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}>
          <Column field="codigo" header="Código" style={{ width: '10%' }}></Column>
          {columns.map(({ field, header }) => {
            return <Column key={field} field={field} header={header} style={{ width: '25%' }}
              body={field.includes('precio') && formatCurrency()}
              editor={(opciones) => editarCelda(opciones)} onCellEditComplete={onCellEditComplete} />
          })}
        </DataTable>
      </Card>
    </div>
  );
}