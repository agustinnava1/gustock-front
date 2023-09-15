import { Plus } from "lucide-react";
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"

import Swal from 'sweetalert2';
import ProveedorService from "../services/proveedor.service"

export const ProveedorComponent = () => {
  const { id } = useState(null);
  const [listaProveedores, setListaProveedores] = useState([])

  useEffect(() => {
    ProveedorService.getAll().then(data => {
      setListaProveedores(data);
    })
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará al proveedor de la base del sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        ProveedorService.delete(id)
          .then((data) => {
            setListaProveedores(listaProveedores.filter((p) => p.id !== id));
            Swal.fire('Eliminado', 'El proveedor ha sido eliminado del sistema.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el proveedor. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  };

  return (
    <div>
      <div className="border rounded p-5">
        <DataTable value={listaProveedores} scrollable scrollHeight="400px" size="small">
          <Column field="razonSocial" header="Razon social"></Column>
          <Column field="ciudad" header="Ciudad"></Column>
          <Column header="Acciones" style={{ width: '10%' }}
            body={(rowData) => (
              <div className='flex'>
                <span className='me-3'>
                  <Button icon="pi pi-pencil" severity="warning" size='small'></Button>
                </span>
                <Button icon="pi pi-trash" severity="danger" size='small'
                  onClick={() => handleDelete(rowData.id)}></Button>
              </div>
            )}>
          </Column>
        </DataTable>
      </div>
      <div className="text-end mt-5">
        <Button label="Agregar" className="hover:!bg-blue-600" size="small">
          <Plus size={20} className='ms-2' />
        </Button>
      </div>
    </div>
  )
}
