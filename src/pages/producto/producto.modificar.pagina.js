import { useEffect, useRef, useState } from 'react'

import { Card } from 'primereact/card'
import { Link, useParams } from 'react-router-dom'
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
import ProductFilters from '../../helper/producto.modificar.filtros'
import ProductoService from '../../services/producto.servicio'
import SpecificationsForm from './components/specifications.form'

const initialProduct = {
  code: '',
  description: '',
  brand: null,
  category: null,
  provider: null,
  cashPrice: 0,
  debitPrice: 0,
  creditPrice: 0
}

const initialSpecifications = {
  height: null, depth: null, width: null, length: null, capacity: null, weight: null,
  liters: null, wheels: null, colors: null, material: null, warranty: null,
  lights: 'No aplica', notebook: 'No aplica', organizer: 'No aplica', observations: null,
}

export const ProductoModificar = () => {
  const { id } = useParams()
  const canvasRef = useRef(null)

  const [product, setProduct] = useState(null)
  const [barcode, setBarcode] = useState(null)
  const [listStocks, setListStocks] = useState([])

  const [base64Image, setBase64Image] = useState(null)
  const [base64Barcode, setBase64Barcode] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imgPreviewSrc, setImgPreviewSrc] = useState(null)

  const [specifications, setSpecifications] = useState(initialSpecifications)

  const { formState, onInputChange, onDropdownChange, setFormState } = useForm(initialProduct)
  const { listProviders, listCategories, listBrands } = ProductFilters()
  const { code, description, brand, category, provider, cashPrice, debitPrice, creditPrice } = formState

  useEffect(() => {
    ProductoService.getById(id).then(data => {
      console.log(data)
      setProduct(product)
      mapProperties(data, initialProduct);
      mapProperties(data.specifications, initialSpecifications);
    })

    ShopService.getAll().then(data => {
      setListStocks(data.map(shop => ({
        shop: shop.nombre,
        direction: shop.direccion,
        quantity: 0
      })))
    })
  }, []);

  const mapProperties = (source, target) => {
    for (const key in target) {
      if (source[key] !== undefined && source[key] !== null) {
        target[key] = source[key];
      }
    }
  };

  const generateCode = () => {
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000
    setFormState({
      ...formState,
      code: randomNumber.toString()
    })
  }

  const generateBarcode = () => {
    // svg barcode
    if (barcode === null) {
      const randomBarcode = generateRandomEAN13()
      setBarcode(randomBarcode)
      JsBarcode("#barcode-svg", randomBarcode, { format: "ean13" })
    } else {
      JsBarcode("#barcode-svg", barcode, { format: "ean13" })
    }
  }

  const deleteBarcode = () => {
    setBarcode(null)
    setBase64Barcode(null)
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
      id: id,
      code: code,
      brand: brand,
      category: category,
      provider: provider,
      stocks: listStocks,
      barcodeNumber: barcode,
      base64Image: base64Image,
      base64barcode: base64Barcode,
      specifications: specifications
    }

    ProductoService.update(product).then(data => {
      Swal.fire('Registrado', 'Se ha actualizado el producto con éxito.', 'success')
    }).catch((error) => {
      Swal.fire('Error', error.response.data, 'error')
    })
  }

  const generateRandomEAN13 = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
  
    // Calculate the checksum digit
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(randomNumber[i]);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    
    const checksum = (10 - (sum % 10)) % 10;
    return randomNumber + checksum;
  }

  return (
    <div className='p-5'>
      <h2 className='text-3xl font-medium mb-5'>Modificar producto</h2>
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
              value={barcode} onChange={(e) => setBarcode(e.value)} />
            <div className='border border-1 mb-5'>
              <svg id='barcode-svg' className='m-auto' width='234px' height='142px'></svg>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className='flex'>
              <Button label='Generar' onClick={generateBarcode} className='w-full !me-3 hover:!bg-blue-600' size='small' disabled={base64Barcode} />
              <Button label='Eliminar' onClick={deleteBarcode} className='w-full' severity='secondary' size='small' disabled={!base64Barcode} />
            </div>
          </Card>
        </div>

        <div className='flex-1'>
          <Card title='Características' className='!shadow-none border mb-5'>
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
                <Dropdown options={listProviders} className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona un proveedor' emptyMessage='Sin registros'
                  name='provider' value={provider} onChange={onDropdownChange} />
              </div>
              <div className='mb-3'>
                <label htmlFor='category' className='block font-medium text-lg mb-2'>Rubro</label>
                <Dropdown options={listCategories} className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona un rubro' emptyMessage='Sin registros'
                  name='category' value={category} onChange={onDropdownChange} />
              </div>
              <div className='mb-3'>
                <label htmlFor='brand' className='block font-medium text-lg mb-2'>Marca</label>
                <Dropdown options={listBrands} className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona una marca' emptyMessage='Sin registros'
                  name='brand' value={brand} onChange={onDropdownChange} />
              </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <div className='mb-3 lg:mb-0'>
                <label htmlFor='cashPrice' className='block font-medium text-lg mb-2'>Precio efectivo</label>
                <InputNumber inputId='cashPrice' mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='cashPrice' value={cashPrice} onValueChange={onInputChange} />
              </div>
              <div className='mb-3 lg:mb-0'>
                <label htmlFor='debitPrice' className='block font-medium text-lg mb-2'>Precio débito</label>
                <InputNumber inputId='debitPrice' mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='debitPrice' value={debitPrice} onValueChange={onInputChange} />
              </div>
              <div className='mb-3 lg:mb-0'>
                <label htmlFor='creditPrice' className='block font-medium text-lg mb-2'>Precio crédito</label>
                <InputNumber inputId='creditPrice' mode='currency' currency='ARS' locale='es-AR' className='w-full'
                  minFractionDigits={0} maxFractionDigits={0} inputClassName='p-inputtext-sm w-full'
                  name='creditPrice' value={creditPrice} onValueChange={onInputChange} />
              </div>
            </div>
          </Card>

          <Card title="Distribución" className='!shadow-none border'>
            <DataTable value={listStocks} stripedRows size="small" emptyMessage="No se encontraron locales">
              <Column header='Sucursal' className='rounded-tl-md' style={{ width: '40%' }}
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
                    value={rowData.quantity} onChange={(e) => handleQuantityChange(rowData, e.value)} min={0} disabled/>
                )}>
              </Column>
              <Column header='Aumentar' className='rounded-tr-md' style={{ width: '20%' }}
                body={(rowData) => (
                  <InputNumber inputClassName="p-inputtext-sm w-full"
                    value={rowData.quantity} onChange={(e) => handleQuantityChange(rowData, e.value)} min={0} />
                )}>
              </Column>
              <Column header='Descontar' className='rounded-tr-md' style={{ width: '20%' }}
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