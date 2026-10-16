import React, { useState } from "react";
import { generateUKChecklistPDF } from "../utils/unitedkingdom";
import { BUSINESS_INFO } from "../data/businessInfo";
import { useBrand } from "../context/BrandContext";
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
  Clock,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export const UKChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  const { customUkChecklistPdf, customUkChecklistName } = useBrand();

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      if (customUkChecklistPdf) {
        const a = document.createElement("a");
        a.href = customUkChecklistPdf;
        a.download =
          customUkChecklistName || "UK_Checklist_RS_Higher_Education.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        generateUKChecklistPDF();
      }
    } catch (e) {
      console.error("Error generating UK Checklist PDF:", e);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const partnerUniversities = [
    "University of Hertfordshire",
    "University of East London",
    "Coventry University",
    "University of Chester",
    "University of Greenwich",
    "Teesside University",
    "De Montfort University",
    "University of Dundee",
    "Manchester Metropolitan University",
    "University of Northampton",
  ];

  const totalAppItems = 7;
  const totalVisaItems = 8;
  const totalItems = totalAppItems + totalVisaItems;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div id="uk-checklist-document" className="space-y-8">
      {/* Highlighted Banner & Direct Download Callout */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#990000] text-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-red-950/20 border-2 border-red-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DB0303]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-400/40 text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Student Document & Visa Filing Guide</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              Study in United Kingdom: University & UKVI Visa Checklist
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete official document roadmap for Pakistani students applying
              to UK Universities, CAS issuance, 28-day financial proof, and UKVI
              Student Route visa filing.
            </p>

            {/* Quick Readiness Progress */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-48 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-amber-400 to-[#DB0303] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-amber-300">
                {completedCount} of {totalItems} items ready ({progressPercent}
                %)
              </span>
            </div>
          </div>

          {/* Prominent Highlighting Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              id="uk-download-pdf-btn"
              className="px-5 py-3.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white font-black text-xs sm:text-sm rounded-2xl font-heading shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-red-400/30"
              title={
                customUkChecklistPdf
                  ? `Download custom: ${customUkChecklistName}`
                  : "Download Official UK PDF Checklist"
              }>
              <Download
                className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`}
              />
              <span>
                {isDownloading
                  ? "Generating PDF..."
                  : "Download Official PDF Checklist"}
              </span>
              {customUkChecklistPdf && (
                <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                  Custom
                </span>
              )}
            </button>

            <button
              onClick={handlePrint}
              id="uk-print-checklist-btn"
              className="px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl font-heading border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Printer className="w-4 h-4" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Checklist Replica Sheet */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8">
        {/* Document Header */}
        <div className="border-b-2 border-[#DB0303] pb-6 space-y-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DB0303] to-[#8F0000] flex items-center justify-center text-white font-black text-2xl font-heading shadow-md">
                RS
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
                  STUDY IN UNITED KINGDOM
                </h4>
                <p className="text-xs sm:text-sm font-bold text-[#DB0303] font-heading">
                  University Application, CAS & UKVI Student Visa Checklist
                </p>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="text-xs text-slate-600 space-y-1 md:text-right">
              <p className="flex items-center md:justify-end gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>{BUSINESS_INFO.phone}</span>
                <span className="text-slate-300">|</span>
                <Mail className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>{BUSINESS_INFO.email}</span>
              </p>
              <p className="flex items-center md:justify-end gap-1.5 text-[11px] text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>
                  {BUSINESS_INFO.address.office}, Deans Trade Centre, Peshawar
                </span>
              </p>
            </div>
          </div>

          {/* Mandatory Badge */}
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-center">
            <p className="text-xs sm:text-sm font-black text-[#DB0303] uppercase tracking-wider font-heading">
              ★ OFFICIAL 2026 UK STUDENT VISA & UNIVERSITY CAS CHECKLIST ★
            </p>
          </div>
        </div>

        {/* 2-Column Main Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: University Application & CAS Checklist */}
          <div className="space-y-6">
            <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                UNIVERSITY APPLICATION & CAS CHECKLIST
              </h4>
            </div>

            {/* 1. Admission Documents Requirements */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading flex items-center gap-1.5">
                <span>1. Admission Documents Requirements</span>
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_app_passport"]}
                    onChange={() => toggleCheck("uk_app_passport")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Valid Passport
                    </p>
                    <p className="text-xs text-slate-500">
                      – Photo and Signature Page (Scan Copy, min. 6 months validity)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_app_transcripts"]}
                    onChange={() => toggleCheck("uk_app_transcripts")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Educational Transcripts & Certificates
                    </p>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      <li>Matric / O-Level DMC & Certificate</li>
                      <li>Intermediate (FSc/ICS) / A-Level DMC & Certificate</li>
                      <li>Bachelor Degree & Transcripts (for Postgraduate)</li>
                    </ul>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_app_sop"]}
                    onChange={() => toggleCheck("uk_app_sop")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Statement of Purpose / Personal Statement
                    </p>
                    <p className="text-xs text-slate-500">
                      – Detailing academic background, course motivation & career objectives
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_app_lor"]}
                    onChange={() => toggleCheck("uk_app_lor")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Reference Letters (LORs)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Two academic or professional reference letters on official letterhead
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_app_english"]}
                    onChange={() => toggleCheck("uk_app_english")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      English Proficiency Certificate
                    </p>
                    <p className="text-xs text-slate-500">
                      – IELTS Academic/UKVI (6.0–6.5) / PTE (59+) / MOI Waiver if eligible
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_app_cv"]}
                    onChange={() => toggleCheck("uk_app_cv")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Updated CV & Experience Letters
                    </p>
                    <p className="text-xs text-slate-500">
                      – Professional CV explaining any study gaps with employment proofs
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_app_photo"]}
                    onChange={() => toggleCheck("uk_app_photo")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Passport-size Photograph & Contact Info
                    </p>
                    <p className="text-xs text-slate-500">
                      – White background biometric photo + active WhatsApp and email
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Pre-CAS & University Admission Steps */}
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                2. Pre-CAS & Admission Progression
              </h5>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Offer Letter (Conditional / Unconditional)
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    Direct Agent Portal Submission → Academic Assessment → Offer Issued
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Pre-CAS Credibility Interview
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    RS Expert Mock Preparation → University Credibility Clearance
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    CAS Deposit & CAS Release
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    Tuition Deposit (£3,000–£5,000) → Official 14-Digit CAS Statement
                  </p>
                </div>
              </div>
            </div>

            {/* Note - Degree Duration */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>NOTE — DEGREE DURATION & ADVANTAGES:</span>
              </p>
              <p className="leading-relaxed">
                UK offers accelerated <strong>1-Year Masters</strong> and{" "}
                <strong>3-Year Bachelors</strong>, saving significant living
                expenses. Students qualify for the{" "}
                <strong>2-Year Graduate Route (PSW)</strong> work visa upon
                graduation.
              </p>
            </div>
          </div>

          {/* Column 2: UKVI Visa Filing Requirements */}
          <div className="space-y-6">
            <div className="p-3 bg-[#DB0303] text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                UKVI VISA FILING REQUIREMENTS
              </h4>
            </div>

            {/* 1. Visa Application Documents */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                1. Visa Application Documents
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_cas"]}
                    onChange={() => toggleCheck("uk_visa_cas")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      CAS Statement (Confirmation of Acceptance for Studies)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Valid 14-digit electronic CAS reference assigned by UK sponsor
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_bank"]}
                    onChange={() => toggleCheck("uk_visa_bank")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      28-Day Bank Statement & Maintenance Proof
                    </p>
                    <p className="text-xs text-[#DB0303] font-semibold">
                      – Outside London: £9,207 (£1,023/mo × 9) + Unpaid Tuition Fee
                    </p>
                    <p className="text-xs text-slate-600">
                      – Inside London: £12,006 (£1,334/mo × 9) + Unpaid Tuition Fee
                    </p>
                    <p className="text-xs text-slate-500">
                      – Held continuously for 28 consecutive days in approved bank
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_tb"]}
                    onChange={() => toggleCheck("uk_visa_tb")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      IOM Tuberculosis (TB) Screening Certificate
                    </p>
                    <p className="text-xs text-slate-500">
                      – Issued by official IOM center (Islamabad, Lahore, Karachi, or Mirpur)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_passport"]}
                    onChange={() => toggleCheck("uk_visa_passport")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Valid Original Passport
                    </p>
                    <p className="text-xs text-slate-500">
                      – With at least 1 blank page for vignette visa stamp
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_ihs"]}
                    onChange={() => toggleCheck("uk_visa_ihs")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Immigration Health Surcharge (IHS) Payment
                    </p>
                    <p className="text-xs text-slate-500">
                      – £776/year paid online for full National Health Service (NHS) coverage
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_cas_docs"]}
                    onChange={() => toggleCheck("uk_visa_cas_docs")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Academic & English Documents on CAS
                    </p>
                    <p className="text-xs text-slate-500">
                      – Original degrees and certificates specifically referenced on CAS
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_frc"]}
                    onChange={() => toggleCheck("uk_visa_frc")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      NADRA FRC & Sponsorship Affidavit
                    </p>
                    <p className="text-xs text-slate-500">
                      – Required if bank statement is under parent's name
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["uk_visa_atas"]}
                    onChange={() => toggleCheck("uk_visa_atas")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      ATAS Certificate (If Applicable)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Mandatory for selected postgraduate STEM / engineering programs
                    </p>
                  </div>
                </label>
              </div>

              <p className="text-xs text-slate-500 italic">
                * All documents listed under the Application Checklist (left
                side) are also required for the visa submission.
              </p>
            </div>

            {/* Critical Note: 28-Day Holding Rule */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-950 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-[#DB0303]">
                <AlertTriangle className="w-4 h-4 text-[#DB0303]" />
                <span>CRITICAL 28-DAY HOLDING RULE:</span>
              </p>
              <p className="leading-relaxed">
                Bank balance MUST NEVER drop below the required maintenance amount
                for even 1 single day during the 28-day cycle. The closing date
                of the statement must be within 31 days of online visa fee
                payment.
              </p>
            </div>

            {/* Intakes & Work Rights */}
            <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs space-y-2">
              <p className="font-bold uppercase tracking-wider text-slate-900 font-heading">
                INTAKES & WORK RIGHTS:
              </p>
              <p className="text-slate-600">
                UK offers two major intakes —{" "}
                <strong className="text-[#DB0303]">
                  Major Intake: Autumn (Sept / Oct)
                </strong>{" "}
                | <strong>Major Intake: Winter (Jan / Feb)</strong> | Selected: Summer (May).
              </p>
              <p className="text-slate-600">
                <strong>Work Allowance:</strong> 20 hrs/week during term-time,
                40 hrs/week during breaks + <strong>2-Year Graduate Route (PSW)</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* UK Partner Universities */}
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-black text-white bg-slate-900 px-4 py-2.5 rounded-xl font-heading uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              Featured UK Partner Universities
            </h4>
            <span className="text-xs text-[#DB0303] font-bold font-heading hidden sm:inline">
              Fast CAS Processing & Direct Representation
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {partnerUniversities.map((uni, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-2 hover:border-red-300 group transition-all">
                <span className="text-[#DB0303] font-bold text-xs">▪</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#DB0303] transition-colors leading-tight">
                  {uni}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Cost Breakdown Table */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
              RS HIGHER EDUCATION CONSULTANTS — TOTAL COST BREAKDOWN FOR UNITED KINGDOM
            </h4>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-800 font-heading uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5 font-bold">Item</th>
                  <th className="p-3.5 font-bold">Amount</th>
                  <th className="p-3.5 font-bold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">
                    UKVI Student Visa Application Fee
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">£490</td>
                  <td className="p-3.5 text-xs text-slate-500">
                    Official online visa filing fee paid directly to UK Visas & Immigration
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">
                    Immigration Health Surcharge (IHS)
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">£776 / year</td>
                  <td className="p-3.5 text-xs text-slate-500">
                    Mandatory surcharge granting complete access to the UK NHS healthcare system
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">
                    IOM Tuberculosis (TB) Screening Test
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    PKR 18,000 – 25,000
                  </td>
                  <td className="p-3.5 text-xs text-slate-500">
                    Paid at authorized IOM medical screening center in Pakistan
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">
                    Initial University Tuition Deposit
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">
                    £3,000 – £5,000
                  </td>
                  <td className="p-3.5 text-xs text-slate-500">
                    Credited directly to 1st year university tuition to issue official CAS
                  </td>
                </tr>
                <tr className="hover:bg-red-50/30 bg-red-50/20">
                  <td className="p-3.5 font-bold text-slate-900">
                    28-Day Maintenance Living Funds (Outside London)
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">
                    £9,207{" "}
                    <span className="text-xs text-slate-600 block font-medium">
                      (£1,023/mo × 9) + unpaid fee
                    </span>
                  </td>
                  <td className="p-3.5 text-xs text-slate-600 font-medium">
                    Proof-of-funds deposit required for the visa; remains in
                    student/parent account as personal living support
                  </td>
                </tr>
                <tr className="hover:bg-red-50/30 bg-red-50/20">
                  <td className="p-3.5 font-bold text-slate-900">
                    28-Day Maintenance Living Funds (Inside London)
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">
                    £12,006{" "}
                    <span className="text-xs text-slate-600 block font-medium">
                      (£1,334/mo × 9) + unpaid fee
                    </span>
                  </td>
                  <td className="p-3.5 text-xs text-slate-600 font-medium">
                    Proof-of-funds deposit for London campus universities; held
                    for 28 consecutive days
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 italic">
            Note: The maintenance funds are not paid to anyone — they are held in
            your bank account to prove you can support yourself during your
            studies in the United Kingdom.
          </p>
        </div>

        {/* Bottom CTA & Direct Download */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h5 className="text-sm font-black font-heading text-slate-900">
              Need personalized assistance with your UK University application or CAS?
            </h5>
            <p className="text-xs text-slate-600">
              Visit RS Higher Education Consultants in Peshawar for end-to-end
              UK admissions, scholarship assessment, and UKVI visa filing.
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-6 py-3.5 bg-[#DB0303] hover:bg-[#B30000] text-white font-bold text-xs sm:text-sm rounded-xl font-heading shadow-md shadow-red-600/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0">
            <Download className="w-4 h-4" />
            <span>Download UK Checklist (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
