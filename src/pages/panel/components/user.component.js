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
import UserService from '../../../services/usuario.servicio'
import ShopService from '../../../services/local.servicio'

export const UsuarioComponent = () => {
  const initialUser = {
    rol: '',
    shop: '',
    username: '',
    password: '',
  }

  const [titleForm, setTitleForm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showFormPassword, setShowFormPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [listUsers, setListUsers] = useState([])
  const [listShops, setListShops] = useState([])
  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    loadUsers()
    loadShops()
  }, []);

  const loadUsers = () => {
    UserService.getAll().then(data => {
      setListUsers(data)
    })
  }

  const loadShops = () => {
    ShopService.getAll().then(data => {
      setListShops(data)
    })
  }

  const roles = [
    { label: 'USUARIO', value: 'ROLE_USUARIO' },
    { label: 'ADMINISTRADOR', value: 'ROLE_ADMINISTRADOR' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleCreateUser = (e) => {
    e.preventDefault()
    if (user.username === '' || user.password === '' || user.rol === '') {
      handleErrorMessage('Todos los campos son obligatorios')
      return
    }

    const newUser = {
      ...user,
      shop: user.shop?.nombre
    }

    UserService.create(newUser).then((resp) => {
      loadUsers()
      setShowForm(false)
      Swal.fire('Registrado', 'El usuario se ha registrado con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleUpdateUser = (e) => {
    e.preventDefault()
    if (user.username === '' || user.password === '' || user.rol === '') {
      handleErrorMessage('Todos los campos son obligatorios')
      return
    }

    const newUser = {
      ...user,
      shop: user.shop?.nombre
    }

    UserService.update(user).then((resp) => {
      loadUsers()
      setShowForm(false)
      Swal.fire('Actualizado', 'Se ha actualizado el usuario con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    if (user.password = '') {
      handleErrorMessage('Debes ingresar una nueva contraseña')
      return
    }

    UserService.updatePassword(user).then((resp) => {
      setShowFormPassword(false)
      Swal.fire('Actualizado', 'Se ha actualizado la contraseña con éxito.', 'success')
    }).catch((error) => {
      handleErrorMessage(error.response.data)
    })
  }

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el usuario del sistema',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        UserService.delete(id)
          .then((data) => {
            loadUsers()
            Swal.fire('Eliminado', 'El usuario ha sido eliminado con éxito.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al intentar eliminar el usuario.<br> Por favor, inténtelo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const showFormUpdate = (id) => {
    UserService.getById(id).then((data) => {
      setTitleForm('Editar usuario')
      setUser(data)
      setShowForm(true)
    })
  }

  const showFormCreate = () => {
    setTitleForm('Nuevo usuario')
    setUser(initialUser)
    setShowForm(true)
  }

  const showUpdatePassword = (id) => {
    UserService.getById(id).then((data) => {
      setUser(data)
      setShowFormPassword(true)
    })
  }

  return (
    <div>
      <Card className='!shadow-none border mb-5'>
        <DataTable value={listUsers} emptyMessage='No se encontraron resultados' scrollHeight='650px' size='small' stripedRows scrollable >
          <Column field='username' className='rounded-tl-md' header='Usuario'></Column>
          <Column field='shop' header='Local asignado'></Column>
          <Column field='rol' header='Tipo de usuario'></Column>
          <Column header='Acciones' className='rounded-tr-md' style={{ width: '5%' }}
            body={(rowData) => (
              <div className='flex gap-2'>
                <button className='bg-sky-500 rounded text-white px-2 py-1'
                  onClick={() => showUpdatePassword(rowData.id)}>
                  <i className='bi bi-key-fill'></i>
                </button>
                <button className='bg-yellow-500 rounded text-white px-2 py-1'
                  onClick={() => showFormUpdate(rowData.id)}>
                  <i className='bi bi-pencil-fill'></i>
                </button>
                <button className='bg-red-500 rounded text-white px-2 py-1'
                  onClick={() => handleDeleteUser(rowData.id)}>
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
            <span className='font-medium'>Agregar usuario</span>
          </div>
        </Card>
      </div>

      <Dialog visible={showFormPassword} showHeader={false} style={{ width: '22em' }}>
        <h3 className='text-2xl text-blue-500 font-bold'>Nueva contraseña</h3>
        <span>Establece una nueva contraseña para {user.username}</span>

        <div className='my-5'>
          <label htmlFor='password' className='font-medium block mb-2'>Contraseña</label>
          <InputText value={user.password} onChange={handleChange} name='password' className='p-inputtext-sm w-full' />
        </div>

        {errorMessage && <Message className='!mx-auto !mb-5' severity='error' text={errorMessage} />}

        <div className='flex gap-3'>
          <button className='w-full text-blue-500 font-medium' onClick={() => setShowFormPassword(false)}>Cancelar</button>
          <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleUpdatePassword}></Button>
        </div>
      </Dialog>

      <Dialog visible={showForm} showHeader={false} style={{ width: '22em' }}>
        <h3 className='text-2xl text-blue-500 font-bold mb-5'>{titleForm}</h3>

        <div className='mb-5'>
          <label htmlFor='nombre' className='font-medium block mb-2'>Nombre</label>
          <InputText value={user.username} onChange={handleChange} name='username' className='p-inputtext-sm w-full' />
        </div>

        {titleForm === 'Nuevo usuario' &&
          <div className='mb-5'>
            <label htmlFor='password' className='font-medium block mb-2'>Contraseña</label>
            <InputText value={user.password} onChange={handleChange} name='password' className='p-inputtext-sm w-full' />
          </div>
        }

        <div className='mb-5'>
          <label htmlFor='local' className='font-medium block mb-2'>Tipo de usuario</label>
          <Dropdown value={user.rol} options={roles} onChange={handleChange}
            name='rol' placeholder='Selecciona un tipo' className='p-inputtext-sm w-full' />
        </div>

        {user.rol === 'ROLE_USUARIO' &&
          <div className='mb-5'>
            <label htmlFor='local' className='font-medium block mb-2'>Local asignado</label>
            <Dropdown value={user.shop} options={listShops} onChange={handleChange} optionLabel='nombre'
              name='shop' placeholder='Selecciona un local' className='p-inputtext-sm w-full' />
          </div>
        }

        {errorMessage && <Message className='!mx-auto !mb-5' severity='error' text={errorMessage} />}

        <div className='flex gap-3'>
          <button className='w-full text-blue-500 font-medium' onClick={() => setShowForm(false)}>Cancelar</button>
          {titleForm === 'Nuevo usuario'
            ? <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleCreateUser}></Button>
            : <Button label='Confirmar' className='!w-full' type='submit' size='small' onClick={handleUpdateUser}></Button>
          }
        </div>
      </Dialog>
    </div>
  )
}