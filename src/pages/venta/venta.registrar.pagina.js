import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Divider } from "primereact/divider"
import { useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { Dropdown } from "primereact/dropdown"
import { useRequest } from "../../hooks/use.request"

import ProductService from "../../services/producto.servicio"
import Swal from "sweetalert2"
import { formatCurrency } from "../../helper/format"

export const RegistrarVentaPagina = () => {
  const { name } = useParams()

  const [total, setTotal] = useState(0)
  const [value2, setValue2] = useState(1)

  const initialRequest = {
    shop: name,
    code: null,
    typePrice: null
  }

  const prices = [
    { label: 'CONTADO', value: 'CONTADO' },
    { label: 'DEBITO', value: 'DEBITO' },
    { label: 'CREDITO', value: 'CREDITO' }
  ];

  const [listProducts, setListProducts] = useState([])

  const { requestState, onDropdownChange, onInputChange } = useRequest(initialRequest)
  const { shop, code, typePrice } = requestState

  const handleSearchProduct = (e) => {
    e.preventDefault()
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
        // User confirmed the deletion
        setListProducts((prevList) => {
          return prevList.filter((data) => data.code !== product.code);
        });
        Swal.fire('Eliminado', 'Se elimino el producto de la venta.', 'success');
      }
    });
  }

  const calculateSubtotalProduct = (rowData, updatedValue, field) => {

  }

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-4xl font-medium mb-5'>{name} | Nueva venta</h2>
      <div className="lg:flex gap-5">
        <div className='w-3/4'>
          <Card title='Productos' className="!shadow border mb-5">
            <form onSubmit={handleSearchProduct} className="mb-5">
              <div className="flex w-full">
                <InputText name="code" placeholder='Artículo o código de barras'
                  className="flex-auto p-inputtext-sm w-96 !me-3" onChange={onInputChange} required />
                <Dropdown name="typePrice" value={typePrice} options={prices} onChange={onDropdownChange} emptyMessage="Sin registros"
                  className="flex-auto p-inputtext-sm !me-3" placeholder="Selecciona un tipo de precio" aria-required='true' />
                <Button label="Agregar" type="submit" size="small" className="hover:!bg-blue-600"></Button>
              </div>
            </form>
            <DataTable value={listProducts} tableStyle={{ minWidth: '50rem' }}
              emptyMessage="No se agregaron productos a la venta" size="small">
              <Column field='code' header="Código" className="rounded-tl-md" style={{ width: '10%' }} />
              <Column field='description' header="Descripción" style={{ width: '40' }} />

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

              <Column field={(rowData) => formatCurrency(rowData.subtotal)} header="Subtotal" style={{ width: '15%' }} />
              <Column className="rounded-tr-md" style={{ width: '5%' }}
                body={(rowData) => (
                  <Button icon="pi pi-trash" text severity="danger"
                    onClick={() => handleDeleteProduct(rowData)} />
                )}>
              </Column>
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
        <div className="w-1/4 h-full">
          <Card className="!shadow border mb-5">
            <div className="bg-blue-500 mb-5 p-4 rounded-t">
              <h3 className="text-white font-medium text-xl mb-0">Información de pago</h3>
            </div>
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
            <Divider />
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
          </Card>
          <Card className="!shadow border">
            <div className="flex">
              <div className="flex-1 me-5">
                <Button label='Confirmar' size="small" className="w-full hover:!bg-blue-600"></Button>
              </div>
              <div className="flex-1">
                <Button label='Cancelar' severity="secondary" size="small" className="w-full"></Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
