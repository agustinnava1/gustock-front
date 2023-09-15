import { Plus } from "lucide-react";
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"

import Swal from 'sweetalert2';
import MarcaService from "../services/marca.service";

export const MarcaComponent = () => {
  const { id } = useState(null);
  const [listaMarcas, setListaMarcas] = useState([])

  useEffect(() => {
    MarcaService.getAll().then(data => {
      setListaMarcas(data);
    })
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará la marca de la base del sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        MarcaService.delete(id)
          .then(() => {
            setListaMarcas(listaMarcas.filter((m) => m.id !== id));
            Swal.fire('Eliminado', 'La marca ha sido eliminado del sistema.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la marca. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  };

  return (
    <div className="p-5">
      <div className="border rounded p-5">
        <DataTable value={listaMarcas} scrollable scrollHeight="350px" size="small">
          <Column field="descripcion" header="Descripción"></Column>
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
