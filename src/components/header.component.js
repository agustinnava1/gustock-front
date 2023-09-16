import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";


export default function Header() {
  const [visible, setVisible] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const rol = user.rol.match(/\[ROLE_(.*?)\]/)[1];

  return (
    <nav className="flex justify-between bg-white w-full p-4">
      <span className="flex-auto text-3xl font-bold text-blue-500 ms-2 my-auto">GUSTOCK</span>
      <span className="flex-auto text-xl text-end font-semibold text-blue-500 my-auto">{user.name} | {rol}</span>
    </nav>
  )
}

/*
<div className="flex-auto p-input-icon-left">
        <Button label='Buscar producto' className="hover:!bg-blue-600" size="small" onClick={() => setVisible(true)}></Button>
        <div className="card flex justify-content-center">
          <Dialog header="Buscar producto por código, código de barras o descripción" className="bg-blue-500"
            visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <InputText className="p-inputtext-lg w-full !shadow-none" autoFocus></InputText>
          </Dialog>
        </div>
      </div>
*/