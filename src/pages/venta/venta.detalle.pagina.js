import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { formatCurrency, formatFullDate, formatTime, formatoFechaCompleto, formatoHora } from "../../helper/format"
import VentaService from "../../services/venta.servicio"
import { Button } from "primereact/button"

export const VentaDetalle = () => {
  const { id } = useParams()

  const [sale, setSale] = useState([])
  const [details, setDetails] = useState([])

  useEffect(() => {
    loadSale()
  }, []);

  const loadSale = () => {
    VentaService.getById(id).then(data => {
      setSale(data)
      setDetails(data.details)
    })
  }

  return (
    <div className="container mx-auto pt-5">
      <div className="mb-5">
        <h2 className='text-4xl font-medium mb-3'>Resumen de venta #{sale.id}</h2>
        <span className="text-lg">{formatFullDate(sale.date)}</span>
      </div>
      <div className="lg:flex">
        <div className="w-1/4 me-5">
          <Card className="!shadow-none border">
            <div className="bg-blue-500 p-4 rounded-t">
              <h3 className="text-white font-medium text-xl mb-0">Detalle de pago</h3>
            </div>
            <div className="px-4 pt-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Descuento</span>
                <p className='text-lg'>{formatCurrency(sale.discount)}</p>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Efectivo</span>
                <p className='text-lg'>{formatCurrency(sale.cashPayment)}</p>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Débito</span>
                <p className='text-lg'>{formatCurrency(sale.debitPayment)}</p>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Crédito</span>
                <p className='text-lg'>{formatCurrency(sale.creditPayment)}</p>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Código Qr</span>
                <p className='text-lg'>{formatCurrency(sale.qrCodePayment)}</p>
              </div>
            </div>
            <hr className="my-4"></hr>
            <div className="text-end pe-4">
              <span className="text-xl font-medium text-blue-500 mb-0">Total pagado: {formatCurrency(sale.total)}</span>
            </div>
          </Card>

          <Card className="!shadow-none border mt-5">
            <div className="bg-blue-500 p-4 rounded-t">
              <h3 className="text-white font-medium text-xl mb-0">Información adicional</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Local</span>
                <p className='text-md'>{sale.shop}</p>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Usuario</span>
                <p className='text-md'>{sale.user}</p>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Horario</span>
                <p className='text-md'>{formatTime(sale.time)}</p>
              </div>
              <div>
                <span className="text-gray-500 text-md font-medium">Nota del vendedor:</span>
                <div className="border rounded mt-3 p-5">
                  <p className='text-md'>{sale.note ? sale.note : 'Sin comentarios'}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-3/4">
          <Card title='Productos vendidos' className='!shadow-none border'>
            {details.map(product => (
              <div className="flex items-center text-lg border border-blue-200 bg-blue-50 rounded mt-5 p-5">
                <div className="flex-auto w-52">
                  <p className="font-medium">{product.description}</p>
                  <span className="!text-sm">Código: {product.code}</span>
                </div>
                <span className="flex-auto text-center text-gray-500 font-medium">Precio unitario: {formatCurrency(product.price)}</span>
                <span className="flex-auto text-center text-gray-500 font-medium">Cantidad: {product.quantity}</span>
                <span className="flex-auto text-center text-gray-500 font-medium">Subtotal: {formatCurrency(product.subtotal)}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default VentaDetalle;