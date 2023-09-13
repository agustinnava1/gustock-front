import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Link, useParams } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

import LocalService from '../services/local.service';
import StockService from '../services/stock.service';

import { formatDate, formatCurrency } from "../helper/format";
import Swal from 'sweetalert2';

export const LocalPage = () => {
  const { id } = useParams();

  const [local, setLocal] = useState([]);
  const [listaProductos, setListaProductos] = useState([])

  useEffect(() => {
    loadProducts()
  }, []);

  const loadProducts = async () => {
    LocalService.getById(id).then(data => {
      setLocal(data);
    })

    StockService.getAllByLocalId(id).then(data => {
      setListaProductos(data);
    })
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Solo se eliminara el producto y su stock de este local",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        StockService.delete(id)
          .then(() => {
            setListaProductos(listaProductos.filter((stock) => stock.id !== id));
            Swal.fire('Eliminado', 'El producto ha sido eliminado del local.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  };

  return (
    <div className='lg:flex justify-between m-5'>
      <div className='w-1/6'>
        <Card title="Local" className='text-center drop-shadow'>
          <h2 className="text-[28px]">{local.nombre}</h2>
          <p className="text-[20px]">{local.direccion}</p>
        </Card>
        <Card title="Venta" className='text-center mt-5 drop-shadow'>
          <div className='mb-5'>
            <Link to={`/local/${local.nombre}/venta`}>
              <Button label='Nueva venta' className='w-3/4' />
            </Link>
          </div>
          <div>
            <Link to={`/local/${local.nombre}/devolucion`}>
              <Button label='Devolución' className='w-3/4' />
            </Link>
          </div>
        </Card>
        <Card title="Turno" className='text-center mt-5 drop-shadow'>
          <div className='mb-5'>
            <Button label='Abrir turno' className='w-3/4' />
          </div>
          <div>
            <Button label='Cerrar turno' className='w-3/4' />
          </div>
        </Card>
      </div>

      <div className='w-5/6 ms-5'>
        <Card title="Productos" className='drop-shadow'>
          <DataTable value={listaProductos} stripedRows paginator
            rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50, 100]} size='small'>
            <Column field="producto.codigo" header="Código" style={{ width: '10%' }}></Column>
            <Column field="producto.descripcion" header="Descripción" style={{ width: '20%' }}></Column>
            <Column field="producto.precioEfectivo" header="Efectivo" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.precioEfectivo ? formatCurrency(rowData.producto.precioEfectivo) : ''}>
            </Column>
            <Column field="producto.precioDebito" header="Débito" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.precioDebito ? formatCurrency(rowData.producto.precioDebito) : ''}>
            </Column>
            <Column field="producto.precioCredito" header="Crédito" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.precioCredito ? formatCurrency(rowData.producto.precioCredito) : ''}>
            </Column>
            <Column field='producto.ultActPrecio' header="Ult. Precio" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.ultActPrecio ? formatDate(rowData.producto.ultActPrecio) : ''}></Column>
            <Column field="ultActStock" header="Ult. Stock" style={{ width: '10%' }}
              body={(rowData) => rowData.ultActStock ? formatDate(rowData.ultActStock) : ''}></Column>
            <Column field="cantidad" header="Unidades" sortable style={{ width: '10%' }}></Column>
            <Column header="Acciones" style={{ width: '10%' }}
              body={(rowData) => (
                <div className='flex'>
                  <Link to={`/producto/detalle/${rowData.producto.id}`} className='me-3'>
                    <Button icon="pi pi-eye" text severity="info" size='small'></Button>
                  </Link>
                  <Link to={`/producto/modificar/${rowData.producto.id}`} className='me-3'>
                    <Button icon="pi pi-pencil" text severity="warning" size='small'></Button>
                  </Link>
                  <Button icon="pi pi-trash" text severity="danger" size='small'
                    onClick={() => handleDelete(rowData.id)}></Button>
                </div>
              )}>
            </Column>
          </DataTable>
        </Card>
      </div>
    </div>
  )
}

