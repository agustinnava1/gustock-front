import { Card } from "primereact/card"
import { Column } from "primereact/column"
import { addLocale } from 'primereact/api'
import { Dropdown } from "primereact/dropdown"
import { Calendar } from "primereact/calendar"
import { DataTable } from "primereact/datatable"

export const VentasPage = () => {

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });

  return (
    <div className="m-5">
      <h2 className="sm:text-4xl text-5xl font-medium mb-3">Mis ventas</h2>
      <span class="text-xl font-normal">Gestioná y explorá el registro histórico de ventas en todas las sucursales</span>
      <Card className="my-5">
        <div className="flex">
          <div className='flex-1 me-3'>
            <label htmlFor="fechaDesde" className='block font-medium text-lg mb-3'>Fecha desde:</label>
            <Calendar showIcon dateFormat="dd/mm/yy" locale="es" />
          </div>
          <div className='flex-1 me-3'>
            <label htmlFor="fechaDesde" className='block font-medium text-lg mb-3'>Fecha desde:</label>
            <Calendar showIcon dateFormat="dd/mm/yy" locale="es" />
          </div>
          <div className='flex-1 me-3'>
            <label htmlFor="local" className='block font-medium text-lg mb-3'>Local:</label>
            <Dropdown optionLabel="local" className='w-full me-5' />
          </div>
          <div className='flex-1 me-3'>
            <label htmlFor="tipoPago" className='block font-medium text-lg mb-3'>Tipo de pago:</label>
            <Dropdown optionLabel="tipoPago" className='w-full me-5' />
          </div>
          <div className='flex-1 me-3'>
            <label htmlFor="cantidad" className='block font-medium text-lg mb-3'>Cantidad:</label>
            <Dropdown optionLabel="cantidad" className='w-full me-5' />
          </div>
        </div>
      </Card>
      <Card className="drop-shadow !shadow-none">
        <DataTable editMode="cell" tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin registro de ventas" size="small">
          <Column header="N° Venta" style={{ width: '5%' }}></Column>
          <Column header="Fecha" style={{ width: '10%' }}></Column>
          <Column header="Hora" style={{ width: '10%' }}></Column>
          <Column header="Efectivo" style={{ width: '10%' }}></Column>
          <Column header="Débito" style={{ width: '10%' }}></Column>
          <Column header="Código Qr" style={{ width: '10%' }}></Column>
          <Column header="Crédito" style={{ width: '10%' }}></Column>
          <Column header="Total" style={{ width: '10%' }}></Column>
          <Column header="Local" style={{ width: '10%' }}></Column>
          <Column header="Usuario" style={{ width: '10%' }}></Column>
          <Column header="Acciones" style={{ width: '5%' }}></Column>
        </DataTable>
      </Card>
    </div>
  )
}