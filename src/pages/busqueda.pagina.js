import { useEffect, useState } from 'react'
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
    setPaginacionRequest({ criterio: criterio })
  }, [criterio])

  useEffect(() => {
    ProductoService.getAllByCriteria(paginacionRequest).then((data) => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
    })
  }, [paginacionRequest])

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
    const request = { ...paginacionRequest, pagina: event.page }
    ProductoService.getAllByCriteria(request).then(data => {
      setListProducts(data.content)
    })
  }

  return (
    <div className='p-5'>
      <h2 className='text-2xl font-medium mb-5'>Resultados de busqueda: "{criterio}"</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
        {listProducts > 0
          ? listProducts.map((product) => (
            <Link to={`/producto/detalle/${product.id}`} target='_blank'>
              <div className='bg-white rounded-md border cursor-pointer hover:shadow-2xl'>
                <div className='border-b'>
                  <img src={product.base64Image || '/producto-sin-foto.jpg'}
                    className='2xl:h-[480px] object-cover'></img>
                </div>
                <div className='h-[240px] p-5'>
                  <span className='text-sm text-gray-400'>Código: {product.code}</span>
                  <h3 className='text-xl text-gray-600 font-medium mb-3'>{product.description}</h3>
                  <div className='flex justify-between'>
                    <p className='font-medium text-gray-500'>Efectivo</p>
                    <p className='mt-1'>{formatCurrency(product.cashPrice)}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-medium text-gray-500'>Débito</p>
                    <p className='mt-1'>{formatCurrency(product.debitPrice)}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-medium text-gray-500'>Crédito</p>
                    <p className='mt-1'>{formatCurrency(product.creditPrice)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
          : <div>No se encontraron resultados</div>
        }
      </div>
      <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalElements}
        onPageChange={onPageChange} className='!bg-transparent !p-0 mt-5'></Paginator>
    </div >
  )
}