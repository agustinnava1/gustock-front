import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { useParams } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

import LocalService from '../services/local.service';
import StockService from '../services/stock.service';

export const LocalPage = () => {
  const { id } = useParams();

  const [local, setLocal] = useState([]);
  const [listaProductos, setListaProductos] = useState([])

  useEffect(() => {
    loadLocalInfo();
  }, []);

  const loadLocalInfo = async () => {
    await LocalService.getById(id).then(data => {
      setLocal(data);
    })

    await StockService.getAllByLocalId(id).then(data => {
      setListaProductos(data);
      console.log(data)
    })
  };

  return (
    <div className='lg:flex justify-between mt-5 mx-5'>
      <div className='w-1/6'>
        <Card title="Local" className='text-center'>
          <h2 className="text-[28px]">{local.nombre}</h2>
          <p className="text-[20px]">{local.direccion}</p>
        </Card>
        <Card title="Venta" className='text-center mt-5'>
          <div className='mb-5'>
            <Button label='Nueva venta' className='w-3/4'/>
          </div>
          <div>
            <Button label='Devolución' className='w-3/4'/>
          </div>
        </Card>
        <Card title="Turno" className='text-center mt-5'>
          <div className='mb-5'>
            <Button label='Abrir turno' className='w-3/4' />
          </div>
          <div>
            <Button label='Cerrar turno' className='w-3/4'/>
          </div>
        </Card>
      </div>

      <div className='w-5/6 ms-5'>
        <Card title="Productos">
          <DataTable value={listaProductos} paginator rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50]}>
            <Column field="producto.codigo" header="Código" style={{ width: '10%' }}></Column>
            <Column field="producto.descripcion" header="Descripción" style={{ width: '25%' }}></Column>
            <Column field="producto.precioEfectivo" header="Efectivo" style={{ width: '10%' }}></Column>
            <Column field="producto.precioDebito" header="Débito" style={{ width: '10%' }}></Column>
            <Column field="producto.precioCredito" header="Crédito" style={{ width: '10%' }}></Column>
            <Column field="producto.ultActPrecio" header="Ult. Precio" style={{ width: '10%' }}></Column>
            <Column field="ultActStock" header="Ult. Stock" style={{ width: '10%' }}></Column>
            <Column field="cantidad" header="Unidades" style={{ width: '10%' }}></Column>
            <Column field="" header="Acciones" style={{ width: '15%' }}></Column>
          </DataTable>
        </Card>
      </div>
    </div>
  )
}

