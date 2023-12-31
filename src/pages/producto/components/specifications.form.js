import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'

const SpecificationsForm = ({ initialSpecifications, onSpecificationsChange }) => {
  const [specificationsFormState, setSpecificationsFormState] = useState(initialSpecifications)

  const [height, setHeight] = useState(specificationsFormState.height)
  const [depth, setDepth] = useState(specificationsFormState.depth)
  const [width, setWidth] = useState(specificationsFormState.width)
  const [length, setLength] = useState(specificationsFormState.length)
  const [liters, setLiters] = useState(specificationsFormState.liters)

  const [lights, setLights] = useState(specificationsFormState.lights)
  const [organizer, setOrganizer] = useState(specificationsFormState.organizer)
  const [notebook, setNotebook] = useState(specificationsFormState.notebook)

  useEffect(() => {
    if (height && depth && width) {
      calculateLength()
      calculateLiters()
    }

  }, [height, depth, width])

  const onSpecificationsInputChange = (e) => {
    const { name, value } = e.target

    setSpecificationsFormState({
      ...specificationsFormState,
      [name]: value,
    })

    if (name === 'height') {
      setHeight(value);
    } else if (name === 'depth') {
      setDepth(value);
    } else if (name === 'width') {
      setWidth(value);
    }

    onSpecificationsChange({ ...specificationsFormState, [name]: value })
  };

  const onSpecificationsRadioChange = (e) => {
    const { name, value } = e.target;

    if (name === 'lights') {
      setLights(value);
    } else if (name === 'organizer') {
      setOrganizer(value);
    } else if (name === 'notebook') {
      setNotebook(value);
    }

    setSpecificationsFormState({
      ...specificationsFormState,
      [name]: value,
    })
  }

  const calculateLength = () => {
    const result = height + depth + width
    setLength(result)
  }

  const calculateLiters = () => {
    const result = (height * depth * width) / 1000
    setLiters(isNaN(result) ? 0 : result.toFixed(1))
  }

  useEffect(() => {
    onSpecificationsChange(specificationsFormState)
  }, [specificationsFormState, onSpecificationsChange])

  return (
    <Panel header="Especificaciones" className='mb-5' collapsed='false' toggleable>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='mb-3'>
          <label className='block text-lg font-medium mb-2'>Altura</label>
          <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
            name='height' value={height} onValueChange={onSpecificationsInputChange} />
        </div>
        <div className='mb-3'>
          <label className='block text-lg font-medium mb-2'>Profundidad</label>
          <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
            name='depth' value={depth} onValueChange={onSpecificationsInputChange} />
        </div>
        <div className='mb-3'>
          <label className='block text-lg font-medium mb-2'>Ancho</label>
          <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
            name='width' value={width} onValueChange={onSpecificationsInputChange} />
        </div>
        <div className='mb-3'>
          <label className='block text-lg font-medium mb-2'>Cm lineal</label>
          <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
            name='length' value={length} onValueChange={onSpecificationsInputChange} />
        </div>
      </div>
      <hr className='my-3'></hr>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='mb-3'>
          <label className='block text-lg font-medium mb-2' htmlFor='capacidad'>Capacidad</label>
          <InputNumber placeholder='0,0' suffix=' kg' inputClassName='p-inputtext-sm w-full' minFractionDigits={1}
            name='capacity' value={specificationsFormState.capacity} onValueChange={onSpecificationsInputChange} />
        </div>
        <div className="mb-3">
          <label className="block text-lg font-medium mb-2" htmlFor="peso">Peso</label>
          <InputNumber placeholder='0,0' suffix=' kg' inputClassName='p-inputtext-sm w-full' minFractionDigits={1}
            name='weight' value={specificationsFormState.weight} onValueChange={onSpecificationsInputChange} />
        </div>
        <div className="mb-3">
          <label className="block text-lg font-medium mb-2" htmlFor="litros">Litros</label>
          <InputNumber placeholder='0.0' suffix=' L' inputClassName='p-inputtext-sm w-full' minFractionDigits={1}
            name='liters' value={liters} onValueChange={onSpecificationsInputChange} />
        </div>
        <div className="mb-3">
          <label className="block text-lg font-medium mb-2" htmlFor="ruedas">Ruedas</label>
          <InputNumber placeholder='0' inputClassName='p-inputtext-sm w-full'
            name='wheels' value={specificationsFormState.wheels} onValueChange={onSpecificationsInputChange} />
        </div>
      </div>
      <hr className="my-3"></hr>
      <div className="flex justify-between gap-5">
        <div className="w-full lg:w-1/2">
          <div className="mb-3">
            <label className="block text-lg font-medium mb-2" htmlFor="colors">Colores</label>
            <InputText placeholder="Ejemplo: rojo, azul" className='p-inputtext-sm w-full'
              name="colors" value={specificationsFormState.colors} onChange={onSpecificationsInputChange} />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium mb-2" htmlFor="material">Material</label>
            <InputText placeholder="Ejemplo: cuero, poliéster" className='p-inputtext-sm w-full'
              name="material" value={specificationsFormState.material} onChange={onSpecificationsInputChange} />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium mb-2" htmlFor="warranty">Garantía</label>
            <InputText placeholder="Ejemplo: 6 meses, 1 año" className='p-inputtext-sm w-full'
              name="warranty" value={specificationsFormState.warranty} onChange={onSpecificationsInputChange} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mb-3">
            <label className="block text-lg font-medium mb-2">Luces</label>
            <div className="flex gap-3 mb-4 py-2">
              <div className="flex align-items-center">
                <RadioButton inputId="lights1" name="lights" value="Si"
                  onChange={onSpecificationsRadioChange} checked={lights === 'Si'} />
                <label htmlFor="lights1" className="ml-2">Si</label>
              </div>
              <div className="flex align-items-center">
                <RadioButton inputId="lights2" name="lights" value="No"
                  onChange={onSpecificationsRadioChange} checked={lights === 'No'} />
                <label htmlFor="lights2" className="ml-2">No</label>
              </div>
              <div className="flex align-items-center">
                <RadioButton inputId="lights3" name="lights" value="No aplica"
                  onChange={onSpecificationsRadioChange} checked={lights === 'No aplica'} />
                <label htmlFor="lights3" className="ml-2">No aplica</label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium mb-2">Organizador</label>
            <div className="flex gap-3 mb-4 py-2">
              <div className="flex align-items-center">
                <RadioButton inputId="organizer1" name="organizer" value="Si"
                  onChange={onSpecificationsRadioChange} checked={organizer === 'Si'} />
                <label htmlFor="organizer1" className="ml-2">Si</label>
              </div>
              <div className="flex align-items-center">
                <RadioButton inputId="organizer2" name="organizer" value="No"
                  onChange={onSpecificationsRadioChange} checked={organizer === 'No'} />
                <label htmlFor="organizer2" className="ml-2">No</label>
              </div>
              <div className="flex align-items-center">
                <RadioButton inputId="organizer3" name="organizer" value="No aplica"
                  onChange={onSpecificationsRadioChange} checked={organizer === 'No aplica'} />
                <label htmlFor="organizer3" className="ml-2">No aplica</label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-lg font-medium mb-2">P. Notebook</label>
            <div className="flex gap-3 mb-4 py-2">
              <div className="flex align-items-center">
                <RadioButton inputId="notebook1" name="notebook" value="Si"
                  onChange={onSpecificationsRadioChange} checked={notebook === 'Si'} />
                <label htmlFor="notebook1" className="ml-2">Si</label>
              </div>
              <div className="flex align-items-center">
                <RadioButton inputId="notebook2" name="notebook" value="No"
                  onChange={onSpecificationsRadioChange} checked={notebook === 'No'} />
                <label htmlFor="notebook2" className="ml-2">No</label>
              </div>
              <div className="flex align-items-center">
                <RadioButton inputId="notebook3" name="notebook" value="No aplica"
                  onChange={onSpecificationsRadioChange} checked={notebook === 'No aplica'} />
                <label htmlFor="notebook3" className="ml-2">No aplica</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-2"></hr>
      <div>
        <label className="text-lg font-medium" htmlFor="observations">Observaciones</label>
        <InputTextarea rows={2} placeholder='Detalles adicionales del producto (opcional)' className="w-full !mt-3"
          name='observations' value={specificationsFormState.observations} onChange={onSpecificationsInputChange} />
      </div>
    </Panel>
  )
}

export default SpecificationsForm