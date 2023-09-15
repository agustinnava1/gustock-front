import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import { addLocale } from 'primereact/api';

import LocalService from '../services/local.service';
import StockService from '../services/stock.service';
import RubroService from '../services/rubro.service';

import { formatDate, formatCurrency } from "../helper/format";
import Swal from 'sweetalert2';
import { ChevronDown, Download, Plus } from 'lucide-react';

export const LocalPage = () => {
  const { id } = useParams();

  const [local, setLocal] = useState([]);
  const [date, setDate] = useState(null);
  const [rubro, setRubro] = useState(null);

  const [listaRubros, setListaRubros] = useState([])
  const [listaProductos, setListaProductos] = useState([])

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    loadProducts()
  }, []);

  const loadProducts = async () => {
    LocalService.getById(id).then(data => {
      setLocal(data);
    })

    StockService.getAllByLocalId(id).then(data => {
      setListaProductos(data);
    })

    RubroService.getAll().then(data => {
      setListaRubros(data);
    })
  };

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
        StockService.delete(id)
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

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });

  return (
    <div className='lg:flex justify-between m-5'>
      <div className='w-1/6'>
        <Card title="Local" className='text-center border drop-shadow !shadow-none'>
          <h2 className="text-[28px]">{local.nombre}</h2>
          <p className="text-[20px]">{local.direccion}</p>
        </Card>
        <Card title="Venta" className='text-center border drop-shadow !shadow-none mt-5'>
          <div className='mb-5'>
            <Link to={`/local/${local.nombre}/venta`}>
              <Button label='Nueva venta' className='hover:!bg-blue-600 w-3/4' size='small' />
            </Link>
          </div>
          <div>
            <Link to={`/local/${local.nombre}/devolucion`}>
              <Button label='Devolución' className='hover:!bg-blue-600 w-3/4' size='small' />
            </Link>
          </div>
        </Card>
        <Card title="Turno" className='text-center border drop-shadow !shadow-none mt-5'>
          <div className='mb-5'>
            <Button label='Abrir turno' className='hover:!bg-blue-600 w-3/4' size='small' />
          </div>
          <div>
            <Button label='Cerrar turno' className='hover:!bg-blue-600 w-3/4' size='small' />
          </div>
        </Card>
      </div>

      <div className='w-5/6 ms-5'>
        <Card title="Productos" className='border drop-shadow !shadow-none'>
          <div className='flex justify-between mb-5'>
            <div>
              <Button label='Filtrar' className='hover:!bg-blue-600' size='small' onClick={toggleExpand}>
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

          <div className={`overflow-hidden transition-all ${isExpanded ? '' : 'max-h-0 h-0'}`}>
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
                <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon dateFormat="dd/mm/yy" locale="es" />
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

          <DataTable value={listaProductos} stripedRows paginator className='!custom-thead'
            rows={10} rowsPerPageOptions={[10, 20, 30, 40, 50, 100]} size='small'>
            <Column field="producto.codigo" header="Código" style={{ width: '10%' }}></Column>
            <Column field="producto.descripcion" header="Descripción" style={{ width: '20%' }}></Column>
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
            <Column field="cantidad" header="Unidades" sortable style={{ width: '10%' }}></Column>
            <Column header="Acciones" style={{ width: '10%' }}
              body={(rowData) => (
                <div className='flex'>
                  <Link to={`/producto/detalle/${rowData.producto.id}`} className='me-3'>
                    <Button icon="pi pi-eye" severity="info" size='small'></Button>
                  </Link>
                  <Link to={`/producto/modificar/${rowData.producto.id}`} className='me-3'>
                    <Button icon="pi pi-pencil" severity="warning" size='small'></Button>
                  </Link>
                  <Button icon="pi pi-trash" severity="danger" size='small'
                    onClick={() => handleDelete(rowData.id)}></Button>
                </div>
              )}>
            </Column>
          </DataTable>
        </Card>
      </div >
    </div >
  )
}

