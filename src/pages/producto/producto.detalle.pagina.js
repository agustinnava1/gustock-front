import { Card } from 'primereact/card'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { formatCurrency, formatDate, formatDateLong, formatoFechaCompleto } from '../../helper/format'

import StockServicio from '../../services/stock.servicio'
import ProductoServicio from '../../services/producto.servicio'
import { Panel } from 'primereact/panel'

export const ProductoDetalle = () => {
  const { id } = useParams();

  const [stock, setStock] = useState([])
  const [imagen, setImagen] = useState([])
  const [barcode, setBarcode] = useState([])
  const [producto, setProducto] = useState([])
  const [fichaTecnica, setFichaTecnica] = useState([])

  useEffect(() => {
    cargarProducto()
  }, []);

  const cargarProducto = () => {
    ProductoServicio.obtenerPorId(id).then(data => {
      setProducto(data);
      setFichaTecnica(data.fichaTecnica);
    })

    /*StockServicio.obtenerPorProducto(id).then(data => {
      setProducto(data);
    })*/
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
    <div className='container mx-auto p-5 2xl:px-44'>
      <h2 className='text-4xl font-medium'>{producto.descripcion}</h2>
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
          <Card title='Características' subTitle={`${producto.codigo}`} className='!rounded-lg !shadow-md mb-5'>
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
                    {producto.ultActPrecio ? formatoFechaCompleto(producto.ultActPrecio) : 'Sin registros'}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Panel header="Ficha Técnica" className='!bg-white-100 !rounded-lg !shadow-md mb-5' toggleable>
            <table className="table w-full">
              <tbody>
                {[
                  ['Altura', fichaTecnica.altura + ' cm'],
                  ['Profundidad', fichaTecnica.profundidad + ' cm'],
                  ['Ancho', fichaTecnica.ancho + ' cm'],
                  ['Cm lineal', fichaTecnica.cmLineal + ' cm'],
                  ['Capacidad', fichaTecnica.capacidad + ' kg'],
                  ['Peso', fichaTecnica.peso + ' kg'],
                  ['Litros', fichaTecnica.litros + ' L'],
                  ['Ruedas', fichaTecnica.ruedas],
                  ['Colores', fichaTecnica.colores],
                  ['Material', fichaTecnica.material],
                  ['Garantía', fichaTecnica.garantia],
                  ['Luces', fichaTecnica.luces],
                  ['Organizador', fichaTecnica.organizador],
                  ['P. Notebook', fichaTecnica.portanotebook],
                  ['Observaciones', fichaTecnica.observaciones],
                ].map(([label, value]) => generateTableRow(label, value))}
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
      <Card title='Stock disponible en sucursales' className='!rounded-lg !shadow-md'>
        <table class="min-w-full border text-sm">
          <thead class="bg-[#efefef] border-b">
            <tr>
              <th class="text-left p-2">Sucursal</th>
              <th class="text-left p-2">Cantidad</th>
              <th class="text-left p-2">Última actualización</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-left border-b">
              <td class="p-2">
                {formatCurrency(producto.precioCredito)}
              </td>
              <td class="p-2">
                {formatCurrency(producto.precioCredito)}
              </td>
              <td class="p-2">
                {formatCurrency(producto.precioCredito)}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div >

  )
}