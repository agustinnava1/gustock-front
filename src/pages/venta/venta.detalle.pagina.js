import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { formatCurrency, formatoFechaCompleto, formatoHora } from "../../helper/format"
import VentaServicio from "../../services/venta.servicio"
import { Button } from "primereact/button"

export const VentaDetalle = () => {
  const { id } = useParams()

  const [error, setError] = useState(false)

  const [venta, setVenta] = useState([])
  const [local, setLocal] = useState(null)
  const [detalle, setDetalle] = useState([])
  const [detalleCambio, setDetalleCambio] = useState([])

  useEffect(() => {
    cargarDatosVenta()
  }, []);

  const cargarDatosVenta = () => {
    VentaServicio.obtenerPorId(id).then(data => {
      setVenta(data)
      setDetalle(data.detalle)
      setLocal(data.local.nombre)
      setDetalleCambio(data.detalleDevuelto)
    }).catch(error => {
      setError(true)
    })
  }

  return (
    <div className="container mx-auto pt-5">
      {error ? (
        <Card className="!rounded-lg !shadow-none border">
          <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div class="xl:pt-20 w-full xl:w-1/2 pb-12 lg:pb-0">
              <div className="mb-5">
                <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
              </div>
              <div>
                <h1 class="mb-2 text-gray-800 font-bold text-2xl">
                  Oops! El recurso al que intenta acceder no se encontro o ya no se encuentra disponible
                </h1>
                <p class="mb-5 text-gray-800">Por favor, regresa a la pantalla de inicio para continuar.</p>
                <Button label="Volver a inicio" className="hover:!bg-blue-600" size="small"></Button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
          </div>
        </Card>
      ) : (
        <div>
          <div className="mb-5">
            <h2 className='text-4xl font-medium mb-3'>Resumen de venta #{venta.id}</h2>
            <span className="text-lg">{formatoFechaCompleto(venta.fecha)}</span>
          </div>
          <div className="lg:flex">
            <div className="w-1/4 me-5">
              <div className="bg-white shadow-md rounded-lg border p-4">
                <div className="bg-blue-500 p-4 rounded-t-lg">
                  <h3 className="text-white font-medium text-xl mb-0">Detalle de pago</h3>
                </div>
                <div className="px-4 pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Descuento</span>
                    <p className='text-lg'>{formatCurrency(venta.descuento)}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Efectivo</span>
                    <p className='text-lg'>{formatCurrency(venta.pagoEfectivo)}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Débito</span>
                    <p className='text-lg'>{formatCurrency(venta.pagoDebito)}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Crédito</span>
                    <p className='text-lg'>{formatCurrency(venta.pagoCredito)}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Código Qr</span>
                    <p className='text-lg'>{formatCurrency(venta.pagoCodigoQr)}</p>
                  </div>
                </div>
                <hr className="mb-4"></hr>
                <div className="text-end pe-4">
                  <span className="text-xl font-medium text-blue-500 mb-0">Total pagado: {formatCurrency(venta.total)}</span>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg border p-4 mt-5">
                <div className="bg-blue-500 p-4 rounded-t-lg">
                  <h3 className="text-white font-medium text-xl mb-0">Información adicional</h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Local</span>
                    <p className='text-md'>{local}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Usuario</span>
                    <p className='text-md'>{venta.usuario}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500 text-md font-medium">Horario</span>
                    <p className='text-md'>{formatoHora(venta.hora)}</p>
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

            <div className="w-3/4">
              {detalleCambio.length > 0 &&
                <Card title='Productos devueltos' className='!rounded-lg !shadow-none border mb-5'>
                  {detalleCambio.map(producto => (
                    <div className="flex items-center text-lg border border-blue-200 bg-blue-50 rounded-lg mt-5 p-5">
                      <div className="flex-auto w-52">
                        <p className="font-medium">{producto.descripcion}</p>
                        <span className="!text-sm">Código: {producto.producto}</span>
                      </div>
                      <span className="flex-auto text-center text-gray-500 font-medium">Precio unitario: {formatCurrency(producto.precio)}</span>
                      <span className="flex-auto text-center text-gray-500 font-medium">Cantidad: {producto.cantidad}</span>
                      <span className="flex-auto text-center text-gray-500 font-medium">Subtotal: {formatCurrency(producto.subtotal)}</span>
                    </div>
                  ))}
                </Card>
              }

              <Card title='Productos vendidos' className='!rounded-lg !shadow-none border'>
                {detalle.map(producto => (
                  <div className="flex items-center text-lg border border-blue-200 bg-blue-50 rounded-lg mt-5 p-5">
                    <div className="flex-auto w-52">
                      <p className="font-medium">{producto.descripcion}</p>
                      <span className="!text-sm">Código: {producto.producto}</span>
                    </div>
                    <span className="flex-auto text-center text-gray-500 font-medium">Precio unitario: {formatCurrency(producto.precio)}</span>
                    <span className="flex-auto text-center text-gray-500 font-medium">Cantidad: {producto.cantidad}</span>
                    <span className="flex-auto text-center text-gray-500 font-medium">Subtotal: {formatCurrency(producto.subtotal)}</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>)}
    </div>
  )
}

export default VentaDetalle;