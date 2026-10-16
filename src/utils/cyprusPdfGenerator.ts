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

export const generateCyprusChecklistPDF = async () => {
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
  doc.text("STUDY IN SOUTH CYPRUS", margin + 38, 15);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "University Application, CRMD Entry Permit (M-61) & Visa Checklist",
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
    "* OFFICIAL 2026 SOUTH CYPRUS (EU) STUDENT ENTRY PERMIT CHECKLIST *",
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
    "UNIVERSITY ADMISSION & ATTESTATION",
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
    "CRMD ENTRY PERMIT (M-61) REQUIREMENTS",
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
  doc.text("1. Academic & Personal Documents", leftColX, curYLeft);

  curYLeft += 4.5;

  const leftItems = [
    {
      title: "Valid Passport",
      sub: "- Color copy of passport photo/signature page (min. 2 years validity)",
    },
    {
      title: "Educational Transcripts & Certificates",
      sub: "- Matric / O-Level & Inter (FSc/ICS/FA) / A-Level (IBCC & MOFA Attested)\n- Bachelor Degree & Detailed Marks Certificates (HEC & MOFA Attested)",
    },
    {
      title: "Clean Police Character Certificate",
      sub: "- Issued by Police Khidmat Markaz and attested by MOFA Pakistan",
    },
    {
      title: "Mandatory Medical Fitness Certificate",
      sub: "- Blood Tests: HIV, Hepatitis B & C, VDRL/Syphilis + Chest X-Ray for TB\n- Attested by Ministry of Foreign Affairs (MOFA) Pakistan",
    },
    {
      title: "Bank Statement & Sponsor Guarantee Letter",
      sub: "- Minimum €6,000-€7,000 closing balance + Affidavit of Financial Support",
    },
    {
      title: "English Language Proficiency / Internal Test",
      sub: "- IELTS (5.5+) / PTE or University Internal Placement Test on arrival",
    },
    {
      title: "Passport Size Photographs",
      sub: "- 4 recent white background photographs (European standard size)",
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

  // Section 2: Admission & Migration Progression
  curYLeft += 1;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("2. Admission & Entry Permit Progression", leftColX, curYLeft);

  curYLeft += 4.5;

  const progressionBoxes = [
    {
      title: "Conditional Offer & Document MOFA Attestation",
      flow: "Fast-Track University Offer (24-48h) -> Medical & Police MOFA Attestation",
    },
    {
      title: "Tuition Fee Deposit & Migration Dossier",
      flow: "Direct University Bank Deposit -> Dossier Submission to Nicosia Migration",
    },
    {
      title: "M-61 White Paper Entry Permit Release",
      flow: "CRMD Approval -> White Paper Entry Permit -> Flight to Larnaca (LCA)",
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
  doc.text("NOTE - FULL EU DEGREE & ENGLISH LINGUA FRANCA:", leftColX + 2, curYLeft + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const noteLines = doc.splitTextToSize(
    "Republic of Cyprus is a full European Union member state following the Bologna EHEA standard. Over 80% of citizens speak fluent English, and university degrees are globally recognized for transfers and employment across Europe.",
    colWidth - 4,
  );
  doc.text(noteLines, leftColX + 2, curYLeft + 4.5);

  // ==========================================
  // RIGHT COLUMN CONTENT
  // ==========================================
  let curYRight = topY + 12;

  // Section 1: CRMD Migration & Entry Permit Documents
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("1. CRMD Immigration & Entry Requirements", rightColX, curYRight);

  curYRight += 4.5;

  const visaItems = [
    {
      title: "Official White Paper Entry Permit (Form M-61)",
      sub: "- Issued directly by Civil Registry & Migration Dept in Nicosia, Cyprus",
    },
    {
      title: "Original MOFA Attested Academic Records",
      sub: "- Original verified degrees and transcripts to be presented at airport",
    },
    {
      title: "Original Medical & Police Certificates (MOFA)",
      sub: "- Must be within 4 months validity at the time of entry to Cyprus",
    },
    {
      title: "Bank Guarantee Deposit (€500 - €850)",
      sub: "- Paid directly to Migration/University (fully refundable upon graduation)",
    },
    {
      title: "University Acceptance Letter & Payment Receipt",
      sub: "- Proof of tuition fee payment transferred to official university account",
    },
    {
      title: "Flight Ticket to Larnaca (LCA) / Paphos (PFO)",
      sub: "- Confirmed airline booking with international transit (Dubai/Doha/Gulf)",
    },
    {
      title: "Health & Travel Insurance Policy",
      sub: "- International student medical policy valid for entry into Cyprus",
    },
    {
      title: "Arrival Medical & ARC Biometrics (On Arrival)",
      sub: "- Post-arrival localized blood test + biometric Temporary Residence Permit",
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

  // Important Note Box - Direct Migration Rule
  curYRight += 1;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightColX, curYRight - 2.5, colWidth, 12.5, 1, 1, "FD");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("DIRECT UNIVERSITY-SPONSORED VISA:", rightColX + 2, curYRight + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const waitNote = doc.splitTextToSize(
    "No complicated embassy interview required. The partner university files your file directly in Nicosia for the M-61 Entry Permit, providing high visa success for genuine students.",
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
  doc.text("Major: Oct (Fall) | Major: Feb (Spring) | Minor: June (Summer)", rightColX + 2, curYRight + 4.5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "Work: 20 hrs/week in designated EU-approved student sectors",
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
    "RS HIGHER EDUCATION CONSULTANTS - TOTAL COST BREAKDOWN FOR SOUTH CYPRUS",
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
      item: "CRMD Entry Permit (M-61) Fee",
      amount: "€70 - €140",
      notes: "Official migration processing fee paid directly to Ministry of Interior",
    },
    {
      item: "University Tuition (with 30-50% Scholarship)",
      amount: "€3,800 - €7,500 / year",
      notes: "Undergraduate & Postgraduate; Medicine/Dentistry: €9k-€18k/yr",
    },
    {
      item: "Bank Guarantee Deposit (Refundable)",
      amount: "€500 - €850",
      notes: "Mandatory security deposit refunded upon completion of studies",
    },
    {
      item: "Medical Screening & MOFA Attestation",
      amount: "PKR 25k - 35k",
      notes: "Blood tests, chest X-Ray, police character certificate and MOFA stamps",
    },
    {
      item: "Monthly Living & Dormitory Costs",
      amount: "€450 - €750 / month",
      notes: "Affordable Mediterranean accommodation, campus food, and local transit",
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
    "Note: The Republic of Cyprus entry permit (M-61) is legal authorization to enter and study in the southern European territory of Cyprus.",
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
    `RS_Higher_Education_South_Cyprus_Student_Visa_Checklist_${new Date().getFullYear()}.pdf`,
  );
};

export const generateSouthCyprusChecklistPDF = generateCyprusChecklistPDF;
