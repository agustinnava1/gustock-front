import { Plus } from "lucide-react";
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"

import ProveedorService from "../services/proveedor.service"
import { DeleteProveedorComponent } from "./proveedor/delete.component";
import { CreateProveedorComponent } from "./proveedor/create.component";

export const ProveedorComponent = () => {
  const [proveedorId, setProveedorId] = useState(null);
  const [listaProveedores, setListaProveedores] = useState([])

  const [showDeleteProveedor, setShowDeleteProveedor] = useState(false);
  const [showFormCreateProveedor, setShowFormCreateProveedor] = useState(false);

  useEffect(() => {
    ProveedorService.getAll().then(data => {
      setListaProveedores(data);
    })
  }, []);

  const updateListaProveedores = (updatedListaProveedores) => {
    setListaProveedores(updatedListaProveedores);
  };

  return (
    <div className="p-5">
      <div className="border rounded p-5">
        <DataTable value={listaProveedores} scrollable scrollHeight="350px" size="small">
          <Column field="razonSocial" header="Razon social"></Column>
          <Column field="ciudad" header="Ciudad"></Column>
          <Column header="Acciones" style={{ width: '10%' }}
            body={(rowData) => (
              <div className='flex'>
                <span className='me-3'>
                  <Button icon="pi pi-pencil" severity="warning" size='small'
                  ></Button>
                </span>
                <Button icon="pi pi-trash" severity="danger" size='small'
                  onClick={() => {
                    setProveedorId(rowData.id);
                    setShowDeleteProveedor(true);
                  }}>
                </Button>
              </div>
            )}>
          </Column>
        </DataTable>
      </div>
      <div className="text-end mt-5">
        <Button label="Agregar" className="hover:!bg-blue-600" size="small"
          onClick={() => setShowFormCreateProveedor(true)}>
          <Plus size={20} className='ms-2' />
        </Button>
      </div>

      {showFormCreateProveedor && <CreateProveedorComponent />}
      {showDeleteProveedor && <DeleteProveedorComponent
      proveedorId={proveedorId} 
      listaProveedores={listaProveedores}
      updateListaProveedores={updateListaProveedores}/>}
    </div>
  )
}
