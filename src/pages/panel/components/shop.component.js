import { useState, useEffect } from 'react'

import { Plus } from 'lucide-react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Message } from 'primereact/message'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'

import Swal from 'sweetalert2'
import ShopService from '../../../services/local.servicio'

export const ShopComponent = () => {
  const initialShop = {
    tipo: '',
    nombre: '',
    direccion: '',
  }

  const [titleForm, setTitleForm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [listShops, setListShops] = useState([])
  const [shop, setShop] = useState(initialShop)

  useEffect(() => {
    loadShops()
  }, []);

  const loadShops = () => {
    ShopService.getAll().then(data => {
      setListShops(data)
    })
  }

  const tipos = [
    { label: 'LOCAL', value: 'LOCAL' },
    { label: 'DEPOSITO', value: 'DEPOSITO' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setShop({
      ...shop,
      [name]: value
    })
  }

  const handleErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleCreateShop = (e) => {
    e.preventDefault();
    if (shop.nombre === '') {
      handleErrorMessage('El campo nombre es obligatorio')
      return;
    }

    if (shop.tipo === '') {
      handleErrorMessage('Debe seleccionar un tipo')
      return;
    }

    ShopService.create(shop).then((resp) => {
      loadShops()
      setShowForm(false)
      Swal.fire('Registrado', 'La sucursal se ha registrado con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleUpdateShop = (e) => {
    e.preventDefault();
    if (shop.nombre === '') {
      handleErrorMessage('El campo nombre es obligatorio')
      return;
    }

    if (shop.tipo === '') {
      handleErrorMessage('Debe seleccionar un tipo')
      return;
    }

    ShopService.update(shop).then((resp) => {
      loadShops()
      setShowForm(false)
      Swal.fire('Actualizado', 'Se ha actualizado la sucursal con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleDeleteShop = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará la sucursal del sistema',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        ShopService.delete(id)
          .then((data) => {
            loadShops()
            Swal.fire('Eliminado', 'La sucursal ha sido eliminada con éxito.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al intentar eliminar la sucursal.<br> Por favor, inténtelo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const showFormUpdate = (id) => {
    ShopService.getById(id).then((data) => {
      setTitleForm('Editar local')
      setShop(data)
      setShowForm(true)
    })
  }

  const showFormCreate = () => {
    setTitleForm('Nuevo local')
    setShop(initialShop)
    setShowForm(true)
  }

  return (
    <div>
      <Card className='!shadow-none border mb-5'>
        <DataTable value={listShops} emptyMessage='No se encontraron resultados' scrollHeight='650px' size='small' stripedRows scrollable >
          <Column field='nombre' className='rounded-tl-md' header='Nombre'></Column>
          <Column field='direccion' header='Dirección'></Column>
          <Column field='tipo' header='Tipo'></Column>
          <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex'>
                <button className='bg-yellow-500 rounded text-white px-2 py-1 me-3'
                  onClick={() => showFormUpdate(rowData.id)}>
                  <i className='bi bi-pencil-fill'></i>
                </button>
                <button className='bg-red-500 rounded text-white px-2 py-1'
                  onClick={() => handleDeleteShop(rowData.id)}>
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
            <span className='font-medium'>Agregar sucursal</span>
          </div>
        </Card>
      </div>

      <Dialog visible={showForm} showHeader={false} style={{ width: '22em' }}>
        <h3 className='text-2xl text-blue-500 font-bold mb-5'>{titleForm}</h3>

        <div className='mb-5'>
          <label htmlFor='nombre' className='font-medium block mb-2'>Nombre</label>
          <InputText value={shop.nombre} onChange={handleChange} name='nombre' className='p-inputtext-sm w-full' />
        </div>

        <div className='mb-5'>
          <label htmlFor='direccion' className='font-medium block mb-2'>Dirección</label>
          <InputText value={shop.direccion} onChange={handleChange} name='direccion' className='p-inputtext-sm w-full' />
        </div>

        <div className='mb-5'>
          <label htmlFor='direccion' className='font-medium block mb-2'>Tipo</label>
          <Dropdown value={shop.tipo} options={tipos} onChange={handleChange}
            name='tipo' placeholder='Selecciona un tipo' className='p-inputtext-sm w-full' />
        </div>

        {errorMessage && <Message className='!mx-auto !mb-5' severity='error' text={errorMessage} />}

        <div className='flex gap-3'>
          <button className='w-full text-blue-500 font-medium' onClick={() => setShowForm(false)}>Cancelar</button>
          {titleForm === 'Nuevo local'
            ? <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleCreateShop}></Button>
            : <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleUpdateShop}></Button>
          }
        </div>
      </Dialog>
    </div>
  )
}