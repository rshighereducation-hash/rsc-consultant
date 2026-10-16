import { jsPDF } from "jspdf";
import PdfLogo from "../assets/images/logo.png";
import { GState } from "jspdf";

// Convert the imported logo image into a Data URL for reliable jsPDF embedding
const getLogoDataUrl = async (): Promise<string> => {
  const response = await fetch(PdfLogo);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generateLithuaniaChecklistPDF = async () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;

  // Convert logo.png into a format that jsPDF can use
  const logoDataUrl = await getLogoDataUrl();

  // Header background banner
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // ---------------------------------------------------------
  // BACKGROUND LOGO WATERMARK
  // ---------------------------------------------------------
  doc.saveGraphicsState();
  doc.setGState(
    new GState({
      opacity: 0.05,
    }),
  );
  doc.addImage(logoDataUrl, "PNG", 55, 105, 100, 60);
  doc.restoreGraphicsState();

  // Top header bar with red accent
  doc.setFillColor(219, 3, 3);
  doc.rect(0, 0, pageWidth, 4, "F");

  // ---------------------------------------------------------
  // ACTUAL LOGO - TOP LEFT
  // ---------------------------------------------------------
  doc.addImage(logoDataUrl, "PNG", margin, 7, 30, 18);

  // Main Header Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 20);
  doc.text("STUDY IN LITHUANIA", margin + 38, 15);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "University Application, SKVC Equivalence & MIGRIS TRP Visa Checklist",
    margin + 38,
    20.5,
  );

  // Contact Strip
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const contactText =
    "Phone: 0334 4626284  |  Email: info@rshec.pk  |  Office No. UG-389, Deans Trade Centre, Peshawar  |  www.rshec.pk";

  doc.text(contactText, margin + 38, 25);

  // Divider
  doc.setDrawColor(219, 3, 3);
  doc.setLineWidth(0.6);
  doc.line(margin, 28, pageWidth - margin, 28);

  // Star Notice Banner
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, 30.5, contentWidth, 7, 1.5, 1.5, "FD");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "* OFFICIAL 2026 LITHUANIA STUDENT TRP & SCHENGEN VISA CHECKLIST *",
    pageWidth / 2,
    35,
    { align: "center" },
  );

  // Two Column Setup
  const colGap = 5;
  const colWidth = (contentWidth - colGap) / 2;
  const leftColX = margin;
  const rightColX = margin + colWidth + colGap;
  const topY = 41;

  // Left Column Header (Application Checklist)
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(leftColX, topY, colWidth, 7.5, 1, 1, "F");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);

  doc.text(
    "UNIVERSITY & SKVC EQUIVALENCE CHECKLIST",
    leftColX + colWidth / 2,
    topY + 5,
    { align: "center" },
  );

  // Right Column Header (Visa Requirements)
  doc.setFillColor(219, 3, 3);
  doc.roundedRect(rightColX, topY, colWidth, 7.5, 1, 1, "F");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);

  doc.text(
    "MIGRIS TRP & NATIONAL D-VISA REQUIREMENTS",
    rightColX + colWidth / 2,
    topY + 5,
    { align: "center" },
  );

  // ==========================================
  // LEFT COLUMN CONTENT
  // ==========================================
  let curYLeft = topY + 12;

  // Section 1: Admission Documents Requirements
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("1. Academic & SKVC Recognition Documents", leftColX, curYLeft);

  curYLeft += 4.5;

  const leftItems = [
    {
      title: "Valid Passport",
      sub: "- Color scan of data pages (minimum 18 months validity)",
    },
    {
      title: "Educational Transcripts & Certificates",
      sub: "- Matric / O-Level & Inter (FSc/ICS) / A-Level (IBCC & MOFA Attested)\n- Bachelor Degree & Detailed Transcripts (HEC & MOFA Attested)",
    },
    {
      title: "SKVC Recognition Certificate",
      sub: "- Official academic qualification equivalence issued by SKVC Lithuania",
    },
    {
      title: "DreamApply Online Application & Acceptance",
      sub: "- Formal university study agreement signed by student and rectorate",
    },
    {
      title: "Motivation Letter & Europass CV",
      sub: "- Clear career plans, reason for choosing Lithuania & course choice",
    },
    {
      title: "English Proficiency / Video Interview",
      sub: "- IELTS (5.5-6.0) / Duolingo (95+) / PTE or University Online Interview",
    },
    {
      title: "Passport Size Photographs",
      sub: "- 4 recent biometric photographs on crisp white background",
    },
  ];

  doc.setFontSize(7.5);

  leftItems.forEach((item) => {
    // Checkbox box
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.2);
    doc.rect(leftColX, curYLeft - 2.5, 3, 3);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(item.title, leftColX + 4.5, curYLeft);

    curYLeft += 3.5;

    if (item.sub) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const lines = item.sub.split("\n");
      lines.forEach((l) => {
        doc.text(l, leftColX + 5.5, curYLeft);
        curYLeft += 3.2;
      });
    }

    curYLeft += 0.8;
  });

  // Section 2: Admission & Mediation Letter Progression
  curYLeft += 1;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("2. Admission & MIGRIS Progression", leftColX, curYLeft);

  curYLeft += 4.5;

  const progressionBoxes = [
    {
      title: "SKVC Equivalence & DreamApply Offer",
      flow: "SKVC Assessment -> Online Motivation Interview -> Official Offer Letter",
    },
    {
      title: "Tuition Payment & Study Contract",
      flow: "1st Year Tuition Transfer -> Signed Study Agreement Submission",
    },
    {
      title: "Electronic Mediation Letter (Tarpininkavimo)",
      flow: "University generates electronic Mediation Letter directly in MIGRIS",
    },
  ];

  progressionBoxes.forEach((box) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.roundedRect(leftColX, curYLeft - 2.5, colWidth, 7, 1, 1, "FD");

    doc.setFontSize(7.2);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 20, 20);
    doc.text(box.title, leftColX + 2, curYLeft + 0.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(219, 3, 3);
    doc.text(box.flow, leftColX + 2, curYLeft + 3.8);

    curYLeft += 8.2;
  });

  // Degree Duration Note Box
  curYLeft += 1;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(0.25);
  doc.roundedRect(leftColX, curYLeft - 2.5, colWidth, 14, 1, 1, "FD");

  doc.setFontSize(7.2);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 83, 9);
  doc.text(
    "NOTE - BALTIC TECH CAPITAL & SCHENGEN ADVANTAGES:",
    leftColX + 2,
    curYLeft + 1,
  );

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const noteLines = doc.splitTextToSize(
    "Lithuania is ranked #1 in EU for fintech and laser optics. Students enjoy visa-free mobility across 29 Schengen countries and a 12-Month Job Search Residence Permit after graduation.",
    colWidth - 4,
  );
  doc.text(noteLines, leftColX + 2, curYLeft + 4.5);

  // ==========================================
  // RIGHT COLUMN CONTENT
  // ==========================================
  let curYRight = topY + 12;

  // Section 1: MIGRIS TRP Application Documents
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("1. MIGRIS TRP / National D-Visa Documents", rightColX, curYRight);

  curYRight += 4.5;

  const visaItems = [
    {
      title: "University Electronic Mediation Letter Number",
      sub: "- Official Tarpininkavimo raštas code registered in the MIGRIS system",
    },
    {
      title: "Bank Certificate & Statement (€4,800 + €800)",
      sub: "- €400/month living (€4,800/yr) + €800 return ticket in student's name\n- Or parent's statement with notarized sponsorship letter & FRC",
    },
    {
      title: "Apostilled / MOFA Police Clearance Certificate",
      sub: "- Clean criminal record certificate issued within 6 months of filing",
    },
    {
      title: "Proof of Paid Tuition Fee & Study Agreement",
      sub: "- University official confirmation of received annual tuition fee",
    },
    {
      title: "Schengen Health Insurance Policy (€30,000+)",
      sub: "- Valid for the entire duration of stay covering all EU Schengen states",
    },
    {
      title: "Dormitory Contract / Proof of Accommodation",
      sub: "- Official campus dormitory lease or private residential contract",
    },
    {
      title: "MIGRIS Online Application Form (Printed Copy)",
      sub: "- Completed digital application from migracija.lt with barcode",
    },
    {
      title: "VFS Biometric Submission & State Fee (€160)",
      sub: "- Biometric data capture at authorized VFS Global center in Pakistan",
    },
  ];

  doc.setFontSize(7.5);

  visaItems.forEach((item) => {
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.2);
    doc.rect(rightColX, curYRight - 2.5, 3, 3);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(item.title, rightColX + 4.5, curYRight);

    curYRight += 3.5;

    if (item.sub) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const lines = item.sub.split("\n");
      lines.forEach((l) => {
        doc.text(l, rightColX + 5.5, curYRight);
        curYRight += 3.2;
      });
    }

    curYRight += 0.8;
  });

  // Important Note Box - MIGRIS Digital Process
  curYRight += 1;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightColX, curYRight - 2.5, colWidth, 12.5, 1, 1, "FD");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("STREAMLINED DIGITAL MIGRIS SYSTEM:", rightColX + 2, curYRight + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const waitNote = doc.splitTextToSize(
    "Lithuania processes study permits electronically via MIGRIS. Decisions are typically finalized in 4 to 8 weeks, granting direct Temporary Residence Permit (TRP) cards for study.",
    colWidth - 4,
  );
  doc.text(waitNote, rightColX + 2, curYRight + 4.5);

  curYRight += 14;

  // Intakes & Work Rights Box
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(rightColX, curYRight - 2.5, colWidth, 11.5, 1, 1, "FD");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("INTAKES & WORK RIGHTS:", rightColX + 2, curYRight + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);
  doc.text(
    "Major: September (Autumn) | Selected: February (Spring)",
    rightColX + 2,
    curYRight + 4.5,
  );

  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "Work: 20 hrs/wk (Bachelors) | Up to 40 hrs/wk (Masters) + 12-mo PSW",
    rightColX + 2,
    curYRight + 7.8,
  );

  // ==========================================
  // BOTTOM SECTION: TOTAL COST BREAKDOWN
  // ==========================================
  const tableY = 197;

  // Section Header Banner
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, tableY, contentWidth, 7, 1, 1, "F");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(
    "RS HIGHER EDUCATION CONSULTANTS - TOTAL COST BREAKDOWN FOR LITHUANIA",
    pageWidth / 2,
    tableY + 4.8,
    { align: "center" },
  );

  // Table header
  const rowH = 6.8;
  let curTableY = tableY + 8;

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, curTableY, contentWidth, rowH, "F");

  doc.setDrawColor(203, 213, 225);
  doc.line(margin, curTableY, pageWidth - margin, curTableY);
  doc.line(margin, curTableY + rowH, pageWidth - margin, curTableY + rowH);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);

  doc.text("Item", margin + 3, curTableY + 4.5);
  doc.text("Amount", margin + 70, curTableY + 4.5);
  doc.text("Notes", margin + 115, curTableY + 4.5);

  const tableRows = [
    {
      item: "Lithuanian TRP State Fee (MIGRIS)",
      amount: "€80 - €340 (Standard)",
      notes: "Official state application fee for Temporary Residence Permit",
    },
    {
      item: "Annual University Tuition Fee",
      amount: "€4000 - €6000 / year",
      notes:
        "Affordable European accredited tuition; Medicine: €10,000-€13,000/yr",
    },
    {
      item: "SKVC Document Assessment Fee",
      amount: "€0 - €40",
      notes:
        "Centre for Quality Assessment in Higher Education equivalence evaluation",
    },
    {
      item: "Schengen Health Insurance (1 Year)",
      amount: "€100 - €180",
      notes: "Full medical coverage valid across Lithuania and Schengen area",
    },
    {
      item: "Required Living Funds in Bank",
      amount: "€4,800 + €800 Return Ticket",
      notes: "€400/month for 12 months held in student/sponsor bank account",
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

    doc.rect(margin, curTableY, contentWidth, rowH + 0.5, "F");
    doc.setDrawColor(226, 232, 240);
    doc.line(
      margin,
      curTableY + rowH + 0.5,
      pageWidth - margin,
      curTableY + rowH + 0.5,
    );

    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(row.item, margin + 3, curTableY + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(219, 3, 3);
    doc.text(row.amount, margin + 70, curTableY + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    doc.text(row.notes, margin + 115, curTableY + 4.5);

    curTableY += rowH + 0.5;
  });

  // Disclaimer
  curTableY += 1.5;
  doc.setFontSize(6.8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text(
    "Note: Lithuania grants full Master students the legal privilege to work up to 40 hours per week throughout their studies.",
    margin,
    curTableY + 3,
  );

  // Official Footer Bar
  doc.setFillColor(15, 23, 42);
  doc.rect(0, pageHeight - 12, pageWidth, 12, "F");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("RS HIGHER EDUCATION CONSULTANTS", margin, pageHeight - 5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text(
    "Office No. UG-389, Deans Trade Centre, Peshawar  |  0334 4626284  |  www.rshec.pk",
    pageWidth - margin,
    pageHeight - 5,
    { align: "right" },
  );

  // Save the document
  doc.save(
    `RS_Higher_Education_Lithuania_Student_Visa_Checklist_${new Date().getFullYear()}.pdf`,
  );
};
