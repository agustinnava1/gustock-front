import React, { useEffect, useRef, useState } from 'react'

import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { Link, useParams } from 'react-router-dom'

import { addLocale } from 'primereact/api'
import { ChevronDown, Download, Plus } from 'lucide-react'
import { formatDate, formatCurrency } from '../helper/format'
import { calendarioEspañol } from '../helper/configuracion.regional'

import { usePagination } from '../hooks/use.paginacion'

import Swal from 'sweetalert2'

import ShopService from '../services/local.servicio'
import StockService from '../services/stock.servicio'
import ProductFilters from '../helper/producto.filtros'

export const LocalPagina = () => {
  const { name } = useParams()
  const [shop, setShop] = useState([])

  const initialPagination = {
    page: 0,
    brand: null,
    category: null,
    provider: null,
    lastUpdate: null,
    recordsQuantity: 10
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [listProducts, setListProducts] = useState([])
  const [totalElements, setTotalElements] = useState(null)

  const { paginationState, handleDate, onDropdownChange } = usePagination(initialPagination)
  const { provider, category, brand, lastUpdate, recordsQuantity } = paginationState

  const { listProviders, listCategories, listBrands, listQuantities } = ProductFilters()

  useEffect(() => {
    ShopService.getByName(name).then(data => {
      setShop(data)
    })

    StockService.getAllByShop(name, paginationState).then(data => {
      setListProducts(data.content)
      setTotalElements(data.totalElements)
      console.log(data.content)
    })
  }, []);

  const generateRequest = (paginationState, page) => {
    const request = {
      ...paginationState,
      page: page || 0,
      brand: brand?.descripcion,
      category: category?.descripcion,
      provider: provider?.razonSocial,
    }

    return request
  }

  const filter = () => {
    setFirst(0)
    setRows(recordsQuantity)

    const request = generateRequest(paginationState)

    StockService.getAllByShop(name, request).then(data => {
      setListProducts(data.content)
      console.log(data.content)
      setTotalElements(data.totalElements)
    })
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = generateRequest(paginationState, event.page)

    StockService.getAllByShop(name, request).then(data => {
      setListProducts(data.content)
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Solo se eliminará el producto y su stock de este local",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        StockService.delete(id)
          .then((data) => {
            setListProducts(listProducts.filter((stock) => stock.id !== id));
            Swal.fire('Eliminado', 'El producto ha sido eliminado del local.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  };

  addLocale('es', calendarioEspañol);

  return (
    <div className='lg:flex lg:justify-between gap-5 p-5'>
      <div className='lg:w-1/6'>
        <Card title="Local" className='text-center !shadow border'>
          <div className='p-5'>
            <h2 className="text-2xl font-bold">{shop.nombre}</h2>
            <p className="text-xl">{shop.direccion}</p>
          </div>
        </Card>
        {shop.tipo === 'LOCAL' &&
          <div>
            <Card title="Venta" className='text-center !shadow border mt-5'>
              <div className='p-5'>
                <Link to={`/local/${shop.nombre}/venta/registrar`}>
                  <Button label='Nueva venta' className='hover:!bg-blue-600 !mb-5 w-full' size='small' />
                </Link>
                <Link to={`/local/${shop.nombre}/devolucion/registrar`}>
                  <Button label='Devolución'  severity="secondary" className='w-full' size='small' />
                </Link>
              </div>
            </Card>
            <Card title="Turno" className='text-center !shadow border mt-5'>
              <div className='p-5'>
                <Button label='Abrir turno' className='hover:!bg-blue-600 !mb-5 w-full' size='small' />
                <Button label='Cerrar turno'  severity="secondary" className='w-full' size='small' />
              </div>
            </Card>
          </div>
        }
      </div>

      <div className='lg:w-5/6'>
        <Card title="Productos" className='!shadow border'>
          <div className='flex flex-wrap my-5'>
            <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
              <label className='block font-medium text-lg mb-2'>Proveedor</label>
              <Dropdown options={listProviders} optionLabel='razonSocial' filter
                name='provider' value={provider} onChange={onDropdownChange} emptyMessage='Sin registros'
                placeholder='Selecciona un proveedor' className='p-inputtext-sm w-full' />
            </div>
            <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
              <label className='block font-medium text-lg mb-2'>Rubro</label>
              <Dropdown options={listCategories} optionLabel='descripcion' filter
                name='category' value={category} onChange={onDropdownChange} emptyMessage='Sin registros'
                placeholder='Selecciona un rubro' className='p-inputtext-sm w-full' />
            </div>
            <div className='flex-auto w-32 md:w-36 me-3 mb-3 lg:mb-0'>
              <label className='block font-medium text-lg mb-2'>Marca</label>
              <Dropdown options={listBrands} optionLabel='descripcion' filter
                name='brand' value={brand} onChange={onDropdownChange} emptyMessage='Sin registros'
                placeholder='Selecciona una marca' className='p-inputtext-sm w-full' />
            </div>
            <div className='flex-auto w-32 md:w-36 mr-3 mb-3 lg:mb-0'>
              <label htmlFor="stock" className='block font-medium text-lg mb-2'>Stock</label>
              <Dropdown optionLabel="descripcion" className='p-inputtext-sm w-full' />
            </div>
            <div className='flex-auto w-32 md:w-36 mr-3 mb-3 lg:mb-0'>
              <label htmlFor="ultPrecio" className='block font-medium text-lg w-full mb-2'>Ult. Precio</label>
              <Calendar dateFormat="dd/mm/yy" locale="es" placeholder='Selecciona una fecha'
                name='lastUpdate' onChange={handleDate} className='p-inputtext-sm w-full' />
            </div>
            <div className='flex-auto w-32 md:w-36 mr-3 mb-3 lg:mb-0'>
              <label className='block font-medium text-lg mb-2'>Cantidad</label>
              <Dropdown options={listQuantities}
                name='recordsQuantity' value={recordsQuantity} onChange={onDropdownChange} emptyMessage="Sin registros"
                placeholder='Selecciona la cantidad' className='p-inputtext-sm w-full' />
            </div>
            <div className='mr-3'>
              <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
              <Button label='Aplicar' onClick={filter} className='hover:!bg-blue-600 me-3' size='small' />
            </div>
            <div>
              <label className='block font-medium text-lg mb-2 invisible'>Boton</label>
              <Button label='Exportar' className='hover:!bg-blue-600' size='small'>
                <Download size={20} className='ms-2' />
              </Button>
            </div>
          </div>

          <DataTable value={listProducts} stripedRows size='small' emptyMessage='No se encontraron resultados'>
            <Column field="product.code" header="Código" className='rounded-tl-md' style={{ width: '10%' }} />
            <Column field="product.description" header="Descripción" style={{ width: '25%' }} />
            <Column field={(rowData) => formatCurrency(rowData.product.priceEffective)} header="Efectivo" style={{ width: '10%' }} />
            <Column field={(rowData) => formatCurrency(rowData.product.priceDebit)} header="Débito" style={{ width: '10%' }} />
            <Column field={(rowData) => formatCurrency(rowData.product.priceCredit)} header="Crédito" style={{ width: '10%' }} />
            <Column field={(rowData) => formatDate(rowData.product.lastPrice)} header="Ult. Precio" style={{ width: '10%' }} />
            <Column field={(rowData) => formatDate(rowData.lastUpdate)} header="Ult. Stock" style={{ width: '10%' }} />
            <Column field="quantity" header="Unidades" alignHeader={'center'} style={{ width: '5%' }}
              body={(rowData) => (<p className='text-center'>{rowData.quantity}</p>)}>
            </Column>
            <Column header="Acciones" alignHeader={'center'} className='rounded-tr-md' style={{ width: '10%' }}
              body={(rowData) => (
                <div className='flex'>
                  <Link to={`/producto/detalle/${rowData.product.idProduct}`} target='_blank' className='me-3'>
                    <button className='bg-blue-500 rounded text-xl text-white px-2 py-1'>
                      <i className='bi bi-eye-fill'></i>
                    </button>
                  </Link>
                  <Link to={`/producto/modificar/${rowData.product.idProduct}`} target='_blank' className='me-3'>
                    <button className='bg-yellow-500 rounded text-xl text-white px-2 py-1'>
                      <i className='bi bi-pencil-fill'></i>
                    </button>
                  </Link>
                  <button className='bg-red-500 rounded text-xl text-white px-2 py-1'
                    onClick={() => handleDelete(rowData.id)}>
                    <i className='bi bi-trash-fill'></i>
                  </button>
                </div>
              )}>
            </Column>
          </DataTable>
          <Paginator first={first} rows={rows} pageLinkSize={3} totalRecords={totalElements}
            onPageChange={onPageChange} className='mt-5 !p-0'></Paginator>
        </Card>
      </div >
    </div >
  )
}

