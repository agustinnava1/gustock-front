import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import JsBarcode from 'jsbarcode';

import ProductoFiltros from '../../helper/ProductoFiltros';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const ProductosRegistrar = () => {
  const { listaProveedores, listaRubros, listaMarcas } = ProductoFiltros();

  const [proveedor, setProveedor] = useState(null)
  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)

  const [selectedImage, setSelectedImage] = useState(null);
  const [imgPreviewSrc, setImgPreviewSrc] = useState('');

  const [codigo, setCodigo] = useState('');

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
    <div className='container mx-auto px-44'>
      <h2 className='sm:text-4xl text-5xl font-medium mt-5'>Registrar producto</h2>
      <div className='lg:flex justify-between my-5'>
        <div className='w-2/5'>
          <Card title='Imagen del producto' className='drop-shadow !shadow-none mb-5'>
            <input className="block w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0
                file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
              <div className='h-[400px] mt-3'>
                <img id="imgPreview" src={imgPreviewSrc} alt="Preview" className='w-full h-full object-cover' />
              </div>
            )}
          </Card>
          <Card title='Código de barras' className='drop-shadow !shadow-none'>
            <InputNumber className='w-full mb-5' value={barcodeValue} onChange={(e) => setBarcodeValue(e.target.value)}></InputNumber>
            <div class="border border-1" id="barcode-container">
              <svg id="barcode-svg" class="m-auto" width="234px" height="142px"></svg>
              <input type="hidden" id="barcode-image" name="barcodeImage"></input>
            </div>
            <div class="flex mt-5">
              <Button label='Generar' onClick={generarBarcodeClick} className='w-full !me-5 hover:!bg-blue-600' size='small'></Button>
              <Button label='Eliminar' className='w-full' severity='danger' size='small'></Button>
            </div>
          </Card>
        </div>
        <div className='w-3/5 ms-5'>
          <Card title='Código universal / N°ro Artículo' className='drop-shadow !shadow-none mb-5'>
            <div className='flex'>
              <InputText value={codigo} onChange={(e) => setCodigo(e.target.value)} className='p-inputtext-sm w-full !me-5'></InputText>
              <Button label='Generar' onClick={generarCodigo} size='small' ></Button>
            </div>
          </Card>
          <Card title='Características generales' className='drop-shadow !shadow-none mb-5'>
            <div className='mb-5'>
              <label htmlFor="precioEfectivo" className='block font-medium text-lg mb-3'>Descripción</label>
              <InputText className='w-full'></InputText>
            </div>
            <div className='flex mb-5'>
              <div className='flex-1 me-5'>
                <label htmlFor="proveedor" className='block font-medium text-lg mb-3'>Proveedor</label>
                <Dropdown options={listaProveedores} optionLabel="razonSocial" className='w-full'
                  value={proveedor} onChange={(e) => setProveedor(e.value)} emptyMessage="Sin registros" />
              </div>
              <div className='flex-1 me-5'>
                <label htmlFor="precioEfectivo" className='block font-medium text-lg mb-3'>Rubro</label>
                <Dropdown options={listaRubros} optionLabel="descripcion" className='w-full'
                  value={rubro} onChange={(e) => setRubro(e.value)} emptyMessage="Sin registros" />
              </div>
              <div className='flex-1'>
                <label htmlFor="precioEfectivo" className='block font-medium text-lg mb-3'>Marca</label>
                <Dropdown options={listaMarcas} optionLabel="descripcion" className='w-full'
                  value={marca} onChange={(e) => setMarca(e.value)} emptyMessage="Sin registros" />
              </div>
            </div>
            <div className='flex'>
              <div className='flex-1 me-5'>
                <label htmlFor="precioEfectivo" className='block font-medium text-lg mb-3'>Precio efectivo</label>
                <InputNumber inputId="currency-ars" mode="currency" currency="ARS" locale="es-AR"
                  minFractionDigits={0} maxFractionDigits={0} className='w-full' />
              </div>
              <div className='flex-1 me-5'>
                <label htmlFor="precioDebito" className='block font-medium text-lg mb-3'>Precio débito</label>
                <InputNumber inputId="currency-ars" mode="currency" currency="ARS" locale="es-AR"
                  minFractionDigits={0} maxFractionDigits={0} className='w-full' />
              </div>
              <div className='flex-1'>
                <label htmlFor="precioCredito" className='block font-medium text-lg mb-3'>Precio crédito</label>
                <InputNumber inputId="currency-ars" mode="currency" currency="ARS" locale="es-AR"
                  minFractionDigits={0} maxFractionDigits={0} className='w-full' />
              </div>
            </div>
          </Card>
          <Card title='Ficha Técnica' className='drop-shadow !shadow-none mb-5'>

          </Card>
          <Card title='Distribucion' className='drop-shadow !shadow-none'>
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