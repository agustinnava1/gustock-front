import { Card } from 'primereact/card'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { formatCurrency, formatDateTime } from '../../helper/format'

import StockServicio from '../../services/stock.servicio'
import ProductoServicio from '../../services/producto.servicio'
import { Panel } from 'primereact/panel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export const ProductoDetalle = () => {
  const { id } = useParams();

  const [stocks, setStocks] = useState([])
  const [imagen, setImagen] = useState([])
  const [barcode, setBarcode] = useState([])
  const [producto, setProducto] = useState([])
  const [fichaTecnica, setFichaTecnica] = useState([])

  useEffect(() => {
    cargarProducto()
  }, []);

  const cargarProducto = () => {
    ProductoServicio.getById(id).then(data => {
      setProducto(data);
      setFichaTecnica(data.fichaTecnica);
    })

    StockServicio.getAllByProductId(id).then(data => {
      setStocks(data);
      console.log(data)
    })
  };

  const generateTableRow = (label, value) => {
    return value !== null ? (
      <tr key={label} className='border-b'>
        <th className='text-left p-2' scope="row">{label}</th>
        <td className='p-2'>{value}</td>
      </tr>
    ) : null;
  };

  return (
    <div className='container mx-auto px-5 pb-5 2xl:px-44'>
      <h2 className='text-4xl !text-white text-center bg-blue-600 py-4 font-medium rounded-b-[80px]'>{producto.descripcion}</h2>
      <div className='lg:flex justify-between mt-5'>
        <div className='lg:w-1/2 mb-5'>
          <Card className='!rounded !shadow-lg mb-5 border'>
            <img src='/producto-sin-foto.jpg' class="mx-auto w-[535px] max-h-[430px]"></img>
          </Card>
          <Panel header="Código de barras" className='!bg-white-100 !rounded-lg !shadow-md mb-5' toggleable>
            <p>Hola mundo</p>
          </Panel>
        </div>
        <div className='lg:w-1/2 lg:ml-5'>
          <Card title='Características' subTitle={`Código: ${producto.codigo}`} className='!rounded-lg !shadow-md mb-5'>
            <table class="min-w-full border text-sm mb-5">
              <thead class="bg-[#efefef] border-b">
                <tr><th colSpan={2} class="text-start p-2">Lista de precios</th></tr>
              </thead>
              <tbody>
                <tr className='text-start'>
                  <th className='text-start p-2 border w-[250px]' scope='row'>Precio efectivo</th>
                  <td class="border-b p-2">
                    {formatCurrency(producto.precioEfectivo)}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border' scope='row'>Precio débito</th>
                  <td class="border-b p-2">
                    {formatCurrency(producto.precioDebito)}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border' scope='row'>Precio crédito</th>
                  <td class="border-b p-2">
                    {formatCurrency(producto.precioCredito)}
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="min-w-full border text-sm">
              <thead class="bg-[#efefef] border-b font-medium">
                <tr><th colSpan={2} class="text-start p-2">Datos del producto</th></tr>
              </thead>
              <tbody>
                <tr className='text-start'>
                  <th className='text-start p-2 border w-[250px]'>Proveedor</th>
                  <td class="border-b p-2">
                    {producto.proveedor?.razonSocial || 'Sin proveedor'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Rubro</th>
                  <td class="border-b p-2">
                    {producto.rubro?.descripcion || 'Sin rubro'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Marca</th>
                  <td class="border-b p-2">
                    {producto.marca?.descripcion || 'Sin marca'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Última actualización de precio</th>
                  <td class="border-b p-2">
                    {producto.ultActPrecio ? formatDateTime(producto.ultActPrecio) : 'Sin registros'}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Panel header="Ficha Técnica" className='!bg-white-100 !rounded-lg !shadow-md mb-5' toggleable>
            <table className="table w-full">
              <tbody>
                {[
                  ['Altura', fichaTecnica.altura !== null ? fichaTecnica.altura + ' cm' : null],
                  ['Profundidad', fichaTecnica.profundidad !== null ? + fichaTecnica.profundidad + ' cm' : null],
                  ['Ancho', fichaTecnica.ancho !== null ? fichaTecnica.ancho + ' cm' : null],
                  ['Cm lineal', fichaTecnica.cmLineal !== null ? fichaTecnica.cmLineal + ' cm' : null],
                  ['Capacidad', fichaTecnica.capacidad !== null ? fichaTecnica.capacidad + ' kg' : null],
                  ['Peso', fichaTecnica.peso !== null ? fichaTecnica.peso + ' kg' : null],
                  ['Litros', fichaTecnica.litros !== null ? fichaTecnica.litros + ' L' : null],
                  ['Ruedas', fichaTecnica.ruedas],
                  ['Colores', fichaTecnica.colores],
                  ['Material', fichaTecnica.material],
                  ['Garantía', fichaTecnica.garantia],
                  ['Luces', fichaTecnica.luces],
                  ['Organizador', fichaTecnica.organizador],
                  ['P. Notebook', fichaTecnica.portanotebook],
                  ['Observaciones', fichaTecnica.observaciones],
                ].map(([label, value]) => {
                  if (value !== null) {
                    return generateTableRow(label, value);
                  }
                  return null
                })}
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
      <Card title='Stock disponible en sucursales' className='!rounded-lg !shadow-md'>
        <DataTable value={stocks} stripedRows emptyMessage='No se encontraron unidades' size='small'>
          <Column field={(rowData) => (rowData.local.nombre) + " - " + (rowData.local.direccion)} header='Sucursal' style={{ width: '33%' }}></Column>
          <Column field={(rowData) => (rowData.cantidad) + " unidades"} header='Cantidad' style={{ width: '33%' }}></Column>
          <Column field={(rowData) => formatDateTime(rowData.ultActStock)} header='Ult. Act' style={{ width: '33%' }}></Column>
        </DataTable>
      </Card>
    </div>
  )
}