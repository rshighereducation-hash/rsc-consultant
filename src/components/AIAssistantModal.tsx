import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, INITIAL_GREETING, generateLocalAdvisorResponse } from '../utils/aiAdvisorEngine';
import { BUSINESS_INFO } from '../data/businessInfo';
import { generateGermanyChecklistPDF } from '../utils/germanyPdfGenerator';
import { generateTurkeyChecklistPDF, generateTurkeyInterviewGuidePDF } from '../utils/turkeyPdfGenerator';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  MessageSquare,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RefreshCw,
  Phone,
  Calendar,
  Download,
  ExternalLink,
  ShieldCheck,
  Building2,
  Globe2,
  ChevronRight,
  HelpCircle,
  Clock,
  MapPin
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Speech synthesis helper
  const speakText = (rawText: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    // Clean markdown characters for pleasant speech
    const cleanText = rawText
      .replace(/[*#_`~•]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      // First attempt server Gemini AI API, fallback gracefully to contextual engine
      let botResponseText = '';
      let botActions = undefined;

      try {
        const res = await fetch('/api/ai-advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            history: messages.slice(-6).map((m) => ({
              role: m.sender === 'user' ? 'user' : 'model',
              content: m.text,
            })),
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.reply) {
            botResponseText = data.reply;
            botActions = data.suggestedActions;
          }
        }
      } catch (e) {
        // Fallback silently
      }

      // If server didn't provide reply, use comprehensive local advisor engine
      if (!botResponseText) {
        const local = generateLocalAdvisorResponse(query);
        botResponseText = local.text;
        botActions = local.suggestedActions;
      }

      // Natural conversational delay for smooth UX
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: botResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: botActions,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 450);
    } catch (err) {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: { label: string; actionType: string; payload: string }) => {
    if (action.actionType === 'query') {
      handleSendMessage(action.payload);
    } else if (action.actionType === 'whatsapp') {
      window.open(action.payload, '_blank');
    } else if (action.actionType === 'consultation') {
      if (onOpenConsultation) {
        onOpenConsultation();
        onClose();
      } else {
        const defaultMessage = encodeURIComponent('Hi RS Higher Education Consultants! I would like to book a free counseling session.');
        window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${defaultMessage}`, '_blank');
      }
    } else if (action.actionType === 'pdf') {
      if (action.payload === 'turkey-checklist') {
        generateTurkeyChecklistPDF();
      } else if (action.payload === 'turkey-interview') {
        generateTurkeyInterviewGuidePDF();
      } else if (action.payload === 'germany-checklist') {
        generateGermanyChecklistPDF();
      }
    }
  };

  const handleClearChat = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([INITIAL_GREETING]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col h-[90vh] sm:h-[680px] max-h-[92vh] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-advisor-title"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-[#7A0000] text-white p-4 sm:p-5 border-b border-red-500/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DB0303] to-[#8F0000] flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="ai-advisor-title" className="text-sm sm:text-base font-black font-heading tracking-tight text-white">
                    RS AI Study Advisor
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                    Online 24/7
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Official Knowledge Base • Deans Trade Centre Peshawar</span>
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleClearChat}
                title="Restart conversation"
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                aria-label="Restart chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                aria-label="Close AI Advisor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Notice Pill */}
          <div className="bg-red-50/80 border-b border-red-100 px-4 py-2 flex items-center justify-between text-xs text-slate-700">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Direct guidance for Admissions, Fees, Blocked Accounts &amp; Visas</span>
            </span>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Hello RS Consultants! I would like to speak with a human counselor.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#20ba5a] font-bold text-[11px] flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Us:</span> +92 334 4626284
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DB0303] to-[#990000] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm shadow-sm space-y-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                  }`}
                >
                  {/* Formatted Content */}
                  <div className="whitespace-pre-line leading-relaxed space-y-1.5 font-normal">
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (line.startsWith('### ')) {
                        return (
                          <h4 key={lIdx} className="text-sm sm:text-base font-black font-heading text-slate-900 pt-1">
                            {line.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (line.startsWith('#### ')) {
                        return (
                          <h5 key={lIdx} className="text-xs sm:text-sm font-bold font-heading text-[#DB0303] pt-1">
                            {line.replace('#### ', '')}
                          </h5>
                        );
                      }
                      if (line.startsWith('• ') || line.startsWith('- ')) {
                        return (
                          <div key={lIdx} className="flex items-start gap-1.5 pl-1">
                            <span className="text-[#DB0303] font-bold">•</span>
                            <span>{line.replace(/^[•-]\s+/, '')}</span>
                          </div>
                        );
                      }
                      return <p key={lIdx}>{line}</p>;
                    })}
                  </div>

                  {/* Message Action Footer (Copy / Text to Speech) */}
                  {msg.sender === 'ai' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="hover:text-slate-700 p-1 rounded-md transition-colors flex items-center gap-1"
                          title="Copy message"
                        >
                          {copiedMsgId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => speakText(msg.text)}
                          className="hover:text-slate-700 p-1 rounded-md transition-colors flex items-center gap-1"
                          title="Read aloud"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3 h-3 text-[#DB0303]" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                          <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Suggested Actions/Quick Buttons */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-heading">
                        Suggested Next Steps:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(action)}
                            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs border ${
                              action.actionType === 'whatsapp'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                                : 'bg-slate-100 hover:bg-red-50 hover:text-[#DB0303] hover:border-red-300 border-slate-200 text-slate-700'
                            }`}
                          >
                            {action.actionType === 'whatsapp' && (
                              <WhatsAppIcon className="w-3 h-3 text-[#25D366] shrink-0" />
                            )}
                            <span>{action.label.replace(/^📞\s*|^💬\s*/, '')}</span>
                            <ChevronRight className="w-3 h-3 opacity-60" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DB0303] to-[#990000] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#DB0303] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#DB0303] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#DB0303] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Suggestions Footer */}
          <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 font-heading">
              Quick:
            </span>
            <button
              onClick={() => handleSendMessage('What is the total initial cost and deposit for Turkey partner universities?')}
              className="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-[#DB0303] border border-slate-200 rounded-lg text-[11px] font-medium shrink-0 transition-colors"
            >
              🇹🇷 Turkey $1,235 Breakdown
            </button>
            <button
              onClick={() => handleSendMessage('Tell me about Cyprus €4,040 initial deposit and partner colleges.')}
              className="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-[#DB0303] border border-slate-200 rounded-lg text-[11px] font-medium shrink-0 transition-colors"
            >
              🇨🇾 Cyprus €4,040 Deposit
            </button>
            <button
              onClick={() => handleSendMessage('How does Germany blocked account €11,904 and free tuition work?')}
              className="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-[#DB0303] border border-slate-200 rounded-lg text-[11px] font-medium shrink-0 transition-colors"
            >
              🇩🇪 Germany €11,904 Blocked
            </button>
            <button
              onClick={() => handleSendMessage('What are the educational document attestation rules for IBCC and MOFA?')}
              className="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-[#DB0303] border border-slate-200 rounded-lg text-[11px] font-medium shrink-0 transition-colors"
            >
              📄 IBCC/HEC Attestation
            </button>
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about any country, tuition, blocked account, or visa..."
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] disabled:opacity-50 text-white rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
