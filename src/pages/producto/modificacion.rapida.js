import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ProductoServicio from '../../services/producto.service';
import { Card } from 'primereact/card';
import { formatCurrency, formatDate } from '../../helper/format';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import ProductoFiltros from '../../helper/ProductoFiltros';

export const ProductosModificacionRapida = () => {
  const [listaProductos, setListaProductos] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(null);

  const { listaProveedores, listaRubros, listaMarcas, listaCantidades } = ProductoFiltros();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)

  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  const [cantidad, setCantidad] = useState(10)
  const [totalRegistros, setTotalRegistros] = useState(null)
  const [paginacionRequest, setPaginacionRequest] = useState({})

  useEffect(() => {
    ProductoServicio.listar(paginacionRequest).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  }, [])

  const [rowClick, setRowClick] = useState(true);

  const [accion, setAccion] = useState('');

  useEffect(() => {
    ProductoServicio.listar().then((data) => setListaProductos(data));
  }, []);

  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Modificación rápida de productos</h2>
      <span class="text-xl font-normal">Presiona la casilla para seleccionar el producto. Los artículos seleccionados se actualizarán al presionar "Grabar"</span>
      <div className='flex'>
        <Card title='Parámetros' subTitle='Defina un porcentaje para cada tipo de precio y luego seleccione que tipo de acción desea realizar'
          className='w-1/6 drop-shadow !shadow-none mt-5'>
          <div>
            <div className='mb-3'>
              <label htmlFor="porcentajeEfectivo" className='block mb-3'>Efectivo</label>
              <InputNumber id='porcentajeEfectivo' className='p-inputtext-sm'></InputNumber>
            </div>
            <div className='mb-3'>
              <label htmlFor="porcentajeEfectivo" className='block mb-3'>Débito</label>
              <InputNumber className='p-inputtext-sm'></InputNumber>
            </div>
            <div className='mb-3'>
              <label htmlFor="porcentajeEfectivo" className='block mb-3'>Crédito</label>
              <InputNumber className='p-inputtext-sm'></InputNumber>
            </div>
          </div>
          <hr className='my-5'></hr>
          <div className='mb-5'>
            <div className="flex align-items-center mb-5">
              <RadioButton inputId="aumentar" name="aumentar" value="aumentar" onChange={(e) => setAccion(e.value)} checked={accion === 'aumentar'} />
              <label htmlFor="aumentar" className="ml-2">Aumentar</label>
            </div>
            <div className="flex align-items-center">
              <RadioButton inputId="disminuir" name="disminuir" value="disminuir" onChange={(e) => setAccion(e.value)} checked={accion === 'disminuir'} />
              <label htmlFor="disminuir" className="ml-2">Disminuir</label>
            </div>
          </div>
          <Button label='Grabar' className='w-full hover:!bg-blue-600' size='small'></Button>
        </Card>
        <div className='w-5/6 ms-5 mt-5'>
          <Card title='Filtros'>

          </Card>
          <Card className='drop-shadow !shadow-none mt-5'>
            <DataTable value={listaProductos} selectionMode={rowClick ? null : 'checkbox'}
              stripedRows paginator rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
              selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" >
              <Column selectionMode="multiple" headerStyle={{ width: '5%' }}></Column>
              <Column field="codigo" header="Código" style={{ width: '10%' }}></Column>
              <Column field="descripcion" header="Descripción" style={{ width: '30%' }}></Column>
              <Column field="precioEfectivo" header="Efectivo" style={{ width: '15%' }}
                body={(rowData) => rowData.precioEfectivo ? formatCurrency(rowData.precioEfectivo) : ''}>
              </Column>
              <Column field="precioDebito" header="Débito" style={{ width: '15%' }}
                body={(rowData) => rowData.precioDebito ? formatCurrency(rowData.precioDebito) : ''}>
              </Column>
              <Column field="precioCredito" header="Crédito" style={{ width: '15%' }}
                body={(rowData) => rowData.precioCredito ? formatCurrency(rowData.precioCredito) : ''}>
              </Column>
              <Column field='ultActPrecio' header="Ult. Precio" style={{ width: '10%' }}
                body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : ''}></Column>
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
}