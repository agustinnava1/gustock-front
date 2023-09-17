import { Card } from "primereact/card"
import { Paginator } from 'primereact/paginator';
import { useState } from "react";

export const NotificacionesPage = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="m-5">
      <h2 className="sm:text-4xl text-5xl font-medium mb-5">Mis notificaciones</h2>
      <span class="text-xl font-normal">Echa un vistazo a tus últimas notificaciones</span>
      <div className='lg:flex justify-between mt-5'>
        <div className='w-1/6'>
          <Card title='Locales' className="drop-shadow !shadow-none">

          </Card>
        </div>
        <div className='w-5/6 ms-5'>
          <Card title='Notificaciones' className="drop-shadow !shadow-none">
            <div className="card">
              <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}