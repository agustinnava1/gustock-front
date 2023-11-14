import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

import { formatCurrency, formatDate, formatTime } from '../../../helper/format'

import SaleService from '../../../services/venta.servicio'
import { Plus, RotateCcw } from 'lucide-react'

const SalesComponent = ({ shop }) => {

  useEffect(() => {
    SaleService.getAllCurrentByShop(shop).then(data => {
      setListSales(data)
    })
  }, []);

  const [listSales, setListSales] = useState([])

  return (
    <div className='lg:flex lg:justify-between gap-5'>
      <div className='lg:w-1/6'>
        <Card className='!shadow-none border border-l-4 border-l-blue-400 mb-5'>
          <p className='text-lg text-blue-400 font-medium mb-2'>Total efectivo</p>
          <span className='text-xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-500 mb-5'>
          <p className='text-lg text-blue-500 font-medium mb-2'>Total débito</p>
          <span className='text-xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-600 mb-5'>
          <p className='text-lg text-blue-600 font-medium mb-2'>Total código Qr</p>
          <span className='text-xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-700 mb-5'>
          <p className='text-lg text-blue-700 font-medium mb-2'>Total crédito</p>
          <span className='text-xl'>$ 0</span>
        </Card>
        <Card className='!shadow-none border border-l-4 border-l-blue-800'>
          <p className='text-lg text-blue-800 font-medium mb-2'>Total de ventas</p>
          <span className='text-xl'>$ 0</span>
        </Card>
      </div>

      <div className='lg:w-5/6'>
        <div className='flex gap-5 mb-5'>
          <Card className='!shadow-none border'>
            <span className='font-medium'>Ventas realizadas</span>
          </Card>

          <Link to={`/local/${shop}/venta/registrar`}>
            <Card className='!shadow-none border'>
              <div className='flex gap-3'>
                <Plus className='text-blue-500' />
                <span className='font-medium'>Nueva venta</span>
              </div>
            </Card>
          </Link>

          <Link to={`/local/${shop}/devolucion/registrar`}>
            <Card className='!shadow-none border'>
              <div className='flex gap-3'>
                <RotateCcw className='text-blue-500' />
                <span className='font-medium'>Devolución</span>
              </div>
            </Card>
          </Link>
        </div>

        <Card className='!shadow-none border'>
          <DataTable value={listSales} stripedRows emptyMessage='Sin registro de ventas' size='small'>
            <Column field='id' header='Código' className='font-medium rounded-tl-md' style={{ width: '5%' }}></Column>
            <Column field='user' header='Usuario' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatDate(rowData.date)} header='Fecha' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatTime(rowData.time)} header='Hora' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.cashPayment)} header='Efectivo' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.debitPayment)} header='Débito' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.qrCodePayment)} header='Qr' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.creditPayment)} header='Crédito' style={{ width: '10%' }}></Column>
            <Column field={(rowData) => formatCurrency(rowData.total)} header='Total' className='font-medium' style={{ width: '10%' }}></Column>
            <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
              body={(rowData) => (
                <div className='flex justify-center gap-2'>
                  <Link to={`/venta/detalle/${rowData.id}`} target='_blank'>
                    <button className='bg-sky-500 text-white rounded px-2 py-1'>
                      <i className='bi bi-eye-fill'></i>
                    </button>
                  </Link>
                  <button className='bg-red-500 text-white rounded px-2 py-1'
                  >
                    <i className='bi bi-trash-fill'></i>
                  </button>
                </div>
              )}>
            </Column>
          </DataTable>
        </Card>
      </div>
    </div>
  )
}

export default SalesComponent