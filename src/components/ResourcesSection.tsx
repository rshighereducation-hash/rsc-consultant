import React, { useState } from 'react';
import { RESOURCES_DATA } from '../data/resourcesData';
import { ResourceItem } from '../types';
import { generateGermanyChecklistPDF } from '../utils/germanyPdfGenerator';
import { generateTurkeyChecklistPDF, generateTurkeyInterviewGuidePDF } from '../utils/turkeyPdfGenerator';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  X,
  FileText,
  Download,
  FileCheck2
} from 'lucide-react';

interface ResourcesSectionProps {
  onOpenConsultation: () => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onOpenConsultation }) => {
  const [selectedArticle, setSelectedArticle] = useState<ResourceItem | null>(null);
  const [downloadingDoc, setDownloadingDoc] = useState<'germany' | 'turkey' | 'turkey-interview' | null>(null);

  const handleDownloadTurkey = () => {
    setDownloadingDoc('turkey');
    try {
      generateTurkeyChecklistPDF();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 800);
    }
  };

  const handleDownloadTurkeyInterview = () => {
    setDownloadingDoc('turkey-interview');
    try {
      generateTurkeyInterviewGuidePDF();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 800);
    }
  };

  const handleDownloadGermany = () => {
    setDownloadingDoc('germany');
    try {
      generateGermanyChecklistPDF();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setDownloadingDoc(null), 800);
    }
  };

  return (
    <section id="resources-section" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Hub & Downloads</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Study Abroad Guides & Official Checklists
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Essential visa roadmaps, scholarship strategies, and official application checklists curated specifically for Pakistani students.
          </p>
        </div>

        {/* Featured Official Document Downloads Grid */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Turkey Official Checklist Download Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#7A0000] text-white flex flex-col justify-between gap-4 shadow-xl border-2 border-red-500/40 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#DB0303] text-white rounded-2xl shrink-0 shadow-lg shadow-red-600/30">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 uppercase tracking-wider font-heading">
                  <Sparkles className="w-3 h-3" />
                  <span>Turkey Official Attachments</span>
                </div>
                <h3 className="text-sm sm:text-base font-black font-heading text-white leading-tight">
                  Turkey Checklist &amp; Questioner
                </h3>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Official 2026 checklist and 18 consulate interview model answers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadTurkey}
                disabled={downloadingDoc === 'turkey'}
                className="px-3 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl font-heading shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-amber-300"
                title="Download Turkey checklist PDF"
              >
                <Download className={`w-3.5 h-3.5 text-slate-950 ${downloadingDoc === 'turkey' ? 'animate-bounce' : ''}`} />
                <span className="truncate">{downloadingDoc === 'turkey' ? '...' : 'Turkey checklist'}</span>
              </button>
              <button
                onClick={handleDownloadTurkeyInterview}
                disabled={downloadingDoc === 'turkey-interview'}
                className="px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl font-heading shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-red-500"
                title="Download Turkey Questioner PDF"
              >
                <FileText className={`w-3.5 h-3.5 text-white ${downloadingDoc === 'turkey-interview' ? 'animate-bounce' : ''}`} />
                <span className="truncate">{downloadingDoc === 'turkey-interview' ? '...' : 'Turkey Questioner'}</span>
              </button>
            </div>
          </div>

          {/* Germany Official Checklist Download Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#800000] text-white flex flex-col justify-between gap-4 shadow-xl border-2 border-red-500/40 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#DB0303] text-white rounded-2xl shrink-0 shadow-lg shadow-red-600/30">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 uppercase tracking-wider font-heading">
                  <Sparkles className="w-3 h-3" />
                  <span>Germany PDF</span>
                </div>
                <h3 className="text-sm sm:text-base font-black font-heading text-white leading-tight">
                  Germany Public University Checklist
                </h3>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Uni-Assist fees (€75/€30), Sperrkonto Blocked Account (€11,904/yr), and attestation.
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadGermany}
              disabled={downloadingDoc === 'germany'}
              className="w-full px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl font-heading shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
            >
              <Download className={`w-4 h-4 text-slate-950 ${downloadingDoc === 'germany' ? 'animate-bounce' : ''}`} />
              <span>{downloadingDoc === 'germany' ? 'Downloading...' : 'Download Germany (PDF)'}</span>
            </button>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESOURCES_DATA.map((res) => (
            <div
              key={res.id}
              id={`resource-card-${res.id}`}
              className="bg-white border border-slate-200/80 hover:border-red-300 rounded-3xl p-6.5 hover:shadow-xl hover:shadow-red-950/5 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100 font-heading">
                    {res.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#DB0303]" />
                    <span>{res.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 font-heading group-hover:text-[#DB0303] transition-colors leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {res.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {res.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-100 flex items-center gap-1 font-medium"
                    >
                      <Tag className="w-2.5 h-2.5 text-[#DB0303]" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{res.date}</span>
                <button
                  onClick={() => setSelectedArticle(res)}
                  className="text-xs font-bold text-slate-800 group-hover:text-[#DB0303] flex items-center gap-1 font-heading transition-colors"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Modal */}
      {selectedArticle && (
        <div
          id="resource-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-red-100 relative space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100 font-heading">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading pt-1">
                {selectedArticle.title}
              </h3>
            </div>

            <p className="text-sm text-slate-700 italic border-l-4 border-[#DB0303] pl-4 py-1">
              {selectedArticle.summary}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                Detailed Guide Highlights:
              </h4>
              <div className="space-y-2.5">
                {selectedArticle.content.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50/40 border border-red-100 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#DB0303] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs text-slate-500 font-medium">
                Want personalized advice on this topic?
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl font-heading"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onOpenConsultation();
                  }}
                  className="px-6 py-2.5 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl font-heading shadow-md shadow-red-600/20"
                >
                  Discuss with Counselor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
