import { jsPDF } from 'jspdf';
import { BUSINESS_INFO } from '../data/businessInfo';

export const generateTurkeyChecklistPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top header accent line
  doc.setFillColor(219, 3, 3);
  doc.rect(0, 0, pageWidth, 3.5, 'F');

  // RS Logo Text representation & Title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.setFontSize(22);
  doc.text('RS', margin, 15.5);

  doc.setFontSize(6.5);
  doc.setTextColor(50, 50, 50);
  doc.text('HIGHER EDUCATION', margin, 19);
  doc.text('CONSULTANTS', margin, 21.5);

  // Main Header Title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('Study in Turkey', pageWidth / 2, 17, { align: 'center' });

  // Divider
  doc.setDrawColor(219, 3, 3);
  doc.setLineWidth(0.6);
  doc.line(margin, 24, pageWidth - margin, 24);

  // 1. ADMISSION REQUIREMENTS & VISA REQUIREMENTS (2 Columns)
  const sec1Y = 27;
  const colWidth = (contentWidth - 4) / 2;
  const leftX = margin;
  const rightX = margin + colWidth + 4;

  // Left Header (Admission Requirements)
  doc.setFillColor(15, 23, 42);
  doc.rect(leftX, sec1Y, colWidth, 5, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('ADMISSION REQUIREMENTS', leftX + 4, sec1Y + 3.6);

  // Right Header (Visa Requirements)
  doc.setFillColor(219, 3, 3);
  doc.rect(rightX, sec1Y, colWidth, 5, 'F');
  doc.text('VISA REQUIREMENTS', rightX + 4, sec1Y + 3.6);

  // Left Content: Admission Requirements Box
  const sec1BoxH = 92;
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.rect(leftX, sec1Y + 5, colWidth, sec1BoxH, 'FD');

  const admList = [
    { title: 'Valid Passport', sub: '- Photo and Signature Page (Scan Copy)' },
    {
      title: 'Educational Transcripts & Certificates',
      sub: '- Matric DMC & Certificate\n- Intermediate DMC & Certificate\n- Bachelor Degree & Transcripts',
    },
    { title: 'Passport-size Photograph', sub: '- White background (Biometric format)' },
    { title: 'Father and Mother Full Name', sub: '- Exact spelling matching CNIC / Passport' },
    { title: 'Contact Information', sub: '- Valid Contact Number & Active Email Address' },
    { title: 'English Proficiency Certificate', sub: '- If available (IELTS / PTE / English Medium)' },
    { title: 'Research Proposal', sub: '- Required for Masters / PhD applicants' },
    { title: 'Updated CV', sub: '- Detailed Europass / Academic resume' },
  ];

  let admY = sec1Y + 9;
  admList.forEach((item) => {
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(219, 3, 3);
    doc.text('☐', leftX + 3.5, admY);

    doc.setTextColor(15, 23, 42);
    doc.text(item.title, leftX + 7.5, admY);

    doc.setFontSize(5.8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 70);
    const subLines = doc.splitTextToSize(item.sub, colWidth - 10);
    doc.text(subLines, leftX + 7.5, admY + 3.2);

    admY += 3.2 + subLines.length * 2.8 + 1;
  });

  // Right Content: Visa Requirements Box
  doc.setFillColor(254, 242, 242);
  doc.rect(rightX, sec1Y + 5, colWidth, sec1BoxH, 'FD');

  const visaList = [
    { title: 'Visa Application Form', sub: '- Filled & signed Anatolia portal form' },
    { title: 'Passport / Travel Document', sub: '- Minimum 1-year validity remaining' },
    { title: 'University Acceptance Letter', sub: '- Official unconditional acceptance from Turkey' },
    {
      title: 'Attested Educational Documents',
      sub: '- Board -> IBCC -> MOFA\n- University -> HEC -> MOFA',
    },
    { title: 'Cover Letter / Statement of Purpose', sub: '- Stating study plan, intent & career return' },
    { title: 'Family Registration Certificate (FRC)', sub: '- Issued by NADRA (By Birth / Parents)' },
    { title: 'Interview Form (18+)', sub: '- Completed Anatolia Embassy Interview Form' },
    {
      title: 'Financial Documents',
      sub: '- Bank Statement min $7,000 (maintained for 3 months)\n- Account Maintenance Certificate with manager stamp',
    },
    {
      title: 'Employment / Business Documents',
      sub: '- 3 Years Tax Returns & FBR Active Taxpayer list\n- Sponsor Documents & Affidavit (if sponsored)',
    },
    { title: 'Flight Reservation & Accommodation', sub: '- Confirmed flight itinerary + Dorm/Hotel proof' },
    { title: 'Travel Health Insurance', sub: '- Comprehensive Schengen/Turkey medical coverage' },
  ];

  let vY = sec1Y + 9;
  visaList.forEach((item) => {
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(219, 3, 3);
    doc.text('☐', rightX + 3.5, vY);

    doc.setTextColor(15, 23, 42);
    doc.text(item.title, rightX + 7.5, vY);

    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const subLines = doc.splitTextToSize(item.sub, colWidth - 10);
    doc.text(subLines, rightX + 7.5, vY + 2.8);

    vY += 2.8 + subLines.length * 2.5 + 0.8;
  });

  // 2. OUR PARTNER UNIVERSITIES IN TURKEY (4 Columns Grid)
  const sec2Y = sec1Y + 5 + sec1BoxH + 4;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.text('OUR PARTNER UNIVERSITIES IN TURKEY', margin, sec2Y);

  doc.setDrawColor(219, 3, 3);
  doc.setLineWidth(0.4);
  doc.line(margin, sec2Y + 1.5, pageWidth - margin, sec2Y + 1.5);

  const universities = [
    ['Sabancı University', 'Doğuş University', 'Istanbul Ticaret University', 'Kadir Has University', 'Izmir University of Economics', 'Bahçeşehir University'],
    ['Yeditepe University', 'Üsküdar University', 'Antalya Bilim University', 'İstanbul Topkapı University', 'İstinye University', 'Beykoz University'],
    ['Özyeğin University', 'Beykent University', 'TED University', 'Fenerbahçe University', 'Istanbul Bilgi University', 'Biruni University'],
    ['Istanbul Gelişim University', 'Altınbaş University', 'Ibn Haldun University', 'Okan University', 'Istanbul Aydın University', 'Istanbul Medipol University'],
  ];

  const uColW = contentWidth / 4;
  let uStartY = sec2Y + 5;
  const uBoxH = 34;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, uStartY, contentWidth, uBoxH, 1.5, 1.5, 'FD');

  for (let c = 0; c < 4; c++) {
    const colX = margin + c * uColW + 2;
    let rowY = uStartY + 5;
    universities[c].forEach((uni) => {
      doc.setFontSize(5.8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(219, 3, 3);
      doc.text('▪', colX, rowY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(uni, colX + 3.2, rowY);
      rowY += 4.8;
    });
  }

  // 3. FINANCIAL SUMMARY BOXES (3 Columns)
  const sec3Y = uStartY + uBoxH + 3.5;
  const fColW = (contentWidth - 6) / 3;

  const finMetrics = [
    { amount: '1000 $', title: 'Initial Deposit', desc: 'Tuition deposit to secure official Acceptance Letter' },
    { amount: '235 $ (Approx)', title: 'Visa Fee Anatolia', desc: 'Anatolia Visa Application Center processing fee' },
    { amount: '1235 $', title: 'Approx. Total Cost', desc: 'Total estimated initial investment' },
  ];

  for (let i = 0; i < 3; i++) {
    const fX = margin + i * (fColW + 3);
    doc.setFillColor(i === 2 ? 254 : 254, i === 2 ? 242 : 252, i === 2 ? 242 : 232);
    doc.setDrawColor(i === 2 ? 239 : 251, i === 2 ? 68 : 191, i === 2 ? 68 : 36);
    doc.roundedRect(fX, sec3Y, fColW, 14, 1.5, 1.5, 'FD');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(i === 2 ? 219 : 15, i === 2 ? 3 : 23, i === 2 ? 3 : 42);
    doc.text(finMetrics[i].amount, fX + fColW / 2, sec3Y + 4.5, { align: 'center' });

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(70, 70, 70);
    doc.text(finMetrics[i].title, fX + fColW / 2, sec3Y + 8.5, { align: 'center' });

    doc.setFontSize(5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(110, 110, 110);
    doc.text(finMetrics[i].desc, fX + fColW / 2, sec3Y + 12, { align: 'center' });
  }

  // 4. IMPORTANT ADVISORY
  const advY = sec3Y + 17;
  doc.setFontSize(5.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text(
    'Apply between 30 days and 3 months before travel • Visa processing not guaranteed within 15 days • Sign & date all documents before submission',
    pageWidth / 2,
    advY,
    { align: 'center' }
  );

  // Official Footer Bar
  doc.setFillColor(219, 3, 3);
  doc.rect(0, pageHeight - 11, pageWidth, 11, 'F');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('+92 334 4626284', margin, pageHeight - 5.5);
  doc.text('info@rshec.pk', pageWidth / 2 - 20, pageHeight - 5.5);
  doc.text('Office No. UG-389, Deans Trade Centre, Peshawar, KPK', pageWidth - margin, pageHeight - 5.5, { align: 'right' });

  // Save the PDF
  doc.save('RS_Higher_Education_Study_in_Turkey_Checklist_2026.pdf');
};

export const generateTurkeyInterviewGuidePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top header accent line
  doc.setFillColor(219, 3, 3);
  doc.rect(0, 0, pageWidth, 3.5, 'F');

  // RS Logo Text representation & Title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(219, 3, 3);
  doc.setFontSize(22);
  doc.text('RS', margin, 15.5);

  doc.setFontSize(6.5);
  doc.setTextColor(50, 50, 50);
  doc.text('HIGHER EDUCATION', margin, 19);
  doc.text('CONSULTANTS', margin, 21.5);

  // Main Header Title
  doc.setFontSize(17);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('TÜRKİYE VISA INTERVIEW GUIDE', pageWidth / 2 + 10, 15.5, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(219, 3, 3);
  doc.text('Preparation Guide • RS Higher Education Consultants', pageWidth / 2 + 10, 20, { align: 'center' });

  // Divider
  doc.setDrawColor(219, 3, 3);
  doc.setLineWidth(0.6);
  doc.line(margin, 24, pageWidth - margin, 24);

  // 18 Interview Questions in 2 Columns Grid (9 on Left, 9 on Right)
  const leftColW = (contentWidth - 6) / 2;
  const leftX = margin;
  const rightX = margin + leftColW + 6;

  const leftQA = [
    {
      q: '1. Why do you want to study in Türkiye?',
      a: 'Türkiye offers globally recognized universities, affordable tuition fees, quality education, and a safe, multicultural environment for international students.',
    },
    {
      q: '2. Why did you choose this university?',
      a: 'It is a reputable institution with experienced faculty, strong academic facilities, and an English-taught program that matches my career goals.',
    },
    {
      q: '3. Why did you choose this program?',
      a: 'This field is globally in demand. The program offers practical training and research opportunities that will strengthen my professional skills.',
    },
    {
      q: '4. Who is your sponsor / how will you fund your studies?',
      a: 'My education will be funded by [my sponsor / my own savings]. We have sufficient income and bank statements to support the full duration of my studies.',
    },
    {
      q: "5. What is your sponsor's occupation or business?",
      a: 'My sponsor [runs a family business / is employed as ___], which provides a stable income sufficient to cover my tuition and living expenses.',
    },
    {
      q: '6. Have you paid your initial deposit?',
      a: 'Yes, I have paid (or am ready to pay) the first installment and will upload the receipt to confirm my Acceptance Letter.',
    },
    {
      q: '7. Where will you stay in Türkiye?',
      a: 'I will stay in university accommodation or a private student residence, which I will finalize once my visa and registration are complete.',
    },
    {
      q: '8. Do you have any relatives in Türkiye?',
      a: '[Yes, but I will live independently for my studies.] / [No, I do not have relatives in Türkiye.]',
    },
    {
      q: '9. Can you speak Turkish?',
      a: 'Not yet — I plan to learn Turkish alongside my academic studies to better integrate into student and campus life.',
    },
  ];

  const rightQA = [
    {
      q: '10. How did you learn about this university/program?',
      a: 'I researched public and private universities in Türkiye online, reviewed their programs and reputation, then applied and received my acceptance letter.',
    },
    {
      q: '11. Why this intake (Fall/Spring)?',
      a: 'This is the official intake offered for my program and fits my academic and personal timeline.',
    },
    {
      q: '12. Do you plan to work in Türkiye during your studies?',
      a: 'No. My sole purpose is education — I will focus fully on my studies and will not seek employment.',
    },
    {
      q: '13. What will you do after completing your degree?',
      a: "I plan to return to Pakistan and apply my education and skills to build my career and contribute to my country's development.",
    },
    {
      q: '14. What are your future academic/career goals?',
      a: 'I aim to gain strong theoretical and practical knowledge in my field to pursue advanced studies or a professional career after graduation.',
    },
    {
      q: '15. Do you have health/travel insurance for Türkiye?',
      a: 'Yes, I will arrange valid health insurance covering my entire stay, as required for the residence permit application.',
    },
    {
      q: '16. Have you traveled abroad before, or had any visa refusals?',
      a: '[Yes, I have traveled to ___ and always returned on time.] / [No, this is my first international trip, and I have prepared all documents carefully.]',
    },
    {
      q: '17. Why not study this program in your home country?',
      a: 'Türkiye offers stronger international exposure, more advanced facilities, and globally recognized qualifications in this field at a more affordable cost than equivalent options abroad.',
    },
    {
      q: '18. What ties do you have to your home country?',
      a: 'I have strong family, financial, and future career ties at home, and I fully intend to return after completing my studies to build my career there.',
    },
  ];

  let leftY = 27;
  leftQA.forEach((item) => {
    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(219, 3, 3);
    doc.text(item.q, leftX, leftY);

    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(item.a, leftColW);
    doc.text(lines, leftX, leftY + 3.2);

    leftY += 3.2 + lines.length * 2.8 + 2.5;
  });

  let rightY = 27;
  rightQA.forEach((item) => {
    doc.setFontSize(6.8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(219, 3, 3);
    doc.text(item.q, rightX, rightY);

    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(item.a, leftColW);
    doc.text(lines, rightX, rightY + 3.2);

    rightY += 3.2 + lines.length * 2.8 + 2.5;
  });

  // Tip box
  const tipY = Math.max(leftY, rightY) + 2;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, tipY, contentWidth, 7.5, 1.5, 1.5, 'FD');

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('Tip:', margin + 3, tipY + 4.8);

  doc.setFont('helvetica', 'italic');
  doc.setTextColor(70, 70, 70);
  doc.text(
    'Answer confidently, keep responses short and honest, and always be consistent with your submitted documents.',
    margin + 10,
    tipY + 4.8
  );

  // Official Footer Bar
  doc.setFillColor(15, 23, 42);
  doc.rect(0, pageHeight - 11, pageWidth, 11, 'F');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('0334 4626284', margin, pageHeight - 5.5);
  doc.text('info@rshec.pk', pageWidth / 2 - 40, pageHeight - 5.5);
  doc.text('Office No. UG-389, Deans Trade Centre, Peshawar, KPK', pageWidth / 2 + 10, pageHeight - 5.5);
  doc.text('www.rshec.pk', pageWidth - margin, pageHeight - 5.5, { align: 'right' });

  // Save the PDF
  doc.save('RS_Higher_Education_Turkey_Visa_Interview_Guide_2026.pdf');
};
