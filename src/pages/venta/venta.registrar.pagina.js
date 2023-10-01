import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Divider } from "primereact/divider"
import { useParams } from "react-router-dom"

export const RegistrarVenta = () => {
  const { nombre } = useParams()

  return (
    <div className='container mx-auto p-5'>
      <h2 className='text-4xl font-medium mb-5'>{nombre} | Registrar venta</h2>
      <div className="lg:flex">
        <div className='w-3/4 me-5'>
          <Card title='Productos' className="!shadow-none !rounded border">
            <div className="flex">
              <div className="me-5">
                <label htmlFor="firstname" className="block font-semibold mb-3">Producto</label>
                <InputText id="firstname" placeholder='Artículo o código de barras' className="p-inputtext-sm" size={25} />
              </div>
              <div className="me-5">
                <label htmlFor="firstname" className="block font-semibold mb-3">Tipo de precio</label>
                <InputText id="firstname" className="p-inputtext-sm" />
              </div>
              <div>
                <label htmlFor="firstname" className="block mb-3 invisible">Firstname</label>
                <Button label="Buscar" type="submit" size="small" className="hover:!bg-blue-600"></Button>
              </div>
            </div>
            <div className="mt-5">
              <DataTable editMode="cell" tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin productos" size="small">
                <Column header="Código" style={{ width: '15%' }}></Column>
                <Column header="Descripción" style={{ width: '30%' }}></Column>
                <Column header="Precio unitario" style={{ width: '15%' }}></Column>
                <Column header="Cantidad" style={{ width: '10%' }}></Column>
                <Column header="Stock" style={{ width: '10%' }}></Column>
                <Column header="Subtotal" style={{ width: '15%' }}></Column>
                <Column header="Borrar" style={{ width: '5%' }}></Column>
              </DataTable>
            </div>
          </Card>
          <Card title='Resumen de cuenta' className="!shadow-none !rounded border mt-5">
            <div className="flex rounded border p-5 bg-[#EFF7FF]">
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
                  <Divider />
                  <div class="flex justify-between font-bold">
                    <span>TOTAL</span>
                    <span id="total">$ 0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='w-1/4'>
          <Card className="!shadow-lg !rounded border">
            <div className="bg-blue-500 mb-5 p-4 rounded-t-lg">
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
    </div>
  )
}
