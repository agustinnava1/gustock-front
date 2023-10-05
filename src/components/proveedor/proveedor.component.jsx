
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { useState, useEffect } from "react"
import { DataTable } from "primereact/datatable"

import Swal from 'sweetalert2';
import ProveedorService from "../../services/proveedor.servicio"

import { CreateProveedorComponent } from "./create.component";

export const ProveedorComponent = () => {
  const [listProviders, setListProviders] = useState([])
  const [showCreateProveedor, setShowCreateProveedor] = useState(false);

  useEffect(() => {
    ProveedorService.getAll().then(data => {
      setListProviders(data)
    })
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará al proveedor del sistema",
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
            setListProviders(listProviders.filter(item => item.id !== id))
            Swal.fire('Eliminado', 'El proveedor ' + data + ' ha sido eliminado del sistema.', 'success')
          })
          .catch(() => {
            Swal.fire('Error', 'Hubo un problema al eliminar el proveedor. Por favor, inténtalo de nuevo más tarde.', 'error')
          });
      }
    })
  }

  return (
    <div>
      <DataTable value={listProviders} emptyMessage="No se encontraron proveedores"
        scrollHeight="350px" size="small" stripedRows scrollable >
        <Column field="razonSocial" header="Razon social"></Column>
        <Column field="ciudad" header="Ciudad"></Column>
        <Column header="Acciones" style={{ width: '10%' }}
          body={(rowData) => (
            <div className='flex'>
              <button className='bg-yellow-500 rounded text-xl text-white px-2 py-1 me-3'>
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
      <Button label="Agregar" className="hover:!bg-blue-600 !mt-5" size="small" onClick={() => setShowCreateProveedor(true)} />

      <CreateProveedorComponent visible={showCreateProveedor} onHide={() => setShowCreateProveedor(false)} />
    </div>
  )
}
