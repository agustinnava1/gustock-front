import { Card } from "primereact/card"
import { Paginator } from 'primereact/paginator';
import { useState } from "react";

export const NotificacionesPagina = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl font-medium mb-3">Notificaciones</h2>
      <span className="text-xl font-normal">Hecha un vistazo a tus últimas notificaciones</span>
      
      <div className='lg:flex justify-between mt-5'>
        <div className='w-1/6'>
          <Card title='Locales' className="drop-shadow !shadow-none">

          </Card>
        </div>
        <div className='w-5/6 ms-5'>
          <Card className="drop-shadow !shadow-none">
            <div className="card">
              <Paginator first={first} rows={rows} totalRecords={120} onPageChange={onPageChange} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}