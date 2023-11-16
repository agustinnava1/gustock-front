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
import ProviderService from '../../../services/proveedor.servicio'

export const ProviderComponent = () => {
  const initialProvider = {
    ciudad: '',
    razonSocial: '',
  }

  const [titleForm, setTitleForm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [listProviders, setListProviders] = useState([])
  const [provider, setProvider] = useState(initialProvider)

  useEffect(() => {
    loadProviders()
  }, []);

  const loadProviders = () => {
    ProviderService.getAll().then(data => {
      setListProviders(data)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProvider({
      ...provider,
      [name]: value
    })
  }

  const handleErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleCreateProveedor = (e) => {
    e.preventDefault()
    if (provider.razonSocial === "") {
      handleErrorMessage('El campo razon social es obligatorio')
      return
    }

    ProviderService.create(provider).then((resp) => {
      loadProviders()
      setShowForm(false)
      Swal.fire('Registrado', 'El proveedor se ha registrado con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleUpdateProveedor = (e) => {
    e.preventDefault()
    if (provider.razonSocial === "") {
      handleErrorMessage('El campo razon social es obligatorio')
      return
    }

    ProviderService.update(provider).then((resp) => {
      loadProviders()
      setShowForm(false)
      Swal.fire('Actualizado', 'Se ha actualizado al proveedor con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará al proveedor del sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        ProviderService.delete(id)
          .then((data) => {
            loadProviders()
            Swal.fire('Eliminado', 'El proveedor ha sido eliminado con éxito.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al intentar eliminar el proveedor.<br> Por favor, inténtelo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const showFormUpdate = (id) => {
    ProviderService.getById(id).then((data) => {
      setTitleForm('Editar proveedor')
      setProvider(data)
      setShowForm(true)
    })
  }

  const showFormCreate = () => {
    setTitleForm('Nuevo proveedor')
    setProvider(initialProvider)
    setShowForm(true)
  }

  return (
    <div>
      <Card className="!shadow-none border mb-5">
        <DataTable value={listProviders} emptyMessage="No se encontraron resultados" scrollHeight="650px" size="small" stripedRows scrollable >
          <Column field="razonSocial" className="rounded-tl-md" header="Razón social"></Column>
          <Column field="ciudad" header="Ciudad"></Column>
          <Column header="Acciones" className="rounded-tr-md" style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex gap-2'>
                <button className='text-gray-500 px-2 py-1'
                  onClick={() => showFormUpdate(rowData.id)}>
                  <i className='bi bi-pencil-fill'></i>
                </button>
                <button className='text-gray-500 px-2 py-1'
                  onClick={() => handleDelete(rowData.id)}>
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
      </Card>

      <div className="flex justify-end">
        <Card className='!shadow-none border w-fit cursor-pointer'
          onClick={() => showFormCreate(true)}>
          <div className='flex gap-3'>
            <Plus className='text-blue-500' />
            <span className='font-medium'>Agregar proveedor</span>
          </div>
        </Card>
      </div>

      <Dialog visible={showForm} showHeader={false} style={{ width: '22em' }}>
        <h3 className='text-2xl text-blue-500 font-bold mb-5'>{titleForm}</h3>

        <div className='mb-3'>
          <label htmlFor='razonSocial' className='font-medium block mb-2'>Razón social</label>
          <InputText value={provider.razonSocial} onChange={handleChange} name='razonSocial' className='p-inputtext-sm w-full' />
        </div>
        <div className='mb-5'>
          <label htmlFor='ciudad' className='font-medium block mb-2'>Ciudad</label>
          <InputText value={provider.ciudad} onChange={handleChange} name='ciudad' className='p-inputtext-sm w-full' />
        </div>

        {errorMessage && <Message className='!mx-auto !mb-5' severity='error' text={errorMessage} />}

        <div className='flex gap-3'>
          <button className='w-full text-blue-500 font-medium' onClick={() => setShowForm(false)}>Cancelar</button>
          {titleForm === 'Nuevo proveedor'
            ? <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleCreateProveedor}></Button>
            : <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleUpdateProveedor}></Button>
          }
        </div>
      </Dialog>
    </div>
  )
}
