import jsPDF from 'jspdf';

export const openSchedulePDF = (schedule) => {
  if (!schedule || schedule.length === 0) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Amortization Schedule', 14, 20);

  const headers = ['Payment #', 'Payment Amount', 'Principal', 'Interest', 'Balance'];
  let startY = 30;

  headers.forEach((header, i) => {
    doc.text(header, 14 + i * 40, startY);
  });

  schedule.forEach((item, index) => {
    const y = startY + 10 + index * 10;
    doc.text(String(item.paymentNumber), 14, y);
    doc.text(String(item.paymentAmount), 54, y);
    doc.text(String(item.principalPayment), 94, y);
    doc.text(String(item.interestPayment), 134, y);
    doc.text(String(item.remainingBalance), 174, y);
  });

  // This opens the PDF in a new browser tab/window
  doc.output('dataurlnewwindow');
};
