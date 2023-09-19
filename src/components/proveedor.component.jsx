import { Plus } from "lucide-react";
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"

import ProveedorServicio from "../services/proveedor.service"
import { DeleteProveedorComponent } from "./proveedor/delete.component";
import { CreateProveedorComponent } from "./proveedor/create.component";

export const ProveedorComponent = () => {
  const [proveedorId, setProveedorId] = useState(null);
  const [listaProveedores, setListaProveedores] = useState([])

  const [showDeleteProveedor, setShowDeleteProveedor] = useState(false);
  const [mostrarCrearProveedor, setMostrarCrearProveedor] = useState(false);

  useEffect(() => {
    ProveedorServicio.listar().then(data => {
      setListaProveedores(data);
    })
  }, []);

  const updateListaProveedores = (updatedListaProveedores) => {
    setListaProveedores(updatedListaProveedores);
  };

  return (
    <div>
      <div className="border p-5">
        <DataTable value={listaProveedores} scrollable scrollHeight="350px" size="small" >
          <Column field="razonSocial" header="Razon social"></Column>
          <Column field="ciudad" header="Ciudad"></Column>
          <Column header="Acciones" style={{ width: '10%' }}
            body={(rowData) => (
              <div className='flex'>
                <button className='bg-yellow-500 rounded text-xl text-white px-2 py-1 me-3'>
                  <i className='bi bi-pencil-fill'></i>
                </button>

                <button className='bg-red-500 rounded text-xl text-white px-2 py-1'
                  onClick={() => { setProveedorId(rowData.id); setShowDeleteProveedor(true); }}>
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            )}>
          </Column>
        </DataTable>
        <Button label="Agregar" className="!mt-5 hover:!bg-blue-600" size="small"
          onClick={() => setMostrarCrearProveedor(true)}>
          <Plus size={20} className='ms-2' />
        </Button>
      </div>

      {mostrarCrearProveedor && <CreateProveedorComponent />}
      {showDeleteProveedor && <DeleteProveedorComponent
        proveedorId={proveedorId}
        listaProveedores={listaProveedores}
        updateListaProveedores={updateListaProveedores} />}
    </div>
  )
}
