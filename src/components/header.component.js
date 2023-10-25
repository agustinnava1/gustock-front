import { useState } from 'react'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const redirectToSearch = () => {
    navigate(`/producto/buscar/${searchValue}`)
  };

  /*const user = JSON.parse(localStorage.getItem("loggedUser"));
  const rol = user.rol.match(/\[ROLE_(.*?)\]/)[1];*/

  return (
    <nav className='flex justify-between bg-white border-b w-full p-4'>
      <div className="!w-1/4 p-inputgroup">
        <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type='text'
          className="w-full !p-inputtext-sm" placeholder='Ingrese código, código de barras o descripción' />
        <Button icon="pi pi-search" onClick={redirectToSearch} />
      </div>
      <div className='flex-1 text-end my-auto'>
        <span className=''>GUSTOCK</span>
      </div>
    </nav>
  )
}
