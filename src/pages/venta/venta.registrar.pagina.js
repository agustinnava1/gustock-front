import { useContext, useEffect, useState } from 'react'

import { Trash2 } from 'lucide-react'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { useParams } from 'react-router-dom'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { InputNumber } from 'primereact/inputnumber'
import { useRequest } from '../../hooks/use.request'
import { InputTextarea } from 'primereact/inputtextarea'

import Swal from 'sweetalert2'
import { formatCurrency } from '../../helper/format'

import SaleService from '../../services/venta.servicio'
import ProductService from '../../services/producto.servicio'
import UserContext from '../../user.context'

export const RegistrarVentaPagina = () => {
  const { name } = useParams()
  const [user, setUser] = useContext(UserContext)

  const [note, setNote] = useState('')
  const [total, setTotal] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [discount, setDiscount] = useState(0)

  const [cashPayment, setCashPayment] = useState(0)
  const [debitPayment, setDebitPayment] = useState(0)
  const [creditPayment, setCreditPayment] = useState(0)
  const [qrCodePayment, setQrCodePayment] = useState(0)

  const [discountPct, setDiscountPct] = useState(0)
  const [additionalPct, setAdditionalPct] = useState(0)

  const [listProducts, setListProducts] = useState([])

  const initialRequest = {
    shop: name,
    code: null,
    typePrice: null
  }

  const prices = [
    { label: 'CONTADO', value: 'CONTADO' },
    { label: 'DEBITO', value: 'DEBITO' },
    { label: 'CREDITO', value: 'CREDITO' }
  ]

  useEffect(() => {
    const newSubtotal = listProducts.reduce((total, product) => total + product.subtotal, 0)
    setSubtotal(newSubtotal)
  }, [listProducts])

  useEffect(() => {
    calculateDiscount()
  }, [subtotal, discountPct])

  useEffect(() => {
    calculatePayment()
  }, [cashPayment, debitPayment, qrCodePayment, additionalPct])

  const { requestState, onDropdownChange, onInputChange } = useRequest(initialRequest)
  const { code, typePrice } = requestState

  const handleSearchProduct = (e) => {
    e.preventDefault()
    if (listProducts.some(product => product.code === code.trim())) {
      Swal.fire('Producto ya agregado', 'Este producto ya ha sido agregado a la venta.', 'error',)
    } else {
      const request = { ...requestState, shop: name }
      ProductService.getByCodeOrBarcode(request).then(data => {
        setListProducts(prevList => [...prevList, data])
      }).catch((error) => {
        Swal.fire('Producto no encontrado', 'No se encontró ningún producto que coincida con el artículo o código de barras ingresado.', 'error',)
      })
    }
  }

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el producto de la venta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setListProducts(prevList => prevList.filter((item) => item.code !== product.code))
        Swal.fire('Eliminado', 'Se elimino el producto de la venta.', 'success')
      }
    })
  }

  const calculateDiscount = () => {
    const discountAmount = subtotal * (discountPct / 100);
    setDiscount(discountAmount)
    setTotal(subtotal - discountAmount)
  }

  const calculatePayment = () => {
    const rest = cashPayment + debitPayment + qrCodePayment
    const newValue = total - rest

    if (additionalPct > 0) {
      const additional = (newValue * additionalPct) / 100
      setCreditPayment(newValue + additional)
    } else {
      setCreditPayment(newValue)
    }
  }

  const onPriceChange = (rowData) => (e) => {
    const newPrice = e.value
    const newSubtotal = rowData.quantity * newPrice

    setListProducts(prevList => prevList.map(
      item => (item.code === rowData.code ? { ...item, price: newPrice, subtotal: newSubtotal } : item)));
  }

  const onQuantityChange = (rowData) => (e) => {
    const newQuantity = e.value
    const newSubtotal = newQuantity * rowData.price

    setListProducts(prevList => prevList.map(
      item => (item.code === rowData.code ? { ...item, quantity: newQuantity, subtotal: newSubtotal } : item)));
  }

  const handleCreateSale = () => {
    if (listProducts.length === 0) {
      Swal.fire('Error', 'No hay productos agregados a la venta.', 'error');
      return;
    }

    const totalPayment = cashPayment + debitPayment + creditPayment + qrCodePayment;

    if (totalPayment < total) {
      Swal.fire('Error', 'El pago no puede ser menor que el importe total.', 'error');
      return;
    }

    const sale = {
      user: user.sub,
      shop: name,
      note: note,
      total: total,
      subtotal: subtotal,
      discount: discount,
      details: listProducts,
      cashPayment: cashPayment,
      debitPayment: debitPayment,
      creditPayment: creditPayment,
      qrCodePayment: qrCodePayment,
    }

    SaleService.create(sale).then(data => {
      Swal.fire('Registrado', 'Se ha registrado la venta con éxito. <br> Número de venta: ' + data.id, 'success')
    }).catch((error) => {
      Swal.fire('Error', 'Hubo un problema al intentar registrar la venta. Por favor, inténtelo de nuevo más tarde.', 'error')
    })
  }

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-2xl font-medium mb-5'>{name} | Nueva venta</h2>
      <div className='lg:flex gap-5'>

        <div className='lg:w-3/4'>
          <Card className="!shadow-none border border-l-4 border-l-blue-600 mb-5">
            <h3 className='text-2xl text-blue-600 font-bold mb-3'>Productos</h3>
            <form onSubmit={handleSearchProduct} className="mb-3">
              <div className='flex gap-3'>
                <InputText name="code" placeholder='Artículo o código de barras'
                  className='p-inputtext-sm w-full' onChange={onInputChange} required />
                <div>
                  <Dropdown name='typePrice' value={typePrice} options={prices} onChange={onDropdownChange}
                    className='p-inputtext-sm w-full' placeholder='Seleccione tipo de precio' />
                </div>
                <div>
                  <Button label='Agregar' type='submit' size='small'></Button>
                </div>
              </div>
            </form>
            <DataTable value={listProducts} tableStyle={{ minWidth: '50rem' }} stripedRows
              emptyMessage='No se agregaron productos a la venta' size='small'>
              <Column field='code' header='Código' className='rounded-tl-md' style={{ width: '10%' }} />
              <Column field='description' header='Descripción' style={{ width: '55%' }} />
              <Column field='stock' header='Stock' style={{ width: '10%' }} />

              <Column field='price' header='Precio unitario' style={{ width: '15%' }}
                body={(rowData) => (
                  <InputNumber minFractionDigits={0} maxFractionDigits={0}
                    value={rowData.price} onChange={onPriceChange(rowData)}
                    mode='currency' currency='ARS' locale='es-AR' className='p-inputtext-sm' />
                )}>
              </Column>

              <Column field='quantity' header='Cantidad' style={{ width: '5%' }}
                body={(rowData) => (
                  <InputNumber value={rowData.quantity} onChange={onQuantityChange(rowData)} step={1} min={1}
                    showButtons buttonLayout='horizontal' inputClassName='p-inputtext-sm text-center w-12'
                    decrementButtonClassName='p-button-secondary' decrementButtonIcon='pi pi-minus'
                    incrementButtonClassName='p-button-info' incrementButtonIcon='pi pi-plus' />
                )}>
              </Column>

              <Column field={(rowData) => formatCurrency(rowData.subtotal)} header='Subtotal' style={{ width: '10%' }} />

              <Column className='rounded-tr-md' style={{ width: '5%' }}
                body={(rowData) => (
                  <button className='text-gray-500 px-2 py-1'
                    onClick={() => handleDeleteProduct(rowData)} >
                    <i className='bi bi-trash-fill'></i>
                  </button>
                )}>
              </Column>
            </DataTable>
          </Card>

          <Card className='!shadow-none border border-l-4 border-l-blue-800'>
            <h3 className='text-2xl text-blue-800 font-bold mb-3'>Resumen de cuenta</h3>
            <div className='flex gap-5'>
              <div className='flex-1'>
                <InputTextarea value={note} onChange={(e) => setNote(e.value)} rows={7}
                  placeholder='Nota interna (Opcional)' className='w-full' />
              </div>
              <div className='flex-1'>
                <div class='flex flex-col mb-1 text-lg'>
                  <div class='flex justify-between items-center mb-3'>
                    <span class='font-medium'>Descuento por porcentaje</span>
                    <InputNumber value={discountPct} onChange={(e) => setDiscountPct(e.value)} suffix='%' size={1} className='p-inputtext-sm' />
                  </div>
                  <div class='flex justify-between mb-1'>
                    <span>Descuento</span>
                    <span id='descuento-span'>{formatCurrency(discount)}</span>
                  </div>
                  <div class='flex justify-between mb-1'>
                    <span>Subtotal</span>
                    <span id='subtotal'>{formatCurrency(subtotal)}</span>
                  </div>
                  <Divider className='border border-gray-400' />
                  <div class='flex justify-between font-bold'>
                    <span>TOTAL</span>
                    <span id='total'>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className='lg:w-1/4 h-full'>
          <Card className='!shadow-none border'>
            <h3 className='text-2xl text-blue-600 font-bold mb-3'>Detalle de pago</h3>
            <div className='mb-5'>
              <div class='flex items-center justify-between mb-3'>
                <span className='text-lg font-semibold'>Contado</span>
                <InputNumber value={cashPayment} onChange={(e) => setCashPayment(e.value)}
                  mode='currency' currency='ARS' locale='es-AR' className='p-inputtext-sm'
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
              <div class='flex items-center justify-between mb-3'>
                <span className='text-lg font-semibold'>Débito</span>
                <InputNumber value={debitPayment} onChange={(e) => setDebitPayment(e.value)}
                  mode='currency' currency='ARS' locale='es-AR' className='p-inputtext-sm'
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
              <div class='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Código QR</span>
                <InputNumber value={qrCodePayment} onChange={(e) => setQrCodePayment(e.value)}
                  mode='currency' currency='ARS' locale='es-AR' className='p-inputtext-sm'
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
              <Divider className='border border-gray-400' />
              <div class='flex items-center justify-between mb-3'>
                <span className='text-lg font-semibold'>Recargo</span>
                <InputNumber value={additionalPct} onChange={(e) => setAdditionalPct(e.value)}
                  suffix='%' className='p-inputtext-sm'
                  minFractionDigits={0} maxFractionDigits={0} size={1} />
              </div>
              <div class='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Crédito</span>
                <InputNumber value={creditPayment} onChange={(e) => setCreditPayment(e.value)}
                  mode='currency' currency='ARS' locale='es-AR' className='p-inputtext-sm'
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
            </div>
            <div className='flex gap-5'>
              <Button onClick={handleCreateSale} label='Confirmar' size='small'
                className='w-full' />
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
