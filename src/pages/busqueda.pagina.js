import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { Link, useParams } from 'react-router-dom'

import { formatCurrency } from '../helper/format'

import ProductoService from '../services/producto.servicio'

export const ProductoBusqueda = () => {
  const { criterio } = useParams()

  const [rows, setRows] = useState(5)
  const [first, setFirst] = useState(0)
  const [listProducts, setListProducts] = useState([])
  const [totalElements, setTotalElements] = useState(null)
  const [paginacionRequest, setPaginacionRequest] = useState({
    criterio: criterio
  })

  useEffect(() => {
    ProductoService.getAllByCriteria(paginacionRequest).then(data => {
      console.log(data)
      setListProducts(data.content)
      setTotalElements(data.totalElements)
    })
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
    const request = { ...paginacionRequest, pagina: event.page }
    ProductoService.getAllByCriteria(request).then(data => {
      setListProducts(data.content)
    })
  };

  return (
    <div class="p-5">
      <h2 class="text-4xl font-medium mb-5">Resultados de busqueda: "{criterio}"</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-5">
        {listProducts.map((product) => (
          <Link to={`/producto/detalle/${product.id}`}>
            <div class="group bg-white shadow rounded border hover:shadow-2xl cursor-pointer">
              <div class="border-b">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  class="h-[550px] w-full object-cover object-center rounded-t-lg"></img>
              </div>
              <div class="h-[200px] p-5">
                <span className='text-sm text-gray-400'>{product.codigo}</span>
                <h3 className='text-xl text-gray-600 font-medium mb-3'>{product.descripcion}</h3>
                <div className='flex justify-between'>
                  <p className='font-medium text-gray-500'>Efectivo</p>
                  <p class="mt-1">{formatCurrency(product.precioEfectivo)}</p>
                </div>
                <div className='flex justify-between mb-3'>
                  <p className='font-medium text-gray-500'>Crédito</p>
                  <p class="mt-1">{formatCurrency(product.precioCredito)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalElements}
        onPageChange={onPageChange} className='!bg-transparent !p-0 mt-5'></Paginator>
    </div >
  )
}