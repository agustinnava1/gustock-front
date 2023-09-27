import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";


export default function Buscador() {
  const [mostrarBuscador, setMostrarBuscador] = useState(false)

  return (
    <div>
      <div className="card flex justify-content-center">
        <Dialog header="Buscar producto por código, código de barras o descripción" className="bg-blue-500"
          visible={mostrarBuscador} style={{ width: '50vw' }} onHide={() => setMostrarBuscador(false)}>
          <InputText className="p-inputtext-lg w-full !shadow-none" autoFocus></InputText>
        </Dialog>
      </div>
    </div>
  )
}
