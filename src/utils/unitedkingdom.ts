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

export const generateUKChecklistPDF = async () => {
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
  doc.text("STUDY IN UNITED KINGDOM", margin + 38, 15);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "University Application, CAS & UKVI Student Visa Checklist",
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
    "* OFFICIAL 2026 UK STUDENT VISA & UNIVERSITY CAS CHECKLIST *",
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
    "UNIVERSITY APPLICATION & CAS CHECKLIST",
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
    "UKVI VISA FILING REQUIREMENTS",
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
  doc.text("1. Admission Documents Requirements", leftColX, curYLeft);

  curYLeft += 4.5;

  const leftItems = [
    {
      title: "Valid Passport",
      sub: "- Photo and Signature Page (Scan Copy, min. 6 months validity)",
    },
    {
      title: "Educational Transcripts & Certificates",
      sub: "- Matric / O-Level DMC & Certificate\n- Intermediate (FSc/ICS) / A-Level DMC & Certificate\n- Bachelor Degree & Transcripts (for Postgraduate)",
    },
    {
      title: "Statement of Purpose / Personal Statement",
      sub: "- Detailing academic background, course choice & career goals",
    },
    {
      title: "Academic & Professional Reference Letters",
      sub: "- Two recommendation letters on official institution letterhead",
    },
    {
      title: "English Proficiency Certificate",
      sub: "- IELTS Academic/UKVI (6.0-6.5) / PTE (59+) / MOI Waiver if eligible",
    },
    {
      title: "Updated CV / Resume & Experience Letters",
      sub: "- Explaining any academic gaps and professional experience",
    },
    {
      title: "Passport-size Photograph & Contact Info",
      sub: "- Recent white background photo + active email and WhatsApp",
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

  // Section 2: Pre-CAS & University Admission Steps
  curYLeft += 1;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("2. Pre-CAS & Admission Progression", leftColX, curYLeft);

  curYLeft += 4.5;

  const progressionBoxes = [
    {
      title: "Offer Letter (Conditional / Unconditional)",
      flow: "Direct Agent Portal Submission -> Assessment -> Offer Issue",
    },
    {
      title: "Pre-CAS Credibility Interview",
      flow: "RS Expert Interview Mock -> University Credibility Clearance",
    },
    {
      title: "CAS Deposit & CAS Statement Release",
      flow: "Deposit Payment (GBP 3,000-5,000) -> Official 14-Digit CAS Number",
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
  doc.text("NOTE - DEGREE DURATION & ADVANTAGES:", leftColX + 2, curYLeft + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const noteLines = doc.splitTextToSize(
    "UK offers accelerated 1-Year Masters and 3-Year Bachelors, significantly reducing overall living costs. Graduates are eligible for the 2-Year Graduate Route (PSW) work visa.",
    colWidth - 4,
  );
  doc.text(noteLines, leftColX + 2, curYLeft + 4.5);

  // ==========================================
  // RIGHT COLUMN CONTENT
  // ==========================================
  let curYRight = topY + 12;

  // Section 1: UKVI Visa Application Documents
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("1. UKVI Visa Application Documents", rightColX, curYRight);

  curYRight += 4.5;

  const visaItems = [
    {
      title: "CAS Statement (Confirmation of Acceptance for Studies)",
      sub: "- Official 14-digit electronic CAS assigned by UK sponsor university",
    },
    {
      title: "28-Day Bank Statement & Maintenance Proof",
      sub: "- Outside London: GBP 9,207 (GBP 1,023/mo x 9) + remaining tuition\n- Inside London: GBP 12,006 (GBP 1,334/mo x 9) + remaining tuition\n- Held continuously for 28 consecutive days in approved bank",
    },
    {
      title: "IOM Tuberculosis (TB) Screening Certificate",
      sub: "- Issued by approved IOM center (Islamabad/Lahore/Karachi/Mirpur)",
    },
    {
      title: "Valid Original Passport (with blank pages)",
      sub: "- Plus copies of previous visas and travel history",
    },
    {
      title: "Immigration Health Surcharge (IHS) Reference",
      sub: "- Paid online (GBP 776/year) for complete NHS medical coverage",
    },
    {
      title: "Academic Documents & English Certificates on CAS",
      sub: "- Exact qualifications listed by university in CAS document checklist",
    },
    {
      title: "NADRA FRC & Affidavit of Sponsorship",
      sub: "- Required if bank statement is under father/mother's name",
    },
    {
      title: "ATAS Clearance Certificate (if applicable)",
      sub: "- Required for selected postgraduate STEM / engineering courses",
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

  // Important Note Box - 28 Day Rule
  curYRight += 1;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightColX, curYRight - 2.5, colWidth, 12.5, 1, 1, "FD");

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text("CRITICAL 28-DAY HOLDING RULE:", rightColX + 2, curYRight + 1);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);

  const waitNote = doc.splitTextToSize(
    "Maintenance funds must not drop below required balance even for a single day during the 28-day cycle. Statement closing date must be within 31 days of visa submission.",
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
  doc.text("Major: Sept/Oct (Autumn) | Major: Jan/Feb (Winter)", rightColX + 2, curYRight + 4.5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(219, 3, 3);
  doc.text(
    "Work: 20 hrs/week during study + 2-Year Graduate Route PSW",
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
    "RS HIGHER EDUCATION CONSULTANTS - TOTAL COST BREAKDOWN FOR UNITED KINGDOM",
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
      item: "UKVI Student Visa Application Fee",
      amount: "GBP 490",
      notes: "Official online visa filing fee paid directly to UK Visas & Immigration",
    },
    {
      item: "Immigration Health Surcharge (IHS)",
      amount: "GBP 776 / year",
      notes: "Mandatory surcharge granting complete access to UK NHS healthcare",
    },
    {
      item: "IOM Tuberculosis (TB) Screening Test",
      amount: "PKR 18k - 25k (Approx)",
      notes: "Paid directly at authorized IOM medical screening center in Pakistan",
    },
    {
      item: "Initial University Tuition Deposit",
      amount: "GBP 3,000 - 5,000",
      notes: "Deducted from 1st year tuition fee; required to issue official CAS",
    },
    {
      item: "28-Day Maintenance Funds (Outside London)",
      amount: "GBP 9,207 + Unpaid Fee",
      notes: "GBP 1,023/mo x 9 months; held for 28 consecutive days in student/parent bank",
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
    "Note: Maintenance living funds are not spent fees — they remain in your bank account as proof of financial support for your UK stay.",
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
    `RS_Higher_Education_United_Kingdom_Student_Visa_Checklist_${new Date().getFullYear()}.pdf`,
  );
};

// Also export alias for backward compatibility
export const generateGermanyChecklistPDF = generateUKChecklistPDF;
