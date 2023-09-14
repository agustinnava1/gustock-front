import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

import { formatDate, formatCurrency } from "../helper/format";
import productoService from '../services/producto.service';

export const ProductosPage = () => {

  const [listaProductos, setListaProductos] = useState([])

  useEffect(() => {
    productoService.getAll().then(data => {
      setListaProductos(data)
      console.log(data)
    })
  }, [])

  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Mis productos</h2>
      <span class="text-lg font-normal">Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema.</span>
      <Card className='drop-shadow !shadow-none mt-3'>
        <div></div>
        <DataTable value={listaProductos} paginator
          rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50, 100]} size='small'>
          <Column field="codigo" header="Código" style={{ width: '10%' }}></Column>
          <Column field="descripcion" header="Descripción" style={{ width: '20%' }}></Column>
          <Column field="precioEfectivo" header="Efectivo" style={{ width: '10%' }}
            body={(rowData) => rowData.precioEfectivo ? formatCurrency(rowData.precioEfectivo) : ''}>
          </Column>
          <Column field="precioDebito" header="Débito" style={{ width: '10%' }}
            body={(rowData) => rowData.precioDebito ? formatCurrency(rowData.precioDebito) : ''}>
          </Column>
          <Column field="precioCredito" header="Crédito" style={{ width: '10%' }}
            body={(rowData) => rowData.precioCredito ? formatCurrency(rowData.precioCredito) : ''}>
          </Column>
          <Column field='ultActPrecio' header="Ult. Precio" style={{ width: '10%' }}
            body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : ''}></Column>
          <Column header="Acciones" style={{ width: '10%' }}
            body={
              <div className='flex '>
                <Link to={`/producto/detalle/${"producto.id"}`} className='me-3'>
                  <Button icon="pi pi-eye" severity="info" size='small'></Button>
                </Link>
                <Link to={`/producto/modificar/${"producto.id"}`} className='me-3'>
                  <Button icon="pi pi-pencil" severity="warning" size='small'></Button>
                </Link>
                <Button icon="pi pi-trash" severity="danger" size='small'></Button>
              </div>
            }>
          </Column>
        </DataTable>
      </Card>
    </div>
  )
}