import { useState } from 'react'

import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { InputNumber } from 'primereact/inputnumber'

import JsBarcode from 'jsbarcode';

import ProductoFiltros from '../../helper/ProductoFiltros'
import { InputTextarea } from 'primereact/inputtextarea'

export const ProductoRegistrar = () => {
  const [codigo, setCodigo] = useState('');
  const { listaProveedores, listaRubros, listaMarcas } = ProductoFiltros();

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)

  const [selectedImage, setSelectedImage] = useState(null);
  const [imgPreviewSrc, setImgPreviewSrc] = useState('');

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
        <div className='w-2/5'>
          <Card title='Imagen del producto' className='!rounded-lg !shadow-md mb-5'>
            <input className='block w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0
                file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              type='file' accept='image/*' onChange={handleImageChange} />
            {selectedImage ?
              <div className='h-[400px] mt-3'>
                <img id='imgPreview' src={imgPreviewSrc} alt='Preview' className='w-full h-full object-cover rounded-lg' />
              </div> :
              <div className='h-[400px] mt-3'>
                <img src='/producto-sin-foto.jpg' className='w-full h-full object-cover rounded-lg'></img>
              </div>
            }
          </Card>
          <Card title='Código de barras' className='!rounded-lg !shadow-md'>
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
        <div className='w-3/5 ms-5'>
          <Card title='Código universal / N°ro Artículo' className='!rounded-lg !shadow-md mb-5'>
            <div className='flex'>
              <InputText value={codigo} onChange={(e) => setCodigo(e.target.value)} className='p-inputtext-sm w-full !me-5'></InputText>
              <Button label='Generar' onClick={generarCodigo} size='small' ></Button>
            </div>
          </Card>
          <Card title='Características generales' className='!rounded-lg !shadow-md box-content mb-5'>
            <div className='mb-5'>
              <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-3'>Descripción</label>
              <InputText className='w-full'></InputText>
            </div>
            <div className='flex mb-5'>
              <div className='flex-1 me-5'>
                <label htmlFor='proveedor' className='block font-medium text-lg mb-3'>Proveedor</label>
                <Dropdown options={listaProveedores} optionLabel='razonSocial' className='w-full' filter
                  placeholder='Selecciona un proveedor' emptyMessage='Sin registros'
                  value={proveedor} onChange={(e) => setProveedor(e.value)} />
              </div>
              <div className='flex-1 me-5'>
                <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-3'>Rubro</label>
                <Dropdown options={listaRubros} optionLabel='descripcion' className='w-full' filter
                  placeholder='Selecciona un rubro' emptyMessage='Sin registros'
                  value={rubro} onChange={(e) => setRubro(e.value)} />
              </div>
              <div className='flex-1'>
                <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-3'>Marca</label>
                <Dropdown options={listaMarcas} optionLabel='descripcion' className='w-full' filter
                  placeholder='Selecciona una marca' emptyMessage='Sin registros'
                  value={marca} onChange={(e) => setMarca(e.value)} />
              </div>
            </div>
            <div className='flex'>
              <div className='flex-1 me-5'>
                <label htmlFor='precioEfectivo' className='block font-medium text-lg mb-3'>Precio efectivo</label>
                <InputNumber inputId='currency-ars' mode='currency' currency='ARS' locale='es-AR' value={0}
                  minFractionDigits={0} maxFractionDigits={0} className='w-full' />
              </div>
              <div className='flex-1 me-5'>
                <label htmlFor='precioDebito' className='block font-medium text-lg mb-3'>Precio débito</label>
                <InputNumber inputId='currency-ars' mode='currency' currency='ARS' locale='es-AR' value={0}
                  minFractionDigits={0} maxFractionDigits={0} className='w-full' />
              </div>
              <div className='flex-1'>
                <label htmlFor='precioCredito' className='block font-medium text-lg mb-3'>Precio crédito</label>
                <InputNumber inputId='currency-ars' mode='currency' currency='ARS' locale='es-AR' value={0}
                  minFractionDigits={0} maxFractionDigits={0} className='w-full' />
              </div>
            </div>
          </Card>
          <Card title='Ficha Técnica' className='!rounded-lg !shadow-md mb-5'>
            <div>
              <div className='grid grid-cols-4 gap-4'>
                <div className='mb-3'>
                  <label className='block text-lg font-medium'>Altura</label>
                  <InputNumber placeholder='0' suffix=' CM' className='p-inputtext-sm' />
                </div>
                <div className='mb-3'>
                  <label className='block text-lg'>Profundidad</label>
                  <InputNumber placeholder='0' suffix=' CM' className='p-inputtext-sm' />
                </div>
                <div className='mb-3'>
                  <label className='block text-lg'>Ancho</label>
                  <InputNumber placeholder='0' suffix=' CM' className='p-inputtext-sm' />
                </div>
                <div className='mb-3'>
                  <label className='block text-lg'>Cm lineal</label>
                  <InputNumber placeholder='0' suffix=' CM' className='p-inputtext-sm' />
                </div>
              </div>
              <hr className='my-3'></hr>
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='mb-3'>
                  <label className='text-lg' for='capacidad'>Capacidad</label>
                  <div className='flex items-center'>
                    <input type='text' className='form-input' id='capacidad' name='capacidad' placeholder='0,0'></input>
                    <span className="ml-2">kg</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-lg" for="peso">Peso</label>
                  <div className="flex items-center">
                    <input type="text" className="form-input" id="peso" name="peso" placeholder="0,0"></input>
                    <span className="ml-2">kg</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-lg" for="litros">Litros</label>
                  <div className="flex items-center">
                    <input type="text" className="form-input" id="litros" name="litros" placeholder="0.0"></input>
                    <span className="ml-2">L</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-lg" for="ruedas">Ruedas</label>
                  <input type="text" className="form-input" id="ruedas" name="ruedas"></input>
                </div>
              </div>
              <hr className="my-3"></hr>
              <div className="flex justify-between">
                <div className="w-full lg:w-6/12">
                  <div className="mb-3">
                    <label className="text-lg" for="colores">Colores</label>
                    <input type="text" className="form-input" id="colores" name="colores" placeholder="Ejemplo: rojo, azul"></input>
                  </div>
                  <div className="mb-3">
                    <label className="text-lg" for="material">Material</label>
                    <input type="text" className="form-input" id="material" name="material" placeholder="Ejemplo: cuero, poliéster"></input>
                  </div>
                  <div className="mb-3">
                    <label className="text-lg" for="garantia">Garantía</label>
                    <input type="text" className="form-input" id="garantia" name="garantia" placeholder="Ejemplo: 6 meses, 1 año"></input>
                  </div>
                </div>
                <div className="w-full lg:w-5/12">
                  <div className="mb-3">
                    <label className="text-lg">Luces</label>
                    <div className="py-2 mb-4">
                      <label className="inline-flex items-center">
                        <input className="form-radio" type="radio" name="luces" id="luces1" value="Si"></input>
                        <span className="ml-2">Si</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input className="form-radio" type="radio" name="luces" id="luces2" value="No"></input>
                        <span className="ml-2">No</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input className="form-radio" type="radio" name="luces" id="luces3" value="No aplica" checked></input>
                        <span className="ml-2">No aplica</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="text-lg">Organizador</label>
                    <div className="py-2 mb-4">
                      <label className="inline-flex items-center">
                        <input className="form-radio" type="radio" name="organizador" id="organizador1" value="Si"></input>
                        <span className="ml-2">Si</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input className="form-radio" type="radio" name="organizador" id="organizador2" value="No"></input>
                        <span className="ml-2">No</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input className="form-radio" type="radio" name="organizador" id="organizador3" value="No aplica" checked></input>
                        <span className="ml-2">No aplica</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="text-lg">P. Notebook</label>
                    <div className="py-2 mb-4">
                      <label className="inline-flex items-center">
                        <input className="form-radio" type="radio" name="portanotebook" id="notebook1" value="Si"></input>
                        <span className="ml-2">Si</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input className="form-radio" type="radio" name="portanotebook" id="notebook2" value="No"></input>
                        <span className="ml-2">No</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input className="form-radio" type="radio" name="portanotebook" id="notebook3" value="No aplica" checked></input>
                        <span className="ml-2">No aplica</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-3"></hr>
              <div>
                <label className="text-lg font-medium" for="observaciones">Observaciones</label>
                <InputTextarea rows={3} placeholder='Detalles adicionales del producto (opcional)' className="w-full !mt-3" />
              </div>
            </div>
          </Card>
          <Card title='Distribucion' className='!rounded-lg !shadow-md'>
            <DataTable editMode="cell" emptyMessage="No se encontraron locales" size="small">
              <Column header="Sucursal" style={{ width: '80%' }}></Column>
              <Column header="Cantidad" style={{ width: '20%' }}></Column>
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  )
}