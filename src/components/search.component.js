import { useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

export const SearchComponent = ({ visible, onHide }) => {
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const redirectToSearch = () => {
    onHide(false)
    navigate(`/producto/buscar/${searchValue}`)
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <Dialog header='Buscar producto' headerClassName='!bg-[#282C36] !text-gray-400' className="bg-blue-500 w-1/4" visible={visible} onHide={onHide}>
          <div className="p-inputgroup flex-1">
            <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
              className="!shadow-none w-full" placeholder='Ingrese código, código de barras o descripción' autoFocus />
            <Button icon="pi pi-search"  onClick={redirectToSearch} />
          </div>
        </Dialog>
      </div>
    </div>
  )

}