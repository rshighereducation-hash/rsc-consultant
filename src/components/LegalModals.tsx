import React from 'react';
import { X, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

interface LegalModalsProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-red-100 relative space-y-6 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Privacy Policy Content */}
        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-50 text-[#DB0303] border border-red-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-heading">
                  Privacy Policy
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  RS Higher Education Consultants • Peshawar
                </p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                At <strong>RS Higher Education Consultants</strong>, we respect your personal privacy. When you submit your academic background, transcripts, email, or telephone details through our consultation forms, we use this information exclusively to evaluate your eligibility for international universities and provide student visa guidance.
              </p>
              <h4 className="font-bold text-slate-900 font-heading">Data Protection Commitment:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                <li>We do not sell, rent, or lease prospective student data to third-party advertisers.</li>
                <li>Your academic transcripts and financial records are stored securely and only transmitted to accredited universities and official visa filing bodies with your explicit written consent.</li>
                <li>You may request complete deletion or rectification of your student record at any time by contacting {BUSINESS_INFO.email}.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Terms of Service Content */}
        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-50 text-[#DB0303] border border-red-100">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-heading">
                  Terms & Conditions of Service
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  RS Higher Education Consultants • Peshawar
                </p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                By engaging with RS Higher Education Consultants, you acknowledge that our services include academic profile assessment, university shortlisting, application filing, and visa interview preparation.
              </p>
              <h4 className="font-bold text-slate-900 font-heading">Key Terms:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                <li><strong>Authenticity of Documents:</strong> The applicant bears complete responsibility for providing authentic, untampered academic transcripts, board certificates, and verifiable bank statements. RS strictly refuses to process fraudulent or forged documentation.</li>
                <li><strong>Admissions Prerogative:</strong> Final admission decisions, scholarship quotas, and CAS/I-20/LOA issuance are determined solely by the respective academic institutions.</li>
                <li><strong>Compliance with Immigration Laws:</strong> Students are required to uphold all foreign student visa conditions, work hour restrictions, and academic progression standards upon arrival in the host country.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Consultancy Disclaimer */}
        {type === 'disclaimer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-50 text-[#DB0303] border border-red-100">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-heading">
                  Consultancy & Regulatory Disclaimer
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Official Statement on Visa & Admission Grants
                </p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                <strong>RS Higher Education Consultants</strong> is an independent international student placement and educational guidance firm operating from Deans Trade Centre, Peshawar, Pakistan.
              </p>
              <p>
                <strong>Important Legal Notice:</strong> RS Higher Education Consultants does not represent any foreign government, high commission, or embassy. Under international law, no educational consultant or agency can legally guarantee the grant of a visa. Visa approvals remain the sole, sovereign, and discretionary authority of the respective foreign embassy or immigration department.
              </p>
              <p>
                RS provides genuine application assistance, SOP editing, document verification, and interview coaching to ensure maximum file compliance with official standards.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs font-bold rounded-xl transition-all font-heading shadow-md shadow-red-600/20 cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
