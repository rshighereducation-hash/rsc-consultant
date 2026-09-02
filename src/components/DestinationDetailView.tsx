import React, { useState } from 'react';
import { Destination } from '../types';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useBrand } from '../context/BrandContext';
import { CountryFlag } from './CountryFlag';
import { GermanyChecklistSection } from './GermanyChecklistSection';
import { generateGermanyChecklistPDF } from '../utils/germanyPdfGenerator';
import { TurkeyChecklistSection } from './TurkeyChecklistSection';
import { generateTurkeyChecklistPDF, generateTurkeyInterviewGuidePDF } from '../utils/turkeyPdfGenerator';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  ArrowLeft,
  Globe2,
  Building2,
  Calendar,
  DollarSign,
  Briefcase,
  GraduationCap,
  FileCheck2,
  ShieldCheck,
  Award,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  BookOpen,
  Info,
  Download,
  FileText,
  Printer,
  Upload
} from 'lucide-react';

const UniLogoBadge: React.FC<{
  websiteUrl?: string;
  name: string;
}> = ({ websiteUrl, name }) => {
  const [hasError, setHasError] = useState(false);
  const domain = React.useMemo(() => {
    if (!websiteUrl) return '';
    try {
      const url = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
      return url.hostname.replace('www.', '');
    } catch {
      return '';
    }
  }, [websiteUrl]);

  if (!hasError && domain) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
          onError={() => setHasError(true)}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DB0303] border border-red-100 flex items-center justify-center font-black text-xs font-heading shrink-0">
      <Building2 className="w-5 h-5 text-[#DB0303]" />
    </div>
  );
};

interface DestinationDetailViewProps {
  destination: Destination;
  onBack: () => void;
  onOpenConsultation: () => void;
  onSelectOtherDestination: (slug: string) => void;
}

