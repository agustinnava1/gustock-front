import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Divider } from "primereact/divider"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { Dropdown } from "primereact/dropdown"
import { useRequest } from "../../hooks/use.request"

import productoService from "../../services/producto.servicio"
import Swal from "sweetalert2"

export const RegistrarVentaPagina = () => {
  const { nombre } = useParams()

  const initialRequest = {
    local: nombre,
    codigo: null,
    tipoPrecio: null
  }

  const prices = [
    { label: 'CONTADO', value: 'CONTADO' },
    { label: 'DEBITO', value: 'DEBITO' },
    { label: 'CREDITO', value: 'CREDITO' }
  ];

  const [listProducts, setListProducts] = useState([])

  const { requestState, onDropdownChange, onInputChange } = useRequest(initialRequest)
  const { local, tipoPrecio, codigo } = requestState

  const handleSearchProduct = (e) => {
    e.preventDefault()
    productoService.getByCodeOrBarcode(requestState).then(data => {
      setListProducts(prevList => [...prevList, data])
    }).catch((error) => {
      console.log(error)
      Swal.fire('Error', 'No se encontro ningun producto con ese codigo o barcode.', 'error')
    })
  }

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-4xl font-medium mb-5'>{nombre} | Nueva venta</h2>
      <div className="lg:flex">
        <div className='w-3/4 me-5'>
          <Card title='Agregar producto' className="!shadow border mb-5">
            <form onSubmit={handleSearchProduct}>
              <div className="flex w-full">
                <InputText name="codigo" placeholder='Artículo o código de barras'
                  className="flex-auto p-inputtext-sm w-96 !me-3" onChange={onInputChange} required />
                <Dropdown  name="tipoPrecio" value={tipoPrecio} options={prices} onChange={onDropdownChange} emptyMessage="Sin registros"
                  className="flex-auto p-inputtext-sm !me-3" placeholder="Selecciona un tipo de precio" aria-required='true' />
                <Button label="Agregar" type="submit" size="small" className="hover:!bg-blue-600"></Button>
              </div>
            </form>
          </Card>
          <Card title='Productos' className="!shadow border mb-5">
            <DataTable value={listProducts} editMode="cell" tableStyle={{ minWidth: '50rem' }}
              emptyMessage="No se agregaron productos a la venta" size="small">
              <Column field='code' header="Código" style={{ width: '15%' }}></Column>
              <Column field='description' header="Descripción" style={{ width: '30%' }}></Column>
              <Column field='price' header="Precio unitario" style={{ width: '15%' }}></Column>
              <Column field='' header="Cantidad" style={{ width: '10%' }}></Column>
              <Column field='stock' header="Stock" style={{ width: '10%' }}></Column>
              <Column field='' header="Subtotal" style={{ width: '15%' }}></Column>
              <Column header="Borrar" style={{ width: '5%' }}></Column>
            </DataTable>
          </Card>
          <Card title='Resumen de cuenta' className="!shadow border">
            <div className="flex rounded p-5 bg-gray-100">
              <div className="flex-1 me-5">
                <InputTextarea rows={7} placeholder='Nota interna (Opcional)' className="w-full"></InputTextarea>
              </div>
              <div className="flex-1">
                <div class="flex flex-col mb-1 text-lg px-5">
                  <div class="flex items-center mb-5">
                    <label class="flex-1 font-medium">Descuento por porcentaje</label>
                    <div class="flex items-center">
                      <InputNumber inputId='porcentaje' suffix="%" size={1} className="p-inputtext-sm" />
                    </div>
                  </div>
                  <div class="flex justify-between mb-1">
                    <span className="font-medium">Descuento</span>
                    <span id="descuento-span">$ 0.00</span>
                    <input id="descuento-input" name="descuento" type="text" hidden></input>
                  </div>
                  <div class="flex justify-between mb-1">
                    <span className="font-medium">Subtotal</span>
                    <span id="subtotal">$ 0.00</span>
                  </div>
                  <Divider className="!my-3" />
                  <div class="flex justify-between font-bold">
                    <span>TOTAL</span>
                    <span id="total">$ 0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Card className="w-1/4 !shadow border h-full">
          <div className="bg-blue-500 mb-5 p-4 rounded-t">
            <h3 className="text-white font-medium text-xl mb-0">Información de pago</h3>
          </div>
          <div class="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">Contado</span>
            <InputNumber inputId="currency-ars" mode="currency" currency="ARS" locale="es-AR" size={10} className="p-inputtext-sm"
              minFractionDigits={0}
              maxFractionDigits={0} />
          </div>
          <div class="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">Débito</span>
            <InputNumber inputId="currency-ars" mode="currency" currency="ARS" locale="es-AR" size={10} className="p-inputtext-sm"
              minFractionDigits={0}
              maxFractionDigits={0} />
          </div>
          <div class="flex items-center justify-between">
            <span className="text-lg font-semibold">Código QR</span>
            <InputNumber inputId="currency-ars" mode="currency" currency="ARS" locale="es-AR" size={10} className="p-inputtext-sm"
              minFractionDigits={0}
              maxFractionDigits={0} />
          </div>
          <Divider />
          <div class="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">Recargo</span>
            <InputNumber inputId="currency-ars" suffix="%" size={1} className="p-inputtext-sm"
              minFractionDigits={0}
              maxFractionDigits={0} />
          </div>
          <div class="flex items-center justify-between">
            <span className="text-lg font-semibold">Crédito</span>
            <InputNumber inputId="currency-ars" mode="currency" currency="ARS" locale="es-AR" size={10} className="p-inputtext-sm"
              minFractionDigits={0}
              maxFractionDigits={0} />
          </div>
          <Divider />
          <div className="flex">
            <div className="flex-1 me-5">
              <Button label='Confirmar' size="small" className="w-full hover:!bg-blue-600"></Button>
            </div>
            <div className="flex-1">
              <Button label='Cancelar' severity="danger" size="small" className="w-full"></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
