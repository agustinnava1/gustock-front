import { useState, useEffect } from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'

import Swal from 'sweetalert2'
import ProveedorService from '../../../services/proveedor.servicio'

export const ProveedorComponent = () => {

  const initialProvider = {
    ciudad: '',
    razonSocial: '',
  }

  const [error, setError] = useState(null)
  const [titleForm, setTitleForm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [listProviders, setListProviders] = useState([])
  const [provider, setProvider] = useState(initialProvider)

  useEffect(() => {
    loadProviders()
  }, []);

  const loadProviders = () => {
    ProveedorService.getAll().then(data => {
      setListProviders(data)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider({
      ...provider,
      [name]: value
    });
  };

  const handleCreateProveedor = async (e) => {
    e.preventDefault();
    if (provider.razonSocial === "" || provider.ciudad === "") {
      return;
    }

    ProveedorService.save(provider).then((resp) => {
      Swal.fire(resp.razonSocial, 'Se ha registrado con exito en el sistema.', 'success')

    }).catch((error) => {
      setError(error.message)
    })
  }

  const handleUpdateProveedor = async (e) => {
    e.preventDefault();
    if (provider.razonSocial === "" || provider.ciudad === "") {
      return;
    }

    ProveedorService.save(provider).then((resp) => {
      Swal.fire(resp.razonSocial, 'Se ha registrado con exito en el sistema.', 'success')
    }).catch((error) => {
      setError(error.message)
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará al proveedor del sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        ProveedorService.delete(id)
          .then((data) => {
            loadProviders()
            Swal.fire('Eliminado', 'El proveedor ' + data + ' ha sido eliminado del sistema.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al eliminar el proveedor. Por favor, inténtalo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const showFormUpdate = async (id) => {
    ProveedorService.getById(id).then((data) => {
      setTitleForm('Editar proveedor')
      setProvider(data)
      setShowForm(true)
    })
  }

  const showFormCreate = async (id) => {
    setTitleForm('Nuevo proveedor')
    setProvider(initialProvider)
    setShowForm(true)
  }

  return (
    <Card className="!shadow-none border">
      <h2 className="text-2xl font-medium mb-5">Proveedores</h2>
      <DataTable value={listProviders} emptyMessage="No se encontraron proveedores" scrollHeight="650px" size="small" stripedRows scrollable >
        <Column field="razonSocial" className="rounded-tl-md" header="Razon social"></Column>
        <Column field="ciudad" header="Ciudad"></Column>
        <Column header="Acciones" className="rounded-tr-md" style={{ width: '10%' }}
          body={(rowData) => (
            <div className='flex'>
              <button className='bg-yellow-500 rounded text-xl text-white px-2 py-1 me-3'
                onClick={() => showFormUpdate(rowData.id)}>
                <i className='bi bi-pencil-fill'></i>
              </button>
              <button className='bg-red-500 rounded text-xl text-white px-2 py-1'
                onClick={() => handleDelete(rowData.id)}>
                <i className='bi bi-trash-fill'></i>
              </button>
            </div>
          )}>
        </Column>
      </DataTable>

      <div className="text-end">
        <Button label="Agregar" className="!mt-5" size="small" onClick={() => showFormCreate(true)} />
      </div>

      <Dialog visible={showForm} showHeader={false} style={{ width: '20em' }}>
        <h3>{titleForm}</h3>

        <div className='mb-3'>
          <label htmlFor='razonSocial' className='font-medium block mb-2'>Razon social</label>
          <InputText value={provider.razonSocial} onChange={handleChange} name='razonSocial' className='p-inputtext-sm w-full' required />
        </div>
        <div className='mb-8'>
          <label htmlFor='ciudad' className='font-medium block mb-2'>Ciudad</label>
          <InputText value={provider.ciudad} onChange={handleChange} name='ciudad' className='p-inputtext-sm w-full' required />
        </div>

        <div className="flex gap-3">
          <button className='w-full text-blue-500 font-medium' onClick={() => setShowForm(false)}>cerrar</button>
          {titleForm === 'Nuevo proveedor'
            ? <Button label='Confirmar' className="!w-full" type="submit" size="small" onClick={handleCreateProveedor}></Button>
            : <Button label='Confirmar' className="!w-full" type="submit" size="small" onClick={handleUpdateProveedor}></Button>
          }
        </div>
      </Dialog>
    </Card>
  )
}
