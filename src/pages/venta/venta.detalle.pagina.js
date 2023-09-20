import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { formatCurrency } from "../../helper/format"
import VentaServicio from "../../services/venta.servicio"

export const VentaDetalle = () => {
  const { id } = useParams()

  const [venta, setVenta] = useState([])
  const [local, setLocal] = useState(null)
  const [detalle, setDetalle] = useState([])

  useEffect(() => {
    cargarDatosVenta()
  }, []);

  const cargarDatosVenta = () => {
    VentaServicio.obtenerPorId(id).then(data => {
      setVenta(data)
      setDetalle(data.detalle)
      setLocal(data.local.nombre)
      console.log(data);
    })
  }

  return (
    <div className="container mx-auto pt-5">
      <h2 className='text-4xl font-medium mb-5'>Resumen de venta</h2>
      <div className="flex">
        <div className="w-3/4">
          <Card title='Productos vendidos' className='!rounded-lg !shadow-md'>
            {detalle.map(producto => (
              <div className="flex items-center text-lg border rounded mt-5 p-5">
                <div className="flex-auto">
                  <p className="font-medium">{producto.descripcion}</p>
                  <span className="!text-sm">Código: {producto.producto}</span>
                </div>
                <span className="flex-auto text-gray-500 font-medium">Precio unitario: {formatCurrency(producto.precio)}</span>
                <span className="flex-auto text-gray-500 font-medium">Cantidad: {producto.cantidad}</span>
                <span className="flex-auto text-gray-500 font-medium">Subtotal: {formatCurrency(producto.subtotal)}</span>
              </div>
            ))}
          </Card>
        </div>

        <div className="w-1/4 ms-5">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="bg-blue-500 p-4 rounded-t-lg">
              <h3 className="text-white font-medium text-xl mb-0">Detalle de pago</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Descuento</span>
                <span className='text-lg'>{formatCurrency(venta.descuento)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Efectivo</span>
                <span className='text-lg'>{formatCurrency(venta.pagoEfectivo)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Débito</span>
                <span className='text-lg'>{formatCurrency(venta.pagoDebito)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Crédito</span>
                <span className='text-lg'>{formatCurrency(venta.pagoCredito)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Código Qr</span>
                <span className='text-lg'>{formatCurrency(venta.pagoCodigoQr)}</span>
              </div>
            </div>
            <hr className="mb-4"></hr>
            <div className="text-end pe-4">
              <span className="text-xl font-medium text-blue-500 mb-0">Total pagado: {formatCurrency(venta.total)}</span>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mt-5">
            <div className="bg-blue-500 p-4 rounded-t-lg">
              <h3 className="text-white font-medium text-xl mb-0">Información adicional</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Local</span>
                <span className='text-md'>{local}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Usuario</span>
                <span className='text-md'>{venta.usuario}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-md font-medium">Nro de venta</span>
                <span className='text-md'>{venta.id}</span>
              </div>
              <div>
                <span className="text-gray-500 text-md font-medium">Nota del vendedor:</span>
                <div className="border rounded mt-3 p-5">
                  <p className='text-md'>{venta.nota ? venta.nota : 'Sin comentarios'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VentaDetalle;