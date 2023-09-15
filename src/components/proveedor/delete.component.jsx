import Swal from 'sweetalert2';

import ProveedorService from '../../services/proveedor.service';

export const DeleteProveedorComponent = ({ proveedorId, listaProveedores ,updateListaProveedores }) => {
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
      ProveedorService.delete(proveedorId)
        .then(() => {
          const updatedListaProveedores = listaProveedores.filter(item => item.id !== proveedorId);
          updateListaProveedores(updatedListaProveedores);
          Swal.fire('Eliminado', 'El proveedor ha sido eliminado del sistema.', 'success');
        })
        .catch(() => {
          Swal.fire('Error', 'Hubo un problema al eliminar el proveedor. Por favor, inténtalo de nuevo más tarde.', 'error');
        });
    }
  })
}
