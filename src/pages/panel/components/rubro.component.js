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
import CategoryService from '../../../services/rubro.servicio'

export const CategoryComponent = () => {
  const initialCategory = {
    descripcion: ''
  }

  const [titleForm, setTitleForm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [listCategories, setListCategories] = useState([])
  const [category, setCategory] = useState(initialCategory)

  useEffect(() => {
    loadCategories()
  }, []);

  const loadCategories = () => {
    CategoryService.getAll().then(data => {
      setListCategories(data)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategory({
      ...category,
      [name]: value
    })
  }

  const handleErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleCreateCategory = (e) => {
    e.preventDefault()
    if (category.descripcion === '') {
      handleErrorMessage('El campo descripción es obligatorio')
      return;
    }

    CategoryService.create(category).then((resp) => {
      loadCategories()
      setShowForm(false)
      Swal.fire('Registrado', 'El rubro se ha registrado con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (category.descripcion === '') {
      handleErrorMessage('El campo descripción es obligatorio')
      return;
    }

    CategoryService.update(category).then((resp) => {
      loadCategories()
      setShowForm(false)
      Swal.fire('Actualizado', 'Se ha actualizado el rubro con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el rubro del sistema',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        CategoryService.delete(id)
          .then((data) => {
            loadCategories()
            Swal.fire('Eliminado', 'El rubro ha sido eliminado con éxito.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al intentar eliminar el rubro.<br> Por favor, inténtelo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const showFormUpdate = (id) => {
    CategoryService.getById(id).then((data) => {
      setTitleForm('Editar rubro')
      setCategory(data)
      setShowForm(true)
    })
  }

  const showFormCreate = () => {
    setTitleForm('Nuevo rubro')
    setCategory(initialCategory)
    setShowForm(true)
  }

  return (
    <div>
      <Card className='!shadow-none border mb-5'>
        <DataTable value={listCategories} emptyMessage='No se encontraron resultados' scrollHeight='650px' size='small' stripedRows scrollable >
          <Column field='descripcion' className='rounded-tl-md' header='Descripción'></Column>
          <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex gap-2'>
                <button className='text-gray-500 px-2 py-1'
                  onClick={() => showFormUpdate(rowData.id)}>
                  <i className='bi bi-pencil-fill'></i>
                </button>
                <button className='text-gray-500 px-2 py-1'
                  onClick={() => handleDeleteCategory(rowData.id)}>
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
            <span className='font-medium'>Agregar rubro</span>
          </div>
        </Card>
      </div>

      <Dialog visible={showForm} showHeader={false} style={{ width: '22em' }}>
        <h3 className='text-2xl text-blue-500 font-bold mb-5'>{titleForm}</h3>

        <div className='mb-5'>
          <label htmlFor='descripcion' className='font-medium block mb-2'>Descripción</label>
          <InputText value={category.descripcion} onChange={handleChange} name='descripcion' className='p-inputtext-sm w-full' />
        </div>

        {errorMessage && <Message className='!mx-auto !mb-5' severity='error' text={errorMessage} />}

        <div className='flex gap-3'>
          <button className='w-full text-blue-500 font-medium' onClick={() => setShowForm(false)}>Cancelar</button>
          {titleForm === 'Nuevo rubro'
            ? <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleCreateCategory}></Button>
            : <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleUpdateCategory}></Button>
          }
        </div>
      </Dialog>
    </div>
  )
}
