import { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { InputNumber } from 'primereact/inputnumber'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'

import Swal from 'sweetalert2'
import JsBarcode from 'jsbarcode'
import html2canvas from 'html2canvas'

import { useForm } from '../../hooks/use.form'

import StoreService from '../../services/local.servicio'
import ProductFilters from '../../helper/producto.filtros'
import ProductoService from '../../services/producto.servicio'

export const ProductoRegistrar = () => {
  const [code, setCode] = useState('')
  const [listStores, setListStores] = useState([])

  const initialProduct = {
    code: '',
    description: '',
    brand: null,
    category: null,
    provider: null,
    priceDebit: 0,
    priceCredit: 0,
    priceEffective: 0,
  }

  const { formState, onInputChange, onDropdownChange } = useForm(initialProduct)
  const { listProviders, listCategories, listBrands } = ProductFilters()
  const { description, brand, category, provider, priceDebit, priceCredit, priceEffective } = formState

  useEffect(() => {
    StoreService.getAll().then(data => {
      setListStores(data)
    })
  }, []);

  const generateCode = () => {
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000
    setCode(randomNumber.toString())
  };

  /* Procesamiento de imagen */
  const [selectedImage, setSelectedImage] = useState(null)
  const [imgPreviewSrc, setImgPreviewSrc] = useState(null)
  const [base64Image, setBase64Image] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      let reader = new FileReader()

      reader.onload = (event) => {
        setSelectedImage(file)
        setImgPreviewSrc(event.target.result)
        setBase64Image(event.target.result.split(',')[1])
      }

      reader.readAsDataURL(file)
    }
  }

  /* Procesamiento de barcode */
  const [barcodeValue, setBarcodeValue] = useState(null)
  const [base64Barcode, setBase64Barcode] = useState(null)

  const generateBarcode = () => {
    /* svg barcode */
    if (barcodeValue === null) {
      const randomBarcode = Math.floor(Math.random() * 1000000000000)
      JsBarcode("#barcode-svg", randomBarcode, { format: "ean13" })
    } else {
      JsBarcode("#barcode-svg", barcodeValue, { format: "ean13" })
    }

    /* number value */
    const svgTextElements = document.querySelectorAll('svg text')
    let concatenatedText = ""

    svgTextElements.forEach((element) => {
      const textContent = element.textContent
      if (textContent.length > 0) {
        concatenatedText += textContent
      }
    })

    setBarcodeValue(parseInt(concatenatedText, 10))

    /* create png */
    
  }

  const deleteBarcode = () => {
    setBarcodeValue("")
    document.getElementById("barcode-svg").innerHTML = ""
  }

  /* Procesamiento de formulario */
  const handleCreateProduct = () => {
    const product = {
      ...formState,
      code: code,
      barcode: barcodeValue,
      idBrand: brand?.id,
      idCategory: category?.id,
      idProvider: provider?.id,
      base64Image: base64Image,
      base64barcode: base64Barcode,
    }

    ProductoService.create(product).then(data => {
      Swal.fire('Registrado', 'Se ha registrado el producto: "' + data.description + '" con éxito.', 'success')
    }).catch((error) => {
      console.log(product)
      Swal.fire('Error', 'Hubo un problema al intentar registrar el producto. Por favor, inténtalo de nuevo más tarde.', 'error')
    })
  }

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-medium mb-5'>Crear nuevo producto</h2>
      <div className='md:flex justify-between gap-5'>
        <div>
          <Card title='Imagen' className='!shadow border mb-5'>
            <input className='block w-full text-slate-500 file:rounded file:mr-4 file:py-2 file:px-4 file:border-0
                file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              type='file' accept='image/*' onChange={handleImageChange} />
            {selectedImage ?
              <div className='h-[300px] w-[300px] mt-3'>
                <img id='imgPreview' src={imgPreviewSrc} alt='Preview' className='w-full h-full object-cover rounded' />
              </div> :
              <div className='h-[300px] w-[300px] mt-3'>
                <img src='/producto-sin-foto.jpg' className='w-full h-full object-cover rounded'></img>
              </div>
            }
          </Card>
          <Card title='Código de barras' className='!shadow border'>
            <InputNumber className='w-full p-inputtext-sm' useGrouping={false}
              value={barcodeValue} onChange={(e) => setBarcodeValue(e.target.value)} />
            <div className='border border-1'>
              <svg id='barcode-svg' className='m-auto' width='234px' height='142px'></svg>
            </div>
            <div className='flex mt-4'>
              <Button label='Generar' onClick={generateBarcode} className='w-full !me-3 hover:!bg-blue-600' size='small' disabled={barcodeValue} />
              <Button label='Eliminar' onClick={deleteBarcode} className='w-full' severity='danger' size='small' disabled={!barcodeValue} />
            </div>
          </Card>
        </div>

        <div className='w-1/2'>
          <Card title='Características' className='!shadow border mb-5'>
            <div className='mb-3'>
              <label htmlFor='description' className='block font-medium text-lg mb-2'>Código</label>
              <div className='flex'>
                <InputText name='code' value={code} onChange={onInputChange} className='p-inputtext-sm w-full !me-3' />
                <div>
                  <Button label='Generar' onClick={generateCode} size='small' className='w-full' />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='block font-medium text-lg mb-2'>Descripción</label>
              <InputText placeholder='Valija mediana roja' className='p-inputtext-sm w-full'
                name='description' value={description} onChange={onInputChange} />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <div className='mb-3'>
                <label htmlFor='provider' className='block font-medium text-lg mb-2'>Proveedor</label>
                <Dropdown options={listProviders} optionLabel='razonSocial' className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona un proveedor' emptyMessage='Sin registros'
                  name='provider' value={provider} onChange={onDropdownChange} />
              </div>
              <div className='mb-3'>
                <label htmlFor='category' className='block font-medium text-lg mb-2'>Rubro</label>
                <Dropdown options={listCategories} optionLabel='descripcion' className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona un rubro' emptyMessage='Sin registros'
                  name='category' value={category} onChange={onDropdownChange} />
              </div>
              <div className='mb-3'>
                <label htmlFor='brand' className='block font-medium text-lg mb-2'>Marca</label>
                <Dropdown options={listBrands} optionLabel='descripcion' className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona una marca' emptyMessage='Sin registros'
                  name='brand' value={brand} onChange={onDropdownChange} />
              </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <div className='mb-3 lg:mb-0'>
                <label htmlFor='priceEffective' className='block font-medium text-lg mb-2'>Precio efectivo</label>
                <InputNumber inputId='priceEffective' mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='priceEffective' value={priceEffective} onValueChange={onInputChange} />
              </div>
              <div className='mb-3 lg:mb-0'>
                <label htmlFor='priceDebit' className='block font-medium text-lg mb-2'>Precio débito</label>
                <InputNumber inputId='priceDebit' mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='priceDebit' value={priceDebit} onValueChange={onInputChange} />
              </div>
              <div className='mb-3 lg:mb-0'>
                <label htmlFor='priceCredit' className='block font-medium text-lg mb-2'>Precio crédito</label>
                <InputNumber inputId='priceCredit' mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='priceCredit' value={priceCredit} onValueChange={onInputChange} />
              </div>
            </div>
          </Card>
          <Card title='Distribución' className='!shadow border overscroll-auto'>
            <div style={{ maxHeight: '245px', overflowY: 'auto' }}>
              <DataTable value={listStores} stripedRows showGridlines size="small" className='border' emptyMessage="No se encontraron locales">
                <Column header='Sucursal' style={{ width: '80%' }}
                  body={(rowData) => (
                    <div className='flex'>
                      <p className='font-medium'>{rowData.nombre}</p>
                      <p> - {rowData.direccion}</p>
                    </div>
                  )}>
                </Column>
                <Column header='Cantidad' style={{ width: '20%' }}
                  body={
                    <InputNumber placeholder='0' inputClassName='p-inputtext-sm w-full'></InputNumber>
                  }>
                </Column>
              </DataTable>
            </div>
          </Card>
        </div>

        <div className='w-2/5'>
          <Card title="Especificaciones" className='!shadow border mb-5'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Altura</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
                  name='height' value={priceCredit} onValueChange={onInputChange} />
              </div>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Profundidad</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
                  name='depth' value={priceCredit} onValueChange={onInputChange} />
              </div>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Ancho</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
                  name='width' value={priceCredit} onValueChange={onInputChange} />
              </div>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Cm lineal</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full'
                  name='length' value={priceCredit} onValueChange={onInputChange} />
              </div>
            </div>
            <hr className='my-3'></hr>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2' htmlFor='capacidad'>Capacidad</label>
                <InputNumber placeholder='0,0' suffix=' kg' inputClassName='p-inputtext-sm w-full'
                  name='height' value={priceCredit} onValueChange={onInputChange} />
              </div>
              <div className="mb-3">
                <label className="block text-lg font-medium mb-2" htmlFor="peso">Peso</label>
                <InputNumber placeholder='0,0' suffix=' kg' inputClassName='p-inputtext-sm w-full'
                  name='height' value={priceCredit} onValueChange={onInputChange} />
              </div>
              <div className="mb-3">
                <label className="block text-lg font-medium mb-2" htmlFor="litros">Litros</label>
                <InputNumber placeholder='0.0' suffix=' L' inputClassName='p-inputtext-sm w-full'
                  name='height' value={priceCredit} onValueChange={onInputChange} />
              </div>
              <div className="mb-3">
                <label className="block text-lg font-medium mb-2" htmlFor="ruedas">Ruedas</label>
                <InputNumber placeholder='0' inputClassName='p-inputtext-sm w-full'
                  name='height' value={priceCredit} onValueChange={onInputChange} />
              </div>
            </div>
            <hr className="my-3"></hr>
            <div className="flex justify-between gap-4">
              <div className="w-full lg:w-1/2">
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2" htmlFor="colores">Colores</label>
                  <InputText name="colors" placeholder="Ejemplo: rojo, azul" className='p-inputtext-sm w-full'
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2" htmlFor="material">Material</label>
                  <InputText name="material" placeholder="Ejemplo: cuero, poliéster" className='p-inputtext-sm w-full' />
                </div>
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2" htmlFor="garantia">Garantía</label>
                  <InputText name="warranty" placeholder="Ejemplo: 6 meses, 1 año" className='p-inputtext-sm w-full' />
                </div>
              </div>
              <div className="w-full lg:w-1/2 2xl:w-2/5">
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2">Luces</label>
                  <div className="flex gap-3 mb-4 py-2">
                    <div className="flex align-items-center">
                      <RadioButton inputId="lights1" name="lights1" value="Si" />
                      <label htmlFor="lights1" className="ml-2">Si</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="lights2" name="lights2" value="No" />
                      <label htmlFor="lights2" className="ml-2">No</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="lights3" name="lights3" value="No aplica" />
                      <label htmlFor="lights3" className="ml-2">No aplica</label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2">Organizador</label>
                  <div className="flex gap-3 mb-4 py-2">
                    <div className="flex align-items-center">
                      <RadioButton inputId="organizador1" name="organizador1" value="Si" />
                      <label htmlFor="organizador1" className="ml-2">Si</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="organizador2" name="organizador2" value="No" />
                      <label htmlFor="organizador2" className="ml-2">No</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="organizador3" name="organizador3" value="No aplica" />
                      <label htmlFor="organizador3" className="ml-2">No aplica</label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2">P. Notebook</label>
                  <div className="flex gap-3 mb-4 py-2">
                    <div className="flex align-items-center">
                      <RadioButton inputId="luces1" name="luces" value="Si" />
                      <label htmlFor="luces1" className="ml-2">Si</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="luces2" name="luces2" value="No" />
                      <label htmlFor="luces2" className="ml-2">No</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="luces3" name="luces3" value="No aplica" />
                      <label htmlFor="luces3" className="ml-2">No aplica</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-3"></hr>
            <div>
              <label className="text-lg font-medium" for="observaciones">Observaciones</label>
              <InputTextarea rows={1} placeholder='Detalles adicionales del producto (opcional)' className="w-full !mt-3" />
            </div>
          </Card>
          <div className='flex text-center'>
            <Button label='Cancelar' severity='danger' className='w-96 !mr-3' size='small' />
            <Button label='Confirmar' className='w-96 hover:!bg-blue-600' size='small'
              onClick={handleCreateProduct} />
          </div>
        </div>
      </div>
    </div>
  )
}