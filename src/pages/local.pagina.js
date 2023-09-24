import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2';
import { addLocale } from 'primereact/api'
import { ChevronDown, Download, Plus } from 'lucide-react'
import { formatDate, formatCurrency } from '../helper/format'
import { calendarioEspañol } from '../helper/configuracion.regional'

import LocalServicio from '../services/local.servicio'
import StockServicio from '../services/stock.servicio'
import { Paginator } from 'primereact/paginator'

export const LocalPagina = () => {
  const { nombre } = useParams();

  const [local, setLocal] = useState([])

  const [rubro, setRubro] = useState(null)
  const [marca, setMarca] = useState(null)
  const [fecha, setFecha] = useState(null)

  const [listaRubros, setListaRubros] = useState([])
  const [listaProductos, setListaProductos] = useState([])

  const [isExpanded, setIsExpanded] = useState(false)

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const [totalRegistros, setTotalRegistros] = useState(null)
  const [paginacionRequest, setPaginacionRequest] = useState([])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  };

  useEffect(() => {
    LocalServicio.obtenerPorNombre(nombre).then(data => {
      setLocal(data)
    })

    StockServicio.obtenerPorLocal(nombre).then(data => {
      setListaProductos(data.content);
    })
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Solo se eliminará el producto y su stock de este local",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        StockServicio.eliminar(id)
          .then((data) => {
            setListaProductos(listaProductos.filter((stock) => stock.id !== id));
            Swal.fire('Eliminado', 'El producto ha sido eliminado del local.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, inténtalo de nuevo más tarde.', 'error');
          });
      }
    })
  };

  addLocale('es', calendarioEspañol);

  return (
    <div className='lg:flex lg:justify-between p-5'>
      <div className='lg:w-1/6'>
        <Card title="Local" className='text-center !rounded-lg !shadow-md'>
          <div className='p-5'>
            <h2 className="text-2xl font-bold">{local.nombre}</h2>
            <p className="text-xl">{local.direccion}</p>
          </div>
        </Card>
        {local.tipo === 'LOCAL' &&
          <div>
            <Card title="Venta" className='text-center !rounded-lg !shadow-md mt-5'>
              <div className='p-5'>
                <div className='mb-5'>
                  <Link to={`/local/${local.nombre}/venta/registrar`}>
                    <Button label='Nueva venta' className='hover:!bg-blue-600 w-3/4' size='small' />
                  </Link>
                </div>
                <div>
                  <Link to={`/local/${local.nombre}/devolucion`}>
                    <Button label='Devolución' className='hover:!bg-blue-600 w-3/4' size='small' />
                  </Link>
                </div>
              </div>
            </Card>
            <Card title="Turno" className='text-center !rounded-lg !shadow-md mt-5'>
              <div className='p-5'>
                <div className='mb-5'>
                  <Button label='Abrir turno' className='hover:!bg-blue-600 w-3/4' size='small' />
                </div>
                <div>
                  <Button label='Cerrar turno' className='hover:!bg-blue-600 w-3/4' size='small' />
                </div>
              </div>
            </Card>
          </div>
        }
      </div>

      <div className='lg:w-5/6 lg:ms-5'>
        <Card title="Productos" className='!rounded-lg !shadow-md'>
          <div className='flex justify-between mt-5 mb-5'>
            <div>
              <Button label='Filtrar' className='peer hover:!bg-blue-600' size='small' onClick={toggleExpand}>
                <ChevronDown size={20} className='ms-2' />
              </Button>
            </div>
            <div>
              <Button label='Exportar a excel' className='hover:!bg-blue-600 !me-5' size='small'>
                <Download size={20} className='ms-2' />
              </Button>
              <Button label='Agregar' className='hover:!bg-blue-600' size='small' >
                <Plus size={20} className='ms-2' />
              </Button>
            </div>
          </div>

          <div className={`overflow-hidden transition-all duration-500 max-h-0 peer-pressed:max-h-40 ${isExpanded ? 'max-h-40' : ''}`}>
            <div className='flex border-2 mb-5 p-5'>
              <div className='flex-1 me-3'>
                <label htmlFor="proveedor" className='block font-medium text-lg mb-3'>Proveedor:</label>
                <Dropdown value={rubro} options={listaRubros} optionLabel="descripcion" className='w-full me-5'
                  onChange={(e) => setRubro(e.value)} filter />
              </div>
              <div className='flex-1 me-3'>
                <label htmlFor="rubro" className='block font-medium text-lg mb-3'>Rubro:</label>
                <Dropdown value={rubro} options={listaRubros} optionLabel="descripcion" className='w-full'
                  onChange={(e) => setRubro(e.value)} filter />
              </div>
              <div className='flex-1 me-3'>
                <label htmlFor="marca" className='block font-medium text-lg mb-3'>Marca:</label>
                <Dropdown value={rubro} options={listaRubros} optionLabel="descripcion" className='w-full'
                  onChange={(e) => setRubro(e.value)} filter />
              </div>
              <div className='flex-1 me-3'>
                <label htmlFor="proveedor" className='block font-medium text-lg mb-3'>Stock:</label>
                <Dropdown value={rubro} options={listaRubros} optionLabel="descripcion" className='w-full'
                  onChange={(e) => setRubro(e.value)} />
              </div>
              <div className='flex-1 me-3'>
                <label htmlFor="proveedor" className='block font-medium text-lg w-full mb-3'>Ult. Precio:</label>
                <Calendar value={fecha} onChange={(e) => setFecha(e.value)} showIcon dateFormat="dd/mm/yy" locale="es" />
              </div>
              <div className='flex-1 me-3'>
                <label htmlFor="proveedor" className='block font-medium text-lg w-full mb-3'>Cantidad:</label>
                <Dropdown value={rubro} options={listaRubros} optionLabel="descripcion" className='w-full'
                  onChange={(e) => setRubro(e.value)} />
              </div>
              <div className='flex-1 me-3'>
                <label htmlFor="proveedor" className='block font-medium text-lg invisible mb-3'>boton</label>
                <Button label='Aplicar' className='hover:!bg-blue-600' />
              </div>
            </div>
          </div>

          <DataTable value={listaProductos} stripedRows rows={10} size='small'>
            <Column field="producto.codigo" header="Código" style={{ width: '10%' }}></Column>
            <Column field="producto.descripcion" header="Descripción" style={{ width: '25%' }}></Column>
            <Column field="producto.precioEfectivo" header="Efectivo" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.precioEfectivo ? formatCurrency(rowData.producto.precioEfectivo) : ''}>
            </Column>
            <Column field="producto.precioDebito" header="Débito" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.precioDebito ? formatCurrency(rowData.producto.precioDebito) : ''}>
            </Column>
            <Column field="producto.precioCredito" header="Crédito" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.precioCredito ? formatCurrency(rowData.producto.precioCredito) : ''}>
            </Column>
            <Column field='producto.ultActPrecio' header="Ult. Precio" style={{ width: '10%' }}
              body={(rowData) => rowData.producto.ultActPrecio ? formatDate(rowData.producto.ultActPrecio) : ''}></Column>
            <Column field="ultActStock" header="Ult. Stock" style={{ width: '10%' }}
              body={(rowData) => rowData.ultActStock ? formatDate(rowData.ultActStock) : ''}></Column>
            <Column field="cantidad" header="Unidades" alignHeader={'center'} style={{ width: '5%' }}
              body={(rowData) => (<p className='text-center'>{rowData.cantidad}</p>)}>
            </Column>
            <Column header="Acciones" alignHeader={'center'} style={{ width: '10%' }}
              body={(rowData) => (
                <div className='flex'>
                  <Link to={`/producto/detalle/${rowData.producto.id}`} className='me-3'>
                    <button className='bg-blue-500 rounded text-xl text-white px-2 py-1'>
                      <i className='bi bi-eye-fill'></i>
                    </button>
                  </Link>
                  <Link to={`/producto/modificar/${rowData.producto.id}`} className='me-3'>
                    <button className='bg-yellow-500 rounded text-xl text-white px-2 py-1'>
                      <i className='bi bi-pencil-fill'></i>
                    </button>
                  </Link>
                  <button className='bg-red-500 rounded text-xl text-white px-2 py-1'
                    onClick={() => handleDelete(rowData.id)}>
                    <i className='bi bi-trash-fill'></i>
                  </button>
                </div>
              )}>
            </Column>
          </DataTable>
          <Paginator first={first} rows={rows} pageLinkSize={5} totalRecords={totalRegistros} className='mt-5 !p-0'></Paginator>
        </Card>
      </div >
    </div >
  )
}
