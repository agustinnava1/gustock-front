import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { Card } from "primereact/card"
import { InputNumber } from "primereact/inputnumber"

export const AjustesPage = () => {
  return (
    <div className='m-5'>
      <h2 className='sm:text-4xl text-5xl font-medium mb-3'>Ajustes del sistema</h2>
      <span class='text-lg font-normal'>Administra la configuración del sistema para adaptarlo a tus requisitos</span>
      <div className="flex flex-wrap mt-5">
        <Card title='Recargo por tarjeta'
          subTitle='Se aplicará automáticamente sobre el precio de contado al momento de registrar o modificar un producto'
          className='border drop-shadow !shadow-none w-96 me-5 mb-5'>
          <label htmlFor='porcentaje' className='block font-bold mb-2'>Porcetanje</label>
          <InputNumber inputId='porcentaje' suffix="%" />
        </Card>
        <Card title='Horario de ingreso permitido'
          subTitle='Los usuarios que no sean administradores solo podrán acceder al sistema dentro del horario establecido'
          className='border drop-shadow !shadow-none w-96 mb-5'>
          <div className='flex flex-nowrap gap-3 p-fluid'>
            <div className='flex-auto'>
              <label htmlFor="desde" className='font-bold block mb-2'>Desde</label>
              <Calendar inputId='desde' timeOnly />
            </div>
            <div className='flex-auto'>
              <label htmlFor='hasta' className='font-bold block mb-2'>Hasta</label>
              <Calendar inputId='hasta' timeOnly />
            </div>
          </div>
        </Card>
      </div>
      <Button label='Guardar cambios'></Button>
    </div>
  )
}