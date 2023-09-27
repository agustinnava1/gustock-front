import { useState } from "react"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"

import Swal from 'sweetalert2';
import ProveedorServicio from "../../services/proveedor.servicio"

export const CreateProveedorComponent = () => {
  const [visible, setVisible] = useState(false);
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

    ProveedorServicio.crear(proveedor).then((resp) => {
      console.log(resp)
    }).catch((error) => {

    })
  }

  return (
    <Dialog header='Agregar nuevo proveedor' visible={visible} onHide={() => setVisible(false)} style={{ width: '20vw' }}>
      <form onSubmit={handleCreateProveedor}>
        <div className='mb-5'>
          <label htmlFor='razonSocial' className='text-lg font-bold block mb-2'>Razon social</label>
          <InputText value={proveedor.razonSocial} onChange={handleChange} name='razonSocial' className='w-full'></InputText>
        </div>
        <div className='mb-5'>
          <label htmlFor='ciudad' className='text-lg font-bold block mb-2'>Ciudad</label>
          <InputText value={proveedor.ciudad} onChange={handleChange} name='ciudad' className='w-full'></InputText>
        </div>
        <Button label='Confirmar' type="submit"></Button>
      </form>
    </Dialog>
  )
}