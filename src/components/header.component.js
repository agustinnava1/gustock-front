import { useContext, useState } from "react"

import { MenuIcon } from "lucide-react"
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'

import Menu from "./menu.component"
import UserContext from '../user.context'
import removeCookie from '../hooks/remove.cookie'

export default function Header() {
  const [user, setUser] = useContext(UserContext)
  const [searchValue, setSearchValue] = useState('')
  const [displayMenu, setDisplayMenu] = useState(true)

  const navigate = useNavigate()

  const logOut = () => {
    setUser(null)
    removeCookie('jwt_authorization')
  }

  const redirectToSearch = () => {
    if(searchValue === '') {
      return 
    }
    navigate(`/producto/buscar/${searchValue}`)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      redirectToSearch()
    }
  }

  return (
    <nav className='bg-white w-full px-5 py-4 border-b'>
      <div className="hidden lg:flex justify-between">
        <div className="w-1/2">
          <div className="p-inputgroup h-[44px]">
            <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyPress} type='text'
              className="w-full !p-inputtext-sm" placeholder='Ingrese código, código de barras o descripción' />
            <Button label="Buscar" onClick={redirectToSearch} size="small" />
          </div>
        </div>

        <Button onClick={logOut} label="Cerrar sesión" size="small" />
      </div>

      <div className="flex justify-between items-center lg:hidden">
        <span className="text-2xl text-blue-500 font-bold">GUSTOCK</span>
        <MenuIcon className="cursor-pointer" size={30} />
      </div>
    </nav>
  )
}
