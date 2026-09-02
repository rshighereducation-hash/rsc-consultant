import { jsPDF } from 'jspdf';
import { BUSINESS_INFO } from '../data/businessInfo';

export interface AcademicRecord {
  degree: string;
  year: string;
  grade: string;
  institute: string;
}

export interface ApplicationPdfData {
  applicationId?: string;
  fullName: string;
  phone: string;
  email: string;
  dob?: string;
  gender?: string;
  nationality?: string;
  maritalStatus?: string;
  currentAddress?: string;
  permanentAddress?: string;
  city?: string;
  destination?: string;
  preferredCountries?: string;
  studyLevel?: string;
  preferredCourse?: string;
  targetIntake?: string;
  ieltsStatus?: string;
  englishProficiency?: string;
  testPreparation?: string;
  expectedScore?: string;
  financialBracket?: string;
  academicRows?: AcademicRecord[];
  academicBackground?: string;
  workExperience?: string;
  hearAboutUs?: string;
  message?: string;
  additionalNotes?: string;
  submittedAt?: string;
  customLogoUrl?: string | null;
}

/**
 * Strips emoji characters that corrupt standard jsPDF font glyphs
 */
function cleanTextForPdf(str: string = ''): string {
  if (!str) return '';
  return str
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '')
    .replace(/[^\x00-\x7F]/g, '') // remove unencodable non-ASCII characters
    .replace(/\s+/g, ' ')
    .trim();
}

export class PdfGenerationService {
  /**
   * Generates the EXACT official RS Higher Education Consultants INQUIRY FORM PDF
   * Matching the official branded template with gold borders, red/navy capsule sections,
   * qualifications table, checkbox options, and official footer credentials.
   */
  static generateApplicationPdf(data: ApplicationPdfData): jsPDF {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    const contentWidth = pageWidth - margin * 2; // 190mm

    const currentYear = new Date().getFullYear();
    const appId = data.applicationId || (typeof window !== 'undefined' ? PdfGenerationService.peekCurrentReferralId() : `RS-REF-${currentYear}-0001`);
    const dateStr = data.submittedAt || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // 1. Outer Border Frame
    doc.setDrawColor(197, 155, 78); // #C59B4E Gold Frame
    doc.setLineWidth(0.7);
    doc.roundedRect(6, 6, 198, 276, 2, 2, 'D');

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(7.5, 7.5, 195, 273, 1.5, 1.5, 'D');

    // 2. Top Header Boxes (Referral No. on Left, Date on Right)
    // Left: STUDENT REFERRAL NO.
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('STUDENT REFERRAL NO.', margin + 2, 13);

    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.4);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + 2, 15, 48, 7.5, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(185, 28, 28);
    doc.text(appId, margin + 4.5, 20);

