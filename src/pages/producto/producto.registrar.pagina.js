import { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { InputNumber } from 'primereact/inputnumber'

import Swal from 'sweetalert2'
import JsBarcode from 'jsbarcode'

import { useForm } from '../../hooks/use.form'

import ShopService from '../../services/local.servicio'
import ProductFilters from '../../helper/producto.filtros'
import ProductoService from '../../services/producto.servicio'
import SpecificationsForm from './components/specifications.form'

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

export const ProductoRegistrar = () => {
  const [code, setCode] = useState('')
  const [listShops, setListShops] = useState([])

  const { formState, onInputChange, onDropdownChange } = useForm(initialProduct);
  const { listProviders, listCategories, listBrands } = ProductFilters()
  const { description, brand, category, provider, priceDebit, priceCredit, priceEffective } = formState

  useEffect(() => {
    ShopService.getAll().then(data => {
      setListShops(data)
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
    setBarcodeValue(null)
    document.getElementById("barcode-svg").innerHTML = ""
  }

  /* Procesamiento de ficha tecnica */
  const initialSpecifications = {
    height: null, depth: null, width: null, length: null, capacity: null, weight: null,
    liters: null, wheels: null, colors: null, material: null, warranty: null,
    lights: null, notebook: null, organizer: null, observations: null,
  }

  const [specifications, setSpecifications] = useState(initialSpecifications);

  const handleSpecificationsChange = (newSpecifications) => {
    setSpecifications(newSpecifications);
  }

  const handleQuantityChange = (shopId, newValue) => {
    const updatedListShops = listShops.map(shop => {
      if (shop.id === shopId) {
        return { ...shop, quantity: newValue }
      }
      return shop
    })

    setListShops(updatedListShops)
  }

  /* Procesamiento de formulario */
  const handleCreateProduct = () => {
    if (code === '') {
      Swal.fire('Error', 'El código del producto es obligatorio.', 'error');
      return;
    }

    if (description === '') {
      Swal.fire('Error', 'El campo descripción es obligatorio', 'error');
      return;
    }

    const product = {
      ...formState,
      code: code,
      barcode: barcodeValue,
      idBrand: brand?.id,
      idCategory: category?.id,
      idProvider: provider?.id,
      base64Image: base64Image,
      base64barcode: base64Barcode,
      specifications: specifications
    }

    ProductoService.create(product).then(data => {
      Swal.fire('Registrado', 'Se ha registrado el producto: "' + data.description + '" con éxito.', 'success')
    }).catch((error) => {
      console.log(product)
      console.log(specifications)
      Swal.fire('Error', 'Hubo un problema al intentar registrar el producto. Por favor, inténtalo de nuevo más tarde.', 'error')
    })
  }

  return (
    <div className='p-5'>
      <h2 className='text-3xl font-medium mb-5'>Crear nuevo producto</h2>
      <div className='md:flex justify-between gap-5'>
        <div>
          <Card title='Imagen' className='!shadow border mb-5'>
            <input className='block w-full text-slate-500 file:rounded file:mr-4 file:py-2 file:px-4 file:border-0
                file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              type='file' accept='image/*' onChange={handleImageChange} />
            {selectedImage ?
              <div className='h-[300px] w-[350px] mt-3'>
                <img id='imgPreview' src={imgPreviewSrc} alt='Preview' className='w-full h-full object-cover rounded' />
              </div> :
              <div className='h-[300px] w-[350px] mt-3'>
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
              <Button label='Eliminar' onClick={deleteBarcode} className='w-full' severity='secondary' size='small' disabled={!barcodeValue} />
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
            <div style={{ maxHeight: '248px', overflowY: 'auto' }}>
              <DataTable value={listShops} stripedRows size="small" emptyMessage="No se encontraron locales">
                <Column header='Sucursal' className='rounded-tl-md' style={{ width: '80%' }}
                  body={(rowData) => (
                    <div className='flex'>
                      <p className='font-medium'>{rowData.nombre}</p>
                      <p> - {rowData.direccion}</p>
                    </div>
                  )}>
                </Column>
                <Column header='Cantidad' className='rounded-tr-md' style={{ width: '20%' }}
                   body={(rowData) => (
                    <InputNumber value={"0"}
                      placeholder="0"
                      inputClassName="p-inputtext-sm w-full"
                    />
                  )}>
                </Column>
              </DataTable>
            </div>
          </Card>
        </div>

        <div className='w-2/5'>
          <SpecificationsForm initialSpecifications={initialSpecifications} onSpecificationsChange={handleSpecificationsChange} />
          <div className='flex text-center'>
            <Button label='Confirmar' className='w-full hover:!bg-blue-600 !mr-3' size='small'
              onClick={handleCreateProduct} />
            <Button label='Cancelar' severity='secondary' className='w-full' size='small' />
          </div>
        </div>
      </div>
    </div>
  )
}