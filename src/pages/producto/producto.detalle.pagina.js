import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TabMenu } from 'primereact/tabmenu'
import { DataTable } from 'primereact/datatable'

import { formatCurrency, formatDateTime } from '../../helper/format'

import StockService from '../../services/stock.servicio'
import FileService from '../../services/file.service'
import ProductService from '../../services/producto.servicio'

export const ProductoDetalle = () => {
  const { id } = useParams()

  const items = [
    { label: 'Stock' },
    { label: 'Ficha técnica' },
    { label: 'Código de barras' },
  ]

  const [stocks, setStocks] = useState([])
  const [barcode, setBarcode] = useState([])
  const [product, setProduct] = useState([])
  const [base64Image, SetBase64Image] = useState('')
  const [specifications, setSpecifications] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    load()
  }, []);

  const load = () => {
    ProductService.getById(id).then(data => {
      setProduct(data)
      setSpecifications(data.specifications)
    })

    StockService.getAllByProductId(id).then(data => {
      setStocks(data)
      console.log(data)
    })

    FileService.getProductImage(id).then(data => {
      SetBase64Image(data)
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
    <div className='container mx-auto px-5 pb-5 2xl:px-72'>

      <div className='lg:flex justify-between gap-5 my-5'>
        <div className='lg:w-1/2'>
          <img src={base64Image} class="shadow-none border rounded w-full max-h-[473px]"></img>
        </div>
        <div className='lg:w-1/2'>
          <Card title={`${product.description}`} subTitle={`Código: ${product.code}`} className='!shadow-none border'>
            <table class="min-w-full border text-sm mb-5">
              <thead class="bg-[#efefef] border-b">
                <tr><th colSpan={2} class="text-start p-2">Lista de precios</th></tr>
              </thead>
              <tbody>
                <tr className='text-start'>
                  <th className='text-start p-2 border w-[250px]' scope='row'>Precio efectivo</th>
                  <td class="border-b p-2">
                    {formatCurrency(product.cashPrice)}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border' scope='row'>Precio débito</th>
                  <td class="border-b p-2">
                    {formatCurrency(product.debitPrice)}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border' scope='row'>Precio crédito</th>
                  <td class="border-b p-2">
                    {formatCurrency(product.creditPrice)}
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
                    {product.proveedor || 'Sin proveedor'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Rubro</th>
                  <td class="border-b p-2">
                    {product.rubro || 'Sin rubro'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Marca</th>
                  <td class="border-b p-2">
                    {product.marca || 'Sin marca'}
                  </td>
                </tr>
                <tr className='text-start'>
                  <th className='text-start p-2 border'>Última actualización de precio</th>
                  <td class="border-b p-2">
                    {product.lastPrice ? formatDateTime(product.lastPrice) : 'Sin registros'}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Card className="!shadow-none border">
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='mb-5' />
        {activeIndex == 0 &&
          <div>
            <DataTable value={stocks} stripedRows emptyMessage='No se encontraron unidades' size='small'>
              <Column field={(rowData) => (rowData.shop) + " - " + (rowData.direction)}
                header='Sucursal' className='rounded-tl-md' style={{ width: '40%' }}></Column>
              <Column field={(rowData) => (rowData.quantity) + " unidades"} header='Cantidad' style={{ width: '40%' }}></Column>
              <Column field={(rowData) => formatDateTime(rowData.lastUpdate)}
                header='Ult. Act' className='rounded-tr-md' style={{ width: '20%' }}></Column>
            </DataTable>
          </div>
        }
        {activeIndex == 1 &&
          <div>
            <table className="table w-full">
              <tbody>
                {[
                  ['Altura', specifications.height !== null ? specifications.height + ' cm' : null],
                  ['Profundidad', specifications.depth !== null ? + specifications.depth + ' cm' : null],
                  ['Ancho', specifications.width !== null ? specifications.width + ' cm' : null],
                  ['Cm lineal', specifications.length !== null ? specifications.length + ' cm' : null],
                  ['Capacidad', specifications.capacity !== null ? specifications.capacity + ' kg' : null],
                  ['Peso', specifications.weight !== null ? specifications.weight + ' kg' : null],
                  ['Litros', specifications.liters !== null ? specifications.liters + ' L' : null],
                  ['Ruedas', specifications.wheels],
                  ['Colores', specifications.colors],
                  ['Material', specifications.material],
                  ['Garantía', specifications.warranty],
                  ['Luces', specifications.lights],
                  ['Organizador', specifications.organizer],
                  ['P. Notebook', specifications.notebook],
                  ['Observaciones', specifications.observations],
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
          <div>

          </div>
        }
      </Card>
    </div>
  )
}