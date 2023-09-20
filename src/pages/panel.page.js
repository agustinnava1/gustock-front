import { Card } from 'primereact/card';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { PanelMenu } from 'primereact/panelmenu';

import { MarcaComponent } from '../components/marca.component';
import { RubroComponent } from '../components/rubro.component';
import { ProveedorComponent } from '../components/proveedor.component';
import { DataTable } from 'primereact/datatable';

export const PanelPage = () => {

  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-5">Panel de administración</h2>
      <span className="text-xl font-normal">Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema.</span>

      <Accordion activeIndex={0} className='mt-5 drop-shadow'>
        <AccordionTab header="Proveedor">
          <ProveedorComponent></ProveedorComponent>
        </AccordionTab>
        <AccordionTab header="Rubro">
          <RubroComponent></RubroComponent>
        </AccordionTab>
        <AccordionTab header="Marca">
          <MarcaComponent></MarcaComponent>
        </AccordionTab>
        <AccordionTab header="Sucursales">
        </AccordionTab>
        <AccordionTab header="Usuarios">
        </AccordionTab>
      </Accordion>
    </div >
  )
}



/*<Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-briefcase text-7xl"></i>
          <p class="font-medium text-2xl mt-5">PROVEEDORES</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-person text-7xl"></i>
          <p class="font-medium text-2xl mt-5">USUARIOS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-bookmark text-7xl"></i>
          <p class="font-medium text-2xl mt-5">RUBROS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-tag text-7xl"></i>
          <p class="font-medium text-2xl mt-5">MARCAS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-shop text-7xl"></i>
          <p class="font-medium text-2xl mt-5">SUCURSALES</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-bag text-7xl"></i>
          <p class="font-medium text-2xl mt-5">VENTAS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-box text-7xl"></i>
          <p class="font-medium text-2xl mt-5">PRODUCTOS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none !bg-blue-500 !text-white'>
          <i className="bi bi-gear text-7xl"></i>
          <p class="font-medium text-2xl mt-5">AJUSTES</p>
        </Card>*/