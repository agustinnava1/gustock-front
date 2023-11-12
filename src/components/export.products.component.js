import React from 'react';
import ExcelJS from 'exceljs';

import { Button } from 'primereact/button';
import { formatCurrency } from '../helper/format';
import { FileDown } from 'lucide-react';
import { Card } from 'primereact/card';

const ListProductsExport = ({ products }) => {
  const handleExport = async () => {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Productos');

    // Format the prices in a new array
    const formattedProducts = products.map(product => ({
      ...product,
      priceEffective: formatCurrency(product.priceEffective),
      priceDebit: formatCurrency(product.priceDebit),
      priceCredit: formatCurrency(product.priceCredit),
    }))

    // Define the columns
    worksheet.columns = [
      { header: 'Código', key: 'code', width: 13 },
      { header: 'Descripción', key: 'description', width: 45 },
      { header: 'Efectivo', key: 'priceEffective', width: 10 },
      { header: 'Débito', key: 'priceDebit', width: 10 },
      { header: 'Crédito', key: 'priceCredit', width: 10 },
    ];

    // Add data to the worksheet
    worksheet.addRows(formattedProducts);

    // Customize the header row
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 14 }; // Customize the font
      cell.alignment = { horizontal: 'left' }; // Center align the text
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '000000' } }; // Add background color
    })

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob and download link
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos.xlsx';
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
  );
};

export default ListProductsExport;