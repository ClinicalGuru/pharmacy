import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment'
import ListItemText from '@mui/material/ListItemText';

export const PdfFile = ({ data, vendorDetails, pdfTitle }) => {
  console.log(data, 'pdf data');
  const { address = '', email ='', gst = '', name = '', phone = '' } = vendorDetails || {};
  const time = new Date().getTime()
  const handleDownload = () => {
    const doc = new jsPDF();
    const totalPages = doc.internal.getNumberOfPages();
    const columns = Object.keys(data[0]);
    const rows = data.map(item => {
      // Get the keys of the item and sort them
      const sortedKeys = Object.keys(item).sort((a, b) => {
        // You can customize the sorting logic here, e.g., based on index or alphabetically
        return columns.indexOf(a) - columns.indexOf(b);
      });

      // Map the sorted keys to their corresponding values
      return sortedKeys.map(key => item[key]);
    });

    doc.setFontSize(16);
    doc.text(pdfTitle, doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Date: ${moment(new Date()).format('DD/MM/YYYY')}`, doc.internal.pageSize.getWidth() - 40, 10, { align: 'left' });
    doc.text('To,', 10, 20);
    doc.text(name, 10, 25);
    doc.text(address, 10, 30);
    doc.text(`Mobile: ${phone}`, 10, 35);
    doc.text('From,', doc.internal.pageSize.getWidth() - 80, 20, { align: 'left' });
    doc.text('Laxmi Medicals,', doc.internal.pageSize.getWidth() - 80, 25, { align: 'left' });
    doc.text('A Unit of Winmedica Healthcare  Pvt. ltd,', doc.internal.pageSize.getWidth() - 80, 30, { align: 'left' });
    doc.text('Railway Kodur - 516101', doc.internal.pageSize.getWidth() - 80, 35, { align: 'left' });
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      startX: 20
    },);
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(`Text at the end of Page ${i}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }
    // Save the PDF file
    doc.save(`${pdfTitle}_${time}_${name}.pdf`);
  };

  return (
    <ListItemText onClick={handleDownload} primary=" PDF" />
    // <button onClick={handleDownload}>Download PDF</button>
  );
};
