import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatNumber } from './formatNumber';

export function openSchedulePDF(schedule) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Amortization Schedule', 14, 22);

  // Updated headers to include Pay Date & Beginning Balance
  const tableColumn = [
    'Payment #',
    'Pay Date',
    'Beginning Balance',
    'Each Payment',
    'Principal',
    'Interest',
    'Remaining Balance',
  ];

  // Map schedule rows including new fields
  const tableRows = schedule.map(row => [
    row.paymentNumber,
    row.payDate,
    formatNumber(row.beginningBalance),
    formatNumber(row.paymentAmount),
    formatNumber(row.principalPayment),
    formatNumber(row.interestPayment),
    formatNumber(row.remainingBalance),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      halign: 'right',
      fontSize: 10,
    },
    headStyles: {
      fillColor: [221, 235, 247],
      textColor: [0, 51, 102],
      halign: 'center',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      1: { halign: 'center' },
      0: { halign: 'center' },
    },
  });

  // Open PDF in a new tab
  window.open(doc.output('bloburl'), '_blank');
}
