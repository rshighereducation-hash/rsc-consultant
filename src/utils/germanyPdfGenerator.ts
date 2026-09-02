import { jsPDF } from 'jspdf';
import { BUSINESS_INFO } from '../data/businessInfo';

export const generateGermanyChecklistPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;

  // Header background banner
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top header bar with red accent
  doc.setFillColor(219, 3, 3);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // RS Logo Text representation & Title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.setFontSize(22);
  doc.text('RS', margin, 17);

  doc.setFontSize(7);
  doc.setTextColor(50, 50, 50);
  doc.text('HIGHER EDUCATION', margin, 20.5);
  doc.text('CONSULTANTS', margin, 23);

  // Main Header Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('STUDY IN GERMANY', margin + 38, 15);

  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('University Application & Embassy Visa Filing Checklist', margin + 38, 20.5);

  // Contact Strip
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  const contactText = 'Phone: 0334 4626284  |  Email: info@rshec.pk  |  Office No. UG-389, Deans Trade Centre, Peshawar  |  www.rshec.pk';
  doc.text(contactText, margin + 38, 25);

  // Divider
  doc.setDrawColor(219, 3, 3);
  doc.setLineWidth(0.6);
  doc.line(margin, 28, pageWidth - margin, 28);

  // Star Notice Banner
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, 30.5, contentWidth, 7, 1.5, 1.5, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('* THIS CHECKLIST APPLIES TO PUBLIC UNIVERSITIES IN GERMANY ONLY *', pageWidth / 2, 35, { align: 'center' });

  // Two Column Setup
  const colGap = 5;
  const colWidth = (contentWidth - colGap) / 2;
  const leftColX = margin;
  const rightColX = margin + colWidth + colGap;
  const topY = 41;

  // Left Column Header (Application Checklist)
  doc.setFillColor(15, 23, 42); // Navy slate
  doc.roundedRect(leftColX, topY, colWidth, 7.5, 1, 1, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('UNIVERSITY APPLICATION CHECKLIST', leftColX + colWidth / 2, topY + 5, { align: 'center' });

  // Right Column Header (Visa Requirements)
  doc.setFillColor(219, 3, 3); // Red
  doc.roundedRect(rightColX, topY, colWidth, 7.5, 1, 1, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('VISA FILING / EMBASSY REQUIREMENTS', rightColX + colWidth / 2, topY + 5, { align: 'center' });

  // LEFT COLUMN CONTENT
  let curYLeft = topY + 12;

  // Section 1: Admission Documents Requirements
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('1. Admission Documents Requirements', leftColX, curYLeft);
  curYLeft += 4.5;

  const leftItems = [
    { title: 'Valid Passport', sub: '- Photo and Signature Page (Scan Copy)' },
    { title: 'Educational Transcripts & Certificates', sub: '- Matric DMC & Certificate\n- Intermediate (FSc) DMC & Certificate\n- Bachelor Degree & Transcripts' },
    { title: 'Reference Letters', sub: '- Two reference letters, not older than 6 months' },
    { title: 'Passport-size Photograph', sub: '- Required in soft copy (scanned) as well' },
    { title: 'Contact Information', sub: '- Valid Contact Number & Email Address' },
    { title: 'English Proficiency Certificate (IELTS/TOEFL, if available)', sub: '' },
    { title: 'Updated CV - in Europass CV format', sub: '' },
  ];

  doc.setFontSize(7.5);
  leftItems.forEach((item) => {
    // Checkbox box
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.2);
    doc.rect(leftColX, curYLeft - 2.5, 3, 3);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(item.title, leftColX + 4.5, curYLeft);
    curYLeft += 3.5;

    if (item.sub) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      const lines = item.sub.split('\n');
      lines.forEach((l) => {
        doc.text(l, leftColX + 5.5, curYLeft);
        curYLeft += 3.2;
      });
    }
    curYLeft += 1;
  });

  // Section 2: Attestation of Educational Documents
  curYLeft += 1;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('2. Attestation of Educational Documents', leftColX, curYLeft);
  curYLeft += 4.5;

  const attestationBoxes = [
    { title: 'Matric DMC & Certificate', flow: 'Board -> IBCC -> MOFA' },
    { title: 'FSc / Intermediate DMC & Certificate', flow: 'Board -> IBCC -> MOFA' },
    { title: 'Bachelor / Postgraduate Degree & Transcript', flow: 'University -> HEC -> MOFA' },
  ];

  attestationBoxes.forEach((att) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.roundedRect(leftColX, curYLeft - 2.5, colWidth, 7, 1, 1, 'FD');

    doc.setFontSize(7.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(att.title, leftColX + 2, curYLeft + 0.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(219, 3, 3);
    doc.text(att.flow, leftColX + 2, curYLeft + 3.8);

    curYLeft += 8.2;
  });

  // Section 3: Uni-Assist Application Cost
  curYLeft += 1;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('3. Uni-Assist Application Cost', leftColX, curYLeft);
  curYLeft += 4.5;

  doc.rect(leftColX, curYLeft - 2.5, 3, 3);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.text('First Application: EUR 75', leftColX + 4.5, curYLeft);
  curYLeft += 4;

  doc.rect(leftColX, curYLeft - 2.5, 3, 3);
  doc.text('Each Additional Application: EUR 30', leftColX + 4.5, curYLeft);
  curYLeft += 5.5;

  // Note - Enrolment Fees Box
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(0.25);
  doc.roundedRect(leftColX, curYLeft - 2.5, colWidth, 14, 1, 1, 'FD');

  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text('NOTE - ENROLMENT FEES:', leftColX + 2, curYLeft + 1);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  const noteLines = doc.splitTextToSize(
    'After receiving an admission offer from a Public University, students must pay the semester enrolment fee (Semesterbeitrag). This fee is NOT fixed - it varies by university.',
    colWidth - 4
  );
  doc.text(noteLines, leftColX + 2, curYLeft + 4.5);

  // RIGHT COLUMN CONTENT
  let curYRight = topY + 12;

  // Section 1: Visa Application Documents
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('1. Visa Application Documents', rightColX, curYRight);
  curYRight += 4.5;

  const visaItems = [
    { title: 'University Enrolment Letter / Admission Letter', sub: '' },
    { title: 'Blocked Account (Sperrkonto) Confirmation', sub: '- Current requirement: EUR 11,904/year (EUR 992/month) - 2026\n- Approved providers: Fintiba, Expatrio, or as advised' },
    { title: 'Valid Passport (min. 6 months validity)', sub: '' },
    { title: 'Completed & Signed National (D) Visa Application Form', sub: '' },
    { title: 'Biometric Passport-size Photographs', sub: '' },
    { title: 'Visa Appointment Confirmation', sub: '' },
    { title: 'Travel / Health Insurance (valid for initial stay)', sub: '' },
    { title: 'Motivation Letter / Statement of Purpose', sub: '' },
  ];

  doc.setFontSize(7.5);
  visaItems.forEach((item) => {
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.2);
    doc.rect(rightColX, curYRight - 2.5, 3, 3);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(item.title, rightColX + 4.5, curYRight);
    curYRight += 3.5;

    if (item.sub) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      const lines = item.sub.split('\n');
      lines.forEach((l) => {
        doc.text(l, rightColX + 5.5, curYRight);
        curYRight += 3.2;
      });
    }
    curYRight += 1;
  });

  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(90, 90, 90);
  doc.text('In addition, all documents listed under Application Checklist (left side) are also required for visa.', rightColX, curYRight);
  curYRight += 5;

  // Important Note Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightColX, curYRight - 2.5, colWidth, 13, 1, 1, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('IMPORTANT NOTE:', rightColX + 2, curYRight + 1);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  const waitNote = doc.splitTextToSize(
    'We will join the waiting list. The queue may be lengthy, so you will have to wait for your turn due to the large volume of student applications at the Embassy.',
    colWidth - 4
  );
  doc.text(waitNote, rightColX + 2, curYRight + 4.5);
  curYRight += 15;

  // Intakes in Germany Box
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(rightColX, curYRight - 2.5, colWidth, 12, 1, 1, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('INTAKES IN GERMANY:', rightColX + 2, curYRight + 1);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('Germany offers two intakes:', rightColX + 2, curYRight + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('Major Intake: Winter Intake (September)', rightColX + 2, curYRight + 7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Minor Intake: Summer Intake (April)', rightColX + 2, curYRight + 10.5);

  // BOTTOM SECTION: TOTAL COST BREAKDOWN
  const tableY = 197;

  // Section Header Banner
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, tableY, contentWidth, 7, 1, 1, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('RS HIGHER EDUCATION CONSULTANTS - TOTAL COST BREAKDOWN FOR GERMANY', pageWidth / 2, tableY + 4.8, { align: 'center' });

  // Table header
  const rowH = 7;
  let curTableY = tableY + 8;

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, curTableY, contentWidth, rowH, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, curTableY, pageWidth - margin, curTableY);
  doc.line(margin, curTableY + rowH, pageWidth - margin, curTableY + rowH);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Item', margin + 3, curTableY + 4.5);
  doc.text('Amount', margin + 70, curTableY + 4.5);
  doc.text('Notes', margin + 105, curTableY + 4.5);

  const tableRows = [
    {
      item: 'Uni-Assist Application Fee (First Application)',
      amount: 'EUR 75',
      notes: 'One-time fee for the first university application via Uni-Assist',
    },
    {
      item: 'Uni-Assist Application Fee (Each Additional)',
      amount: 'EUR 30',
      notes: 'Charged per extra university applied to in the same cycle',
    },
    {
      item: 'Semester Enrolment Fee (Semesterbeitrag)',
      amount: 'Varies by university',
      notes: 'Paid only after receiving an official admission offer; not fixed',
    },
    {
      item: 'Blocked Account (Sperrkonto) - 2026 requirement',
      amount: 'EUR 11,904/year (EUR 992/mo)',
      notes: 'Proof-of-funds deposit for visa; accessible upon arrival in Germany',
    },
  ];

  curTableY += rowH;
  tableRows.forEach((row, rIdx) => {
    const isEven = rIdx % 2 === 0;
    if (isEven) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(248, 250, 252);
    }
    doc.rect(margin, curTableY, contentWidth, rowH + 1, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, curTableY + rowH + 1, pageWidth - margin, curTableY + rowH + 1);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(row.item, margin + 3, curTableY + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(219, 3, 3);
    doc.text(row.amount, margin + 70, curTableY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 70);
    doc.text(row.notes, margin + 105, curTableY + 4.8);

    curTableY += rowH + 1;
  });

  // Disclaimer
  curTableY += 2;
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text(
    'Note: The Blocked Account amount is not spent - it is a savings deposit that proves sufficient funds and remains accessible to the student after arrival in Germany.',
    margin,
    curTableY + 3
  );

  // Official Footer Bar
  doc.setFillColor(15, 23, 42);
  doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('RS HIGHER EDUCATION CONSULTANTS', margin, pageHeight - 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Office No. UG-389, Deans Trade Centre, Peshawar  |  0334 4626284  |  www.rshec.pk', pageWidth - margin, pageHeight - 5, { align: 'right' });

  // Save the document
  doc.save('RS_Higher_Education_Germany_Public_University_Checklist_2026.pdf');
};
