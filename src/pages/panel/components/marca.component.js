import { useState, useEffect } from 'react'

import { Plus } from 'lucide-react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Message } from 'primereact/message'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'

import Swal from 'sweetalert2'
import BrandService from '../../../services/marca.servicio'

export const BrandComponent = () => {
  const initialBrand = {
    descripcion: ''
  }

  const [titleForm, setTitleForm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [listBrands, setListBrands] = useState([])
  const [brand, setBrand] = useState(initialBrand)

  useEffect(() => {
    loadBrands()
  }, []);

  const loadBrands = () => {
    BrandService.getAll().then(data => {
      setListBrands(data)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBrand({
      ...brand,
      [name]: value
    })
  }

  const handleErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleCreateBrand = (e) => {
    e.preventDefault()
    if (brand.descripcion === '') {
      handleErrorMessage('El campo descripción es obligatorio')
      return
    }

    BrandService.create(brand).then((resp) => {
      loadBrands()
      setShowForm(false)
      Swal.fire('Registrado', 'La marca se ha registrado con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleUpdateBrand = (e) => {
    e.preventDefault();
    if (brand.descripcion === "") {
      handleErrorMessage('El campo descripción es obligatorio')
      return;
    }

    BrandService.update(brand).then((resp) => {
      loadBrands()
      setShowForm(false)
      Swal.fire('Actualizado', 'Se ha actualizado la marca con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleDeleteBrand = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará la marca del sistema',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        BrandService.delete(id)
          .then((data) => {
            loadBrands()
            Swal.fire('Eliminado', 'La marca ha sido eliminada con éxito.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al intentar eliminar la marca.<br> Por favor, inténtelo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const showFormUpdate = (id) => {
    BrandService.getById(id).then((data) => {
      setTitleForm('Editar marca')
      setBrand(data)
      setShowForm(true)
    })
  }

  const showFormCreate = () => {
    setTitleForm('Nueva marca')
    setBrand(initialBrand)
    setShowForm(true)
  }

  return (
    <div>
      <Card className='!shadow-none border mb-5'>
        <DataTable value={listBrands} emptyMessage='No se encontraron resultados' scrollHeight='650px' size='small' stripedRows scrollable >
          <Column field='descripcion' className='rounded-tl-md' header='Descripción'></Column>
          <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex gap-2'>
                <button className='text-gray-500 px-2 py-1'
                  onClick={() => showFormUpdate(rowData.id)}>
                  <i className='bi bi-pencil-fill'></i>
                </button>
                <button className='text-gray-500 px-2 py-1'
                  onClick={() => handleDeleteBrand(rowData.id)}>
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
      </Card>

      <div className='flex justify-end'>
        <Card className='!shadow-none border w-fit cursor-pointer'
          onClick={() => showFormCreate(true)}>
          <div className='flex gap-3'>
            <Plus className='text-blue-500' />
            <span className='font-medium'>Agregar marca</span>
          </div>
        </Card>
      </div>

      <Dialog visible={showForm} showHeader={false} style={{ width: '22em' }}>
        <h3 className='text-2xl text-blue-500 font-bold mb-5'>{titleForm}</h3>

        <div className='mb-5'>
          <label htmlFor='descripcion' className='font-medium block mb-2'>Descripción</label>
          <InputText value={brand.descripcion} onChange={handleChange} name='descripcion' className='p-inputtext-sm w-full' />
        </div>

        {errorMessage && <Message className='!mx-auto !mb-5' severity='error' text={errorMessage} />}

        <div className='flex gap-3'>
          <button className='w-full text-blue-500 font-medium' onClick={() => setShowForm(false)}>Cancelar</button>
          {titleForm === 'Nueva marca'
            ? <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleCreateBrand}></Button>
            : <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleUpdateBrand}></Button>
          }
        </div>
      </Dialog>
    </div>
  )
}
