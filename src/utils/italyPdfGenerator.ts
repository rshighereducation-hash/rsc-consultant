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

export const generateItalyChecklistPDF = async () => {
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
  doc.text("STUDY IN ITALY", margin + 38, 15);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "University Application, Universitaly & Embassy Visa Checklist",
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
    "* OFFICIAL 2026 ITALY STUDENT VISA & UNIVERSITALY CHECKLIST *",
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
    "UNIVERSITY APPLICATION & PRE-ENROLLMENT",
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
    "EMBASSY VISA & IMMIGRATION REQUIREMENTS",
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
  doc.text("1. Academic & Admission Documents", leftColX, curYLeft);

  curYLeft += 4.5;

  const leftItems = [
    {
      title: "Valid Passport",
      sub: "- Scanned Copy of Bio-Data Pages (min. 18 months validity)",
    },
    {
      title: "Educational Transcripts & Certificates",
      sub: "- Matric / O-Level & Inter (FSc/ICS) / A-Level (IBCC & MOFA Attested)\n- Bachelor Degree & Detailed Marks Certificates (HEC & MOFA)",
    },
    {
      title: "CIMEA Statement or Declaration of Value (DOV)",
      sub: "- CIMEA Comparability / Verification or DOV from Italian Embassy",
    },
    {
      title: "Universitaly Portal Pre-Enrollment Summary",
      sub: "- Validated Form A from universitaly.it with university approval",
    },
    {
      title: "Statement of Purpose (SOP) & Curriculum Vitae",
      sub: "- Europass format CV and personalized motivation letter",
    },
    {
      title: "Letters of Recommendation (LORs)",
      sub: "- Two academic reference letters from previous professors",
    },
    {
      title: "English Proficiency / Entry Test (if applicable)",
      sub: "- IELTS (6.0+) / PTE / MOI waiver or TOLC / IMAT score (for Medicine)",
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

  // Section 2: Admission & Universitaly Progression
  curYLeft += 1;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("2. Admission & Scholarship Progression", leftColX, curYLeft);

  curYLeft += 4.5;

  const progressionBoxes = [
    {
      title: "University Acceptance / Evaluation Letter",
      flow: "Direct Portal Application -> Academic Merit Review -> Admission Offer",
    },
    {
      title: "Universitaly Portal Pre-Enrollment & DOV/CIMEA",
      flow: "Online Universitaly Submission -> University Validation -> Embassy Forwarding",
    },
    {
      title: "DSU Regional Scholarship Application",
      flow: "ISEE Parificato Assessment -> 100% Tuition Waiver + €6,000-€8,000/yr Stipend",
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
  doc.text("NOTE - DSU SCHOLARSHIPS & SCHENGEN MOBILITY:", leftColX + 2, curYLeft + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const noteLines = doc.splitTextToSize(
    "Public universities in Italy offer world-class degrees with low nominal fees (€500-€3,000/yr). Most Pakistani students qualify for regional DSU grants covering full tuition, free canteen meals, and yearly cash stipends.",
    colWidth - 4,
  );
  doc.text(noteLines, leftColX + 2, curYLeft + 4.5);

  // ==========================================
  // RIGHT COLUMN CONTENT
  // ==========================================
  let curYRight = topY + 12;

  // Section 1: Italian Embassy Visa Filing Documents
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("1. Italian National D-Visa Documents", rightColX, curYRight);

  curYRight += 4.5;

  const visaItems = [
    {
      title: "Validated Universitaly Summary (Form A)",
      sub: "- Official digitally validated pre-enrollment document with barcode",
    },
    {
      title: "Financial Proof & Bank Statement (min €6,000+)",
      sub: "- Sponsor/Student bank statement (6 months) showing min. €6,000-€8,000\n- Affidavit of Support & FRC certificate from NADRA",
    },
    {
      title: "Proof of Accommodation in Italy",
      sub: "- University dormitory confirmation, rental lease, or 30-day hotel booking",
    },
    {
      title: "Schengen Travel Health Insurance",
      sub: "- Minimum €30,000 emergency medical coverage valid across Schengen",
    },
    {
      title: "Attested & Legalized Academic Certificates",
      sub: "- MOFA attested degrees/transcripts + Italian translation (where required)",
    },
    {
      title: "Clean Police Character Certificate",
      sub: "- Issued by Police Khidmat Markaz and attested by MOFA Pakistan",
    },
    {
      title: "Confirmed Flight Ticket Reservation",
      sub: "- Round-trip / one-way dummy flight reservation to Italian airport",
    },
    {
      title: "National D-Visa Application Form & Photos",
      sub: "- Duly filled National D-Visa form + 2 biometric photos (35x40mm)",
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

  // Important Note Box - Financial & Legalization
  curYRight += 1;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightColX, curYRight - 2.5, colWidth, 12.5, 1, 1, "FD");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("CRITICAL EMBASSY APPOINTMENT & DOV RULE:", rightColX + 2, curYRight + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const waitNote = doc.splitTextToSize(
    "Book your BLS/Embassy visa appointment immediately upon Universitaly summary release. Ensure all academic documents are verified via CIMEA or legalized with DOV prior to visa submission.",
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
  doc.text("Major: Sept/Oct (Autumn) | Selected: Feb/March (Spring)", rightColX + 2, curYRight + 4.5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "Work: 20 hrs/week during study + 1-Year Job Search TRP permit",
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
    "RS HIGHER EDUCATION CONSULTANTS - TOTAL COST BREAKDOWN FOR ITALY",
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
      item: "Italian National Student Visa (Type D)",
      amount: "€50 - €116",
      notes: "Official visa filing fee paid at Italian Embassy / BLS Center in Pakistan",
    },
    {
      item: "CIMEA Verification & Comparability",
      amount: "€150 - €300 (Optional)",
      notes: "Direct digital verification service accepted in place of physical DOV",
    },
    {
      item: "Public University Annual Tuition",
      amount: "€500 - €3,000 / year",
      notes: "Calculated based on family ISEE; 100% waived for DSU scholarship winners",
    },
    {
      item: "Schengen Health Insurance (1 Year)",
      amount: "€120 - €160",
      notes: "Comprehensive emergency health insurance covering all 29 Schengen states",
    },
    {
      item: "Required Maintenance Funds Proof",
      amount: "€6,000 - €8,000",
      notes: "Approx. €500/month living funds shown in student/parent bank account",
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
    "Note: Bank statement maintenance funds remain in your account for verification and are not paid to the embassy or university.",
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
    `RS_Higher_Education_Italy_Student_Visa_Checklist_${new Date().getFullYear()}.pdf`,
  );
};
