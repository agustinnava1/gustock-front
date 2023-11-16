import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Column } from 'primereact/column'
import { Plus, RotateCcw } from 'lucide-react'
import { DataTable } from 'primereact/datatable'

import { useCalculateTotal } from '../../../hooks/venta.calcular'
import { formatCurrency, formatTime } from '../../../helper/format'

import Swal from 'sweetalert2'

import SaleService from '../../../services/venta.servicio'

const SalesComponent = ({ shop }) => {

  useEffect(() => {
    loadSales()
  }, []);

  const loadSales = () => {
    SaleService.getAllCurrentByShop(shop).then(data => {
      setListSales(data)
    })
  }

  const [listSales, setListSales] = useState([])
  const { totalCash, totalDebit, totalCredit, totalCodeQr, totalFinal } = useCalculateTotal(listSales)

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará el registro de venta del sistema y los productos seran reintregrados al stock del local",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        SaleService.delete(id)
          .then((data) => {
            loadSales()
            Swal.fire('Eliminado', 'La venta ha sido eliminada del sistema.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al intentar eliminar la venta. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  }

  return (
    <div className='lg:flex lg:justify-between gap-5'>
      <div className='lg:w-1/6'>
        <Card className='!shadow-none border mb-5'>
          <p className='text-lg font-medium mb-2'>Ventas realizadas</p>
          <span className='text-xl'>{listSales.length}</span>
        </Card>

        <Link to={`/local/${shop}/venta/registrar`}>
          <Card className='!shadow-none border mb-5'>
            <div className='flex gap-3'>
              <Plus className='text-blue-500' />
              <span className='font-medium'>Registrar venta</span>
            </div>
          </Card>
        </Link>

        <Link to={`/local/${shop}/devolucion/registrar`}>
          <Card className='!shadow-none border mb-5'>
            <div className='flex gap-3'>
              <RotateCcw className='text-blue-500' />
              <span className='font-medium'>Registrar devolución</span>
            </div>
          </Card>
        </Link>
      </div>

      <div className='lg:w-5/6'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5'>
          <Card className='!shadow-none border'>
            <p className='text-lg text-blue-400 font-medium mb-2'>Total efectivo</p>
            <span className='text-xl'>{totalCash()}</span>
          </Card>
          <Card className='!shadow-none border'>
            <p className='text-lg text-blue-500 font-medium mb-2'>Total débito</p>
            <span className='text-xl'>{totalDebit()}</span>
          </Card>
          <Card className='!shadow-none border'>
            <p className='text-lg text-blue-600 font-medium mb-2'>Total código Qr</p>
            <span className='text-xl'>{totalCodeQr()}</span>
          </Card>
          <Card className='!shadow-none border'>
            <p className='text-lg text-blue-700 font-medium mb-2'>Total crédito</p>
            <span className='text-xl'>{totalCredit()}</span>
          </Card>
          <Card className='!shadow-none border'>
            <p className='text-lg text-blue-800 font-medium mb-2'>Total de ventas</p>
            <span className='text-xl'>{totalFinal()}</span>
          </Card>
        </div>

        <Card className='!shadow-none border'>
          <DataTable value={listSales} stripedRows emptyMessage='Sin registro de ventas' size='small'>
            <Column field='id' header='Código' className='font-medium rounded-tl-md' style={{ width: '10%' }}></Column>
            <Column field='user' header='Usuario' style={{ width: '10%' }}></Column>
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
                    <button className='text-gray-500 px-2 py-1'>
                      <i className='bi bi-eye-fill'></i>
                    </button>
                  </Link>
                  <button className='text-gray-500 px-2 py-1'
                    onClick={() => handleDelete(rowData.id)}>
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