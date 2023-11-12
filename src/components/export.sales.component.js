import React from 'react'
import ExcelJS from 'exceljs'

import { Card } from 'primereact/card'
import { formatCurrency, formatDate, formatTime } from '../helper/format'
import { FileDown } from 'lucide-react'


const ListSalesExport = ({ sales }) => {
  const handleExport = async () => {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Productos');

    // Format values
    const formattedSales = sales.map(sale => ({
      ...sale,
      date: formatDate(sale.date),
      time: formatTime(sale.time),
      cashPayment: formatCurrency(sale.cashPayment),
      debitPayment: formatCurrency(sale.debitPayment),
      creditPayment: formatCurrency(sale.creditPayment),
      qrCodePayment: formatCurrency(sale.qrCodePayment),
      total: formatCurrency(sale.total),
    }))

    // Define the columns
    worksheet.columns = [
      { header: 'N° venta', key: 'id', width: 10 },
      { header: 'Fecha', key: 'date', width: 10 },
      { header: 'Hora', key: 'time', width: 10 },
      { header: 'Efectivo', key: 'cashPayment', width: 10 },
      { header: 'Débito', key: 'debitPayment', width: 10 },
      { header: 'Crédito', key: 'creditPayment', width: 10 },
      { header: 'Código Qr', key: 'qrCodePayment', width: 10 },
      { header: 'Total', key: 'total', width: 10 },
      { header: 'Local', key: 'shop', width: 10 },
      { header: 'Usuario', key: 'user', width: 10 },
    ];

    // Add data to the worksheet
    worksheet.addRows(formattedSales);

    // Customize the header row
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 14 }; // Customize the font
      cell.alignment = { horizontal: 'left' }; // Center align the text
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '000000' } }; // Add background color
    })

    const idColumn = worksheet.getColumn('id');
    idColumn.alignment = { horizontal: 'left' };

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob and download link
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'informe-ventas.xlsx';
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  return (
    <div onClick={handleExport} className='hover:cursor-pointer'>
      <Card className='!shadow-none border mb-5'>
        <div className='flex gap-3'>
          <FileDown className='text-blue-500' />
          <span className='font-medium'>Exportar a excel</span>
        </div>
      </Card>
    </div>
  )
}

export default ListSalesExport