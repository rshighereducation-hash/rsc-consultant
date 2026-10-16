import React, { useState } from "react";
import { generateCyprusChecklistPDF } from "../utils/cyprusPdfGenerator";
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

export const CyprusChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  const { customCyprusChecklistPdf, customCyprusChecklistName } = useBrand();

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      if (customCyprusChecklistPdf) {
        const a = document.createElement("a");
        a.href = customCyprusChecklistPdf;
        a.download =
          customCyprusChecklistName ||
          "Cyprus_Checklist_RS_Higher_Education.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        generateCyprusChecklistPDF();
      }
    } catch (e) {
      console.error("Error generating Cyprus Checklist PDF:", e);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const partnerUniversities = [
    "University of Nicosia (UNIC)",
    "European University Cyprus (EUC)",
    "University of Cyprus (UCY)",
    "Frederick University",
    "Cyprus University of Technology (CUT)",
    "Neapolis University Pafos",
    "UCLan Cyprus (University of Central Lancashire)",
    "Philips University",
  ];

  const totalAppItems = 7;
  const totalVisaItems = 8;
  const totalItems = totalAppItems + totalVisaItems;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div id="cyprus-checklist-document" className="space-y-8">
      {/* Highlighted Banner & Direct Download Callout */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#990000] text-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-red-950/20 border-2 border-red-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DB0303]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-400/40 text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Student Document & Entry Permit Guide</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              Study in South Cyprus: University & Entry Permit (M-61) Checklist
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete official document roadmap for Pakistani applicants applying to
              EU-accredited Universities in the Republic of Cyprus, medical and police attestation,
              and Ministry of Interior CRMD White Paper Entry Permit (M-61).
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
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              id="cyprus-download-pdf-btn"
              className="px-5 py-3.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white font-black text-xs sm:text-sm rounded-2xl font-heading shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-red-400/30"
              title={
                customCyprusChecklistPdf
                  ? `Download custom: ${customCyprusChecklistName}`
                  : "Download Official South Cyprus PDF Checklist"
              }>
              <Download
                className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`}
              />
              <span>
                {isDownloading
                  ? "Generating PDF..."
                  : "Download Official PDF Checklist"}
              </span>
              {customCyprusChecklistPdf && (
                <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                  Custom
                </span>
              )}
            </button>

            <button
              onClick={handlePrint}
              id="cyprus-print-checklist-btn"
              className="px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl font-heading border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Printer className="w-4 h-4" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Checklist Sheet */}
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
                  STUDY IN SOUTH CYPRUS
                </h4>
                <p className="text-xs sm:text-sm font-bold text-[#DB0303] font-heading">
                  University Application, CRMD Entry Permit (M-61) & Visa Checklist
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
              ★ OFFICIAL 2026 SOUTH CYPRUS (EU) STUDENT ENTRY PERMIT CHECKLIST ★
            </p>
          </div>
        </div>

        {/* 2-Column Main Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: University Admission & Attestation */}
          <div className="space-y-6">
            <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                UNIVERSITY ADMISSION & ATTESTATION
              </h4>
            </div>

            {/* 1. Admission Documents Requirements */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading flex items-center gap-1.5">
                <span>1. Academic & Personal Documents</span>
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_app_passport"]}
                    onChange={() => toggleCheck("cy_app_passport")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Valid Passport
                    </p>
                    <p className="text-xs text-slate-500">
                      – Color copy of bio-data and signature page (min. 2 years validity)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_app_transcripts"]}
                    onChange={() => toggleCheck("cy_app_transcripts")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Educational Transcripts & Certificates
                    </p>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      <li>Matric & Inter (FSc/ICS/FA) (IBCC & MOFA Attested)</li>
                      <li>Bachelor Degree & Detailed Transcripts (HEC & MOFA)</li>
                    </ul>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_app_police"]}
                    onChange={() => toggleCheck("cy_app_police")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Clean Police Character Certificate
                    </p>
                    <p className="text-xs text-slate-500">
                      – Issued by Police Khidmat Markaz and attested by MOFA Pakistan
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_app_medical"]}
                    onChange={() => toggleCheck("cy_app_medical")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Mandatory Medical Fitness Certificate
                    </p>
                    <p className="text-xs text-slate-500">
                      – Blood tests: HIV, Hepatitis B & C, VDRL + Chest X-Ray for TB (MOFA Attested)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_app_bank"]}
                    onChange={() => toggleCheck("cy_app_bank")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Bank Statement & Sponsor Guarantee
                    </p>
                    <p className="text-xs text-slate-500">
                      – Minimum €6,000–€7,000 closing balance + Affidavit of Financial Support
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_app_english"]}
                    onChange={() => toggleCheck("cy_app_english")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      English Language Proficiency
                    </p>
                    <p className="text-xs text-slate-500">
                      – IELTS (5.5+) / PTE or University Internal Placement Test on arrival
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_app_photo"]}
                    onChange={() => toggleCheck("cy_app_photo")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Passport Size Photographs
                    </p>
                    <p className="text-xs text-slate-500">
                      – 4 recent white background photographs (European standard size)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Admission Progression */}
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                2. Admission & Entry Permit Progression
              </h5>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Conditional Offer & Document MOFA Attestation
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    Fast-Track University Offer (24-48h) → Medical & Police MOFA Attestation
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Tuition Fee Deposit & Migration Dossier
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    Direct University Bank Deposit → Dossier Submission to Nicosia Migration
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    M-61 White Paper Entry Permit Release
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    CRMD Approval → White Paper Entry Permit → Flight to Larnaca (LCA)
                  </p>
                </div>
              </div>
            </div>

            {/* Note - Full EU Member */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>NOTE — FULL EU DEGREE & ENGLISH LINGUA FRANCA:</span>
              </p>
              <p className="leading-relaxed">
                Republic of Cyprus is a full European Union member state following the Bologna EHEA standard. Over 80% of citizens speak fluent English, and university degrees are globally recognized for transfers and employment across Europe.
              </p>
            </div>
          </div>

          {/* Column 2: CRMD Entry Permit Requirements */}
          <div className="space-y-6">
            <div className="p-3 bg-[#DB0303] text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                CRMD ENTRY PERMIT (M-61) REQUIREMENTS
              </h4>
            </div>

            {/* 1. CRMD Documents */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                1. CRMD Immigration & Entry Requirements
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_visa_m61"]}
                    onChange={() => toggleCheck("cy_visa_m61")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Official White Paper Entry Permit (Form M-61)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Issued directly by Civil Registry & Migration Dept in Nicosia, Cyprus
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_visa_records"]}
                    onChange={() => toggleCheck("cy_visa_records")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Original MOFA Attested Academic Records
                    </p>
                    <p className="text-xs text-slate-500">
                      – Original verified degrees and transcripts to be presented at airport
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_visa_medpol"]}
                    onChange={() => toggleCheck("cy_visa_medpol")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Original Medical & Police Certificates (MOFA)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Must be within 4 months validity at the time of entry to Cyprus
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_visa_guarantee"]}
                    onChange={() => toggleCheck("cy_visa_guarantee")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Bank Guarantee Deposit (€500 - €850)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Paid directly to Migration/University (fully refundable upon graduation)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_visa_fee"]}
                    onChange={() => toggleCheck("cy_visa_fee")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      University Acceptance Letter & Payment Receipt
                    </p>
                    <p className="text-xs text-slate-500">
                      – Proof of tuition fee payment transferred to official university account
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_visa_flight"]}
                    onChange={() => toggleCheck("cy_visa_flight")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Flight Ticket to Larnaca (LCA) / Paphos (PFO)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Confirmed airline booking with international transit (Dubai/Doha/Gulf)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["cy_visa_insurance"]}
                    onChange={() => toggleCheck("cy_visa_insurance")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Health & Travel Insurance Policy
                    </p>
                    <p className="text-xs text-slate-500">
                      – International student medical policy valid for entry into Cyprus
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Direct Migration Process Rule */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-[#DB0303]">
                <ShieldCheck className="w-4 h-4 text-[#DB0303]" />
                <span>DIRECT UNIVERSITY-SPONSORED VISA:</span>
              </p>
              <p className="leading-relaxed text-slate-700">
                No complicated embassy interview required. The partner university files your file directly in Nicosia for the M-61 Entry Permit, providing high visa success for genuine students.
              </p>
            </div>

            {/* Intakes & Work Rights */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <p className="font-bold uppercase tracking-wider font-heading text-slate-900">
                INTAKES & WORK RIGHTS:
              </p>
              <p className="text-slate-600">
                Major: Oct (Fall) | Major: Feb (Spring) | Minor: June (Summer)
              </p>
              <p className="font-bold text-[#DB0303]">
                Work: 20 hrs/week in designated EU-approved student sectors
              </p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Table */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl text-center shadow-md">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
              RS HIGHER EDUCATION CONSULTANTS — TOTAL COST BREAKDOWN FOR SOUTH CYPRUS
            </h4>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] font-heading">
                <tr>
                  <th className="p-3.5 border-b border-slate-200">Item</th>
                  <th className="p-3.5 border-b border-slate-200">Amount</th>
                  <th className="p-3.5 border-b border-slate-200">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">CRMD Entry Permit (M-61) Fee</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€70 - €140</td>
                  <td className="p-3.5 text-slate-600">Official migration processing fee paid directly to Ministry of Interior</td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">University Tuition (with 30-50% Scholarship)</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€3,800 - €7,500 / year</td>
                  <td className="p-3.5 text-slate-600">Undergraduate & Postgraduate; Medicine/Dentistry: €9k-€18k/yr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Bank Guarantee Deposit (Refundable)</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€500 - €850</td>
                  <td className="p-3.5 text-slate-600">Mandatory security deposit refunded upon completion of studies</td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Medical Screening & MOFA Attestation</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">PKR 25k - 35k</td>
                  <td className="p-3.5 text-slate-600">Blood tests, chest X-Ray, police character certificate and MOFA stamps</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Monthly Living & Dormitory Costs</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€450 - €750 / month</td>
                  <td className="p-3.5 text-slate-600">Affordable Mediterranean accommodation, campus food, and local transit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Top Cypriot Universities */}
        <div className="space-y-4 pt-4">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider font-heading flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#DB0303]" />
            <span>Featured South Cyprus Universities</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {partnerUniversities.map((uni, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1 hover:border-red-300 hover:shadow-xs transition-all">
                <Building2 className="w-4 h-4 text-[#DB0303] mx-auto" />
                <p className="text-[11px] font-bold text-slate-800 line-clamp-2">
                  {uni}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
