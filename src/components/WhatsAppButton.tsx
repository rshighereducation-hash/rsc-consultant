import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { AIAssistantModal } from './AIAssistantModal';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Bot, Sparkles, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'Hi RS Higher Education Consultants! I would like to book a free study abroad counseling session.'
  );
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${defaultMessage}`;

  return (
    <>
      <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating Greeting & Quick AI Suggestion Tooltip */}
        {showTooltip && (
          <div className="bg-slate-900 text-white text-xs font-medium py-2.5 px-4 rounded-2xl shadow-2xl border border-red-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs sm:max-w-sm">
            <div className="w-8 h-8 rounded-xl bg-[#DB0303] flex items-center justify-center text-white shrink-0 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] font-heading">
                <Sparkles className="w-3 h-3" />
                <span>RS AI Study Advisor</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              </div>
              <p className="text-slate-300 text-[11px] leading-tight">
                Ask anything about Turkey, Cyprus, Germany, UK, Visas &amp; Fees!
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white p-1 ml-1 cursor-pointer transition-colors"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dual Action Floating Trigger Bar */}
        <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-slate-200/90 hover:border-red-300 transition-all">
          {/* 1. Main AI Assistant Popup Trigger */}
          <button
            onClick={() => {
              setIsAiModalOpen(true);
              setShowTooltip(false);
            }}
            id="floating-ai-advisor-btn"
            className="group relative flex items-center gap-2 pl-4 pr-4.5 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-[#800000] hover:from-slate-900 hover:to-[#B30000] text-white rounded-full font-bold text-xs sm:text-sm font-heading shadow-xl shadow-red-950/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-red-500/40 ring-2 ring-red-500/20"
            title="Open RS AI Study Abroad Advisor"
          >
            <div className="relative flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-900" />
              </span>
            </div>
            <span className="tracking-wide font-extrabold text-white">ASK RS AI Advisor</span>
            <span className="px-2 py-0.5 rounded-full bg-red-600/80 text-[10px] font-black text-white uppercase tracking-wider shadow-sm">
              Live
            </span>
          </button>

          {/* 2. Direct WhatsApp Fast Contact Button */}
          <a
            id="floating-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with RS Higher Education Consultants"
            className="relative group p-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
            title="Direct WhatsApp Chat (+92 334 4626284)"
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      {/* Full AI Counselor Chat Modal */}
      <AIAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </>
  );
};

