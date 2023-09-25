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
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';

export const ProductosModificacionRapida = () => {
  const [listaProductos, setListaProductos] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(null);

  const { listaProveedores, listaRubros, listaMarcas, listaCantidades } = ProductoFiltros();

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)

  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  const [accion, setAccion] = useState('')
  const [cantidad, setCantidad] = useState(10)
  const [totalRegistros, setTotalRegistros] = useState(null)
  const [paginacionRequest, setPaginacionRequest] = useState({})

  const [actualizacionRequest, setActualizacionRequest] = useState({})

  useEffect(() => {
    ProductoServicio.listar(paginacionRequest).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  }, [])

  const handleCantidad = (e) => {
    setCantidad(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, cantidad: e.target.value })
  };

  const handleMarca = (e) => {
    setMarca(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, marca: e.target.value.descripcion })
  };

  const handleRubro = (e) => {
    setRubro(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, rubro: e.target.value.descripcion })
  };

  const handleProveedor = (e) => {
    setProveedor(e.target.value)
    setPaginacionRequest({ ...paginacionRequest, proveedor: e.target.value.razonSocial })
  };

  const filtrarVentas = () => {
    setFirst(0)
    setRows(cantidad)

    const request = { ...paginacionRequest, pagina: 0 }
    ProductoServicio.listar(request).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  };

  const cambiarPagina = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = { ...paginacionRequest, pagina: event.page }
    ProductoServicio.listar(request).then(data => {
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  };

  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Actualización rápida de precios</h2>
      <span class="text-xl font-normal">Presiona la casilla para seleccionar el producto. Los artículos seleccionados se actualizarán al presionar "Grabar"</span>
      <div className='flex'>
        <Card title='Parámetros' subTitle='Defina un porcentaje y luego seleccione que tipo de acción desea realizar'
          className='w-1/6 h-full !rounded-lg !shadow-md mt-5'>
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
          <Card title='Filtros' className='!rounded-lg !shadow-md'>
            <div className='md:flex'>
              <div className='me-3'>
                <Dropdown options={listaProveedores} optionLabel='razonSocial' filter
                  value={proveedor} onChange={handleProveedor} emptyMessage='Sin registros'
                  placeholder='Selecciona un proveedor' className='flex-1 p-inputtext-sm w-56' />
              </div>
              <div className='me-3'>
                <Dropdown options={listaRubros} optionLabel='descripcion' filter
                  value={rubro} onChange={handleRubro} emptyMessage='Sin registros'
                  placeholder='Selecciona un rubro' className='flex-1 p-inputtext-sm w-56' />
              </div>
              <div className='me-3'>
                <Dropdown options={listaMarcas} optionLabel='descripcion' filter
                  value={marca} onChange={handleMarca} emptyMessage='Sin registros'
                  placeholder='Selecciona una marca' className='flex-1 p-inputtext-sm w-56' />
              </div>
              <div className='me-3'>
                <Dropdown options={listaCantidades}
                  value={cantidad} onChange={handleCantidad} emptyMessage="Sin registros"
                  placeholder='Selecciona la cantidad' className='flex-1 p-inputtext-sm w-52' />
              </div>
              <div>
                <Button label='Filtrar' onClick={filtrarVentas} className='hover:!bg-blue-600' size='small' />
              </div>
            </div>
          </Card>
          <Card className='!rounded-lg !shadow-md mt-5'>
            <DataTable value={listaProductos} selectionMode={'checkbox'}
              selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" >
              <Column selectionMode="multiple" style={{ width: '5%' }}></Column>
              <Column field="codigo" header="Código" style={{ width: '10%' }}></Column>
              <Column field="descripcion" header="Descripción" style={{ width: '40%' }}></Column>
              <Column field="precioEfectivo" header="Efectivo" style={{ width: '10%' }}
                body={(rowData) => rowData.precioEfectivo ? formatCurrency(rowData.precioEfectivo) : ''}>
              </Column>
              <Column field="precioDebito" header="Débito" style={{ width: '10%' }}
                body={(rowData) => rowData.precioDebito ? formatCurrency(rowData.precioDebito) : ''}>
              </Column>
              <Column field="precioCredito" header="Crédito" style={{ width: '10%' }}
                body={(rowData) => rowData.precioCredito ? formatCurrency(rowData.precioCredito) : ''}>
              </Column>
              <Column field='ultActPrecio' header="Ult. Precio" style={{ width: '15%' }}
                body={(rowData) => rowData.ultActPrecio ? formatDate(rowData.ultActPrecio) : ''}></Column>
            </DataTable>
            <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalRegistros}
              onPageChange={cambiarPagina} className='mt-5 !p-0'></Paginator>
          </Card>
        </div>
      </div>
    </div>
  );
}