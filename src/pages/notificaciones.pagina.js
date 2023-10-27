import { DateTime } from 'luxon'
import { Tag } from 'primereact/tag'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { useContext, useEffect, useState } from 'react'

import UserContext from '../user.context'
import NotificationService from '../services/notification.service'

export const NotificacionesPagina = () => {
  const [user, setUser] = useContext(UserContext)

  const params = {
    page: 0,
    shop: null,
    user: user.sub,
    recordsQuantity: 50
  }

  const [rows, setRows] = useState(10)
  const [first, setFirst] = useState(0)
  const [totalElements, setTotalElements] = useState(null)

  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [listNotifications, setListNotifications] = useState([])

  useEffect(() => {
    NotificationService.getAllByUserAndShop(params).then(data => {
      setListNotifications(data.content)
      setTotalElements(data.totalElements)
    })
  }, [])

  const renderSubject = (rowData) => {
    const subject = rowData.subject

    const subjectSeverities = {
      'error en el stock': 'danger',
      'stock sin registrar': 'warning',
    };

    const defaultSeverity = 'primary'
    const severity = subject ? subjectSeverities[subject.toLowerCase()] : defaultSeverity

    return <Tag value={subject} severity={severity} />
  }

  const renderMessage = (rowData, column) => {
    const maxLength = 170
    const message = rowData[column.field];

    if (message.length > maxLength) {
      return message.substring(0, maxLength) + '...'
    } else {
      return message
    }
  }

  const renderDate = (rowData) => {
    const dateObject = DateTime.fromISO(rowData.dateTime, { zone: 'America/Argentina/Buenos_Aires' });
    const formattedDate = dateObject.setLocale('es').toFormat('LLL dd');
    return formattedDate;
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)

    const request = {
      ...params,
      page: event.page,
    }

    NotificationService.getAllByUserAndShop(request).then(data => {
      setListNotifications(data.content)
      console.log(data.content)
      console.log(request)
    })
  }

  return (
    <div className='p-5'>
      <h2 className='text-3xl font-medium mb-3'>Notificaciones</h2>
      <Card className='!shadow border]'>
        <div className='max-h-[750px] overflow-y-auto'>
          <DataTable value={listNotifications} stripedRows emptyMessage='No hay notificaciones por el momento' size='small' dataKey='idInbox'
            selectionMode={'checkbox'} selection={selectedNotifications} onSelectionChange={(e) => setSelectedNotifications(e.value)}
            onRow>
            <Column selectionMode='multiple' className='rounded-tl-lg' style={{ width: '1%' }} />
            <Column field='from' className='font-medium' style={{ width: '5%' }} />
            <Column field='subject' style={{ width: '10%' }} body={renderSubject} />
            <Column field='message' style={{ width: '79%' }} body={renderMessage} />
            <Column field='dateTime' className='font-medium' style={{ width: '5%' }} body={renderDate} />

            <Column style={{ width: '0%' }}>
              <div className="hidden-content">
                This is the additional content you want to display on hover.
              </div>
            </Column>
          </DataTable>
        </div>
        <Paginator first={first} rows={rows} totalRecords={totalElements}
          pageLinkSize={3} onPageChange={onPageChange} className='mt-5 !p-0' />
      </Card>
    </div>
  )
}