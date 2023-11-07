import { useEffect, useState } from 'react'

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
import ProductService from '../../services/producto.servicio'

export const RegistrarVentaPagina = () => {
  const { name } = useParams()

  const [total, setTotal] = useState(0)
  const [subtotal, setSubtotal] = useState(0)

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

  const [listProducts, setListProducts] = useState([])

  useEffect(() => {
    const newSubtotal = listProducts.reduce((total, product) => total + product.subtotal, 0)
    setSubtotal(newSubtotal)
    setTotal(newSubtotal)
  }, [listProducts])

  const { requestState, onDropdownChange, onInputChange } = useRequest(initialRequest)
  const { shop, code, typePrice } = requestState

  const handleSearchProduct = (e) => {
    e.preventDefault()
    if (listProducts.some(product => product.code === code.trim())) {
      Swal.fire({
        title: 'Producto ya agregado',
        text: 'Este producto ya ha sido agregado a la venta.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
    } else {
      ProductService.getByCodeOrBarcode(requestState).then(data => {
        setListProducts(prevList => [...prevList, data])
      }).catch((error) => {
        Swal.fire({
          title: 'Producto no encontrado',
          text: 'No se encontró ningún producto que coincida con el artículo o código de barras ingresado.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      })
    }
  }

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: 'Eliminar producto',
      text: 'Está seguro que desea eliminar el producto de la venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setListProducts((prevList) => {
          return prevList.filter((data) => data.code !== product.code);
        })
        Swal.fire('Eliminado', 'Se elimino el producto de la venta.', 'success')
      }
    })
  }

  const calculateSubtotalProduct = (rowData) => (e) => {
    const newQuantity = e.value
    const newSubtotal = newQuantity * rowData.price

    setListProducts((prevList) => {
      return prevList.map((product) => {
        if (product.code === rowData.code) {
          return { ...product, quantity: newQuantity, subtotal: newSubtotal }
        } else {
          return product
        }
      })
    })
  }

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-4xl font-medium mb-5'>{name} | Nueva venta</h2>
      <div className="lg:flex gap-5">
        <div className='w-3/4'>
          <Card className="!shadow-lg border-l-4 border-blue-600 mb-5">
            <h3 className='text-2xl text-blue-600 font-medium mb-3'>Productos</h3>
            <form onSubmit={handleSearchProduct} className="mb-5">
              <div className="flex gap-3">
                <InputText name="code" placeholder='Artículo o código de barras'
                  className="p-inputtext-sm w-full" onChange={onInputChange} required />
                <div>
                  <Dropdown name="typePrice" value={typePrice} options={prices} onChange={onDropdownChange} emptyMessage="Sin registros"
                    className="p-inputtext-sm w-full" placeholder="Selecciona un tipo de precio" aria-required='true' />
                </div>
                <div>
                  <Button label="Agregar" type="submit" size="small" className="hover:!bg-blue-600"></Button>
                </div>
              </div>
            </form>
            <DataTable value={listProducts} tableStyle={{ minWidth: '50rem' }} stripedRows
              emptyMessage="No se agregaron productos a la venta" size="small">
              <Column field='code' header="Código" className="rounded-tl-md" style={{ width: '10%' }} />
              <Column field='description' header="Descripción" style={{ width: '55%' }} />

              <Column field='price' header="Precio unitario" style={{ width: '15%' }}
                body={(rowData) => (
                  <InputNumber minFractionDigits={0} maxFractionDigits={0}
                    value={rowData.price} onInput={calculateSubtotalProduct(rowData)}
                    mode="currency" currency="ARS" locale="es-AR" className="p-inputtext-sm" />
                )}>
              </Column>

              <Column field='quantity' header="Cantidad" style={{ width: '5%' }}
                body={(rowData) => (
                  <InputNumber value={rowData.quantity} onChange={calculateSubtotalProduct(rowData)} step={1} min={1}
                    showButtons buttonLayout="horizontal" inputClassName="p-inputtext-sm text-center w-12"
                    decrementButtonClassName="p-button-secondary" decrementButtonIcon="pi pi-minus"
                    incrementButtonClassName="p-button-info" incrementButtonIcon="pi pi-plus" />
                )}>
              </Column>

              <Column field={(rowData) => formatCurrency(rowData.subtotal)} header="Subtotal" style={{ width: '10%' }} />

              <Column className="rounded-tr-md" style={{ width: '5%' }}
                body={(rowData) => (
                  <button className='text-red-500 rounded p-2 hover:text-white hover:bg-red-500'
                    onClick={() => handleDeleteProduct(rowData)} >
                    <Trash2 size={20} />
                  </button>
                )}>
              </Column>
            </DataTable>
          </Card>

          <Card className="!shadow-lg border-l-4 border-blue-800">
            <h3 className='text-2xl text-blue-800 font-medium mb-3'>Resumen de cuenta</h3>
            <div className="flex rounded p-5 bg-gray-100">
              <div className="flex-1 me-5">
                <InputTextarea rows={7} placeholder='Nota interna (Opcional)' className="w-full"></InputTextarea>
              </div>
              <div className="flex-1">
                <div class="flex flex-col mb-1 text-lg px-5">
                  <div class="flex items-center mb-3">
                    <span class="flex-1 font-medium">Descuento por porcentaje</span>
                    <div class="flex items-center">
                      <InputNumber suffix="%" size={1} className="p-inputtext-sm" />
                    </div>
                  </div>
                  <div class="flex justify-between font-medium mb-1">
                    <span>Descuento</span>
                    <span id="descuento-span">$ 0</span>
                  </div>
                  <div class="flex justify-between font-medium mb-1">
                    <span>Subtotal</span>
                    <span id="subtotal">{formatCurrency(subtotal)}</span>
                  </div>
                  <Divider className="border border-gray-400" />
                  <div class="flex justify-between font-bold">
                    <span>TOTAL</span>
                    <span id="total">$ 0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-1/4 h-full">
          <Card className="!shadow-lg border-t-4 border-blue-800 mb-5">
            <h3 className='text-2xl text-blue-800 font-medium mb-3'>Detalle de pago</h3>
            <div className='bg-gray-100 rounded p-5'>
              <div class="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold">Contado</span>
                <InputNumber inputId='contado' mode="currency"
                  currency="ARS" locale="es-AR" className="p-inputtext-sm"
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
              <div class="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold">Débito</span>
                <InputNumber inputId='debito' mode="currency" currency="ARS"
                  locale="es-AR" className="p-inputtext-sm"
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
              <div class="flex items-center justify-between">
                <span className="text-lg font-semibold">Código QR</span>
                <InputNumber inputId='codigoQr' mode="currency"
                  currency="ARS" locale="es-AR" className="p-inputtext-sm"
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
              <Divider className='border border-gray-400' />
              <div class="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold">Recargo</span>
                <InputNumber inputId='recargo' suffix="%" className="p-inputtext-sm"
                  minFractionDigits={0} maxFractionDigits={0} size={1} />
              </div>
              <div class="flex items-center justify-between">
                <span className="text-lg font-semibold">Crédito</span>
                <InputNumber inputId='credito' mode="currency"
                  currency="ARS" locale="es-AR" className="p-inputtext-sm"
                  minFractionDigits={0} maxFractionDigits={0} size={10} />
              </div>
            </div>
          </Card>

          <div className="flex">
            <div className="flex-1 me-5">
              <Button label='Confirmar' size="small" className="w-full hover:!bg-blue-600"></Button>
            </div>
            <div className="flex-1">
              <Button label='Cancelar' severity="secondary" size="small" className="w-full"></Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
