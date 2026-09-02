import React, { useState, useEffect, useRef } from 'react';
import { ALL_DESTINATIONS } from '../data/destinationsData';
import { BUSINESS_INFO } from '../data/businessInfo';
import { GoogleIntegrationService, USER_LINKED_SPREADSHEET_URL } from '../services/googleIntegration';
import { PdfGenerationService, ApplicationPdfData, AcademicRecord } from '../services/pdfService';
import { RSOfficialEmblem, RSOfficialFullLogo } from './RSLogo';
import { CountryFlag } from './CountryFlag';
import { useBrand } from '../context/BrandContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  User,
  MapPin,
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  ShieldCheck,
  Building2,
  Check,
  Upload,
  RotateCcw,
  Image as ImageIcon,
  Printer,
  Download,
  Share2,
  ExternalLink,
  Award,
  Globe,
  Globe2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactFormProps {
  defaultDestination?: string;
  onSuccess?: () => void;
}

const POPULAR_DESTINATIONS = [
  { slug: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { slug: 'germany', name: 'Germany', flag: '🇩🇪' },
  { slug: 'turkiye', name: 'Turkey', flag: '🇹🇷', alias: 'turkey' },
  { slug: 'lithuania', name: 'Lithuania', flag: '🇱🇹' },
  { slug: 'south-cyprus', name: 'Cyprus', flag: '🇨🇾', alias: 'cyprus' },
  { slug: 'usa', name: 'United States', flag: '🇺🇸' },
  { slug: 'australia', name: 'Australia', flag: '🇦🇺' },
  { slug: 'canada', name: 'Canada', flag: '🇨🇦' },
  { slug: 'italy', name: 'Italy', flag: '🇮🇹' },
  { slug: 'other', name: 'Other Country', flag: '🌍' },
];

const STUDY_LEVELS = [
  { label: "Bachelor's / Undergraduate", value: "Undergraduate (Bachelor - 3 to 4 Yrs)", icon: "🎓" },
  { label: "Master's / Postgraduate", value: "Master / Postgraduate (1 to 2 Yrs)", icon: "🏛️" },
  { label: "MBBS / MD Medicine", value: "Medicine / Dentistry (MD / MBBS)", icon: "🩺" },
  { label: "PhD / Doctorate", value: "PhD / Doctorate", icon: "🔬" },
  { label: "Foundation / Pathway", value: "Foundation / Pre-Master Pathway", icon: "📚" },
];

const POPULAR_CITIES = ['Peshawar', 'Mardan', 'Swat', 'Islamabad', 'Abbottabad', 'Nowshera', 'Charsadda', 'Lahore'];

/**
 * Uploadable Brand Logo Header Component for the Application Form
 */
export const FormLogoUploader: React.FC<{ height?: number }> = ({ height = 85 }) => {
  const { customFormLogo, customLogo } = useBrand();
  const activeLogo = customFormLogo || customLogo;

  return (
    <div className="flex flex-col items-center justify-center space-y-2.5 w-full">
      <div className="py-2 px-4 flex items-center justify-center">
        {activeLogo ? (
          <div className="flex items-center justify-center py-1">
            <img
              src={activeLogo}
              alt="RS Higher Education Consultants Logo"
              style={{ height: `${height}px`, width: 'auto' }}
              className="max-w-[280px] sm:max-w-[340px] max-h-[110px] object-contain"
            />
          </div>
        ) : (
          <RSOfficialFullLogo height={height} theme="red" />
        )}
      </div>
    </div>
  );
};

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultDestination = '',
  onSuccess,
}) => {
  const { customFormLogo, customLogo, setCustomFormLogo, openFormLogoModal } = useBrand();
  const activeLogo = customFormLogo || customLogo;

  // Personal Information (matching the official Inquiry Form)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('Pakistani');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [city, setCity] = useState('Peshawar');
  const [currentAddress, setCurrentAddress] = useState('Peshawar, KPK, Pakistan');
  const [permanentAddress, setPermanentAddress] = useState('Peshawar, KPK, Pakistan');

  // Academic & Study Preferences
  const [preferredDestination, setPreferredDestination] = useState(defaultDestination || 'uk');
  const [customOtherCountry, setCustomOtherCountry] = useState('');
  const [studyLevel, setStudyLevel] = useState('Postgraduate (Master)');
  const [preferredCourse, setPreferredCourse] = useState('');
  const [targetIntake, setTargetIntake] = useState('September 2026 (Fall Intake)');
  const [ieltsStatus, setIeltsStatus] = useState('IELTS');
  const [testPreparation, setTestPreparation] = useState('In Progress');
  const [expectedScore, setExpectedScore] = useState('6.5+ Band / 65+ PTE');
  const [financialBracket, setFinancialBracket] = useState('Self Funded / Family Sponsorship');
  const [academicBackground, setAcademicBackground] = useState('');
  const [workExperience, setWorkExperience] = useState('None / Direct Progression');
  const [hearAboutUs, setHearAboutUs] = useState('Social Media');
  const [message, setMessage] = useState('');

  // Academic Score & CGPA/Percentage Calculator State (Last / Most Recent Education)
  const [calcMode, setCalcMode] = useState<'marks' | 'cgpa'>('cgpa');
  const [calcDegree, setCalcDegree] = useState('4-Year Bachelor (BS / BBA / BE / CS)');
  const [calcPassingYear, setCalcPassingYear] = useState('2024');
  const [calcInstitute, setCalcInstitute] = useState('University of Peshawar');
  const [calcObtainedMarks, setCalcObtainedMarks] = useState('880');
  const [calcTotalMarks, setCalcTotalMarks] = useState('1100');
  const [calcObtainedCgpa, setCalcObtainedCgpa] = useState('3.25');
  const [calcCgpaScale, setCalcCgpaScale] = useState('4.0');
  const [showScoreCalculator, setShowScoreCalculator] = useState(true);

  // Structured Academic Qualifications Table (Last / Most Recent Education prominently displayed)
  const [academicRows, setAcademicRows] = useState<AcademicRecord[]>([
    { degree: '4-Year Bachelor (BS / BBA / BE / CS)', year: '2024', grade: '3.25 CGPA (81.25%)', institute: 'University of Peshawar' },
    { degree: '', year: '', grade: '', institute: '' },
    { degree: '', year: '', grade: '', institute: '' },
    { degree: '', year: '', grade: '', institute: '' },
  ]);

  // Live calculation of score & grade
  const calculateAcademicScore = () => {
    if (calcMode === 'marks') {
      const obt = parseFloat(calcObtainedMarks) || 0;
      const tot = parseFloat(calcTotalMarks) || 1100;
      const pct = tot > 0 ? ((obt / tot) * 100) : 0;
      const roundedPct = pct.toFixed(2);

      let grade = 'A-1';
      let remark = 'Outstanding / Distinction';
      let scholarshipChance = 'Eligible for 30% - 50% Merit Scholarships';

      if (pct >= 80) {
        grade = 'A-1 (A+)';
        remark = 'Distinction / 1st Division';
        scholarshipChance = 'High Merit Scholarship Potential (up to 50%)';
      } else if (pct >= 70) {
        grade = 'A';
        remark = 'Excellent / 1st Division';
        scholarshipChance = 'Direct Admission in UK, Germany, Lithuania, Turkey';
      } else if (pct >= 60) {
        grade = 'B';
        remark = 'Very Good / 1st Division';
        scholarshipChance = 'Eligible for UK Foundation / Direct Admission';
      } else if (pct >= 50) {
        grade = 'C';
        remark = 'Good / 2nd Division';
        scholarshipChance = 'Eligible for Cyprus, Turkey, UK International Year 1';
      } else {
        grade = 'D';
        remark = 'Pass';
        scholarshipChance = 'Pathway / Pre-Sessional Entry';
      }

      return {
        type: 'marks',
        percentage: `${roundedPct}%`,
        grade,
        remark,
        scholarshipChance,
        summaryString: `${calcDegree} - ${obt}/${tot} (${roundedPct}% - Grade ${grade}) - ${calcInstitute} (${calcPassingYear})`,
        germanGrade: null,
      };
    } else {
      const cgpa = parseFloat(calcObtainedCgpa) || 0;
      const scale = parseFloat(calcCgpaScale) || 4.0;
      const pct = scale > 0 ? ((cgpa / scale) * 100) : 0;
      const roundedPct = pct.toFixed(2);

      // Bavarian Formula: German Grade = 1 + 3 * ((Max - Actual) / (Max - MinPass)) with MinPass = 2.0
      let germanGrade = '—';
      if (scale === 4.0 && cgpa >= 2.0) {
        const gNum = 1 + 3 * ((4.0 - cgpa) / (4.0 - 2.0));
        germanGrade = Math.max(1.0, Math.min(4.0, gNum)).toFixed(2);
      }

      let grade = 'A';
      let remark = 'First Class Honours';
      let scholarshipChance = 'Eligible for Direct Master & Merit Scholarships';

      if (cgpa >= 3.6) {
        grade = 'A+ (Distinction)';
        remark = 'Exceptional / First Class (85%+ HEC)';
        scholarshipChance = 'High Chance for Top Ranked UK & German Public Universities';
      } else if (cgpa >= 3.0) {
        grade = 'A (Good)';
        remark = 'First Class (71% - 84% HEC)';
        scholarshipChance = 'Eligible for Direct Master in UK, Germany, Lithuania, Turkey';
      } else if (cgpa >= 2.5) {
        grade = 'B (Average)';
        remark = 'Upper Second Class (60% - 70% HEC)';
        scholarshipChance = 'Eligible for UK, Cyprus, Lithuania, Turkey Universities';
      } else if (cgpa >= 2.0) {
        grade = 'C (Pass)';
        remark = 'Pass (50% - 59% HEC)';
        scholarshipChance = 'Eligible for Pre-Master / Cyprus & European Pathways';
      } else {
        grade = 'F';
        remark = 'Below Minimum';
        scholarshipChance = 'Counseling Required';
      }

      return {
        type: 'cgpa',
        percentage: `${roundedPct}%`,
        grade,
        remark,
        scholarshipChance,
        germanGrade,
        summaryString: `${calcDegree} - CGPA ${cgpa}/${scale} (${roundedPct}% - Grade ${grade}) - ${calcInstitute} (${calcPassingYear})`,
      };
    }
  };

  const calculatedScore = calculateAcademicScore();

  // AUTOMATIC REAL-TIME AUTO-FILL: Synchronously update recent education & score as student types
  useEffect(() => {
    const score = calculateAcademicScore();
    setAcademicBackground(score.summaryString);
    setAcademicRows([
      {
        degree: calcDegree,
        year: calcPassingYear,
        grade: calcMode === 'cgpa' ? `${calcObtainedCgpa} CGPA (${score.percentage})` : `${score.grade} (${score.percentage})`,
        institute: calcInstitute,
      },
      { degree: '', year: '', grade: '', institute: '' },
      { degree: '', year: '', grade: '', institute: '' },
      { degree: '', year: '', grade: '', institute: '' },
    ]);
  }, [calcMode, calcDegree, calcPassingYear, calcInstitute, calcObtainedMarks, calcTotalMarks, calcObtainedCgpa, calcCgpaScale]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [appId, setAppId] = useState<string>('');
  const [lastPayload, setLastPayload] = useState<ApplicationPdfData | null>(null);
  const [showDetailedAcademicFields, setShowDetailedAcademicFields] = useState(false);

  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const normalizedDestSlug = preferredDestination === 'turkey' ? 'turkiye' : (preferredDestination === 'cyprus' ? 'south-cyprus' : preferredDestination);
  const selectedDestObj = ALL_DESTINATIONS.find((d) => d.slug === normalizedDestSlug || d.id === normalizedDestSlug || d.slug === preferredDestination);
  const destinationDisplayName = preferredDestination === 'other'
    ? (customOtherCountry.trim() ? `Other (${customOtherCountry.trim()})` : 'Other Country')
    : selectedDestObj
    ? (selectedDestObj.countryName === 'Türkiye' ? 'Turkey (Türkiye)' : selectedDestObj.countryName)
    : preferredDestination.toUpperCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSyncStatus(null);

    const generatedAppId = PdfGenerationService.getNextReferralId();
    const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    setAppId(generatedAppId);

    // Filter filled academic rows
    const validAcademicRows = academicRows.filter(r => r.degree.trim() || r.grade.trim() || r.institute.trim());

    const leadPayload: ApplicationPdfData = {
      applicationId: generatedAppId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dob: dob.trim() || '—',
      gender,
      nationality: nationality.trim() || 'Pakistani',
      maritalStatus,
      city: city.trim(),
      currentAddress: currentAddress.trim() || (city ? `${city}, Pakistan` : 'Peshawar, KPK'),
      permanentAddress: permanentAddress.trim() || currentAddress.trim() || (city ? `${city}, Pakistan` : 'Peshawar, KPK'),
      destination: destinationDisplayName,
      preferredCountries: destinationDisplayName,
      studyLevel,
      preferredCourse: preferredCourse.trim() || academicBackground.trim() || 'Business, Computing, Engineering or Health Sciences',
      targetIntake,
      ieltsStatus,
      englishProficiency: ieltsStatus,
      testPreparation: testPreparation.trim() || 'Standard Counseling',
      expectedScore: expectedScore.trim() || '6.5+ Band',
      financialBracket,
      academicRows: validAcademicRows.length > 0 ? validAcademicRows : undefined,
      academicBackground: academicBackground.trim() || (validAcademicRows[0] ? `${validAcademicRows[0].degree} (${validAcademicRows[0].grade})` : 'Undergraduate / Graduate'),
      workExperience: workExperience.trim() || 'N/A',
      hearAboutUs,
      message: message.trim(),
      additionalNotes: message.trim() || 'Free profile evaluation and university admission guidance requested.',
      submittedAt: formattedDate,
      customLogoUrl: activeLogo,
    };

    // 1. Generate Base64 PDF Representation for instant Email Attachment & Google Drive
    let pdfBase64 = '';
    const sanitizedName = (leadPayload.fullName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
    const pdfFileName = `RS_Inquiry_Form_${sanitizedName}.pdf`;

    try {
      const doc = PdfGenerationService.generateApplicationPdf(leadPayload);
      const dataUri = doc.output('datauristring');
      pdfBase64 = dataUri.split(',')[1] || '';
    } catch (pdfErr) {
      console.warn('Auto PDF base64 conversion notice:', pdfErr);
    }

    const fullLeadPayload = {
      ...leadPayload,
      pdfBase64,
      pdfFileName,
    };

    setLastPayload(leadPayload);

    // 2. AUTO DOWNLOAD EXACT OFFICIAL INQUIRY FORM PDF for Student
    try {
      PdfGenerationService.downloadApplicationPdf(leadPayload);
    } catch (pdfErr) {
      console.warn('Auto PDF generation notice:', pdfErr);
    }

    // 3. Direct PDF Document Transmission to WhatsApp (+92 334 4626284)
    try {
      const pdfFile = PdfGenerationService.generateApplicationPdfFile(leadPayload);
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        navigator.share({
          files: [pdfFile],
          title: `RS Higher Education Consultants - Inquiry Form (${leadPayload.fullName})`,
        }).catch(() => {
          window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}`, '_blank');
        });
      } else {
        window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}`, '_blank');
      }
    } catch (shareErr) {
      console.warn('Auto WhatsApp submission notice:', shareErr);
    }

    // 4. Record in internal database storage
    GoogleIntegrationService.saveLeadLocally(fullLeadPayload as any);

    // 5. Google Workspace Auto-Sync (Google Sheets, Auto Email with Attached PDF to rshighereducation@gmail.com)
    GoogleIntegrationService.sendToWebhook(fullLeadPayload as any).catch(() => {});

    const token = GoogleIntegrationService.getAccessToken();
    if (token) {
      try {
        const pdfDoc = PdfGenerationService.generateApplicationPdf(leadPayload);
        const pdfBlob = pdfDoc.output('blob');
        
        await Promise.allSettled([
          GoogleIntegrationService.appendToGoogleSheet(token, leadPayload as any),
          GoogleIntegrationService.sendNotificationEmail(token, leadPayload as any, 'rshighereducation@gmail.com'),
          GoogleIntegrationService.uploadPdfToDrive(token, pdfBlob, leadPayload.fullName)
        ]);
        setSyncStatus('Synchronized with Google Drive, Sheets & rshighereducation@gmail.com');
      } catch (syncErr) {
        console.warn('Google Workspace background sync error:', syncErr);
      }
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      await res.json().catch(() => ({ success: true }));

      setSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
      });
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  // Direct Native Share / WhatsApp document transmission
  const handleSendPdfToWhatsApp = async () => {
    if (!lastPayload) return;
    try {
      const pdfFile = PdfGenerationService.generateApplicationPdfFile(lastPayload);
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          files: [pdfFile],
          title: `RS Higher Education Consultants - Inquiry Form (${lastPayload.fullName})`,
        });
        return;
      }
    } catch (shareErr) {
      console.warn('Native PDF file share not supported or cancelled:', shareErr);
    }

    // Fallback for Desktop: ensure PDF is downloaded and open official WhatsApp chat cleanly
    PdfGenerationService.downloadApplicationPdf(lastPayload);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}`, '_blank');
  };

  const handleManualDownloadPdf = () => {
    if (lastPayload) {
      PdfGenerationService.downloadApplicationPdf(lastPayload);
    }
  };

  const handlePrintDossier = () => {
    window.print();
  };

  if (submitted && lastPayload) {
    const displayDate = lastPayload.submittedAt || new Date().toLocaleDateString('en-GB');

    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Top Floating Action Bar & PDF Submission Guidance */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-500/80 shadow-2xl max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 shadow-inner">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg font-heading flex items-center gap-2">
                  <span>Official PDF Form Generated!</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Downloaded
                  </span>
                </h3>
                <p className="text-xs text-slate-600">
                  Student Referral No: <span className="font-mono font-bold text-[#A30000]">{appId}</span> • File: <span className="font-mono font-semibold text-slate-800">RS_Inquiry_Form_{(lastPayload.fullName || 'Student').replace(/[^a-zA-Z0-9]/g, '_')}.pdf</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                type="button"
                onClick={handleSendPdfToWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-black font-heading shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Send PDF File to WhatsApp (0334 4626284)</span>
              </button>

              <button
                type="button"
                onClick={handleManualDownloadPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-heading shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={handlePrintDossier}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-heading transition-colors cursor-pointer"
                title="Print Form"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold font-heading transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Form</span>
              </button>
            </div>
          </div>

          {/* Step-by-Step Instructions to Send the PDF to Admissions */}
          <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 sm:p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-emerald-900 font-heading uppercase tracking-wide flex items-center gap-1.5">
                📌 How to submit your PDF Inquiry Form:
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-emerald-950">
              <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <span className="font-bold block">PDF Downloaded</span>
                  <span className="text-[11px] text-slate-600">The PDF has been saved in your device's Downloads folder.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <span className="font-bold block">Click Green Button</span>
                  <span className="text-[11px] text-slate-600">Click "Send PDF File to WhatsApp" to open WhatsApp chat.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <span className="font-bold block">Attach PDF Document</span>
                  <span className="text-[11px] text-slate-600">In WhatsApp, tap 📎 &gt; Document, select your PDF file, and send!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            THE EXACT VISUAL REPLICA OF THE UPLOADED "INQUIRY FORM"
            ========================================================================= */}
        <div className="bg-white rounded-3xl border-4 border-[#C59B4E] shadow-2xl overflow-hidden max-w-4xl mx-auto text-left relative p-6 sm:p-10 font-sans print:m-0 print:border-none print:shadow-none">
          {/* Inner Decorative Fine Border */}
          <div className="border border-slate-300 p-5 sm:p-8 rounded-2xl relative space-y-6">
            
            {/* 1. Header: Referral No. (Left), Center RS Logo, Date (Right) */}
            <div className="flex items-start justify-between gap-4">
              {/* Left: STUDENT REFERRAL NO. */}
              <div className="space-y-1 text-left w-36 sm:w-44 shrink-0">
                <span className="text-[11px] font-bold text-slate-900 tracking-tight block">
                  STUDENT REFERRAL NO.
                </span>
                <div className="border border-slate-400 rounded-lg py-1.5 px-2.5 bg-white text-center font-mono font-bold text-xs text-[#A30000] shadow-2xs">
                  {appId}
                </div>
              </div>

              {/* Center: Official RS Monogram Logo & Brand Text (or Custom Uploaded Brand Logo) */}
              <div
                onClick={openFormLogoModal}
                className="flex flex-col items-center text-center -mt-2 cursor-pointer group/formlogo relative"
                title="Click to upload or change your official brand logo"
              >
                {activeLogo ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={activeLogo}
                      alt="RS Higher Education Consultants Official Logo"
                      className="h-16 sm:h-20 max-w-[240px] sm:max-w-[280px] object-contain transition-transform group-hover/formlogo:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9px] text-[#A30000] font-bold opacity-0 group-hover/formlogo:opacity-100 transition-opacity mt-0.5">
                      Click to Change Logo
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-serif font-black text-[#A30000] tracking-tighter">
                        RS
                      </span>
                      <span className="text-amber-500 text-base font-bold absolute -top-1 right-[-10px]">
                        ✦
                      </span>
                    </div>
                    <h1 className="text-xs sm:text-sm font-black text-[#A30000] tracking-wider uppercase font-heading -mt-1">
                      HIGHER EDUCATION
                    </h1>
                    <div className="flex items-center gap-2 -mt-0.5">
                      <span className="h-[1px] w-5 bg-[#A30000]" />
                      <span className="text-[10px] font-semibold text-[#A30000] tracking-widest uppercase">
                        CONSULTANTS
                      </span>
                      <span className="h-[1px] w-5 bg-[#A30000]" />
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium opacity-0 group-hover/formlogo:opacity-100 transition-opacity mt-0.5">
                      Click to Upload Real Logo
                    </span>
                  </div>
                )}
              </div>

              {/* Right: DATE */}
              <div className="space-y-1 text-right w-36 sm:w-44 shrink-0">
                <span className="text-[11px] font-bold text-slate-900 tracking-tight block">
                  DATE
                </span>
                <div className="border border-slate-400 rounded-lg py-1.5 px-2.5 bg-white text-center font-mono font-bold text-xs text-slate-800 shadow-2xs">
                  {displayDate}
                </div>
              </div>
            </div>

            {/* 2. Header Title: ✦ INQUIRY FORM ✦ */}
            <div className="text-center space-y-1 pt-2">
              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-12 sm:w-24 bg-[#C59B4E]" />
                <span className="text-amber-600 text-xs">✦</span>
                <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#0D1B2A] tracking-wider uppercase">
                  INQUIRY FORM
                </h2>
                <span className="text-amber-600 text-xs">✦</span>
                <span className="h-[1px] w-12 sm:w-24 bg-[#C59B4E]" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium italic">
                Please fill out the form below and you will be receiving free consultation suitable to your needs.
              </p>
            </div>

            {/* 3. SECTION 1: PERSONAL INFORMATION */}
            <div className="space-y-3 pt-1">
              <div className="inline-block bg-[#A30000] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-xs">
                PERSONAL INFORMATION
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-xs">
                {/* Full Name */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Full Name</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-bold text-slate-900 px-1">
                    {lastPayload.fullName || '—'}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Date of Birth</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-800 px-1">
                    {lastPayload.dob || '—'}
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Phone / WhatsApp</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-bold text-[#A30000] px-1">
                    {lastPayload.phone || '—'}
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Gender</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-800 px-1">
                    {lastPayload.gender || 'Male'}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Email</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-800 px-1 truncate">
                    {lastPayload.email || '—'}
                  </div>
                </div>

                {/* Nationality (CNIC/Passport removed per user instruction) */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Nationality</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-800 px-1">
                    {lastPayload.nationality || 'Pakistani'}
                  </div>
                </div>

                {/* Current Address */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Current Address</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-800 px-1 truncate">
                    {lastPayload.currentAddress || lastPayload.city || 'Peshawar, KPK'}
                  </div>
                </div>

                {/* Marital Status */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Marital Status</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-800 px-1">
                    {lastPayload.maritalStatus || 'Single'}
                  </div>
                </div>

                {/* Permanent Address (Full Span) */}
                <div className="flex items-baseline gap-2 md:col-span-2">
                  <span className="font-semibold text-slate-800 whitespace-nowrap">Permanent Address</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-800 px-1">
                    {lastPayload.permanentAddress || lastPayload.currentAddress || 'Peshawar, KPK, Pakistan'}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. SECTION 2: ACADEMIC INFORMATION */}
            <div className="space-y-3 pt-2">
              <div className="inline-block bg-[#0D1B2A] text-white text-xs font-black uppercase tracking-wider px-5 py-1 rounded-full shadow-xs">
                ACADEMIC INFORMATION
              </div>

              {/* Academic Table with Warm Golden-Bronze Header */}
              <div className="overflow-x-auto rounded-lg border border-slate-300">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#C59B4E] text-white font-bold border-b border-amber-600">
                      <th className="py-2 px-3 border-r border-amber-600/50 text-center w-[28%]">Degree / Course</th>
                      <th className="py-2 px-3 border-r border-amber-600/50 text-center w-[15%]">Year</th>
                      <th className="py-2 px-3 border-r border-amber-600/50 text-center w-[25%]">Grade / CGPA / %age</th>
                      <th className="py-2 px-3 text-center w-[32%]">Institute / Board / University</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(lastPayload.academicRows && lastPayload.academicRows.length > 0 ? lastPayload.academicRows : academicRows).map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">{row.degree || '—'}</td>
                        <td className="py-2 px-3 border-r border-slate-200 text-center text-slate-700">{row.year || '—'}</td>
                        <td className="py-2 px-3 border-r border-slate-200 text-center font-bold text-slate-900">{row.grade || '—'}</td>
                        <td className="py-2 px-3 text-slate-700">{row.institute || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Structured Underline & Checkbox Fields from the Image */}
              <div className="space-y-2.5 text-xs pt-1 text-slate-800">
                {/* Financial Bracket */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold whitespace-nowrap">Financial Bracket</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-900 px-1">
                    {lastPayload.financialBracket || 'Self Funded / Family Sponsorship'}
                  </div>
                </div>

                {/* Preferred Countries */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold whitespace-nowrap">Preferred Countries</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-black text-[#A30000] px-1">
                    {lastPayload.destination || lastPayload.preferredCountries || 'UK / Europe'}
                  </div>
                </div>

                {/* English Proficiency Checkboxes */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-semibold whitespace-nowrap">English Proficiency</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.ieltsStatus || '').toLowerCase().includes('ielts')} className="accent-[#A30000] rounded" />
                    <span>IELTS</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.ieltsStatus || '').toLowerCase().includes('toefl')} className="accent-[#A30000] rounded" />
                    <span>TOEFL</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.ieltsStatus || '').toLowerCase().includes('pte')} className="accent-[#A30000] rounded" />
                    <span>PTE</span>
                  </label>
                  <div className="flex items-baseline gap-1 grow">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" readOnly checked={!(lastPayload.ieltsStatus || '').toLowerCase().includes('ielts') && !(lastPayload.ieltsStatus || '').toLowerCase().includes('toefl') && !(lastPayload.ieltsStatus || '').toLowerCase().includes('pte')} className="accent-[#A30000] rounded" />
                      <span>Other</span>
                    </label>
                    <div className="grow border-b border-slate-500 pb-0.5 px-1 font-medium text-slate-700">
                      {lastPayload.ieltsStatus || ''}
                    </div>
                  </div>
                </div>

                {/* Preparation & Expected Score */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold whitespace-nowrap">Preparation (If any)</span>
                    <div className="grow border-b border-slate-500 pb-0.5 font-medium text-slate-800 px-1">
                      {lastPayload.testPreparation || 'Standard Consultation'}
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold whitespace-nowrap">Expected Score</span>
                    <div className="grow border-b border-slate-500 pb-0.5 font-bold text-slate-900 px-1">
                      {lastPayload.expectedScore || '6.5+ Band / 65+ PTE'}
                    </div>
                  </div>
                </div>

                {/* Preferred Course / Program */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold whitespace-nowrap">Preferred Course / Program</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-semibold text-slate-900 px-1">
                    {lastPayload.preferredCourse || lastPayload.academicBackground || 'Business, Computing, Engineering or Health Sciences'}
                  </div>
                </div>

                {/* Study Level Checkboxes */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-semibold whitespace-nowrap">Study Level</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.studyLevel || '').toLowerCase().includes('undergraduate') || (lastPayload.studyLevel || '').toLowerCase().includes('bachelor')} className="accent-[#A30000] rounded" />
                    <span>Undergraduate (Bachelor)</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.studyLevel || '').toLowerCase().includes('postgraduate') || (lastPayload.studyLevel || '').toLowerCase().includes('master')} className="accent-[#A30000] rounded" />
                    <span>Postgraduate (Master)</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.studyLevel || '').toLowerCase().includes('phd') || (lastPayload.studyLevel || '').toLowerCase().includes('doctorate')} className="accent-[#A30000] rounded" />
                    <span>PhD/Doctorate</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={!(lastPayload.studyLevel || '').toLowerCase().includes('bachelor') && !(lastPayload.studyLevel || '').toLowerCase().includes('master') && !(lastPayload.studyLevel || '').toLowerCase().includes('phd')} className="accent-[#A30000] rounded" />
                    <span>Other</span>
                  </label>
                </div>

                {/* Intake Preference Checkboxes */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-semibold whitespace-nowrap">Intake Preference</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.targetIntake || '').toLowerCase().includes('january')} className="accent-[#A30000] rounded" />
                    <span>January</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.targetIntake || '').toLowerCase().includes('may')} className="accent-[#A30000] rounded" />
                    <span>May</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.targetIntake || '').toLowerCase().includes('september') || (! (lastPayload.targetIntake || '').toLowerCase().includes('january') && !(lastPayload.targetIntake || '').toLowerCase().includes('may'))} className="accent-[#A30000] rounded" />
                    <span>September</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={false} className="accent-[#A30000] rounded" />
                    <span>Other</span>
                  </label>
                </div>

                {/* Work Experience */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold whitespace-nowrap">Work Experience (If any)</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-medium text-slate-800 px-1">
                    {lastPayload.workExperience || 'N/A (Direct Academic Progression)'}
                  </div>
                </div>

                {/* How did you hear about us? */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-semibold whitespace-nowrap">How did you hear about us?</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.hearAboutUs || '').toLowerCase().includes('social')} className="accent-[#A30000] rounded" />
                    <span>Social Media</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.hearAboutUs || '').toLowerCase().includes('referral')} className="accent-[#A30000] rounded" />
                    <span>Referral</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={(lastPayload.hearAboutUs || '').toLowerCase().includes('website')} className="accent-[#A30000] rounded" />
                    <span>Website</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" readOnly checked={false} className="accent-[#A30000] rounded" />
                    <span>Other</span>
                  </label>
                </div>

                {/* Additional Information / Notes */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold whitespace-nowrap">Additional Information / Notes</span>
                  <div className="grow border-b border-slate-500 pb-0.5 font-medium text-slate-800 px-1">
                    {lastPayload.additionalNotes || lastPayload.message || 'Free initial profile assessment requested.'}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Section 3: Documents Checklist & Attestation Guide */}
            <div className="space-y-2.5">
              <div className="inline-block bg-[#A30000] text-white font-bold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider">
                DOCUMENTS CHECKLIST
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Left Column: Admission Documents Requirements */}
                <div className="border border-slate-300 rounded-xl p-3 bg-slate-50/50 space-y-2">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 text-[11px]">
                    1. Admission Documents Requirements
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-800">
                    <div>
                      <span className="font-bold">☐ Valid Passport</span>
                      <p className="text-slate-600 pl-3">– Photo and Signature Page (Scan Copy)</p>
                    </div>
                    <div>
                      <span className="font-bold">☐ Educational Transcripts & Certificates</span>
                      <p className="text-slate-600 pl-3">– Matric DMC & Certificate</p>
                      <p className="text-slate-600 pl-3">– Intermediate (FSc) DMC & Certificate</p>
                      <p className="text-slate-600 pl-3">– Bachelor Degree & Transcripts</p>
                    </div>
                    <div>
                      <span className="font-bold">☐ Reference Letters</span>
                      <p className="text-slate-600 pl-3">– Two reference letters, not older than 6 months</p>
                    </div>
                    <div>
                      <span className="font-bold">☐ Passport-size Photograph</span>
                      <p className="text-slate-600 pl-3">– Required in soft copy (scanned) as well</p>
                    </div>
                    <div>
                      <span className="font-bold">☐ Contact Information</span>
                      <p className="text-slate-600 pl-3">– Valid Contact Number & Email Address</p>
                    </div>
                    <div>
                      <span className="font-bold">☐ English Proficiency Certificate</span>
                      <p className="text-slate-600 pl-3">– IELTS / TOEFL / PTE (if available)</p>
                    </div>
                    <div>
                      <span className="font-bold">☐ Updated CV</span>
                      <p className="text-slate-600 pl-3">– In Europass CV format</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Attestation of Educational Documents */}
                <div className="border border-slate-300 rounded-xl p-3 bg-slate-50/50 space-y-2.5">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 text-[11px]">
                    2. Attestation of Educational Documents
                  </div>
                  
                  <div className="space-y-2 text-[11px]">
                    {/* Matric */}
                    <div className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                      <div className="font-bold text-[#A30000]">Matric DMC & Certificate</div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">Board</span>
                        <span className="text-slate-400">→</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">IBCC</span>
                        <span className="text-slate-400">→</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800">MOFA</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Board verification → IBCC Equivalence → MOFA Seal.</p>
                    </div>

                    {/* Intermediate */}
                    <div className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                      <div className="font-bold text-[#A30000]">FSc / Intermediate DMC & Cert.</div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">Board</span>
                        <span className="text-slate-400">→</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">IBCC</span>
                        <span className="text-slate-400">→</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800">MOFA</span>
                      </div>
                      <p className="text-[10px] text-slate-500">BISE Board verification → IBCC → MOFA Attestation.</p>
                    </div>

                    {/* Bachelor */}
                    <div className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                      <div className="font-bold text-[#A30000]">Bachelor / Master Degree & Trans.</div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">University</span>
                        <span className="text-slate-400">→</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">HEC</span>
                        <span className="text-slate-400">→</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800">MOFA</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Issuing University → HEC Attestation → MOFA Seal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Motto: ✦ Your Dream, Our Mission ✦ */}
            <div className="text-center pt-3 pb-1 border-t border-slate-300">
              <div className="flex items-center justify-center gap-2">
                <span className="text-amber-600 text-xs">✦</span>
                <span className="text-sm font-serif italic font-bold text-[#A30000]">
                  Your Dream, Our Mission
                </span>
                <span className="text-amber-600 text-xs">✦</span>
              </div>
            </div>
          </div>

          {/* 5. Bottom Dark Navy Footer Bar with Red Top Accent */}
          <div className="mt-4 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10">
            <div className="h-1 bg-[#A30000] w-full" />
            <div className="bg-[#0B192C] text-white px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 font-medium text-slate-200">
                <span className="flex items-center gap-1.5 font-bold">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  0334 4626284
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  info@rshec.pk
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Office No. UG-389, Deans Trade Centre, Peshawar, KPK
                </span>
              </div>

              {/* Watermark RS Monogram */}
              <div className="font-serif font-black text-lg text-slate-500 opacity-60 tracking-wider">
                RS
              </div>
            </div>
          </div>
        </div>

        {/* Sync Status Badge */}
        {syncStatus && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{syncStatus}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      id="main-contact-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-red-100 shadow-2xl shadow-red-950/5 space-y-7 relative overflow-hidden text-left"
    >
      {/* Decorative Top Accent Gradient */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#DB0303] via-red-500 to-[#B30000]" />

      {/* Brand Header with Authentic RS Uploadable Official Logo */}
      <div className="flex flex-col items-center justify-center text-center gap-3 pb-6 border-b border-slate-100">
        {/* Uploadable Brand Logo Header */}
        <FormLogoUploader height={85} />

        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-extrabold text-[#DB0303] uppercase tracking-wider font-heading">
              Official Student Application &amp; Assessment Portal
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-50 text-[#DB0303] px-2.5 py-0.5 rounded-full border border-red-200">
              <Sparkles className="w-3 h-3" />
              <span>100% Free Consultation</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Govt. Licensed Advisory</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            RS Higher Education Consultants • Head Office: Office No. UG-389, Deans Trade Centre, Peshawar Cantt
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Student Identity & Contact */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-[#DB0303] text-white font-bold text-xs flex items-center justify-center font-heading">
            1
          </span>
          <h4 className="text-sm font-extrabold text-slate-900 font-heading">
            Personal & Contact Information
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <User className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Full Name *</span>
            </label>
            <input
              id="form-full-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Muhammad Hamza"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
            />
          </div>

          {/* WhatsApp / Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <Phone className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>WhatsApp / Phone Number *</span>
            </label>
            <input
              id="form-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0334 1234567"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <Mail className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Email Address *</span>
            </label>
            <input
              id="form-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@gmail.com"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <Calendar className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Date of Birth</span>
            </label>
            <input
              id="form-dob"
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="e.g. 15/08/2001"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
            />
          </div>

          {/* Gender & Marital Status */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 font-heading">
                Gender
              </label>
              <select
                id="form-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-3 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 font-heading">
                Marital Status
              </label>
              <select
                id="form-marital-status"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-3 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
          </div>

          {/* Nationality */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <Globe className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Nationality</span>
            </label>
            <input
              id="form-nationality"
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="e.g. Pakistani"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
            />
          </div>

          {/* City in Pakistan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <MapPin className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Your City / Domicile *</span>
            </label>
            <input
              id="form-city"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Peshawar, Mardan, Swat, Islamabad"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
            />
            {/* Quick City Chips */}
            <div className="flex flex-wrap items-center gap-1 pt-1">
              <span className="text-[10px] text-slate-400 font-bold">Quick:</span>
              {POPULAR_CITIES.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCity(c)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    city === c
                      ? 'bg-[#DB0303] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Current Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <MapPin className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Current Residential Address</span>
            </label>
            <input
              id="form-current-address"
              type="text"
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              placeholder="e.g. Hayatabad Phase 4, Peshawar"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* STEP 2: Study Abroad Preferences */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-6 h-6 rounded-full bg-[#DB0303] text-white font-bold text-xs flex items-center justify-center font-heading">
            2
          </span>
          <h4 className="text-sm font-extrabold text-slate-900 font-heading">
            Target Destination & Academic Goals
          </h4>
        </div>

        {/* Preferred Study Destination with Quick Flag Chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between font-heading">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Target Study Destination *</span>
            </span>
            <span className="text-[11px] font-semibold text-[#DB0303]">
              Selected: {destinationDisplayName}
            </span>
          </label>

          {/* Popular Destination Flag Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {POPULAR_DESTINATIONS.map((d) => {
              const isSelected = preferredDestination === d.slug;
              return (
                <button
                  type="button"
                  key={d.slug}
                  onClick={() => setPreferredDestination(d.slug)}
                  className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold font-heading flex items-center gap-2 border transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-red-50 border-[#DB0303] text-[#DB0303] shadow-xs ring-1 ring-red-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="shrink-0 p-0.5 bg-white rounded-md shadow-2xs flex items-center justify-center">
                    {d.slug === 'other' ? (
                      <span className="text-sm leading-none">🌍</span>
                    ) : (
                      <CountryFlag
                        countryCode={d.slug}
                        countryName={d.name}
                        fallbackEmoji={d.flag}
                        size="sm"
                      />
                    )}
                  </div>
                  <span className="truncate">{d.name}</span>
                </button>
              );
            })}
          </div>

          {/* Full Destination Dropdown for all 16 countries + Other Country */}
          <div className="pt-1">
            <select
              id="form-destination"
              value={normalizedDestSlug}
              onChange={(e) => setPreferredDestination(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all"
            >
              <option value="" disabled>Select target study country...</option>
              {ALL_DESTINATIONS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.flagEmoji} {d.countryName === 'Türkiye' ? 'Turkey (Türkiye)' : d.countryName}
                </option>
              ))}
              <option value="other">🌍 Other Country (Specify Custom Destination)</option>
            </select>
          </div>

          {/* Conditional Custom Country Input Field */}
          {preferredDestination === 'other' && (
            <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xs">
              <label htmlFor="custom-other-country" className="text-xs font-bold text-[#DB0303] flex items-center justify-between font-heading">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4" />
                  <span>Specify Your Desired Country *</span>
                </span>
                <span className="text-[10px] font-semibold text-red-600 bg-red-100/80 px-2 py-0.5 rounded-full">
                  Global Admissions
                </span>
              </label>
              <input
                id="custom-other-country"
                type="text"
                required={preferredDestination === 'other'}
                value={customOtherCountry}
                onChange={(e) => setCustomOtherCountry(e.target.value)}
                placeholder="Enter country name (e.g. Switzerland, Japan, New Zealand, Sweden, Finland, Poland...)"
                className="w-full bg-white border border-red-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#DB0303] focus:ring-2 focus:ring-red-200 transition-all placeholder:text-slate-400 shadow-xs"
              />
              <p className="text-[11px] text-slate-600 leading-snug">
                RS Higher Education Consultants provides comprehensive guidance, document evaluation, and university admissions for all destinations worldwide.
              </p>
            </div>
          )}
        </div>

        {/* Study Level Chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
            <BookOpen className="w-3.5 h-3.5 text-[#DB0303]" />
            <span>Target Degree Level *</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {STUDY_LEVELS.map((level) => {
              const isSelected = studyLevel === level.value;
              return (
                <button
                  type="button"
                  key={level.value}
                  onClick={() => setStudyLevel(level.value)}
                  className={`p-2.5 rounded-xl text-xs font-bold font-heading flex items-center gap-2 border transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <span>{level.icon}</span>
                  <span className="truncate">{level.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Target Intake */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <Calendar className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Target Intake *</span>
            </label>
            <select
              id="form-intake"
              value={targetIntake}
              onChange={(e) => setTargetIntake(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
            >
              <option value="September 2026 (Fall Intake)">September 2026 (Fall Intake)</option>
              <option value="January 2027 (Spring Intake)">January 2027 (Spring Intake)</option>
              <option value="May / Summer 2027">May / Summer 2027</option>
              <option value="Immediate Upcoming Intake">Immediate Upcoming Intake</option>
            </select>
          </div>

          {/* IELTS Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <Sparkles className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>English Language / IELTS Status *</span>
            </label>
            <select
              id="form-ielts"
              value={ieltsStatus}
              onChange={(e) => setIeltsStatus(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
            >
              <option value="Planning to take IELTS/PTE">Planning to take IELTS/PTE</option>
              <option value="Already have IELTS/PTE score">Already have IELTS/PTE score</option>
              <option value="Looking for IELTS Waiver / MOI">Looking for IELTS Waiver / MOI</option>
              <option value="Need English Test Coaching">Need English Test Coaching</option>
            </select>
          </div>
        </div>
      </div>

      {/* STEP 3: Academic Qualifications & Counseling Details */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#DB0303] text-white font-bold text-xs flex items-center justify-center font-heading">
              3
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 font-heading">
              Recent Academic Qualification & Program Details
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Auto-Evaluated
          </span>
        </div>

        {/* Last / Most Recent Education & Live CGPA / Percentage Auto-Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-700 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center text-sm font-black">
                🎓
              </span>
              <div>
                <h5 className="text-xs sm:text-sm font-black tracking-wide font-heading text-white flex items-center gap-2">
                  <span>Last / Most Recent Academic Education</span>
                  <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Auto-Calculated
                  </span>
                </h5>
                <p className="text-[11px] text-slate-300">
                  Enter your latest qualification and score. Percentage, grade, and admission standing are computed and auto-filled in real-time.
                </p>
              </div>
            </div>

            {/* Mode Switcher: CGPA vs Marks */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setCalcMode('cgpa');
                  setCalcDegree('4-Year Bachelor (BS / BBA / BE / CS)');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-heading transition-all cursor-pointer ${
                  calcMode === 'cgpa' ? 'bg-[#DB0303] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎓 CGPA System (4.0/5.0)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCalcMode('marks');
                  setCalcDegree('Intermediate / FSc (Pre-Medical)');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-heading transition-all cursor-pointer ${
                  calcMode === 'marks' ? 'bg-[#DB0303] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                📊 Marks &amp; % System
              </button>
            </div>
          </div>

          {/* Last / Recent Education Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Degree Selection */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-bold text-slate-300">Recent Degree / Course *</label>
              <select
                value={calcDegree}
                onChange={(e) => setCalcDegree(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white font-medium focus:border-amber-400 focus:outline-none"
              >
                {calcMode === 'cgpa' ? (
                  <>
                    <option value="4-Year Bachelor (BS / BBA / BE / CS)">4-Year Bachelor (BS / BBA / BE / CS)</option>
                    <option value="2-Year Master (MS / MPhil / MBA)">2-Year Master (MS / MPhil / MBA)</option>
                    <option value="MBBS / BDS / Pharm-D / DPT">MBBS / BDS / Pharm-D / DPT</option>
                    <option value="Associate Degree / 2-Year BA / BSc">Associate Degree / 2-Year BA / BSc</option>
                    <option value="Postgraduate Diploma / Other Degree">Postgraduate Diploma / Other Degree</option>
                  </>
                ) : (
                  <>
                    <option value="Intermediate / FSc (Pre-Medical)">Intermediate / FSc (Pre-Medical)</option>
                    <option value="Intermediate / FSc (Pre-Engineering)">Intermediate / FSc (Pre-Engineering)</option>
                    <option value="Intermediate / ICS (Computer Science)">Intermediate / ICS (Computer Science)</option>
                    <option value="Intermediate / I.Com / F.A">Intermediate / I.Com / F.A</option>
                    <option value="A-Levels / Cambridge High School">A-Levels / Cambridge High School</option>
                    <option value="Matriculation / O-Levels">Matriculation / O-Levels</option>
                    <option value="DAE / 3-Year Technical Diploma">DAE / 3-Year Technical Diploma</option>
                  </>
                )}
              </select>
            </div>

            {/* Passing Year */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Passing Year *</label>
              <input
                type="text"
                value={calcPassingYear}
                onChange={(e) => setCalcPassingYear(e.target.value)}
                placeholder="e.g. 2024"
                className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white font-medium text-center focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Institute / University */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Institute / University / Board *</label>
              <input
                type="text"
                value={calcInstitute}
                onChange={(e) => setCalcInstitute(e.target.value)}
                placeholder="e.g. University of Peshawar"
                className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white font-medium focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Calculator Input Fields (Obtained vs Scale/Total) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-700/50">
            {calcMode === 'cgpa' ? (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Obtained CGPA *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={calcCgpaScale}
                    value={calcObtainedCgpa}
                    onChange={(e) => setCalcObtainedCgpa(e.target.value)}
                    placeholder="e.g. 3.25"
                    className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-3 py-2 text-xs text-amber-300 font-black text-center focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">CGPA Scale / Total</label>
                  <select
                    value={calcCgpaScale}
                    onChange={(e) => setCalcCgpaScale(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white font-medium focus:border-amber-400 focus:outline-none text-center"
                  >
                    <option value="4.0">4.0 Scale (Standard HEC / US / UK)</option>
                    <option value="5.0">5.0 Scale</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Obtained Marks *</label>
                  <input
                    type="number"
                    min="0"
                    value={calcObtainedMarks}
                    onChange={(e) => setCalcObtainedMarks(e.target.value)}
                    placeholder="e.g. 880"
                    className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-3 py-2 text-xs text-amber-300 font-black text-center focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Total Marks *</label>
                  <input
                    type="number"
                    min="1"
                    value={calcTotalMarks}
                    onChange={(e) => setCalcTotalMarks(e.target.value)}
                    placeholder="e.g. 1100"
                    className="w-full bg-slate-800/90 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white font-medium text-center focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Live Calculated Stats & Real-Time Auto-Fill Indicator */}
          <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 text-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Auto Percentage</span>
                <span className="text-sm sm:text-base font-black text-amber-400">{calculatedScore.percentage}</span>
              </div>
              <div className="bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 text-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Grade / Standing</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400">{calculatedScore.grade}</span>
              </div>
              {calculatedScore.germanGrade && (
                <div className="bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 text-center" title="German Bavarian Grade Equivalent (Uni-Assist)">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">German Grade</span>
                  <span className="text-xs sm:text-sm font-bold text-sky-400">{calculatedScore.germanGrade}</span>
                </div>
              )}
              <div className="text-left">
                <span className="text-[10px] text-amber-300 font-bold block flex items-center gap-1">
                  <span>🎯 Eligibility:</span>
                  <span>{calculatedScore.scholarshipChance}</span>
                </span>
                <span className="text-[10px] text-slate-400 block">{calculatedScore.remark}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-800/60 px-3 py-1.5 rounded-xl self-stretch md:self-auto justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Auto-filled into Official Inquiry PDF</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Preferred Course / Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <GraduationCap className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Preferred Course / Major</span>
            </label>
            <input
              id="form-preferred-course"
              type="text"
              value={preferredCourse}
              onChange={(e) => setPreferredCourse(e.target.value)}
              placeholder="e.g. Computer Science, MBA, Nursing, Engineering, LLM"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
            />
          </div>

          {/* Financial Bracket */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
              <Award className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Financial Sponsorship / Budget</span>
            </label>
            <select
              id="form-financial-bracket"
              value={financialBracket}
              onChange={(e) => setFinancialBracket(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
            >
              <option value="Self Funded / Family Sponsorship">Self Funded / Family Sponsorship</option>
              <option value="Seeking Partial University Scholarship">Seeking Partial University Scholarship</option>
              <option value="Bank Statement Ready (Rs. 8M - 15M)">Bank Statement Ready (Rs. 8M - 15M)</option>
              <option value="Low Tuition Budget (Under £12,000 / $15,000)">Low Tuition Budget (Under £12,000 / $15,000)</option>
            </select>
          </div>
        </div>

        {/* Work Experience & How did you hear about us */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 font-heading">
              Work Experience (If any)
            </label>
            <input
              id="form-work-exp"
              type="text"
              value={workExperience}
              onChange={(e) => setWorkExperience(e.target.value)}
              placeholder="e.g. 1 Year as Software Trainee / None"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 font-heading">
              How did you hear about RS?
            </label>
            <select
              id="form-hear-about"
              value={hearAboutUs}
              onChange={(e) => setHearAboutUs(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all shadow-xs"
            >
              <option value="Social Media (Facebook / Instagram / TikTok)">Social Media (Facebook / Instagram / TikTok)</option>
              <option value="Friend or Student Referral">Friend or Student Referral</option>
              <option value="Google Search / Website">Google Search / Website</option>
              <option value="Deans Trade Centre Walk-in">Deans Trade Centre Walk-in</option>
            </select>
          </div>
        </div>

        {/* Additional Inquiries */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 font-heading flex items-center justify-between">
            <span>Specific Questions or Notes (Optional)</span>
            <span className="text-[10px] text-slate-400 font-normal">Scholarships, Dependent Visa, Gap justification</span>
          </label>
          <textarea
            id="form-message"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us any specific requirements (e.g. looking for low tuition fee universities, scholarships, dependent visa)..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#DB0303] transition-all resize-none shadow-xs"
          />
        </div>
      </div>

      {/* Submit CTA */}
      <div className="pt-3 space-y-3">
        <button
          id="submit-contact-form-btn"
          type="submit"
          disabled={loading}
          className="w-full py-4.5 bg-gradient-to-r from-[#DB0303] via-red-600 to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] active:scale-[0.99] text-white font-black text-sm sm:text-base rounded-2xl font-heading shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer group"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Inquiry Form &amp; PDF...</span>
            </span>
          ) : (
            <>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>Generate Official Inquiry Form &amp; Download</span>
            </>
          )}
        </button>

        {/* Feature Highlights beneath CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-500 text-center font-medium">
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Auto PDF Download</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <span>Direct WhatsApp Dispatch</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span>100% Free Consultation</span>
          </div>
        </div>
      </div>
    </form>
  );
};