    // Right: DATE
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('DATE', pageWidth - margin - 46, 13);

    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.4);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageWidth - margin - 46, 15, 44, 7.5, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(dateStr, pageWidth - margin - 42, 20);

    // Center: Official RS Monogram Logo & Brand Text (Or Custom Uploaded Logo Image)
    const logoCenterX = pageWidth / 2;
    let renderedCustomLogo = false;

    if (data.customLogoUrl) {
      try {
        // Embed the user's custom uploaded brand logo
        // Fits neatly between the referral box and date box (x: 65 to 145, y: 10 to 30)
        doc.addImage(data.customLogoUrl, 'PNG', logoCenterX - 24, 10.5, 48, 20, undefined, 'FAST');
        renderedCustomLogo = true;
      } catch (imgErr) {
        console.warn('Could not embed custom logo in PDF, falling back to vector monogram:', imgErr);
        renderedCustomLogo = false;
      }
    }

    if (!renderedCustomLogo) {
      // Red Monogram RS
      doc.setFont('times', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(185, 28, 28); // #B91C1C
      doc.text('RS', logoCenterX - 11, 21);

      // Four point star on the S
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(219, 3, 3);
      doc.text('+', logoCenterX + 7.5, 14.5);

      // HIGHER EDUCATION
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(185, 28, 28);
      doc.text('HIGHER EDUCATION', logoCenterX, 25, { align: 'center' });

      // - CONSULTANTS -
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(185, 28, 28);
      doc.text('—  C O N S U L T A N T S  —', logoCenterX, 28, { align: 'center' });
    }

    // Header Title: ✦ INQUIRY FORM ✦ with gold diamond stars and horizontal rules
    const titleY = 35;
    doc.setDrawColor(197, 155, 78);
    doc.setLineWidth(0.5);
    doc.line(margin + 25, titleY - 1, logoCenterX - 28, titleY - 1);
    doc.line(logoCenterX + 28, titleY - 1, pageWidth - margin - 25, titleY - 1);

    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('INQUIRY FORM', logoCenterX, titleY, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(197, 155, 78);
    doc.text('*', logoCenterX - 24, titleY - 0.5);
    doc.text('*', logoCenterX + 24, titleY - 0.5);

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text('Please fill out the form below and you will be receiving free consultation suitable to your needs.', logoCenterX, 39, { align: 'center' });

    // ==========================================
    // 3. SECTION 1: PERSONAL INFORMATION
    // ==========================================
    let currentY = 43;

    // Dark Red Rounded Capsule Banner
    doc.setFillColor(163, 0, 0); // #A30000
    doc.roundedRect(margin + 1, currentY, 82, 5.2, 1.6, 1.6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(255, 255, 255);
    doc.text('PERSONAL INFORMATION', margin + 4, currentY + 3.7);

    currentY += 9.0;

    const leftColLabelX = margin + 2;
    const rightColLabelX = margin + 98;
    const colHalfWidth = 88;

    // Helper to draw an elegant underline field
    const drawUnderlineField = (
      labelX: number,
      y: number,
      label: string,
      value: string,
      lineStartX: number,
      lineEndX: number
    ) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);
      doc.text(label, labelX, y);

      doc.setDrawColor(100, 116, 139);
      doc.setLineWidth(0.3);
      doc.line(lineStartX, y + 0.8, lineEndX, y + 0.8);

      if (value) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(15, 23, 42);
        const cleanVal = cleanTextForPdf(value);
        const maxW = lineEndX - lineStartX - 2;
        const truncated = doc.splitTextToSize(cleanVal, maxW);
        doc.text(truncated[0] || '', lineStartX + 1.5, y);
      }
    };

    // Row 1: Full Name | Date of Birth
    drawUnderlineField(leftColLabelX, currentY, 'Full Name', data.fullName, leftColLabelX + 16, leftColLabelX + colHalfWidth);
    drawUnderlineField(rightColLabelX, currentY, 'Date of Birth', data.dob || '—', rightColLabelX + 18, rightColLabelX + colHalfWidth);
    currentY += 5.4;

    // Row 2: Phone / WhatsApp | Gender
    drawUnderlineField(leftColLabelX, currentY, 'Phone / WhatsApp', data.phone, leftColLabelX + 26, leftColLabelX + colHalfWidth);
    drawUnderlineField(rightColLabelX, currentY, 'Gender', data.gender || '—', rightColLabelX + 12, rightColLabelX + colHalfWidth);
    currentY += 5.4;

    // Row 3: Email | Nationality
    drawUnderlineField(leftColLabelX, currentY, 'Email', data.email, leftColLabelX + 10, leftColLabelX + colHalfWidth);
    drawUnderlineField(rightColLabelX, currentY, 'Nationality', data.nationality || 'Pakistani', rightColLabelX + 16, rightColLabelX + colHalfWidth);
    currentY += 5.4;

    // Row 4: Current Address | Marital Status
    drawUnderlineField(leftColLabelX, currentY, 'Current Address', data.currentAddress || (data.city ? `${data.city}, Pakistan` : 'Peshawar, KPK'), leftColLabelX + 23, leftColLabelX + colHalfWidth);
    drawUnderlineField(rightColLabelX, currentY, 'Marital Status', data.maritalStatus || 'Single', rightColLabelX + 19, rightColLabelX + colHalfWidth);
    currentY += 5.4;

    // Row 5: Permanent Address (Full Width)
    drawUnderlineField(leftColLabelX, currentY, 'Permanent Address', data.permanentAddress || data.currentAddress || (data.city ? `${data.city}, Pakistan` : 'Peshawar, KPK'), leftColLabelX + 27, pageWidth - margin - 2);
    currentY += 7.5;

    // ==========================================
    // 4. SECTION 2: ACADEMIC INFORMATION
    // ==========================================
    // Dark Navy Rounded Capsule Banner
    doc.setFillColor(13, 27, 42); // #0D1B2A
    doc.roundedRect(margin + 1, currentY, 82, 5.2, 1.6, 1.6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(255, 255, 255);
    doc.text('ACADEMIC INFORMATION', margin + 4, currentY + 3.7);

    currentY += 7.5;

    // Academic Qualifications Table
    const tableX = margin + 1;
    const tableWidth = contentWidth - 2;
    const tableHeaderHeight = 5.4;
    const rowHeight = 4.8;

    // Table Column Widths: [Degree, Year, Grade, Institute]
    const colW1 = 44;
    const colW2 = 20;
    const colW3 = 36;
    const colW4 = tableWidth - colW1 - colW2 - colW3; // 88mm

    // Table Header Fill: Gold/Bronze #C59B4E
    doc.setFillColor(197, 155, 78);
    doc.rect(tableX, currentY, tableWidth, tableHeaderHeight, 'F');
    doc.setDrawColor(160, 120, 50);
    doc.setLineWidth(0.3);
    doc.rect(tableX, currentY, tableWidth, tableHeaderHeight, 'D');

    // Header Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(255, 255, 255);
    doc.text('Degree / Course', tableX + colW1 / 2, currentY + 3.7, { align: 'center' });
    doc.text('Year', tableX + colW1 + colW2 / 2, currentY + 3.7, { align: 'center' });
    doc.text('Grade / CGPA / %age', tableX + colW1 + colW2 + colW3 / 2, currentY + 3.7, { align: 'center' });
    doc.text('Institute / Board / University', tableX + colW1 + colW2 + colW3 + colW4 / 2, currentY + 3.7, { align: 'center' });

    // Table Column Dividers in Header
    doc.line(tableX + colW1, currentY, tableX + colW1, currentY + tableHeaderHeight);
    doc.line(tableX + colW1 + colW2, currentY, tableX + colW1 + colW2, currentY + tableHeaderHeight);
    doc.line(tableX + colW1 + colW2 + colW3, currentY, tableX + colW1 + colW2 + colW3, currentY + tableHeaderHeight);

    currentY += tableHeaderHeight;

    // Default or Provided Academic Rows (3 compact rows)
    const rows: AcademicRecord[] = data.academicRows && data.academicRows.length > 0
      ? data.academicRows
      : [
          {
            degree: data.studyLevel?.includes('Master') ? 'Bachelor (BS / 4-Year)' : (data.studyLevel?.includes('Undergraduate') ? 'Intermediate / FSc' : 'Matric / O-Levels'),
            year: '2024',
            grade: data.academicBackground || 'Completed / First Division',
            institute: 'Recognized Board / University, Pakistan'
          },
          { degree: data.studyLevel?.includes('Master') ? 'Intermediate / FSc' : 'Matriculation', year: '2022', grade: 'First Division', institute: 'BISE Board' },
          { degree: '', year: '', grade: '', institute: '' },
        ];

    // Ensure 3 rows are drawn cleanly
    for (let i = 0; i < 3; i++) {
      const row = rows[i] || { degree: '', year: '', grade: '', institute: '' };
      doc.setFillColor(i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252, i % 2 === 0 ? 255 : 253);
      doc.rect(tableX, currentY, tableWidth, rowHeight, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.25);
      doc.rect(tableX, currentY, tableWidth, rowHeight, 'D');

      // Vertical dividers
      doc.line(tableX + colW1, currentY, tableX + colW1, currentY + rowHeight);
      doc.line(tableX + colW1 + colW2, currentY, tableX + colW1 + colW2, currentY + rowHeight);
      doc.line(tableX + colW1 + colW2 + colW3, currentY, tableX + colW1 + colW2 + colW3, currentY + rowHeight);

      if (row.degree || row.grade || row.institute) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(15, 23, 42);
        doc.text(cleanTextForPdf(row.degree).slice(0, 24), tableX + 2, currentY + 3.3);
        doc.text(cleanTextForPdf(row.year).slice(0, 8), tableX + colW1 + 2, currentY + 3.3);
        doc.text(cleanTextForPdf(row.grade).slice(0, 20), tableX + colW1 + colW2 + 2, currentY + 3.3);
        doc.text(cleanTextForPdf(row.institute).slice(0, 48), tableX + colW1 + colW2 + colW3 + 2, currentY + 3.3);
      }

      currentY += rowHeight;
    }

    currentY += 4.0;

    // Helper for drawing custom checkboxes: [ ] Label
    const drawCheckbox = (x: number, y: number, label: string, isChecked: boolean) => {
      doc.setDrawColor(71, 85, 105);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.rect(x, y - 2.5, 2.7, 2.7, 'FD');

      if (isChecked) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(185, 28, 28);
        doc.text('X', x + 0.5, y - 0.4);
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(15, 23, 42);
      doc.text(label, x + 3.8, y - 0.4);
    };

    // 1. Financial Bracket
    drawUnderlineField(leftColLabelX, currentY, 'Financial Bracket', data.financialBracket || 'Self Funded / Family Sponsorship', leftColLabelX + 23, pageWidth - margin - 2);
    currentY += 4.8;

    // 2. Preferred Countries
    const targetDest = cleanTextForPdf(data.preferredCountries || data.destination || 'Germany / UK / Europe / Australia');
    drawUnderlineField(leftColLabelX, currentY, 'Preferred Countries', targetDest, leftColLabelX + 26, pageWidth - margin - 2);
    currentY += 4.8;

    // 3. English Proficiency with Checkboxes [ ] IELTS  [ ] TOEFL  [ ] PTE  [ ] Other ______
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text('English Proficiency', leftColLabelX, currentY);

    const ieltsVal = (data.ieltsStatus || data.englishProficiency || '').toLowerCase();
    const isIelts = ieltsVal.includes('ielts');
    const isToefl = ieltsVal.includes('toefl');
    const isPte = ieltsVal.includes('pte');
    const isOtherEng = !isIelts && !isToefl && !isPte;

    drawCheckbox(leftColLabelX + 29, currentY + 0.4, 'IELTS', isIelts);
    drawCheckbox(leftColLabelX + 50, currentY + 0.4, 'TOEFL', isToefl);
    drawCheckbox(leftColLabelX + 72, currentY + 0.4, 'PTE', isPte);
    drawCheckbox(leftColLabelX + 90, currentY + 0.4, 'Other', isOtherEng);

    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.3);
    doc.line(leftColLabelX + 105, currentY + 0.8, pageWidth - margin - 2, currentY + 0.8);
    if (isOtherEng && data.ieltsStatus) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.text(cleanTextForPdf(data.ieltsStatus), leftColLabelX + 107, currentY);
    }
    currentY += 4.8;

    // 4. Preparation (If any) & Expected Score
    drawUnderlineField(leftColLabelX, currentY, 'Preparation (If any)', data.testPreparation || 'Standard Consultation', leftColLabelX + 28, leftColLabelX + 100);
    drawUnderlineField(leftColLabelX + 105, currentY, 'Expected Score', data.expectedScore || '6.5+ Band / 65+ PTE', leftColLabelX + 128, pageWidth - margin - 2);
    currentY += 4.8;

    // 5. Preferred Course / Program
    drawUnderlineField(leftColLabelX, currentY, 'Preferred Course / Program', data.preferredCourse || data.academicBackground || 'Business, Computing, Engineering or Health Sciences', leftColLabelX + 35, pageWidth - margin - 2);
    currentY += 4.8;

    // 6. Study Level Checkboxes: [ ] Undergraduate (Bachelor)  [ ] Postgraduate (Master)  [ ] PhD/Doctorate  [ ] Other
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text('Study Level', leftColLabelX, currentY);

    const sLevel = (data.studyLevel || '').toLowerCase();
    const isUndergrad = sLevel.includes('undergraduate') || sLevel.includes('bachelor');
    const isPostgrad = sLevel.includes('postgraduate') || sLevel.includes('master');
    const isPhd = sLevel.includes('phd') || sLevel.includes('doctorate');
    const isOtherLevel = !isUndergrad && !isPostgrad && !isPhd;

    drawCheckbox(leftColLabelX + 20, currentY + 0.4, 'Undergraduate (Bachelor)', isUndergrad);
    drawCheckbox(leftColLabelX + 62, currentY + 0.4, 'Postgraduate (Master)', isPostgrad);
    drawCheckbox(leftColLabelX + 102, currentY + 0.4, 'PhD/Doctorate', isPhd);
    drawCheckbox(leftColLabelX + 132, currentY + 0.4, 'Other', isOtherLevel);

    doc.line(leftColLabelX + 146, currentY + 0.8, pageWidth - margin - 2, currentY + 0.8);
    currentY += 4.8;

    // 7. Intake Preference Checkboxes: [ ] January  [ ] May  [ ] September  [ ] Other
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text('Intake Preference', leftColLabelX, currentY);

    const intakeVal = (data.targetIntake || '').toLowerCase();
    const isJan = intakeVal.includes('january') || intakeVal.includes('spring');
    const isMay = intakeVal.includes('may') || intakeVal.includes('summer');
    const isSep = intakeVal.includes('september') || intakeVal.includes('fall') || (!isJan && !isMay);
    const isOtherIntake = false;

    drawCheckbox(leftColLabelX + 27, currentY + 0.4, 'January', isJan);
    drawCheckbox(leftColLabelX + 49, currentY + 0.4, 'May', isMay);
    drawCheckbox(leftColLabelX + 71, currentY + 0.4, 'September', isSep);
    drawCheckbox(leftColLabelX + 100, currentY + 0.4, 'Other', isOtherIntake);

    doc.line(leftColLabelX + 114, currentY + 0.8, pageWidth - margin - 2, currentY + 0.8);
    currentY += 4.8;

    // 8. Work Experience (If any)
    drawUnderlineField(leftColLabelX, currentY, 'Work Experience (If any)', data.workExperience || 'None / Direct Progression', leftColLabelX + 34, pageWidth - margin - 2);
    currentY += 4.8;

    // 9. How did you hear about us? Checkboxes: [ ] Social Media  [ ] Referral  [ ] Website  [ ] Other
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text('How did you hear about us?', leftColLabelX, currentY);

    const hearVal = (data.hearAboutUs || 'Social Media').toLowerCase();
    const isSocial = hearVal.includes('social') || hearVal.includes('instagram') || hearVal.includes('facebook');
    const isRef = hearVal.includes('referral') || hearVal.includes('friend');
    const isWeb = hearVal.includes('website') || hearVal.includes('google') || (!isSocial && !isRef);

    drawCheckbox(leftColLabelX + 42, currentY + 0.4, 'Social Media', isSocial);
    drawCheckbox(leftColLabelX + 71, currentY + 0.4, 'Referral', isRef);
    drawCheckbox(leftColLabelX + 96, currentY + 0.4, 'Website', isWeb);
    drawCheckbox(leftColLabelX + 118, currentY + 0.4, 'Other', false);

    doc.line(leftColLabelX + 131, currentY + 0.8, pageWidth - margin - 2, currentY + 0.8);
    currentY += 4.8;

    // 10. Additional Information / Notes
    drawUnderlineField(leftColLabelX, currentY, 'Additional Information / Notes', data.additionalNotes || data.message || 'Standard consultation requested.', leftColLabelX + 41, pageWidth - margin - 2);
    currentY += 7.0;

    // ==========================================
    // 5. SECTION 3: DOCUMENTS CHECKLIST & ATTESTATION GUIDE
    // ==========================================
    // Dark Red Rounded Capsule Banner for Checklist
    doc.setFillColor(163, 0, 0); // #A30000
    doc.roundedRect(margin + 1, currentY, 86, 5.4, 1.6, 1.6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(255, 255, 255);
    doc.text('DOCUMENTS CHECKLIST', margin + 4, currentY + 3.8);

    currentY += 7.8;

    // 2-Column Container Layout for Checklist (Left) & Attestation (Right)
    const checklistBoxY = currentY;
    const leftColW = 100;
    const rightColX = margin + 1 + leftColW + 3; // ~114mm
    const rightColW = contentWidth - 2 - leftColW - 3; // 85mm
    const checklistBoxHeight = 104;

    // ------------------------------------------
    // Left Column Box: Admission Documents Requirements
    // ------------------------------------------
    doc.setFillColor(254, 254, 255);
    doc.roundedRect(margin + 1, checklistBoxY, leftColW, checklistBoxHeight, 1.8, 1.8, 'FD');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin + 1, checklistBoxY, leftColW, checklistBoxHeight, 1.8, 1.8, 'D');

    // Left Box Header Banner (Soft Slate Gray)
    doc.setFillColor(241, 245, 249);
    doc.rect(margin + 1.2, checklistBoxY + 0.2, leftColW - 0.4, 5.6, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin + 1.2, checklistBoxY + 5.8, margin + 1 + leftColW - 0.2, checklistBoxY + 5.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text('1. Admission Documents Requirements', margin + 4, checklistBoxY + 4.0);

    // Left Column Checklist Items
    let checkY = checklistBoxY + 9.8;
    const drawDocItem = (title: string, subItems: string[]) => {
      // Checkbox square
      doc.setDrawColor(100, 116, 139);
      doc.setLineWidth(0.35);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + 4, checkY - 2.6, 3.0, 3.0, 'FD');

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(15, 23, 42);
      doc.text(title, margin + 8.5, checkY - 0.4);
      checkY += 3.8;

      // Sub-bullets
      subItems.forEach((sub) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.0);
        doc.setTextColor(71, 85, 105);
        doc.text(`– ${sub}`, margin + 9.5, checkY - 0.4);
        checkY += 3.2;
      });
      checkY += 1.4;
    };

    drawDocItem('Valid Passport', ['Photo and Signature Page (Scan Copy)']);
    drawDocItem('Educational Transcripts & Certificates', [
      'Matric DMC & Certificate',
      'Intermediate (FSc) DMC & Certificate',
      'Bachelor Degree & Transcripts',
    ]);
    drawDocItem('Reference Letters', ['Two reference letters, not older than 6 months']);
    drawDocItem('Passport-size Photograph', ['Required in soft copy (scanned) as well']);
    drawDocItem('Contact Information', ['Valid Contact Number & Email Address']);
    drawDocItem('English Proficiency Certificate', ['IELTS / TOEFL / PTE (if available)']);
    drawDocItem('Updated CV', ['In Europass CV format']);

    // ------------------------------------------
    // Right Column Box: Attestation of Educational Documents
    // ------------------------------------------
    doc.setFillColor(254, 254, 255);
    doc.roundedRect(rightColX, checklistBoxY, rightColW, checklistBoxHeight, 1.8, 1.8, 'FD');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.roundedRect(rightColX, checklistBoxY, rightColW, checklistBoxHeight, 1.8, 1.8, 'D');

    // Right Box Header Banner
    doc.setFillColor(241, 245, 249);
    doc.rect(rightColX + 0.2, checklistBoxY + 0.2, rightColW - 0.4, 5.6, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(rightColX + 0.2, checklistBoxY + 5.8, rightColX + rightColW - 0.2, checklistBoxY + 5.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text('2. Attestation of Educational Documents', rightColX + 3.5, checklistBoxY + 4.0);

    // Right Box Flowchart Cards (3 evenly distributed cards)
    let attestY = checklistBoxY + 8.8;

    const drawAttestationCard = (docTitle: string, step1: string, step2: string, step3: string, subnote: string) => {
      const cardHeight = 27.5;
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(rightColX + 3, attestY, rightColW - 6, cardHeight, 1.5, 1.5, 'FD');
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(rightColX + 3, attestY, rightColW - 6, cardHeight, 1.5, 1.5, 'D');

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.0);
      doc.setTextColor(185, 28, 28);
      doc.text(docTitle, rightColX + 5.5, attestY + 5.2);

      // Flow Badges: Step 1 -> Step 2 -> Step 3
      const flowY = attestY + 9.6;

      const drawStepPill = (x: number, y: number, text: string, w: number, isFinal: boolean) => {
        doc.setFillColor(isFinal ? 239 : 255, isFinal ? 246 : 255, isFinal ? 255 : 255);
        doc.roundedRect(x, y, w, 6.2, 1, 1, 'FD');
        doc.setDrawColor(isFinal ? 147 : 203, isFinal ? 197 : 213, isFinal ? 253 : 225);
        doc.setLineWidth(0.25);
        doc.roundedRect(x, y, w, 6.2, 1, 1, 'D');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.2);
        doc.setTextColor(isFinal ? 29 : 30, isFinal ? 78 : 41, isFinal ? 216 : 59);
        doc.text(text, x + w / 2, y + 4.2, { align: 'center' });
      };

      const pillW = 20;
      const startX = rightColX + 5.5;

      drawStepPill(startX, flowY, step1, pillW, false);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('→', startX + pillW + 1.8, flowY + 4.5);

      drawStepPill(startX + pillW + 6.0, flowY, step2, pillW, false);
      doc.text('→', startX + pillW * 2 + 7.8, flowY + 4.5);

      drawStepPill(startX + pillW * 2 + 12.0, flowY, step3, pillW, true);

      // Sub-description note
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(5.6);
      doc.setTextColor(100, 116, 139);
      doc.text(subnote, rightColX + 5.5, attestY + 22.5);

      attestY += cardHeight + 3.8;
    };

    drawAttestationCard(
      'Matric DMC & Certificate',
      'Board',
      'IBCC',
      'MOFA',
      'Board verification → IBCC Equivalence → MOFA Seal.'
    );
    drawAttestationCard(
      'FSc / Intermediate DMC & Cert.',
      'Board',
      'IBCC',
      'MOFA',
      'BISE Board verification → IBCC → MOFA Attestation.'
    );
    drawAttestationCard(
      'Bachelor / Master Degree & Trans.',
      'University',
      'HEC',
      'MOFA',
      'Issuing University → HEC Attestation → MOFA Seal.'
    );

    currentY = checklistBoxY + checklistBoxHeight + 3.0;

    // Bottom Separator Line
    doc.setDrawColor(197, 155, 78);
    doc.setLineWidth(0.4);
    doc.line(margin + 2, currentY, pageWidth - margin - 2, currentY);
    currentY += 3.6;

    // Motto: ✦ Your Dream, Our Mission ✦
    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(185, 28, 28);
    doc.text('Your Dream, Our Mission', logoCenterX, currentY, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(197, 155, 78);
    doc.text('*', logoCenterX - 24, currentY - 0.4);
    doc.text('*', logoCenterX + 24, currentY - 0.4);

    // ==========================================
    // 5. BOTTOM FOOTER BAR (Dark Navy with Red Top Line)
    // ==========================================
    const footerY = 282;

    // Top Red Line
    doc.setFillColor(185, 28, 28);
    doc.rect(0, footerY - 1, pageWidth, 1, 'F');

    // Navy Bar
    doc.setFillColor(11, 25, 44); // #0B192C
    doc.rect(0, footerY, pageWidth, pageHeight - footerY, 'F');

    // Footer Contact Info: Phone | Email | Address
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);

    // Phone
    doc.text('Tel: 0334 4626284', margin + 4, footerY + 8.5);

    // Email
    doc.text('info@rshec.pk', margin + 44, footerY + 8.5);

    // Address
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('Office No. UG-389, Deans Trade Centre, Peshawar, KPK', margin + 78, footerY + 8.5);

    // Watermark RS Monogram on bottom right
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 100);
    doc.text('RS', pageWidth - margin - 10, footerY + 9.5);

    return doc;
  }

  /**
   * Generates PDF Blob for native sharing and embedding
   */
  static generateApplicationPdfBlob(data: ApplicationPdfData): Blob {
    const doc = this.generateApplicationPdf(data);
    return doc.output('blob');
  }

  /**
   * Generates a JavaScript File object for Web Share API document transmission
   */
  static generateApplicationPdfFile(data: ApplicationPdfData): File {
    const blob = this.generateApplicationPdfBlob(data);
    const sanitizedName = (cleanTextForPdf(data.fullName) || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `RS_Inquiry_Form_${sanitizedName}.pdf`;
    return new File([blob], fileName, { type: 'application/pdf' });
  }

  /**
   * Generates and triggers instant PDF file download in the browser with cross-device & iframe support
   */
  static downloadApplicationPdf(data: ApplicationPdfData) {
    try {
      const doc = this.generateApplicationPdf(data);
      const sanitizedName = (cleanTextForPdf(data.fullName) || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `RS_Inquiry_Form_${sanitizedName}.pdf`;

      // 1. Try standard jsPDF save
      doc.save(fileName);
    } catch (err) {
      console.warn('Standard jsPDF save failed, falling back to Blob download:', err);
      try {
        const doc = this.generateApplicationPdf(data);
        const pdfBlob = doc.output('blob');
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        const sanitizedName = (cleanTextForPdf(data.fullName) || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
        link.download = `RS_Inquiry_Form_${sanitizedName}.pdf`;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        }, 1000);
      } catch (blobErr) {
        console.error('All PDF download mechanisms failed:', blobErr);
      }
    }
  }

  /**
   * Returns the next sequential Student Referral ID starting from 0001
   * Example: RS-REF-2026-0001, RS-REF-2026-0002, etc.
   */
  static getNextReferralId(): string {
    const year = new Date().getFullYear();
    try {
      const storageKey = `rs_referral_counter_${year}`;
      const current = parseInt(localStorage.getItem(storageKey) || '0', 10);
      const next = current + 1;
      localStorage.setItem(storageKey, next.toString());
      const padded = next.toString().padStart(4, '0');
      return `RS-REF-${year}-${padded}`;
    } catch {
      return `RS-REF-${year}-0001`;
    }
  }

  /**
   * Peeks at current referral ID without incrementing
   */
  static peekCurrentReferralId(): string {
    const year = new Date().getFullYear();
    try {
      const storageKey = `rs_referral_counter_${year}`;
      const current = parseInt(localStorage.getItem(storageKey) || '0', 10);
      const currentOrNext = current === 0 ? 1 : current;
      const padded = currentOrNext.toString().padStart(4, '0');
      return `RS-REF-${year}-${padded}`;
    } catch {
      return `RS-REF-${year}-0001`;
    }
  }

  /**
   * Clean WhatsApp URL (without text parameter to avoid text formatting clutter)
   */
  static getWhatsAppDirectUrl(): string {
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}`;
  }

  /**
   * Generates the pre-filled WhatsApp message for submitting the official PDF inquiry form (optional fallback)
   */
  static getWhatsAppDossierMessage(data: ApplicationPdfData): string {
    const currentYear = new Date().getFullYear();
    const appId = data.applicationId || (typeof window !== 'undefined' ? PdfGenerationService.peekCurrentReferralId() : `RS-REF-${currentYear}-0001`);
    const studentName = cleanTextForPdf(data.fullName) || 'Student';
    const text = `Assalam-o-Alaikum RS Consultants. I am ${studentName} (Ref: ${appId}). I am sending my official PDF Inquiry Form attached.`;
    return encodeURIComponent(text);
  }
}


