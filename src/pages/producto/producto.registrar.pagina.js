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

import JsBarcode from 'jsbarcode';

import ProductoFiltros from '../../helper/ProductoFiltros'

export const ProductoRegistrar = () => {
  const [codigo, setCodigo] = useState('');
  const { listaProveedores, listaRubros, listaMarcas } = ProductoFiltros();

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)
  const [locales, setLocales] = useState([])

  const [selectedImage, setSelectedImage] = useState(null);
  const [imgPreviewSrc, setImgPreviewSrc] = useState('');

  useEffect(() => {

  }, []);

  const generarCodigo = () => {
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
    setCodigo(randomNumber.toString());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(file);
        setImgPreviewSrc(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const [barcodeValue, setBarcodeValue] = useState('');
  const [displayBarcode, setDisplayBarcode] = useState(false);

  const generarBarcode = () => {
    if (barcodeValue === '') {
      const randomBarcode = Math.floor(Math.random() * 1000000000000); // Generate a random EAN-13 barcode
      JsBarcode("#barcode-svg", randomBarcode, { format: "ean13" }); // Generate barcode using jsbarcode library
    } else {
      JsBarcode("#barcode-svg", barcodeValue, { format: "ean13" }); // Generate barcode using jsbarcode library
    }
    setDisplayBarcode(true);
  };

  const generarBarcodeClick = () => {
    setDisplayBarcode(false);
    generarBarcode();

    const svgTextElements = document.querySelectorAll('svg text');
    let concatenatedText = "";

    svgTextElements.forEach((element) => {
      const textContent = element.textContent;
      if (textContent.length > 0) {
        concatenatedText += textContent;
      }
    });

    setBarcodeValue(parseInt(concatenatedText, 10));
  };

  return (
    <div className='container mx-auto p-5 lg:px-44'>
      <h2 className='text-4xl font-medium'>Registrar nuevo producto</h2>
      <div className='lg:flex justify-between my-5'>
        <div className='lg:w-2/5'>
          <Card title='Imagen del producto' className='!rounded !shadow-none border mb-5'>
            <input className='block w-full text-slate-500 file:rounded file:mr-4 file:py-2 file:px-4 file:border-0
                file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              type='file' accept='image/*' onChange={handleImageChange} />
            {selectedImage ?
              <div className='h-[400px] mt-3'>
                <img id='imgPreview' src={imgPreviewSrc} alt='Preview' className='w-full h-full object-cover rounded' />
              </div> :
              <div className='h-[400px] mt-3'>
                <img src='/producto-sin-foto.jpg' className='w-full h-full object-cover rounded'></img>
              </div>
            }
          </Card>
          <Card title='Código de barras' className='!rounded !shadow-none border'>
            <InputNumber className='w-full mb-5' value={barcodeValue} onChange={(e) => setBarcodeValue(e.target.value)}></InputNumber>
            <div className='border border-1' id='barcode-container'>
              <svg id='barcode-svg' className='m-auto' width='234px' height='142px'></svg>
              <input type='hidden' id='barcode-image' name='barcodeImage'></input>
            </div>
            <div className='flex mt-5'>
              <Button label='Generar' onClick={generarBarcodeClick} className='w-full !me-5 hover:!bg-blue-600' size='small'></Button>
              <Button label='Eliminar' className='w-full' severity='danger' size='small'></Button>
            </div>
          </Card>
        </div>
        <div className='lg:w-3/5 lg:ms-5'>
          <Card title='Código universal / N°ro Artículo' className='!rounded !shadow-none border mb-5'>
            <div className='flex'>
              <InputText value={codigo} onChange={(e) => setCodigo(e.target.value)} className='p-inputtext-sm w-96 !me-3'></InputText>
              <Button label='Generar' onClick={generarCodigo} size='small' ></Button>
            </div>
          </Card>
          <Card title='Características generales' className='!rounded !shadow-none border mb-5'>
            <div className='mb-3'>
              <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-2'>Descripción</label>
              <InputText placeholder='Valija mediana roja' className='p-inputtext-sm w-full'></InputText>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-3'>
              <div className='mb-3'>
                <label htmlFor='proveedor' className='block font-medium text-lg mb-2'>Proveedor</label>
                <Dropdown options={listaProveedores} optionLabel='razonSocial' className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona un proveedor' emptyMessage='Sin registros'
                  value={proveedor} onChange={(e) => setProveedor(e.value)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-2'>Rubro</label>
                <Dropdown options={listaRubros} optionLabel='descripcion' className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona un rubro' emptyMessage='Sin registros'
                  value={rubro} onChange={(e) => setRubro(e.value)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-2'>Marca</label>
                <Dropdown options={listaMarcas} optionLabel='descripcion' className='p-inputtext-sm w-full' filter
                  placeholder='Selecciona una marca' emptyMessage='Sin registros'
                  value={marca} onChange={(e) => setMarca(e.value)} />
              </div>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='mb-3'>
                <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-2'>Precio efectivo</label>
                <InputNumber inputId='currency-ars' mode='currency' currency='ARS' locale='es-AR' value={0}
                  minFractionDigits={0} maxFractionDigits={0} className='p-inputtext-sm w-full' />
              </div>
              <div className='mb-3'>
                <label htmlFor='precioDebito' className='block font-medium text-lg mb-2'>Precio débito</label>
                <InputNumber inputId='currency-ars' mode='currency' currency='ARS' locale='es-AR' value={0}
                  minFractionDigits={0} maxFractionDigits={0} className='p-inputtext-sm w-full' />
              </div>
              <div className='mb-3'>
                <label htmlFor='precioCredito' className='block font-medium text-lg mb-2'>Precio crédito</label>
                <InputNumber inputId='currency-ars' mode='currency' currency='ARS' locale='es-AR' value={0}
                  minFractionDigits={0} maxFractionDigits={0} className='p-inputtext-sm w-full' />
              </div>
            </div>
          </Card>
          <Card title='Ficha Técnica' className='!rounded !shadow-none border mb-5'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Altura</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full' />
              </div>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Profundidad</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full' />
              </div>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Ancho</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full' />
              </div>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2'>Cm lineal</label>
                <InputNumber placeholder='0' suffix=' CM' inputClassName='p-inputtext-sm w-full' />
              </div>
            </div>
            <hr className='my-3'></hr>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='mb-3'>
                <label className='block text-lg font-medium mb-2' for='capacidad'>Capacidad</label>
                <InputNumber placeholder='0,0' suffix=' kg' inputClassName='p-inputtext-sm w-full' />
              </div>
              <div className="mb-3">
                <label className="block text-lg font-medium mb-2" for="peso">Peso</label>
                <InputNumber placeholder='0,0' suffix=' kg' inputClassName='p-inputtext-sm w-full' />
              </div>
              <div className="mb-3">
                <label className="block text-lg font-medium mb-2" for="litros">Litros</label>
                <InputNumber placeholder='0.0' suffix=' L' inputClassName='p-inputtext-sm w-full' />
              </div>
              <div className="mb-3">
                <label className="block text-lg font-medium mb-2" for="ruedas">Ruedas</label>
                <InputNumber placeholder='0' inputClassName='p-inputtext-sm w-full' />
              </div>
            </div>
            <hr className="my-3"></hr>
            <div className="flex justify-between">
              <div className="w-full lg:w-6/12">
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2" for="colores">Colores</label>
                  <InputText name="colores" placeholder="Ejemplo: rojo, azul" className='p-inputtext-sm w-full' />
                </div>
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2" for="material">Material</label>
                  <InputText name="material" placeholder="Ejemplo: cuero, poliéster" className='p-inputtext-sm w-full' />
                </div>
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2" for="garantia">Garantía</label>
                  <InputText name="garantia" placeholder="Ejemplo: 6 meses, 1 año" className='p-inputtext-sm w-full' />
                </div>
              </div>
              <div className="w-full lg:w-5/12">
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2">Luces</label>
                  <div className="flex flex-wrap gap-3 mb-4 py-2">
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
                <div className="mb-3">
                  <label className="block text-lg font-medium mb-2">Organizador</label>
                  <div className="flex flex-wrap gap-3 mb-4 py-2">
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
                  <div className="flex flex-wrap gap-3 mb-4 py-2">
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
              <InputTextarea rows={3} placeholder='Detalles adicionales del producto (opcional)' className="w-full !mt-3" />
            </div>
          </Card>
          <Card title='Distribucion' className='!rounded !shadow-none border'>
            <DataTable value={locales} emptyMessage="No se encontraron locales" size="small">

            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  )
}