import { useContext, useEffect, useRef, useState } from 'react'

import { DateTime } from 'luxon'
import { Tag } from 'primereact/tag'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Paginator } from 'primereact/paginator'
import { Eye, Mail, MailOpen, Send, Trash2 } from 'lucide-react'

import UserContext from '../user.context'
import ShopService from '../services/local.servicio'
import NotificationService from '../services/notification.service'

export const NotificacionesPagina = () => {

  const toast = useRef(null)
  const [user, setUser] = useContext(UserContext)
  const rolname = user.roles.match(/ROLE_(\w+)/)[1]
  const [showAllRead, setShowAllRead] = useState(false)

  const params = {
    page: 0,
    shop: '',
    user: user.sub,
    recordsQuantity: 50
  }

  const [rows, setRows] = useState(50)
  const [first, setFirst] = useState(0)
  const [totalElements, setTotalElements] = useState(null)

  const [listShops, setListShops] = useState([])
  const [listNotifications, setListNotifications] = useState([])
  const [selectedShop, setSelectedShop] = useState([])
  const [selectedNotifications, setSelectedNotifications] = useState([])

  useEffect(() => {
    loadShops()
    loadNotifications()
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [selectedShop])

  useEffect(() => {
    if (showAllRead === true) {
      loadReadNotifications()
    } else {
      loadNotifications()
    }
  }, [showAllRead])

  const loadShops = () => {
    ShopService.getAll().then(data => {
      setListShops(data)
    })
  }

  const loadNotifications = () => {
    const request = {
      ...params,
      shop: selectedShop?.nombre || ''
    }

    NotificationService.getAllByUserAndShop(request).then(data => {
      setListNotifications(data.content)
      setTotalElements(data.totalElements)
    })
  }

  const loadReadNotifications = () => {
    const request = {
      ...params,
      shop: selectedShop?.nombre || ''
    }

    NotificationService.getAllReadByUserAndShop(request).then(data => {
      setListNotifications(data.content)
      setTotalElements(data.totalElements)
    })
  }

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
    const maxLength = 150
    const message = rowData[column.field].replace(/<a[\s\S]*/, '');

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
      shop: selectedShop?.nombre || ''
    }

    NotificationService.getAllByUserAndShop(request).then(data => {
      setListNotifications(data.content)
    })
  }

  const handleMarkAsRead = async (id) => {
    NotificationService.markAsRead(id).then((data) => {
      loadNotifications()
      showMessage('Sistema', 'Notificación marcada como leída', toast, 'success')
    })
  }

  const handleDelete = async (id) => {
    NotificationService.delete(id).then((data) => {
      loadNotifications()
      showMessage('Sistema', 'Notificación eliminada con éxito', toast, 'success')
    })
  }

  const handleMarkSelectedAsRead = () => {
    NotificationService.markSelectedAsRead(selectedNotifications).then((data) => {
      loadNotifications()
      setSelectedNotifications([])
      showMessage('Sistema', 'Notificaciónes marcadas como leída', toast, 'success')
    })
  }

  const handleDeleteSelected = () => {
    NotificationService.deleteSelected(selectedNotifications).then((data) => {
      loadNotifications()
      setSelectedNotifications([])
      showMessage('Sistema', 'Notificaciónes eliminadas con éxito', toast, 'success')
    })
  }

  const showNotification = () => {

  }

  const showMessage = (title, msg, ref, severity) => {
    const summary = title
    const message = msg
    ref.current.show({ severity: severity, summary: summary, detail: message, life: 3000 })
  }

  return (
    <div className='p-5'>
      <h2 className='text-3xl font-medium mb-5'>Notificaciones {showAllRead && 'leídas'}</h2>

      <div className='flex gap-5 mb-5'>
        {showAllRead ?
          <Card className='!shadow-none border cursor-pointer'
            onClick={(e) => setShowAllRead(false)}>
            <div className='flex gap-3'>
              <Mail className='text-blue-500' />
              <span className='font-medium'>Notificaciones</span>
            </div>
          </Card>
          :
          <Card className='!shadow-none border cursor-pointer'
            onClick={(e) => setShowAllRead(true)}>
            <div className='flex gap-3'>
              <MailOpen className='text-blue-500' />
              <span className='font-medium'>Notificaciones leídas</span>
            </div>
          </Card>
        }
      </div>

      <Card className='!shadow-none border'>
        <div className='max-h-[650px] overflow-y-auto'>
          <div className='flex'>
            {rolname === 'ADMINISTRADOR' &&
              <Dropdown value={selectedShop} options={listShops} onChange={(e) => setSelectedShop(e.value)}
                optionLabel='nombre' className='mb-5' placeholder='Selecciona un local' />
            }
            {selectedNotifications.length > 0 &&
              <div className='flex items-center gap-4 ml-3 mb-3'>
                <span className='text-lg font-medium'>{selectedNotifications.length} seleccionadas</span>
                <button onClick={handleMarkSelectedAsRead}>
                  <MailOpen className='text-blue-500' size={20} />
                </button>
                <button onClick={handleDeleteSelected}>
                  <Trash2 className='text-blue-500' size={20} />
                </button>
              </div>
            }
          </div>

          <DataTable value={listNotifications} stripedRows emptyMessage='No hay notificaciones por el momento' size='small' dataKey='id'
            selectionMode={'checkbox'} selection={selectedNotifications} onSelectionChange={(e) => setSelectedNotifications(e.value)}>
            <Column selectionMode='multiple' className='rounded-tl-lg' style={{ width: '1%' }} />
            <Column field='from' className='font-medium' style={{ width: '5%' }} />
            <Column field='subject' style={{ width: '10%' }} body={renderSubject} />
            <Column field='message' style={{ width: '74%' }} body={renderMessage} />
            <Column field='dateTime' className='font-medium' style={{ width: '5%' }} body={renderDate} />
            <Column className='rounded-tr-md' alignHeader={'center'} style={{ width: '5%' }}
              body={(rowData) => (
                <div className='flex justify-center'>
                  <button onClick={() => showNotification(rowData.id)} className='text-dark rounded px-2 py-1'>
                    <Eye size={16} />
                  </button>
                  {!showAllRead &&
                    <button onClick={() => handleMarkAsRead(rowData.id)} className='text-dark rounded px-2 py-1'>
                      <MailOpen size={16} />
                    </button>
                  }
                  <button onClick={() => handleDelete(rowData.id)} className='text-dark rounded px-2 py-1'>
                    <Trash2 size={16} />
                  </button>
                </div>
              )}>
            </Column>
          </DataTable>
        </div>
        <Paginator first={first} rows={rows} totalRecords={totalElements}
          pageLinkSize={5} onPageChange={onPageChange} className='mt-5 !p-0' />
      </Card>

      <Toast ref={toast} position="bottom-right" />
    </div>
  )
}