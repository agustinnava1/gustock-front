import { useState } from "react"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"

import Swal from 'sweetalert2';
import ProveedorService from "../../services/proveedor.servicio"

export const CreateProveedorComponent = ({ visible, onHide }) => {
  const [error, setError] = useState(null)
  const [proveedor, setProveedor] = useState({
    razonSocial: "",
    ciudad: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor({
      ...proveedor,
      [name]: value
    });
  };

  const handleCreateProveedor = async (e) => {
    e.preventDefault();
    if (proveedor.razonSocial === "" || proveedor.ciudad === "") {
      return;
    }

    ProveedorService.save(proveedor).then((resp) => {
      Swal.fire(resp.razonSocial, 'Se ha registrado con exito en el sistema.', 'success')

      onHide();
    }).catch((error) => {
      setError(error.message)
    })
  }

  return (
    <Dialog visible={visible} onHide={onHide} header={'Nuevo proveedor'}
      headerClassName="!bg-blue-500 !text-white !text-2xl !p-4 !rounded-t !rounded !p-0" style={{ width: '23em' }}>
      <form onSubmit={handleCreateProveedor} className="pt-5">
        <div className='mb-3'>
          <label htmlFor='razonSocial' className='text-lg font-bold block mb-2'>Razon social</label>
          <InputText value={proveedor.razonSocial} onChange={handleChange} name='razonSocial' className='p-inputtext-sm w-full' required />
        </div>
        <div className='mb-8'>
          <label htmlFor='ciudad' className='text-lg font-bold block mb-2'>Ciudad</label>
          <InputText value={proveedor.ciudad} onChange={handleChange} name='ciudad' className='p-inputtext-sm w-full' required />
        </div>
        {error}
        <Button label='Confirmar' className="!w-full !me-3 hover:!bg-blue-600" type="submit" size="small"></Button>
      </form>
    </Dialog>
  )
}