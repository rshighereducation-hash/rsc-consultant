import React, { useState } from 'react';
import { generateGermanyChecklistPDF } from '../utils/germanyPdfGenerator';
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
  Upload
} from 'lucide-react';

export const GermanyChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    customGermanyChecklistPdf,
    customGermanyChecklistName,
    openGermanyChecklistModal
  } = useBrand();

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      if (customGermanyChecklistPdf) {
        const a = document.createElement('a');
        a.href = customGermanyChecklistPdf;
        a.download = customGermanyChecklistName || 'Germany_Checklist_RS_Higher_Education.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        generateGermanyChecklistPDF();
      }
    } catch (e) {
      console.error('Error generating PDF:', e);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalAppItems = 7;
  const totalVisaItems = 8;
  const totalItems = totalAppItems + totalVisaItems;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div id="germany-checklist-document" className="space-y-8">
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
              Study in Germany: University & Embassy Visa Checklist
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official document roadmap for Pakistani applicants applying to tuition-free German Public Universities, Uni-Assist portals, and the German Embassy Islamabad / Consulate Karachi.
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
                {completedCount} of {totalItems} items ready ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Prominent Highlighting Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="flex items-center rounded-2xl bg-red-950/40 p-1 border border-red-500/30 shadow-lg">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                id="germany-download-pdf-btn"
                className="px-5 py-3.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white font-black text-xs sm:text-sm rounded-xl font-heading shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-red-400/30"
                title={customGermanyChecklistPdf ? `Download custom: ${customGermanyChecklistName}` : "Download Official PDF Checklist"}
              >
                <Download className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : ''}`} />
                <span>{isDownloading ? 'Generating PDF...' : 'Download Official PDF Checklist'}</span>
                {customGermanyChecklistPdf && (
                  <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                    Custom
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={openGermanyChecklistModal}
                id="germany-upload-checklist-btn"
                className="px-3.5 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                title="Browse & Upload your own Germany Checklist PDF from your PC"
              >
                <Upload className="w-4 h-4 text-amber-300" />
                <span className="hidden xl:inline">Upload</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              id="germany-print-checklist-btn"
              className="px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl font-heading border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
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
                  STUDY IN GERMANY
                </h4>
                <p className="text-xs sm:text-sm font-bold text-[#DB0303] font-heading">
                  University Application & Embassy Visa Filing Checklist
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
                <span>{BUSINESS_INFO.address.office}, Deans Trade Centre, Peshawar</span>
              </p>
            </div>
          </div>

          {/* Mandatory Badge */}
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-center">
            <p className="text-xs sm:text-sm font-black text-[#DB0303] uppercase tracking-wider font-heading">
              ★ THIS CHECKLIST APPLIES TO PUBLIC UNIVERSITIES IN GERMANY ONLY ★
            </p>
          </div>
        </div>

        {/* 2-Column Main Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: University Application Checklist */}
          <div className="space-y-6">
            <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                UNIVERSITY APPLICATION CHECKLIST
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
                    checked={!!checkedItems['app_passport']}
                    onChange={() => toggleCheck('app_passport')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Valid Passport</p>
                    <p className="text-xs text-slate-500">– Photo and Signature Page (Scan Copy)</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['app_transcripts']}
                    onChange={() => toggleCheck('app_transcripts')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Educational Transcripts & Certificates</p>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      <li>Matric DMC & Certificate</li>
                      <li>Intermediate (FSc) DMC & Certificate</li>
                      <li>Bachelor Degree & Transcripts</li>
                    </ul>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['app_lor']}
                    onChange={() => toggleCheck('app_lor')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Reference Letters</p>
                    <p className="text-xs text-slate-500">– Two reference letters, not older than 6 months</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['app_photo']}
                    onChange={() => toggleCheck('app_photo')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Passport-size Photograph</p>
                    <p className="text-xs text-slate-500">– Required in soft copy (scanned) as well</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['app_contact']}
                    onChange={() => toggleCheck('app_contact')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Contact Information</p>
                    <p className="text-xs text-slate-500">– Valid Contact Number & Email Address</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['app_english']}
                    onChange={() => toggleCheck('app_english')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">English Proficiency Certificate</p>
                    <p className="text-xs text-slate-500">– IELTS / TOEFL, if available</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['app_cv']}
                    onChange={() => toggleCheck('app_cv')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Updated CV</p>
                    <p className="text-xs text-slate-500">– in Europass CV format</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Attestation of Educational Documents */}
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                2. Attestation of Educational Documents
              </h5>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">Matric DMC & Certificate</p>
                  <p className="text-xs font-bold text-[#DB0303]">Board → IBCC → MOFA</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">FSc / Intermediate DMC & Certificate</p>
                  <p className="text-xs font-bold text-[#DB0303]">Board → IBCC → MOFA</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">Bachelor / Postgraduate Degree & Transcript</p>
                  <p className="text-xs font-bold text-[#DB0303]">University → HEC → MOFA</p>
                </div>
              </div>
            </div>

            {/* 3. Uni-Assist Application Cost */}
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                3. Uni-Assist Application Cost
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-red-50/60 border border-red-200 space-y-1">
                  <p className="text-slate-600 font-medium">First Application</p>
                  <p className="text-lg font-black text-[#DB0303] font-heading">€75</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-slate-600 font-medium">Each Additional Application</p>
                  <p className="text-lg font-black text-slate-900 font-heading">€30</p>
                </div>
              </div>
            </div>

            {/* Note - Enrolment Fees */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>NOTE — ENROLMENT FEES:</span>
              </p>
              <p className="leading-relaxed">
                After receiving an admission offer from a Public University, students must pay the semester enrolment fee (<strong>Semesterbeitrag</strong>). This fee is <strong>NOT fixed</strong> — it varies by university (€150 to €350/semester).
              </p>
            </div>
          </div>

          {/* Column 2: Visa Filing / Embassy Requirements Checklist */}
          <div className="space-y-6">
            <div className="p-3 bg-[#DB0303] text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                VISA FILING / EMBASSY REQUIREMENTS CHECKLIST
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
                    checked={!!checkedItems['visa_admission']}
                    onChange={() => toggleCheck('visa_admission')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">University Enrolment Letter / Admission Letter</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['visa_blocked']}
                    onChange={() => toggleCheck('visa_blocked')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Blocked Account (Sperrkonto) Confirmation</p>
                    <p className="text-xs text-slate-600 font-semibold text-[#DB0303]">
                      – Current requirement: €11,904/year (€992/month) — 2026
                    </p>
                    <p className="text-xs text-slate-500">
                      – Approved providers: Fintiba, Expatrio, or as advised
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['visa_passport']}
                    onChange={() => toggleCheck('visa_passport')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Valid Passport (min. 6 months validity)</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['visa_form']}
                    onChange={() => toggleCheck('visa_form')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Completed & Signed National (D) Visa Application Form</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['visa_photo']}
                    onChange={() => toggleCheck('visa_photo')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Biometric Passport-size Photographs</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['visa_appt']}
                    onChange={() => toggleCheck('visa_appt')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Visa Appointment Confirmation</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['visa_insurance']}
                    onChange={() => toggleCheck('visa_insurance')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Travel / Health Insurance (valid for initial stay)</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems['visa_sop']}
                    onChange={() => toggleCheck('visa_sop')}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">Motivation Letter / Statement of Purpose</p>
                  </div>
                </label>
              </div>

              <p className="text-xs text-slate-500 italic">
                * In addition, all documents listed under the Application Checklist (left side) are also required for the visa application.
              </p>
            </div>

            {/* Important Note: Embassy Waiting List */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-950 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-[#DB0303]">
                <AlertTriangle className="w-4 h-4 text-[#DB0303]" />
                <span>IMPORTANT NOTE:</span>
              </p>
              <p className="leading-relaxed">
                We will join the waiting list. The queue may be lengthy, so you will have to wait for your turn due to the large volume of student applications at the German Embassy.
              </p>
            </div>

            {/* Intakes in Germany */}
            <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs space-y-2">
              <p className="font-bold uppercase tracking-wider text-slate-900 font-heading">
                INTAKES IN GERMANY:
              </p>
              <p className="text-slate-600">
                Germany offers two intakes — <strong className="text-[#DB0303]">Major Intake: Winter Intake (September)</strong> | <strong>Minor Intake: Summer Intake (April)</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Total Cost Breakdown Table */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
              RS HIGHER EDUCATION CONSULTANTS — TOTAL COST BREAKDOWN FOR GERMANY
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
                    Uni-Assist Application Fee (First Application)
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">€75</td>
                  <td className="p-3.5 text-xs text-slate-500">
                    One-time fee for the first university application via Uni-Assist
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">
                    Uni-Assist Application Fee (Each Additional Application)
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">€30</td>
                  <td className="p-3.5 text-xs text-slate-500">
                    Charged per extra university applied to in the same cycle
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">
                    Semester Enrolment Fee (Semesterbeitrag)
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">Varies by university</td>
                  <td className="p-3.5 text-xs text-slate-500">
                    Paid only after receiving an official admission offer; not fixed university-to-university
                  </td>
                </tr>
                <tr className="hover:bg-red-50/30 bg-red-50/20">
                  <td className="p-3.5 font-bold text-slate-900">
                    Blocked Account (Sperrkonto) — 2026 requirement
                  </td>
                  <td className="p-3.5 font-black text-[#DB0303]">
                    €11,904/year <span className="text-xs text-slate-600 block font-medium">(€992/month)</span>
                  </td>
                  <td className="p-3.5 text-xs text-slate-600 font-medium">
                    Proof-of-funds deposit required for the visa; remains accessible to the student after arrival in Germany — not a service fee
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 italic">
            Note: The Blocked Account amount is not spent — it is a savings deposit that proves sufficient funds and remains accessible to the student after arrival in Germany.
          </p>
        </div>

        {/* Bottom CTA & Direct Download */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h5 className="text-sm font-black font-heading text-slate-900">
              Need personalized assistance with your German University application?
            </h5>
            <p className="text-xs text-slate-600">
              Visit RS Higher Education Consultants in Peshawar for end-to-end Uni-Assist and Embassy guidance.
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-6 py-3.5 bg-[#DB0303] hover:bg-[#B30000] text-white font-bold text-xs sm:text-sm rounded-xl font-heading shadow-md shadow-red-600/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Checklist (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
