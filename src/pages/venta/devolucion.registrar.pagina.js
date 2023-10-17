import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Divider } from "primereact/divider"
import { useParams } from "react-router-dom"
import { RadioButton } from "primereact/radiobutton"

export const RegistrarDevolucionPagina = () => {
  const { name } = useParams()

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-4xl font-medium mb-5'>{name} | Devolución o cambio de producto</h2>
      <div className="lg:flex">
        <div className='w-3/4 me-5'>
          <Card title='Agregar producto' className="!shadow-none !rounded border mb-5">
            <div className="flex justify-between">
              <div className="flex">
                <InputText placeholder='Artículo o código de barras' className="p-inputtext-sm w-96 !me-3" />
                <InputText className="p-inputtext-sm !me-3" />
              </div>
              <div className="flex flex-wrap my-auto me-3 gap-3">
                <div className="flex align-items-center">
                  <RadioButton inputId="opcion1" name="opcion" value="devolver" />
                  <label htmlFor="opcion1" className="ml-2">Devolver</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="opcion2" name="opcion" value="vender" />
                  <label htmlFor="opcion2" className="ml-2">Vender</label>
                </div>
              </div>
              <Button label="Agregar" type="submit" size="small" className="hover:!bg-blue-600"></Button>
            </div>
          </Card>
          <Card title='Producto/s a devolver' className="!shadow-none !rounded border mb-5">
            <DataTable editMode="cell" tableStyle={{ minWidth: '50rem' }}
              emptyMessage="No se agregaron productos" size="small">
              <Column header="Código" className="rounded-tl-md" style={{ width: '15%' }}></Column>
              <Column header="Descripción" style={{ width: '30%' }}></Column>
              <Column header="Precio unitario" style={{ width: '15%' }}></Column>
              <Column header="Cantidad" style={{ width: '10%' }}></Column>
              <Column header="Stock" style={{ width: '10%' }}></Column>
              <Column header="Subtotal" style={{ width: '15%' }}></Column>
              <Column header="Borrar" className="rounded-tr-md" style={{ width: '5%' }}></Column>
            </DataTable>
          </Card>
          <Card title='Producto/s a vender' className="!shadow-none !rounded border mb-5">
            <DataTable editMode="cell" tableStyle={{ minWidth: '50rem' }}
              emptyMessage="No se agregaron productos a la venta" size="small">
              <Column header="Código" className="rounded-tl-md" style={{ width: '15%' }}></Column>
              <Column header="Descripción" style={{ width: '30%' }}></Column>
              <Column header="Precio unitario" style={{ width: '15%' }}></Column>
              <Column header="Cantidad" style={{ width: '10%' }}></Column>
              <Column header="Stock" style={{ width: '10%' }}></Column>
              <Column header="Subtotal" style={{ width: '15%' }}></Column>
              <Column header="Borrar" className="rounded-tr-md" style={{ width: '5%' }}></Column>
            </DataTable>
          </Card>
          <Card title='Resumen de cuenta' className="!shadow-none !rounded border">
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
        <Card className="w-1/4 !shadow-lg !rounded border h-full">
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
