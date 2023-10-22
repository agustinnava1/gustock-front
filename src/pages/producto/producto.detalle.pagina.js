import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TabMenu } from 'primereact/tabmenu'
import { DataTable } from 'primereact/datatable'

import { formatCurrency, formatDateTime } from '../../helper/format'

import StockService from '../../services/stock.servicio'
import ProductService from '../../services/producto.servicio'

export const ProductoDetalle = () => {
  const { id } = useParams()

  const items = [
    { label: 'Stock' },
    { label: 'Ficha técnica' },
    { label: 'Código de barras' },
  ]

  const [stocks, setStocks] = useState([])
  const [imagen, setImagen] = useState([])
  const [barcode, setBarcode] = useState([])
  const [producto, setProducto] = useState([])
  const [fichaTecnica, setFichaTecnica] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    load()
  }, []);

  const load = () => {
    ProductService.getById(id).then(data => {
      setProducto(data);
      setFichaTecnica(data.fichaTecnica);
    })

    StockService.getAllByProductId(id).then(data => {
      setStocks(data);
      console.log(data)
    })
  }

  const generateTableRow = (label, value) => {
    return value !== null ? (
      <tr key={label} className='border-b'>
        <th className='text-left p-2' scope="row">{label}</th>
        <td className='text-end p-2'>{value}</td>
      </tr>
    ) : null;
  }

  return (
    <div className='container mx-auto px-5 pb-5 2xl:px-52'>

      <div className='lg:flex justify-between gap-5 my-5'>
        <div className='lg:w-1/2'>
            <img src='/producto-sin-foto.jpg' class="shadow border w-full max-h-[473px]"></img>
        </div>
        <div className='lg:w-1/2'>
          <Card title={`${producto.descripcion}`} subTitle={`Código: ${producto.codigo}`} className='!shadow border'>
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
        </div>
      </div>

      <div className="card">
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        {activeIndex == 0 &&
          <div className='bg-white p-5'>
            <DataTable value={stocks} stripedRows emptyMessage='No se encontraron unidades' size='small'>
              <Column field={(rowData) => (rowData.local.nombre) + " - " + (rowData.local.direccion)}
                header='Sucursal' className='rounded-tl-md' style={{ width: '33%' }}></Column>
              <Column field={(rowData) => (rowData.cantidad) + " unidades"} header='Cantidad' style={{ width: '33%' }}></Column>
              <Column field={(rowData) => formatDateTime(rowData.ultActStock)}
                header='Ult. Act' className='rounded-tr-md' style={{ width: '33%' }}></Column>
            </DataTable>
          </div>
        }
        {activeIndex == 1 &&
          <div className='bg-white p-5'>
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
          </div>
        }
        {activeIndex == 2 &&
          <div className='bg-white p-5'>

          </div>
        }
      </div>
    </div>
  )
}