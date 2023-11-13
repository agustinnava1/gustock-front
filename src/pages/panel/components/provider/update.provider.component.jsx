import { useState } from "react"

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import Swal from 'sweetalert2';
import ProveedorService from "../../../../services/proveedor.servicio"

export const UpdateProviderComponent = ({ visible, onHide, loadProviders }) => {

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
    <Dialog visible={visible} style={{ width: '20em' }}>
      <form onSubmit={handleCreateProveedor} className="pt-5">
        <div className='mb-3'>
          <label htmlFor='razonSocial' className='font-medium block mb-2'>Razon social</label>
          <InputText value={proveedor.razonSocial} onChange={handleChange} name='razonSocial' className='p-inputtext-sm w-full' required />
        </div>
        <div className='mb-8'>
          <label htmlFor='ciudad' className='font-medium block mb-2'>Ciudad</label>
          <InputText value={proveedor.ciudad} onChange={handleChange} name='ciudad' className='p-inputtext-sm w-full' required />
        </div>
        {error}
        <div className="flex gap-3">
          <button className="!w-full text-blue-500 font-medium" size="small" onClick={onHide}>Cancelar</button>
          <Button label='Confirmar' className="!w-full" type="submit" size="small"></Button>
        </div>
      </form>
    </Dialog>
  )
}