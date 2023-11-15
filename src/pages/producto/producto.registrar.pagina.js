import { useEffect, useRef, useState } from 'react'

import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { ArrowLeft, Save } from 'lucide-react'
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
  priceEffective: 0
}

const initialSpecifications = {
  height: null, depth: null, width: null, length: null, capacity: null, weight: null,
  liters: null, wheels: null, colors: null, material: null, warranty: null,
  lights: 'No aplica', notebook: 'No aplica', organizer: 'No aplica', observations: null,
}

export const ProductoRegistrar = () => {
  const canvasRef = useRef(null)

  const [code, setCode] = useState('')
  const [barcode, setBarcode] = useState(null)
  const [listStocks, setListStocks] = useState([])

  const [base64Image, setBase64Image] = useState(null)
  const [base64Barcode, setBase64Barcode] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imgPreviewSrc, setImgPreviewSrc] = useState(null)

  const [specifications, setSpecifications] = useState(initialSpecifications)

  const { formState, onInputChange, onDropdownChange } = useForm(initialProduct)
  const { listProviders, listCategories, listBrands } = ProductFilters()
  const { description, brand, category, provider, priceDebit, priceCredit, priceEffective } = formState

  useEffect(() => {
    ShopService.getAll().then(data => {
      setListStocks(data.map(shop => ({
        shop: shop.nombre,
        direction: shop.direccion,
        quantity: 0
      })))
    })
  }, []);

  useEffect(() => {
    generateBarcodeImg();
  }, [barcode]);

  const generateCode = () => {
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000
    setCode(randomNumber.toString())
  }

  const generateBarcode = () => {
    // svg barcode
    if (barcode === null) {
      const randomBarcode = Math.floor(Math.random() * 1000000000000)
      JsBarcode("#barcode-svg", randomBarcode, { format: "ean13" })
    } else {
      JsBarcode("#barcode-svg", barcode, { format: "ean13" })
    }

    // number value
    const svgTextElements = document.querySelectorAll('svg text')
    let concatenatedText = ""

    svgTextElements.forEach((element) => {
      const textContent = element.textContent
      if (textContent.length > 0) {
        concatenatedText += textContent
      }
    })

    setBarcode(parseInt(concatenatedText, 10))
  }

  const deleteBarcode = () => {
    setBarcode(null)
    document.getElementById("barcode-svg").innerHTML = ""
  }

  // Convert barcode to base64
  const generateBarcodeImg = () => {
    const canvas = canvasRef.current;
    const svgElement = document.getElementById('barcode-svg');

    if (!canvas || !svgElement) return;

    canvas.width = svgElement.clientWidth;
    canvas.height = svgElement.clientHeight;
    const context = canvas.getContext('2d');
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgImage = new Image();

    svgImage.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    svgImage.onload = function () {
      context.drawImage(svgImage, 0, 0);
      const png = canvas.toDataURL('image/png');
      const base64barcode = png.split(',')[1];

      setBase64Barcode(base64barcode)
    }
  }

  // Display selected image
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

  // Handle stock 
  const handleQuantityChange = (rowData, newValue) => {
    const updatedList = listStocks.map(item => {
      if (item.shop === rowData.shop) {
        return { ...item, quantity: newValue }
      }
      return item
    })

    setListStocks(updatedList)
  }

  const handleSpecificationsChange = (newSpecifications) => {
    setSpecifications(newSpecifications);
  }

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
      barcode: barcode,
      brand: brand?.descripcion,
      category: category?.descripcion,
      provider: provider?.razonSocial,
      stocks: listStocks,
      base64Image: base64Image,
      base64barcode: base64Barcode,
      specifications: specifications
    }

    ProductoService.create(product).then(data => {
      console.log(product)
      Swal.fire('Registrado', 'Se ha registrado el producto: "' + data.description + '" con éxito.', 'success')
    }).catch((error) => {
      Swal.fire('Error', error.response.data, 'error')
    })
  }

  return (
    <div className='p-5'>
      <h2 className='text-3xl font-medium mb-5'>Registrar nuevo producto</h2>
      <div className='md:flex gap-5'>
        <div className='w-1/5'>
          <Card title='Imagen' className='!shadow-none border mb-5'>
            <input className='block w-full text-slate-500 file:rounded file:mr-4 file:py-2 file:px-4 file:border-0
                file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              type='file' accept='image/*' onChange={handleImageChange} />
            {selectedImage ?
              <div className='h-[300px] w-full mt-3'>
                <img id='imgPreview' src={imgPreviewSrc} alt='Preview' className='w-full h-full object-cover rounded' />
              </div> :
              <div className='h-[300px] w-full mt-3'>
                <img src='/producto-sin-foto.jpg' className='w-full h-full object-cover rounded'></img>
              </div>
            }
          </Card>

          <Card title='Código de barras' className='!shadow-none border mb-5'>
            <InputNumber className='w-full p-inputtext-sm mb-5' useGrouping={false}
              value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            <div className='border border-1 mb-5'>
              <svg id='barcode-svg' className='m-auto' width='234px' height='142px'></svg>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className='flex'>
              <Button label='Generar' onClick={generateBarcode} className='w-full !me-3 hover:!bg-blue-600' size='small' disabled={barcode} />
              <Button label='Eliminar' onClick={deleteBarcode} className='w-full' severity='secondary' size='small' disabled={!barcode} />
            </div>
          </Card>
        </div>

        <div className='flex-1'>
          <Card title='Características' className='!shadow-none border mb-5'>
            <div className='mb-3'>
              <label htmlFor='description' className='block font-medium text-lg mb-2'>Código</label>
              <div className='flex'>
                <InputText name='code' value={code} onChange={(e) => setCode(e.target.value)} className='p-inputtext-sm w-full !me-3' />
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

          <Card title="Distribución" className='!shadow-none border'>
            <DataTable value={listStocks} stripedRows size="small" emptyMessage="No se encontraron locales">
              <Column header='Sucursal' className='rounded-tl-md' style={{ width: '80%' }}
                body={(rowData) => (
                  <div className='flex'>
                    <p className='font-medium'>{rowData.shop}</p>
                    <p> - {rowData.direction}</p>
                  </div>
                )}>
              </Column>
              <Column header='Cantidad' className='rounded-tr-md' style={{ width: '20%' }}
                body={(rowData) => (
                  <InputNumber inputClassName="p-inputtext-sm w-full"
                    value={rowData.quantity} onChange={(e) => handleQuantityChange(rowData, e.value)} min={0} />
                )}>
              </Column>
            </DataTable>
          </Card>
        </div>

        <div className='flex-1'>
          <SpecificationsForm initialSpecifications={initialSpecifications} onSpecificationsChange={handleSpecificationsChange} />

          <div className='flex gap-5'>
            <Card className='!shadow-none border mb-5 cursor-pointer'
              onClick={handleCreateProduct}>
              <div className='flex gap-3'>
                <Save className='text-blue-500' />
                <span className='font-medium'>Registrar producto</span>
              </div>
            </Card>

            <Link to={`/productos`}>
              <Card className='!shadow-none border'>
                <div className='flex gap-3'>
                  <ArrowLeft className='text-blue-500' />
                  <span className='font-medium'>Volver a productos</span>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}