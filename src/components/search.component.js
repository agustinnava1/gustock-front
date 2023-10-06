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
        <Dialog header="Buscar producto" className="bg-blue-500" visible={visible} onHide={onHide}>
          <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
            className="p-inputtext-lg !mb-5 w-full !shadow-none" placeholder='Ingrese código, código de barras o descripción' autoFocus />
          <Button label="Buscar" className="w-full" size="small" onClick={redirectToSearch} />
        </Dialog>
      </div>
    </div>
  )

}