export const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({
  destination,
  onBack,
  onOpenConsultation,
  onSelectOtherDestination,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'process' | 'costs' | 'universities' | 'visa' | 'germany-checklist' | 'turkey-checklist'>('overview');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const {
    customTurkeyChecklistPdf,
    customTurkeyChecklistName,
    customTurkeyInterviewPdf,
    customTurkeyInterviewName,
    customGermanyChecklistPdf,
    customGermanyChecklistName,
    customCyprusChecklistPdf,
    customCyprusChecklistName,
    customUkChecklistPdf,
    customUkChecklistName,
    customLithuaniaChecklistPdf,
    customLithuaniaChecklistName,
    openTurkeyChecklistModal,
    openTurkeyInterviewModal,
    openGermanyChecklistModal,
    openCyprusChecklistModal,
    openUkChecklistModal,
    openLithuaniaChecklistModal,
  } = useBrand();

  const isGermany = destination.slug === 'germany';
  const isTurkey = destination.slug === 'turkey' || destination.slug === 'turkiye' || destination.slug === 'türkiye';
  const isCyprus = destination.slug === 'south-cyprus' || destination.slug === 'cyprus';
  const isUk = destination.slug === 'united-kingdom' || destination.slug === 'uk';
  const isLithuania = destination.slug === 'lithuania';

  const handleDownloadGermanyPdf = () => {
    setIsDownloadingPdf(true);
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
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const handleDownloadCyprusPdf = () => {
    setIsDownloadingPdf(true);
    try {
      if (customCyprusChecklistPdf) {
        const a = document.createElement('a');
        a.href = customCyprusChecklistPdf;
        a.download = customCyprusChecklistName || 'Cyprus_Checklist_RS_Higher_Education.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        openCyprusChecklistModal();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const handleDownloadUkPdf = () => {
    setIsDownloadingPdf(true);
    try {
      if (customUkChecklistPdf) {
        const a = document.createElement('a');
        a.href = customUkChecklistPdf;
        a.download = customUkChecklistName || 'UK_Checklist_RS_Higher_Education.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        openUkChecklistModal();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const handleDownloadLithuaniaPdf = () => {
    setIsDownloadingPdf(true);
    try {
      if (customLithuaniaChecklistPdf) {
        const a = document.createElement('a');
        a.href = customLithuaniaChecklistPdf;
        a.download = customLithuaniaChecklistName || 'Lithuania_Checklist_RS_Higher_Education.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        openLithuaniaChecklistModal();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const handleDownloadTurkeyPdf = () => {
    setIsDownloadingPdf(true);
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
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const handleDownloadTurkeyInterviewPdf = () => {
    setIsDownloadingPdf(true);
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
      console.error(e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const getWhatsAppCountryInquiry = () => {
    const text = encodeURIComponent(
      `Hello RS Higher Education Consultants! I am interested in studying in ${destination.countryName}. Please guide me on admission requirements, intakes, and visa for Pakistani students.`
    );
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
  };

  const whyStudyList = destination.whyStudyHere || destination.whyStudy || [];
  const popularFieldsList = destination.popularFields || [];
  const admissionProcessList = destination.admissionProcess || [];
  const scholarshipsList = destination.scholarships || [];
  const intakesList = destination.intakes || [];
  const universitiesList = destination.universities || [];

  const undergradReq = destination.entryRequirements?.undergraduate || {
    academic: destination.admissionRequirements?.academic || 'Minimum 60% in Intermediate / A-Levels.',
    english: destination.admissionRequirements?.english || 'IELTS 6.0 / PTE 54 / MOI accepted.',
    documents: destination.admissionRequirements?.documents || [],
    notes: destination.admissionRequirements?.notes || '',
    specialNotes: destination.admissionRequirements?.specialNotes || destination.admissionRequirements?.notes || ''
  };

  const postgradReq = destination.entryRequirements?.postgraduate || {
    academic: destination.admissionRequirements?.academic || '4-year Bachelor degree with 2.5+ CGPA from HEC recognized university.',
    english: destination.admissionRequirements?.english || 'IELTS 6.5 / PTE 58 / MOI where applicable.',
    documents: destination.admissionRequirements?.documents || [],
    notes: destination.admissionRequirements?.notes || '',
    specialNotes: destination.admissionRequirements?.specialNotes || destination.admissionRequirements?.notes || ''
  };

  const visaDocs = destination.visaProcess?.documentChecklist || destination.visaProcess?.requiredDocuments || [
    'Valid Passport with at least 18 months validity',
    'Official University Acceptance Letter / Visa Eligibility Document',
    'Attested Academic Transcripts & Degrees (HEC/IBCC/MOFA)',
    'Proof of Financial Capability & Sponsor Bank Statements',
    'English Language Proficiency Certificate or Waiver Letter',
    'Health Insurance & Medical Clearance / TB Test',
    'Clean Police Character Certificate',
    'Statement of Genuine Student Intent'
  ];

  const officialVisaLink = destination.visaProcess?.officialLink || destination.visaProcess?.officialPortalUrl || destination.officialGovernmentLinks?.[0]?.url || 'https://rshec.pk';
  const officialAuthority = destination.visaProcess?.officialAuthority || destination.officialGovernmentLinks?.[0]?.agency || destination.visaProcess?.name || `${destination.countryName} Immigration Authority`;

  return (
    <div id={`destination-page-${destination.slug}`} className="min-h-screen bg-slate-50/70 pt-28 pb-20">
      {/* Top Back Navigation Bar */}
      <div className="bg-white text-slate-800 border-b border-slate-200 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#DB0303] transition-colors cursor-pointer font-heading"
          >
            <ArrowLeft className="w-4 h-4 text-[#DB0303]" />
            <span>Back to All 16 Destinations</span>
          </button>
          <div className="flex items-center gap-2">
            <CountryFlag
              countryCode={destination.slug}
              countryName={destination.countryName}
              fallbackEmoji={destination.flagEmoji}
              size="sm"
            />
            <span className="text-xs sm:text-sm font-black font-heading text-slate-900">
              {destination.countryName} Comprehensive Guide
            </span>
          </div>
        </div>
      </div>

      {/* Country Hero Banner */}
      <section className="relative bg-gradient-to-r from-red-50 via-white to-red-50 text-slate-900 py-16 lg:py-20 overflow-hidden border-b border-red-100">
        {/* Visual glow */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading shadow-2xs">
                <CountryFlag
                  countryCode={destination.slug}
                  countryName={destination.countryName}
                  fallbackEmoji={destination.flagEmoji}
                  size="sm"
                />
                <span>{destination.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-slate-900 leading-tight">
                Study in <span className="text-[#DB0303]">{destination.countryName}</span> for Pakistani Students
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {destination.overview}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {/* Germany: Only Germany Checklist */}
                {isGermany && (
                  <div className="inline-flex items-center rounded-2xl bg-amber-500/10 p-1 border border-amber-400/30 shadow-lg">
                    <button
                      onClick={handleDownloadGermanyPdf}
                      disabled={isDownloadingPdf}
                      id="hero-germany-download-checklist-btn"
                      className="px-6 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl font-heading shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] border border-amber-300 active:scale-95"
                      title={customGermanyChecklistPdf ? `Download custom: ${customGermanyChecklistName}` : "Download Official Study in Germany University & Embassy Visa Checklist PDF"}
                    >
                      <Download className={`w-4 h-4 text-slate-950 ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
                      <span>{isDownloadingPdf ? 'Preparing PDF...' : 'Download Germany Checklist (PDF)'}</span>
                      {customGermanyChecklistPdf && (
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                          Custom
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={openGermanyChecklistModal}
                      id="hero-germany-upload-checklist-btn"
                      className="px-3.5 py-4 bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                      title="Upload your Germany Checklist PDF from your PC"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                )}

                {/* Turkey: Turkey Checklist & Questioner */}
                {isTurkey && (
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Turkey Checklist Group */}
                    <div className="inline-flex items-center rounded-2xl bg-amber-500/10 p-1 border border-amber-400/30 shadow-lg">
                      <button
                        onClick={handleDownloadTurkeyPdf}
                        disabled={isDownloadingPdf}
                        id="hero-turkey-download-checklist-btn"
                        className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl font-heading shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] border border-amber-300 active:scale-95"
                        title={customTurkeyChecklistPdf ? `Download custom: ${customTurkeyChecklistName}` : "Download Turkey checklist PDF"}
                      >
                        <Download className={`w-4 h-4 text-slate-950 ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
                        <span>{isDownloadingPdf ? 'Preparing PDF...' : 'Turkey checklist (PDF)'}</span>
                        {customTurkeyChecklistPdf && (
                          <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                            Custom
                          </span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={openTurkeyChecklistModal}
                        id="hero-turkey-upload-checklist-btn"
                        className="px-3 py-3.5 bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                        title="Upload your Turkey Checklist PDF from your PC"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Upload</span>
                      </button>
                    </div>

                    {/* Turkey Questioner Group */}
                    <div className="inline-flex items-center rounded-2xl bg-red-600/10 p-1 border border-red-500/30 shadow-lg">
                      <button
                        onClick={handleDownloadTurkeyInterviewPdf}
                        disabled={isDownloadingPdf}
                        id="hero-turkey-download-interview-btn"
                        className="px-5 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xs sm:text-sm rounded-xl font-heading shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] border border-red-500 active:scale-95"
                        title={customTurkeyInterviewPdf ? `Download custom: ${customTurkeyInterviewName}` : "Download Turkey Questioner PDF"}
                      >
                        <FileText className={`w-4 h-4 text-white ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
                        <span>{isDownloadingPdf ? 'Preparing PDF...' : 'Turkey Questioner (PDF)'}</span>
                        {customTurkeyInterviewPdf && (
                          <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-white text-red-700 rounded font-bold uppercase tracking-wider">
                            Custom
                          </span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={openTurkeyInterviewModal}
                        id="hero-turkey-upload-interview-btn"
                        className="px-3 py-3.5 bg-red-600/20 hover:bg-red-600/40 text-red-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                        title="Upload your Turkey Questioner PDF from your PC"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Upload</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Cyprus: Cyprus Checklist */}
                {isCyprus && (
                  <div className="inline-flex items-center rounded-2xl bg-amber-500/10 p-1 border border-amber-400/30 shadow-lg">
                    <button
                      onClick={handleDownloadCyprusPdf}
                      disabled={isDownloadingPdf}
                      id="hero-cyprus-download-checklist-btn"
                      className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl font-heading shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] border border-amber-300 active:scale-95"
                      title={customCyprusChecklistPdf ? `Download custom: ${customCyprusChecklistName}` : "Download/Upload Cyprus Checklist PDF"}
                    >
                      <Download className={`w-4 h-4 text-slate-950 ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
                      <span>{isDownloadingPdf ? 'Preparing PDF...' : customCyprusChecklistPdf ? 'Cyprus Checklist (PDF)' : 'Cyprus Checklist'}</span>
                      {customCyprusChecklistPdf && (
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                          Custom
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={openCyprusChecklistModal}
                      id="hero-cyprus-upload-checklist-btn"
                      className="px-3.5 py-3.5 bg-amber-400/20 hover:bg-amber-400/40 text-amber-900 hover:text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                      title="Upload your Cyprus Checklist PDF from your PC"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                )}

                {/* UK: UK Checklist */}
                {isUk && (
                  <div className="inline-flex items-center rounded-2xl bg-amber-500/10 p-1 border border-amber-400/30 shadow-lg">
                    <button
                      onClick={handleDownloadUkPdf}
                      disabled={isDownloadingPdf}
                      id="hero-uk-download-checklist-btn"
                      className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl font-heading shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] border border-amber-300 active:scale-95"
                      title={customUkChecklistPdf ? `Download custom: ${customUkChecklistName}` : "Download/Upload UK Checklist PDF"}
                    >
                      <Download className={`w-4 h-4 text-slate-950 ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
                      <span>{isDownloadingPdf ? 'Preparing PDF...' : customUkChecklistPdf ? 'UK Checklist (PDF)' : 'UK Checklist'}</span>
                      {customUkChecklistPdf && (
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                          Custom
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={openUkChecklistModal}
                      id="hero-uk-upload-checklist-btn"
                      className="px-3.5 py-3.5 bg-amber-400/20 hover:bg-amber-400/40 text-amber-900 hover:text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                      title="Upload your UK Checklist PDF from your PC"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                )}

                {/* Lithuania: Lithuania Checklist */}
                {isLithuania && (
                  <div className="inline-flex items-center rounded-2xl bg-amber-500/10 p-1 border border-amber-400/30 shadow-lg">
                    <button
                      onClick={handleDownloadLithuaniaPdf}
                      disabled={isDownloadingPdf}
                      id="hero-lithuania-download-checklist-btn"
                      className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl font-heading shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] border border-amber-300 active:scale-95"
                      title={customLithuaniaChecklistPdf ? `Download custom: ${customLithuaniaChecklistName}` : "Download/Upload Lithuania Checklist PDF"}
                    >
                      <Download className={`w-4 h-4 text-slate-950 ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
                      <span>{isDownloadingPdf ? 'Preparing PDF...' : customLithuaniaChecklistPdf ? 'Lithuania Checklist (PDF)' : 'Lithuania Checklist'}</span>
                      {customLithuaniaChecklistPdf && (
                        <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                          Custom
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={openLithuaniaChecklistModal}
                      id="hero-lithuania-upload-checklist-btn"
                      className="px-3.5 py-3.5 bg-amber-400/20 hover:bg-amber-400/40 text-amber-900 hover:text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-1"
                      title="Upload your Lithuania Checklist PDF from your PC"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                )}

                {/* For destinations without dedicated checklist: default consultation & WhatsApp */}
                {!isGermany && !isTurkey && !isCyprus && !isUk && !isLithuania && (
                  <>
                    <button
                      onClick={onOpenConsultation}
                      className="px-7 py-4 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs sm:text-sm font-bold rounded-2xl font-heading shadow-xl shadow-red-600/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <span>Apply for {destination.countryName}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      id="hero-whatsapp-specialist-btn"
                      href={getWhatsAppCountryInquiry()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/20 hover:scale-105 font-heading cursor-pointer active:scale-95"
                    >
                      <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      <span>WhatsApp Specialist</span>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Quick Metrics Card */}
            <div className="lg:col-span-4 bg-white border border-red-100 rounded-3xl p-6.5 shadow-xl shadow-red-950/5 space-y-4">
              <h3 className="text-xs font-black text-[#DB0303] uppercase tracking-wider font-heading border-b border-slate-100 pb-2.5">
                At a Glance: {destination.countryName}
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Featured Universities:</span>
                  <span className="font-bold text-slate-900">{universitiesList.length} Institutions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Primary Intakes:</span>
                  <span className="font-bold text-slate-900">{intakesList[0]?.month || 'Fall / September'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Undergrad Tuition:</span>
                  <span className="font-bold text-slate-900">{destination.estimatedCosts?.tuitionUndergrad || 'Varies'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Part-Time Work:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[150px]">
                    {destination.workOpportunities?.duringStudy?.split(';')?.[0] || '20 hrs/week permitted'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Post-Study Work:</span>
                  <span className="font-bold text-[#DB0303] truncate max-w-[150px]">
                    {destination.workOpportunities?.postStudyWork || destination.workOpportunities?.postStudy || 'Post-study visa available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10 space-y-10">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-900/5 flex flex-wrap gap-2 justify-center sm:justify-start">
          {[
            { id: 'overview', label: 'Why Study Here' },
            ...(isGermany
              ? [
                  {
                    id: 'germany-checklist',
                    label: '📄 Official 2026 Checklist (PDF)',
                    highlight: true,
                  },
                ]
              : []),
            ...(isTurkey
              ? [
                  {
                    id: 'turkey-checklist',
                    label: '📄 Turkey Checklist & Turkey Questioner (PDF)',
                    highlight: true,
                  },
                ]
              : []),
            { id: 'requirements', label: 'Entry Requirements' },
            { id: 'process', label: '10-Step Admission' },
            { id: 'costs', label: 'Costs & Scholarships' },
            { id: 'visa', label: 'Visa Process & Rules' },
            { id: 'universities', label: `10 Featured Universities (${universitiesList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`dest-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all font-heading cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? tab.highlight
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 border border-amber-300'
                    : 'bg-[#DB0303] text-white shadow-md shadow-red-600/25'
                  : tab.highlight
                  ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200 font-extrabold animate-pulse'
                  : 'text-slate-600 hover:text-[#DB0303] hover:bg-red-50/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GERMANY SPECIAL: DEDICATED OFFICIAL CHECKLIST TAB */}
        {activeTab === 'germany-checklist' && isGermany && (
          <div className="animate-in fade-in duration-200">
            <GermanyChecklistSection />
          </div>
        )}

        {/* TURKEY SPECIAL: DEDICATED OFFICIAL CHECKLIST & INTERVIEW TAB */}
        {activeTab === 'turkey-checklist' && isTurkey && (
          <div className="animate-in fade-in duration-200">
            <TurkeyChecklistSection />
          </div>
        )}

        {/* TAB 1: OVERVIEW & WHY STUDY HERE */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Reasons Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                  Key Advantages
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Why Pakistani Students Choose to Study in {destination.countryName}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {whyStudyList.map((reason, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:border-red-300 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#DB0303] font-heading">
                      <span>Reason 0{idx + 1}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      {reason.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Study Areas */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                  Academic Focus
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Popular Study Areas & In-Demand Programs in {destination.countryName}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {popularFieldsList.map((field, fIdx) => (
                  <div key={fIdx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#DB0303]" />
                      <h4 className="text-sm font-bold text-slate-900 font-heading">
                        {field.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      {field.desc || field.description || 'Comprehensive curriculum with high industry demand.'}
                    </p>
                    {field.examples && field.examples.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1">
                        {field.examples.map((ex, exIdx) => (
                          <span
                            key={exIdx}
                            className="text-[10px] bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Work & Career Rights */}
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border border-red-100 shadow-xl shadow-red-950/5 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                  Employment & Career Rights
                </span>
                <h2 className="text-2xl font-black font-heading text-slate-900">
                  Work Opportunities & Post-Study Visas in {destination.countryName}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-red-50/40 border border-red-100 space-y-2">
                  <h4 className="font-bold text-[#DB0303] font-heading text-sm">
                    Part-Time Work During Studies
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {destination.workOpportunities?.duringStudy}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-red-50/40 border border-red-100 space-y-2">
                  <h4 className="font-bold text-[#DB0303] font-heading text-sm">
                    Post-Study Work Visa Duration
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {destination.workOpportunities?.postStudyWork || destination.workOpportunities?.postStudy}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-red-50/40 border border-red-100 space-y-2">
                  <h4 className="font-bold text-[#DB0303] font-heading text-sm">
                    High-Growth Job Sectors
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {destination.workOpportunities?.jobMarket || destination.workOpportunities?.notes || 'STEM, Software Engineering, Healthcare, Finance, and Engineering disciplines.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENTRY REQUIREMENTS */}
        {activeTab === 'requirements' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                  Academic Eligibility
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Entry Requirements for Pakistani Qualifications
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Equivalent grade benchmarks for Intermediate (FSc / ICS / ICom / FA), A-Levels, and 4-Year Bachelor degrees.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Undergrad Requirements */}
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-red-50 text-[#DB0303] border border-red-100">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Undergraduate (Bachelor Degree)
                    </h3>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <p><strong>Academic Requirement:</strong> {undergradReq.academic}</p>
                    <p><strong>English Proficiency (IELTS/PTE):</strong> {undergradReq.english}</p>
                    {undergradReq.specialNotes && (
                      <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                        <strong>Important Note:</strong> {undergradReq.specialNotes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Postgrad Requirements */}
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-red-50 text-[#DB0303] border border-red-100">
                      <Award className="w-5 h-5" />
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Postgraduate (Master Degree)
                    </h3>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <p><strong>Academic Requirement:</strong> {postgradReq.academic}</p>
                    <p><strong>English Proficiency (IELTS/PTE):</strong> {postgradReq.english}</p>
                    {postgradReq.specialNotes && (
                      <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                        <strong>Important Note:</strong> {postgradReq.specialNotes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Checklist for Pakistani Applicants */}
              <div className="p-6 rounded-2xl bg-red-50/40 border border-red-100 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#DB0303]" />
                  <span>Mandatory Academic Documents for Pakistani Students:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                    <span>Matric & Intermediate Board Transcripts / Certificates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                    <span>Official Bachelor Degree & Detailed Marks Certificates (DMCs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                    <span>Valid Passport with at least 18 months validity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                    <span>Updated Europass or International Academic CV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                    <span>Statement of Purpose (SOP) / Letter of Motivation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                    <span>2 Academic Letters of Recommendation (LORs)</span>
                  </div>
                </div>
              </div>

              {/* Special Germany Download Callout */}
              {isGermany && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#7A0000] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border-2 border-red-500/30">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider font-heading">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ready for Instant Student Download</span>
                    </div>
                    <h4 className="text-base font-black font-heading text-white">
                      Official Germany University & Embassy Visa Checklist (PDF)
                    </h4>
                    <p className="text-xs text-slate-300">
                      Attestation paths (IBCC / HEC / MOFA), Uni-Assist fees (€75/€30), and Blocked Account requirements (€11,904/yr).
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleDownloadGermanyPdf}
                      disabled={isDownloadingPdf}
                      className="px-5 py-3 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl font-heading shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('germany-checklist')}
                      className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl font-heading transition-all cursor-pointer"
                    >
                      View Online
                    </button>
                  </div>
                </div>
              )}

              {/* Special Turkey Download Callout */}
              {isTurkey && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#7A0000] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border-2 border-red-500/30">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider font-heading">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Official 2026 Türkiye Attachments</span>
                    </div>
                    <h4 className="text-base font-black font-heading text-white">
                      Study in Turkey: Official Downloads &amp; Attachments
                    </h4>
                    <p className="text-xs text-slate-300">
                      Admission requirements, Anatolia visa process, 24 partner universities, and 18 visa interview Q&amp;As.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={handleDownloadTurkeyPdf}
                      disabled={isDownloadingPdf}
                      className="px-4 py-3 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl font-heading shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Turkey checklist (PDF)</span>
                    </button>
                    <button
                      onClick={handleDownloadTurkeyInterviewPdf}
                      disabled={isDownloadingPdf}
                      className="px-4 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl font-heading shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Turkey Questioner (PDF)</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('turkey-checklist')}
                      className="px-3 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl font-heading transition-all cursor-pointer"
                    >
                      View Online
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: 10-STEP ADMISSION PROCESS */}
        {activeTab === 'process' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                Chronological Roadmap
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                10-Step Admission Protocol for {destination.countryName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Follow this exact step-by-step procedure managed by RS Higher Education Consultants.
              </p>
            </div>

            <div className="space-y-3">
              {admissionProcessList.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex items-start gap-4 hover:border-red-200 transition-colors"
                >
                  <span className="text-xs font-black text-white bg-[#DB0303] px-3 py-1.5 rounded-xl font-heading shrink-0 shadow-xs">
                    Step {step.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Intakes & Deadlines */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-4">
                Available Intakes & Application Windows:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {intakesList.map((intake, iIdx) => (
                  <div key={iIdx} className="p-4.5 rounded-2xl bg-red-50/30 border border-red-100 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#DB0303] font-heading">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{intake.term || intake.name || `Intake 0${iIdx + 1}`}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{intake.month}</p>
                    <p className="text-xs text-slate-600"><strong>Deadline:</strong> {intake.applicationDeadline || intake.deadline || 'Standard rolling'}</p>
                    {intake.programs && <p className="text-[11px] text-slate-500 font-medium">{intake.programs}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COSTS & SCHOLARSHIPS */}
        {activeTab === 'costs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Cost Breakdown Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                  Financial Planning
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Estimated Cost of Study & Living in {destination.countryName}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Undergraduate Tuition</p>
                  <p className="text-base font-bold text-slate-900 font-heading">{destination.estimatedCosts?.tuitionUndergrad || 'Competitive rates'}</p>
                  <p className="text-[11px] text-slate-400">per academic year</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Postgraduate Tuition</p>
                  <p className="text-base font-bold text-slate-900 font-heading">{destination.estimatedCosts?.tuitionPostgrad || 'Competitive rates'}</p>
                  <p className="text-[11px] text-slate-400">per academic year</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Living Expenses</p>
                  <p className="text-base font-bold text-slate-900 font-heading">{destination.estimatedCosts?.livingMonthly || destination.estimatedCosts?.livingExpenses || 'Affordable'}</p>
                  <p className="text-[11px] text-slate-400">including food & rent</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Health Insurance & Visa</p>
                  <p className="text-base font-bold text-slate-900 font-heading">{destination.estimatedCosts?.healthInsurance || destination.estimatedCosts?.visaFee || 'Standard student fee'}</p>
                  <p className="text-[11px] text-slate-400">mandatory coverage</p>
                </div>
              </div>
            </div>

            {/* Scholarships Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                  Financial Aid
                </span>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Scholarships Available for Pakistani Students in {destination.countryName}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {scholarshipsList.map((sch, sIdx) => (
                  <div key={sIdx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:border-red-200 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                        {sch.provider || sch.type || 'Scholarship Scheme'}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {sch.coverage}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      {sch.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sch.criteria || sch.description || 'Merit and academic achievement-based qualification.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: VISA PROCESS & RULES */}
        {activeTab === 'visa' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                Immigration Compliance
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                Student Visa Guidelines for {destination.countryName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Official document verification, financial sponsorship proof, and consular interview protocols.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 font-heading">
                Visa Category & Processing Timeline:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Visa Name:</strong> {destination.visaProcess?.name || `${destination.countryName} National Student Visa`} | <strong>Processing Time:</strong> {destination.visaProcess?.processingTime || '3 to 6 weeks'}
              </p>
              <p className="text-xs text-slate-600">
                <strong>Financial Proof:</strong> {destination.visaProcess?.financialProof || 'Valid bank statement or blocked account demonstrating sufficient living and tuition funds.'}
              </p>
            </div>

            {/* Document Checklist */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
                Official Embassy Document Checklist:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visaDocs.map((doc, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#DB0303] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Germany Visa Checklist Callout */}
            {isGermany && (
              <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold font-heading text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#DB0303]" />
                    <span>Printable 2026 German Visa & Blocked Account Checklist</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    Includes Sperrkonto deposit details (€11,904/yr), Fintiba/Expatrio guidelines, waiting list protocols, and attested documents list.
                  </p>
                </div>
                <button
                  onClick={handleDownloadGermanyPdf}
                  disabled={isDownloadingPdf}
                  className="px-5 py-3 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl font-heading shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF</span>
                </button>
              </div>
            )}

            {/* Special Turkey Visa Checklist & Questioner Callout */}
            {isTurkey && (
              <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold font-heading text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#DB0303]" />
                    <span>Printable 2026 Türkiye Visa Checklist &amp; Interview Questioner</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    Includes Anatolia visa requirements, $1,000 deposit, $235 Anatolia fee, and 18 consulate interview model Q&amp;As.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadTurkeyPdf}
                    disabled={isDownloadingPdf}
                    className="px-4 py-3 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl font-heading shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Turkey checklist (PDF)</span>
                  </button>
                  <button
                    onClick={handleDownloadTurkeyInterviewPdf}
                    disabled={isDownloadingPdf}
                    className="px-4 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl font-heading shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Turkey Questioner (PDF)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Official Authority Link */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#DFB35F] shrink-0" />
                <div>
                  <p className="text-xs text-slate-300">Official Immigration Authority</p>
                  <p className="text-sm font-bold text-white font-heading">{officialAuthority}</p>
                </div>
              </div>
              <a
                href={officialVisaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#DFB35F]" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 6: 10 FEATURED UNIVERSITIES */}
        {activeTab === 'universities' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                Institutional Portfolios
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                10 Featured Accredited Universities in {destination.countryName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Official higher education institutions with high acceptance rates for qualified Pakistani students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {universitiesList.map((uni) => (
                <div
                  key={uni.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-red-300 hover:shadow-xl hover:shadow-red-950/5 transition-all flex flex-col justify-between space-y-4 group hover:-translate-y-1"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <UniLogoBadge websiteUrl={uni.officialWebsite || uni.websiteUrl} name={uni.name} />
                        <div>
                          <span className="text-xs font-bold text-[#DB0303] font-heading">
                            {uni.city}, {destination.countryName}
                          </span>
                          <h3 className="text-lg font-black text-slate-900 font-heading group-hover:text-[#DB0303] transition-colors leading-snug">
                            {uni.name}
                          </h3>
                        </div>
                      </div>
                      {uni.ranking && (
                        <span className="text-[10px] bg-red-50 text-[#DB0303] px-2.5 py-0.5 rounded-full border border-red-100 shrink-0 font-bold">
                          {uni.ranking}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600">
                      {uni.shortDescription || 'Accredited institution offering globally recognized undergraduate and postgraduate degrees.'}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <p className="text-xs font-bold text-slate-800">High-Demand Degree Programs:</p>
                      <div className="flex flex-wrap gap-1">
                        {uni.popularPrograms.map((prog, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[10px] bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md font-medium"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={uni.officialWebsite || uni.websiteUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-600 hover:text-[#DB0303] flex items-center gap-1 font-bold transition-colors font-heading"
                    >
                      <span>Visit University Website</span>
                      <ExternalLink className="w-3 h-3 text-[#DB0303]" />
                    </a>
                    <button
                      onClick={onOpenConsultation}
                      className="px-4 py-2 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl font-heading shadow-sm cursor-pointer"
                    >
                      Apply to this University
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA for Country */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#DB0303] to-[#B30000] rounded-3xl text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black font-heading text-white">
              Ready to Start Your {destination.countryName} Application?
            </h3>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl font-medium">
              Our Peshawar counseling team is ready to evaluate your transcripts and structure your admission file today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-[#DB0303] text-xs sm:text-sm font-bold rounded-2xl font-heading shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Book Free Appointment
            </button>
            <a
              id="bottom-whatsapp-specialist-btn"
              href={getWhatsAppCountryInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center gap-2 font-heading shadow-lg shadow-emerald-950/20 hover:scale-105 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
