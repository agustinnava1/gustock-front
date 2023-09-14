import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';

export const PanelPage = () => {
  return (
    <div className='m-5'>
      <h2 className="sm:text-4xl text-5xl font-medium mb-5">Panel de administración</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-briefcase text-7xl"></i>
          <p class="font-medium text-2xl mt-5">PROVEEDORES</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-person text-7xl"></i>
          <p class="font-medium text-2xl mt-5">USUARIOS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-bookmark text-7xl"></i>
          <p class="font-medium text-2xl mt-5">RUBROS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-tag text-7xl"></i>
          <p class="font-medium text-2xl mt-5">MARCAS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-shop text-7xl"></i>
          <p class="font-medium text-2xl mt-5">SUCURSALES</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-bag text-7xl"></i>
          <p class="font-medium text-2xl mt-5">VENTAS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-box text-7xl"></i>
          <p class="font-medium text-2xl mt-5">PRODUCTOS</p>
        </Card>
        <Card className='text-center border drop-shadow !shadow-none'>
          <i className="bi bi-gear text-7xl"></i>
          <p class="font-medium text-2xl mt-5">AJUSTES</p>
        </Card>
      </div>
    </div>
  )
}