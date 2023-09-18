import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

import { formatDate, formatCurrency } from "../../helper/format";

import ProductoFiltros from '../../helper/ProductoFiltros';
import ProductoServicio from '../../services/producto.service';

export const ProductosPage = () => {
  const [listaProductos, setListaProductos] = useState([])
  const { listaProveedores, listaRubros, listaMarcas, cantidad } = ProductoFiltros();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [metaKey, setMetaKey] = useState(true);

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)

  useEffect(() => {
    ProductoServicio.listar().then(data => {
      setListaProductos(data)
    })
  }, [])

  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Mis productos</h2>
      <span className="text-xl font-normal">Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema</span>
      <div className='flex justify-between my-5'>
        <div className='md:flex'>
          <Dropdown options={listaProveedores} optionLabel="razonSocial"
            value={proveedor} onChange={(e) => setProveedor(e.value)}
            placeholder="Selecciona un proveedor" className='flex-1 me-3 p-inputtext-sm' />

          <Dropdown options={listaRubros} optionLabel="descripcion"
            value={rubro} onChange={(e) => setRubro(e.value)}
            placeholder="Selecciona un rubro" className='flex-1 me-3 p-inputtext-sm' />

          <Dropdown options={listaMarcas} optionLabel="descripcion"
            value={marca} onChange={(e) => setMarca(e.value)} 
            placeholder="Selecciona una marca" className='flex-1 me-3 p-inputtext-sm' />

          <Dropdown placeholder="Selecciona la cantidad" className='flex-1 me-3 p-inputtext-sm' />
          <Button label="Filtrar" className='hover:!bg-blue-600' size='small' />
        </div>
        <div className='text-end'>
          <Button label="Opciones" className='hover:!bg-blue-600' size='small' />
        </div>
      </div>
      <Card className='drop-shadow !shadow-none mt-5'>
        <DataTable value={listaProductos} selectionMode="single" selection={productoSeleccionado}
          onSelectionChange={(e) => setProductoSeleccionado(e.value)} dataKey="id" metaKeySelection={metaKey}
          stripedRows paginator rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50, 100]} size='small'>
          <Column field="codigo" header="Código" style={{ width: '10%' }}></Column>
          <Column field="descripcion" header="Descripción" style={{ width: '20%' }}></Column>
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
                <button className='bg-red-500 rounded text-xl text-white px-2 py-1'
                >
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
      </Card>
    </div>
  )
}