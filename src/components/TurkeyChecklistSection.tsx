import React, { useState } from 'react';
import { generateTurkeyChecklistPDF, generateTurkeyInterviewGuidePDF } from '../utils/turkeyPdfGenerator';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useBrand } from '../context/BrandContext';
import {
  Download,
  FileCheck2,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Plane,
  ArrowRight,
  Clock,
  Briefcase,
  Coins,
  Stethoscope,
  Award,
  GraduationCap,
  MessageSquare,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Upload
} from 'lucide-react';

export const TurkeyChecklistSection: React.FC = () => {
  const [checkedAdmission, setCheckedAdmission] = useState<Record<string, boolean>>({});
  const [checkedVisa, setCheckedVisa] = useState<Record<string, boolean>>({});
  const [downloadingType, setDownloadingType] = useState<'checklist' | 'interview' | null>(null);
  const [interviewSearch, setInterviewSearch] = useState('');
  const [expandedQA, setExpandedQA] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const {
    customTurkeyChecklistPdf,
    customTurkeyChecklistName,
    customTurkeyInterviewPdf,
    customTurkeyInterviewName,
    openTurkeyChecklistModal,
    openTurkeyInterviewModal
  } = useBrand();

  const toggleAdmission = (id: string) => {
    setCheckedAdmission((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleVisa = (id: string) => {
    setCheckedVisa((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleQA = (idx: number) => {
    setExpandedQA((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleDownloadChecklist = () => {
    setDownloadingType('checklist');
    try {
      if (customTurkeyChecklistPdf) {
        const a = document.createElement('a');
        a.href = customTurkeyChecklistPdf;
        a.download = customTurkeyChecklistName || 'Turkey_Checklist_RS_Higher_Education.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        generateTurkeyChecklistPDF();
      }
    } catch (e) {
      console.error('Error generating Turkey checklist PDF:', e);
    } finally {
      setTimeout(() => setDownloadingType(null), 800);
    }
  };

  const handleDownloadInterview = () => {
    setDownloadingType('interview');
    try {
      if (customTurkeyInterviewPdf) {
        const a = document.createElement('a');
        a.href = customTurkeyInterviewPdf;
        a.download = customTurkeyInterviewName || 'Turkey_Questioner_RS_Higher_Education.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        generateTurkeyInterviewGuidePDF();
      }
    } catch (e) {
      console.error('Error generating Turkey interview PDF:', e);
    } finally {
      setTimeout(() => setDownloadingType(null), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const admissionRequirements = [
    {
      id: 'adm_pass',
      title: 'Valid Passport',
      details: 'Photo and Signature Page (High quality color scan copy)',
      tag: 'Identity',
    },
    {
      id: 'adm_transcripts',
      title: 'Educational Transcripts & Certificates',
      details: 'Matric DMC & Certificate, Intermediate DMC & Certificate, Bachelor Degree & Transcripts',
      tag: 'Academic',
    },
    {
      id: 'adm_photo',
      title: 'Passport-size Photograph',
      details: 'White background, biometric 5x5 cm photo taken within the last 6 months',
      tag: 'Biometric',
    },
    {
      id: 'adm_parents',
      title: 'Father and Mother Full Name',
      details: 'Exact spelling as per CNIC / B-Form and family registration records',
      tag: 'Family',
    },
    {
      id: 'adm_contact',
      title: 'Contact Information',
      details: 'Active mobile number (WhatsApp enabled) & primary personal email address',
      tag: 'Contact',
    },
    {
      id: 'adm_english',
      title: 'English Proficiency Certificate',
      details: 'IELTS / PTE or English as Medium of Instruction certificate (if available)',
      tag: 'Language',
    },
    {
      id: 'adm_proposal',
      title: 'Research Proposal',
      details: 'Academic research synopsis (Required for Masters by Thesis & PhD programs)',
      tag: 'Postgraduate',
    },
    {
      id: 'adm_cv',
      title: 'Updated CV / Resume',
      details: 'Chronological education history, internships, and extracurricular achievements',
      tag: 'Profile',
    },
  ];

  const visaRequirements = [
    {
      id: 'visa_form',
      title: 'Visa Application Form',
      details: 'Completed and signed Anatolia Visa Application Center portal submission form',
      tag: 'Form',
    },
    {
      id: 'visa_pass',
      title: 'Passport / Travel Document',
      details: 'Valid for at least 1 year from the intended date of arrival in Turkey',
      tag: 'Travel',
    },
    {
      id: 'visa_accept',
      title: 'University Acceptance Letter',
      details: 'Official unconditional admission letter and tuition deposit confirmation receipt',
      tag: 'Admission',
    },
    {
      id: 'visa_attest',
      title: 'Attested Educational Documents',
      details: 'Board → IBCC → MOFA (Matric/Inter) & University → HEC → MOFA (Bachelor/Master)',
      tag: 'Attestation',
    },
    {
      id: 'visa_cover',
      title: 'Cover Letter / SOP',
      details: 'Statement outlining study plan, financial capability, and intent to return to Pakistan',
      tag: 'SOP',
    },
    {
      id: 'visa_frc',
      title: 'Family Registration Certificate (FRC)',
      details: 'Official NADRA FRC (By Birth / with Parents and Siblings)',
      tag: 'NADRA',
    },
    {
      id: 'visa_interview_form',
      title: 'Interview Form (18+)',
      details: 'Anatolia Visa Application Center official interview questionnaire for adults',
      tag: 'Embassy',
    },
    {
      id: 'visa_bank',
      title: 'Financial Documents',
      details: 'Bank statement minimum $7,000 maintained for 3 months with Account Maintenance Letter',
      tag: 'Finance',
    },
    {
      id: 'visa_tax',
      title: 'Employment / Business Documents',
      details: '3-Year FBR Tax Returns, Wealth statement, salary slips, and Chamber of Commerce cert',
      tag: 'Sponsor',
    },
    {
      id: 'visa_sponsor',
      title: 'Sponsor Documents & Affidavit',
      details: 'Notarized sponsorship affidavit on stamp paper with sponsor CNIC copy',
      tag: 'Legal',
    },
    {
      id: 'visa_flight',
      title: 'Flight Reservation',
      details: 'Round-trip or one-way confirmed flight itinerary matching intake start dates',
      tag: 'Travel',
    },
    {
      id: 'visa_hotel',
      title: 'Accommodation Proof',
      details: 'University dormitory allotment letter or confirmed rental/hotel reservation',
      tag: 'Housing',
    },
    {
      id: 'visa_insurance',
      title: 'Travel Health Insurance',
      details: 'Comprehensive Turkey & Schengen travel insurance covering at least €30,000',
      tag: 'Insurance',
    },
  ];

  const partnerUniversities = [
    'Sabancı University', 'Yeditepe University', 'Özyeğin University', 'Istanbul Gelişim University',
    'Doğuş University', 'Üsküdar University', 'Beykent University', 'Altınbaş University',
    'Istanbul Ticaret University', 'Antalya Bilim University', 'TED University', 'Ibn Haldun University',
    'Kadir Has University', 'İstanbul Topkapı University', 'Fenerbahçe University', 'Okan University',
    'Izmir University of Economics', 'Istinye University', 'Istanbul Bilgi University', 'Istanbul Aydın University',
    'Bahçeşehir University', 'Beykoz University', 'Biruni University', 'Istanbul Medipol University'
  ];

  const interviewQAs = [
    {
      q: '1. Why do you want to study in Türkiye?',
      a: 'Türkiye offers globally recognized universities, affordable tuition fees, quality education, and a safe, multicultural environment for international students.',
      category: 'Intent'
    },
    {
      q: '2. Why did you choose this university?',
      a: 'It is a reputable institution with experienced faculty, strong academic facilities, and an English-taught program that matches my career goals.',
      category: 'University'
    },
    {
      q: '3. Why did you choose this program?',
      a: 'This field is globally in demand. The program offers practical training and research opportunities that will strengthen my professional skills.',
      category: 'Course'
    },
    {
      q: '4. Who is your sponsor / how will you fund your studies?',
      a: 'My education will be funded by [my sponsor / my own savings]. We have sufficient income and bank statements to support the full duration of my studies.',
      category: 'Finance'
    },
    {
      q: "5. What is your sponsor's occupation or business?",
      a: 'My sponsor [runs a family business / is employed as ___], which provides a stable income sufficient to cover my tuition and living expenses.',
      category: 'Finance'
    },
    {
      q: '6. Have you paid your initial deposit?',
      a: 'Yes, I have paid (or am ready to pay) the first installment ($1,000) and will upload the receipt to confirm my Acceptance Letter.',
      category: 'Finance'
    },
    {
      q: '7. Where will you stay in Türkiye?',
      a: 'I will stay in university accommodation or a private student residence, which I will finalize once my visa and registration are complete.',
      category: 'Stay'
    },
    {
      q: '8. Do you have any relatives in Türkiye?',
      a: '[Yes, but I will live independently for my studies.] / [No, I do not have relatives in Türkiye.]',
      category: 'Ties'
    },
    {
      q: '9. Can you speak Turkish?',
      a: 'Not yet — I plan to learn Turkish alongside my academic studies to better integrate into student and campus life.',
      category: 'Language'
    },
    {
      q: '10. How did you learn about this university/program?',
      a: 'I researched public and private universities in Türkiye online, reviewed their programs and reputation, then applied through RS Higher Education Consultants and received my acceptance letter.',
      category: 'Application'
    },
    {
      q: '11. Why this intake (Fall/Spring)?',
      a: 'This is the official intake offered for my program and fits my academic and personal timeline.',
      category: 'Timeline'
    },
    {
      q: '12. Do you plan to work in Türkiye during your studies?',
      a: 'No. My sole purpose is education — I will focus fully on my studies and will not seek employment.',
      category: 'Visa Rules'
    },
    {
      q: '13. What will you do after completing your degree?',
      a: "I plan to return to Pakistan and apply my education and skills to build my career and contribute to my country's development.",
      category: 'Home Ties'
    },
    {
      q: '14. What are your future academic/career goals?',
      a: 'I aim to gain strong theoretical and practical knowledge in my field to pursue advanced studies or a professional career after graduation.',
      category: 'Career'
    },
    {
      q: '15. Do you have health/travel insurance for Türkiye?',
      a: 'Yes, I will arrange valid health insurance covering my entire stay, as required for the residence permit application.',
      category: 'Insurance'
    },
    {
      q: '16. Have you traveled abroad before, or had any visa refusals?',
      a: '[Yes, I have traveled to ___ and always returned on time.] / [No, this is my first international trip, and I have prepared all documents carefully.]',
      category: 'Travel'
    },
    {
      q: '17. Why not study this program in your home country?',
      a: 'Türkiye offers stronger international exposure, more advanced facilities, and globally recognized qualifications in this field at a more affordable cost than equivalent options abroad.',
      category: 'Rationale'
    },
    {
      q: '18. What ties do you have to your home country?',
      a: 'I have strong family, financial, and future career ties at home, and I fully intend to return after completing my studies to build my career there.',
      category: 'Home Ties'
    },
  ];

  const filteredQAs = interviewQAs.filter(
    (item) =>
      item.q.toLowerCase().includes(interviewSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(interviewSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(interviewSearch.toLowerCase())
  );

  const totalReq = admissionRequirements.length + visaRequirements.length;
  const completedCount =
    Object.values(checkedAdmission).filter(Boolean).length +
    Object.values(checkedVisa).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalReq) * 100);

  return (
    <div id="turkey-checklist-document" className="space-y-8">
      {/* Highlighted Banner & Direct Download Callouts */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#7A0000] text-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-red-950/20 border-2 border-red-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DB0303]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-400/40 text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Türkiye Student Admission &amp; Visa Package</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              Study in Turkey: Requirements Checklist &amp; Visa Interview Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official guide covering Admission Requirements, Anatolia Visa Requirements, 24 Partner Universities in Istanbul &amp; Turkey, $1,235 total initial cost, and the 18 essential Visa Interview Questions &amp; Answers.
            </p>

            {/* Readiness Progress */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-48 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-amber-400 to-[#DB0303] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-amber-300">
                {completedCount} of {totalReq} checklist items ready ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Prominent Highlighting Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            {/* Turkey Checklist Button + Upload Trigger */}
            <div className="flex items-center rounded-2xl bg-red-950/40 p-1 border border-red-500/30">
              <button
                onClick={handleDownloadChecklist}
                disabled={downloadingType === 'checklist'}
                id="turkey-download-checklist-btn"
                className="px-5 py-3.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white font-black text-xs sm:text-sm rounded-xl font-heading shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-400/30"
                title={customTurkeyChecklistPdf ? `Download custom: ${customTurkeyChecklistName}` : "Download Turkey checklist PDF"}
              >
                <Download className={`w-4 h-4 ${downloadingType === 'checklist' ? 'animate-bounce' : ''}`} />
                <span>{downloadingType === 'checklist' ? 'Generating...' : 'Turkey checklist (PDF)'}</span>
                {customTurkeyChecklistPdf && (
                  <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase">
                    Custom
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={openTurkeyChecklistModal}
                id="turkey-upload-checklist-btn"
                className="px-3 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ml-1"
                title="Browse & Upload your own Turkey Checklist PDF from your PC"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden xl:inline">Upload</span>
              </button>
            </div>

            {/* Turkey Questioner Button + Upload Trigger */}
            <div className="flex items-center rounded-2xl bg-amber-950/40 p-1 border border-amber-400/30">
              <button
                onClick={handleDownloadInterview}
                disabled={downloadingType === 'interview'}
                id="turkey-download-interview-btn"
                className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl font-heading shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
                title={customTurkeyInterviewPdf ? `Download custom: ${customTurkeyInterviewName}` : "Download Turkey Questioner PDF"}
              >
                <Download className={`w-4 h-4 text-slate-950 ${downloadingType === 'interview' ? 'animate-bounce' : ''}`} />
                <span>{downloadingType === 'interview' ? 'Generating...' : 'Turkey Questioner (PDF)'}</span>
                {customTurkeyInterviewPdf && (
                  <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase">
                    Custom
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={openTurkeyInterviewModal}
                id="turkey-upload-interview-btn"
                className="px-3 py-3.5 bg-slate-900/30 hover:bg-slate-900/50 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ml-1"
                title="Browse & Upload your own Turkey Questioner PDF from your PC"
              >
                <Upload className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden xl:inline">Upload</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              id="turkey-print-btn"
              className="px-4 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl font-heading border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8">
        {/* Document Header */}
        <div className="border-b-2 border-[#DB0303] pb-6 space-y-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DB0303] to-[#8F0000] flex items-center justify-center text-white font-black text-2xl font-heading shadow-md">
                RS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
                    Study in Turkey
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold font-heading uppercase tracking-wider">
                    Türkiye Official 2026
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#DB0303] font-heading">
                  Admission, Anatolia Visa Requirements &amp; Partner Universities
                </p>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="text-xs text-slate-600 space-y-1 md:text-right">
              <p className="flex items-center md:justify-end gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>+92 334 4626284</span>
                <span className="text-slate-300">|</span>
                <Mail className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>info@rshec.pk</span>
              </p>
              <p className="flex items-center md:justify-end gap-1.5 text-[11px] text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>Office No. UG-389, Deans Trade Centre, Peshawar, KPK</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: ADMISSION REQUIREMENTS & VISA REQUIREMENTS (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Admission Requirements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-black text-white bg-slate-900 px-4 py-2.5 rounded-xl font-heading uppercase tracking-wider flex items-center gap-2 flex-1 mr-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                Admission Requirements
              </h4>
              <span className="text-[11px] font-bold text-slate-500">University Offer</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              {admissionRequirements.map((item) => (
                <label
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    checkedAdmission[item.id]
                      ? 'bg-red-50/80 border-red-300 shadow-2xs'
                      : 'bg-white border-slate-200/80 hover:bg-slate-100/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedAdmission[item.id]}
                    onChange={() => toggleAdmission(item.id)}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500 cursor-pointer shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {item.title}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-slate-100 text-slate-700">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {item.details}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right Column: Visa Requirements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-black text-white bg-[#DB0303] px-4 py-2.5 rounded-xl font-heading uppercase tracking-wider flex items-center gap-2 flex-1 mr-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                Visa Requirements (Anatolia)
              </h4>
              <span className="text-[11px] font-bold text-slate-500">Embassy Center</span>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/40 border border-red-200/80 space-y-2.5 max-h-[510px] overflow-y-auto">
              {visaRequirements.map((item) => (
                <label
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    checkedVisa[item.id]
                      ? 'bg-red-100/90 border-red-400 shadow-2xs'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedVisa[item.id]}
                    onChange={() => toggleVisa(item.id)}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500 cursor-pointer shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {item.title}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-red-100 text-red-700">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {item.details}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: OUR PARTNER UNIVERSITIES IN TURKEY (24 UNIVERSITIES) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-black text-white bg-slate-900 px-4 py-2.5 rounded-xl font-heading uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              Our Partner Universities in Turkey (24 Institutions)
            </h4>
            <span className="text-xs text-[#DB0303] font-bold font-heading hidden sm:inline">
              Direct Application &amp; Fast Acceptance
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {partnerUniversities.map((uni, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-2 hover:border-red-300 group transition-all"
              >
                <span className="text-[#DB0303] font-bold text-xs">▪</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#DB0303] transition-colors leading-tight">
                  {uni}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: FINANCIAL BREAKDOWN METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-amber-900">
              1000 $
            </span>
            <h5 className="text-xs font-bold font-heading text-slate-800 uppercase tracking-wider">
              Initial Deposit
            </h5>
            <p className="text-[11px] text-slate-600">
              Directly applied towards 1st year university tuition fee to release acceptance letter.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
              235 $ <span className="text-xs text-slate-500 font-normal">(Approx)</span>
            </span>
            <h5 className="text-xs font-bold font-heading text-slate-800 uppercase tracking-wider">
              Visa Fee Anatolia
            </h5>
            <p className="text-[11px] text-slate-600">
              Official Anatolia Visa Application Center appointment and embassy visa processing fee.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-50 border-2 border-red-300 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-[#DB0303]">
              1235 $
            </span>
            <h5 className="text-xs font-bold font-heading text-red-900 uppercase tracking-wider">
              Approx. Total Cost
            </h5>
            <p className="text-[11px] text-slate-600">
              Estimated total initial budget required before student visa issuance and departure.
            </p>
          </div>
        </div>

        {/* Advisory banner */}
        <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-xs text-center border border-slate-200">
          Apply between <strong>30 days and 3 months before travel</strong> • Visa processing not guaranteed within 15 days • Sign &amp; date all documents before submission
        </div>

        {/* SECTION 4: TÜRKİYE VISA INTERVIEW GUIDE (18 Q&AS INTERACTIVE MODULE) */}
        <div className="space-y-4 pt-6 border-t-2 border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                <MessageSquare className="w-4 h-4" />
                <span>Preparation Guide • RS Higher Education Consultants</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-heading text-slate-900">
                Türkiye Visa Interview Guide (18 Key Questions &amp; Answers)
              </h4>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={interviewSearch}
                  onChange={(e) => setInterviewSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                onClick={handleDownloadInterview}
                disabled={downloadingType === 'interview'}
                className="px-4 py-2 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl font-heading transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Turkey Questioner (PDF)</span>
              </button>
            </div>
          </div>

          {/* Important Tip Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Tip for Anatolia Interview:</strong> Answer confidently, keep responses short and honest, and always ensure your oral answers are 100% consistent with your submitted documents, bank statement sponsor, and university Acceptance Letter.
            </div>
          </div>

          {/* 18 Interactive Questions Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredQAs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-slate-300 transition-all"
              >
                <button
                  onClick={() => toggleQA(idx)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-start justify-between gap-2 hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                      {item.category}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.q}
                    </h5>
                  </div>
                  <span className="text-slate-400 p-1 shrink-0">
                    {expandedQA[idx] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {expandedQA[idx] && (
                  <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block font-heading">
                        Recommended Model Response:
                      </span>
                      <p>{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
