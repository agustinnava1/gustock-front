
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"

import Swal from 'sweetalert2';
import ProveedorService from "../../../../services/proveedor.servicio"

import { Card } from "primereact/card";
import { CreateProviderComponent } from "./create.provider.component";
import { UpdateProviderComponent } from "./update.provider.component";

export const ProveedorComponent = () => {
  const [listProviders, setListProviders] = useState([])
  const [showCreateProvider, setShowCreateProvider] = useState(false);
  const [showUpdateProvider, setShowUpdateProvider] = useState(false);

  useEffect(() => {
    loadProviders()
  }, []);

  const loadProviders = () => {
    ProveedorService.getAll().then(data => {
      setListProviders(data)
    })
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará al proveedor del sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        ProveedorService.delete(id)
          .then((data) => {
            loadProviders()
            Swal.fire('Eliminado', 'El proveedor ' + data + ' ha sido eliminado del sistema.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al eliminar el proveedor. Por favor, inténtalo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  const handleUpdate = async (id) => {
    
  }

  return (
    <Card className="!shadow-none border">
      <h2 className="text-2xl font-medium mb-5">Proveedores</h2>
      <DataTable value={listProviders} emptyMessage="No se encontraron proveedores" scrollHeight="650px" size="small" stripedRows scrollable >
        <Column field="razonSocial" className="rounded-tl-md" header="Razon social"></Column>
        <Column field="ciudad" header="Ciudad"></Column>
        <Column header="Acciones" className="rounded-tr-md" style={{ width: '10%' }}
          body={(rowData) => (
            <div className='flex'>
              <button className='bg-yellow-500 rounded text-xl text-white px-2 py-1 me-3'
                onClick={() => handleUpdate(rowData.id)}>
                <i className='bi bi-pencil-fill'></i>
              </button>
              <button className='bg-red-500 rounded text-xl text-white px-2 py-1'
                onClick={() => handleDelete(rowData.id)}>
                <i className='bi bi-trash-fill'></i>
              </button>
            </div>
          )}>
        </Column>
      </DataTable>

      <div className="text-end">
        <Button label="Agregar" className="!mt-5" size="small" onClick={() => setShowCreateProvider(true)} />
      </div>

      <CreateProviderComponent visible={showCreateProvider} onHide={() => setShowCreateProvider(false)} loadProviders={loadProviders()} />
    </Card>
  )
}
