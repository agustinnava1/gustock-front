import { Accordion, AccordionTab } from 'primereact/accordion';

import { MarcaComponent } from '../components/marca.component';
import { ProveedorComponent } from '../components/proveedor.component';

export const PanelPage = () => {
  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-5">Panel de administración</h2>
      <span class="text-xl font-normal">Mantén un control preciso de tu inventario y supervisa todos los productos registrados en el sistema.</span>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        <Accordion activeIndex={[0]}>
          <AccordionTab header="Proveedores">
            <ProveedorComponent></ProveedorComponent>
          </AccordionTab>
        </Accordion>
        <Accordion activeIndex={[0]}>
          <AccordionTab header="Marcas">
            <MarcaComponent></MarcaComponent>
          </AccordionTab>
        </Accordion>
        <Accordion activeIndex={[0]}>
          <AccordionTab header="Rubros">
          </AccordionTab>
        </Accordion>
        <Accordion activeIndex={[0]}>
          <AccordionTab header="Sucursales">
            <ProveedorComponent></ProveedorComponent>
          </AccordionTab>
        </Accordion>
        <Accordion activeIndex={[0]}>
          <AccordionTab header="Usuarios">
          </AccordionTab>
        </Accordion>
      </div>
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