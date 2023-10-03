import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Paginator } from 'primereact/paginator'

import { formatCurrency } from '../helper/format'

import ProductoServicio from '../services/producto.servicio'
import { Button } from 'primereact/button'

export const ProductoBusqueda = () => {
  const { criterio } = useParams()

  const [listaProductos, setListaProductos] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(5)

  const [totalRegistros, setTotalRegistros] = useState(null)
  const [paginacionRequest, setPaginacionRequest] = useState({
    criterio: criterio
  })

  useEffect(() => {
    ProductoServicio.buscar(paginacionRequest).then(data => {
      console.log(data)
      setListaProductos(data.content)
      setTotalRegistros(data.totalElements)
    })
  }, [])

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
    <div class="p-5">
      <h2 class="text-4xl font-medium mb-5">Resultados de busqueda: "{criterio}"</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-5">
        {listaProductos.map((producto) => (
          <div class="group relative bg-white shadow-md rounded-lg border hover:shadow-2xl">
            <div class="border-b">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                class="h-full w-full object-cover object-center rounded-t-lg"></img>
            </div>
            <div class="p-5">
              <span className='text-sm text-gray-400'>{producto.codigo}</span>
              <h3 className='text-xl text-gray-600 font-medium mb-3'>{producto.descripcion}</h3>
              <div className='flex justify-between'>
                <p className='font-medium text-gray-500'>Efectivo</p>
                <p class="mt-1">{formatCurrency(producto.precioEfectivo)}</p>
              </div>
              <div className='flex justify-between mb-3'>
                <p className='font-medium text-gray-500'>Crédito</p>
                <p class="mt-1">{formatCurrency(producto.precioCredito)}</p>
              </div>
              <div className='text-end'>
                <Button label='Ver producto' size='small' className='hover:!bg-blue-600'></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalRegistros}
        onPageChange={cambiarPagina} className='!bg-transparent !p-0 mt-5'></Paginator>
    </div>
  )
}