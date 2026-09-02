import React, { useState, useEffect } from 'react';
import { GoogleIntegrationService, USER_LINKED_SPREADSHEET_URL, StudentLeadPayload } from '../services/googleIntegration';
import { PdfGenerationService } from '../services/pdfService';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  FileSpreadsheet,
  Mail,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  X,
  Sparkles,
  Database,
  Link as LinkIcon,
  Copy,
  Check,
  Phone,
  HelpCircle,
  Clock,
  FileText
} from 'lucide-react';

interface GoogleSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSyncModal: React.FC<GoogleSyncModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'auth' | 'webhook' | 'leads'>('auth');
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [webhookUrlInput, setWebhookUrlInput] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [savedWebhookSuccess, setSavedWebhookSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkStatus();
    } else {
      setIsAuthenticating(false);
    }
  }, [isOpen]);

  const checkStatus = () => {
    const connected = GoogleIntegrationService.isConnected();
    setIsConnected(connected);
    const localLeads = GoogleIntegrationService.getLocalLeads();
    setLeads(localLeads);

    const sheetId = localStorage.getItem('rs_leads_spreadsheet_id_v1');
    if (sheetId) {
      setSpreadsheetUrl(`https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
    } else {
      setSpreadsheetUrl(USER_LINKED_SPREADSHEET_URL);
    }

    const currentWebhook = GoogleIntegrationService.getWebhookUrl();
    if (currentWebhook) {
      setWebhookUrlInput(currentWebhook);
    }
  };

  const handleConnectGoogle = async () => {
    setIsAuthenticating(true);
    setErrorMsg(null);
    setStatusMsg('Opening Google sign-in window for rshighereducation@gmail.com...');

    try {
      const token = await GoogleIntegrationService.requestGoogleAuth('rshighereducation@gmail.com');
      setIsConnected(true);
      setStatusMsg('Google authorization granted! Generating student leads sheet...');

      // Initialize spreadsheet
      const sheetId = await GoogleIntegrationService.getOrCreateSpreadsheet(token);
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
      setSpreadsheetUrl(url);
      setStatusMsg('Connected! All form inquiries now sync to Google Sheets & Gmail.');
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setErrorMsg(err.message || 'Connecting was interrupted or popup was closed.');
      setStatusMsg(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleCancelConnecting = () => {
    setIsAuthenticating(false);
    setStatusMsg(null);
    setErrorMsg('Connecting canceled. If your browser blocked popups, please click "Authorize" again and allow popups in your URL bar.');
  };

  const [testingWebhook, setTestingWebhook] = useState(false);
  const [testLeadResult, setTestLeadResult] = useState<string | null>(null);

  const handleSendTestLead = async () => {
    setTestingWebhook(true);
    setTestLeadResult(null);
    try {
      const testLead: StudentLeadPayload = {
        fullName: 'Test Student (RS Verification)',
        email: 'rshighereducation@gmail.com',
        phone: '+92 334 4626284',
        city: 'Peshawar',
        destination: 'United Kingdom',
        studyLevel: 'Postgraduate / Master',
        targetIntake: 'September 2026',
        ieltsStatus: '6.5 (Verified)',
        academicBackground: 'BSc Computer Science (3.6 CGPA)',
        message: 'This is an automated test lead from RS Higher Education Consultants website to verify your Google Sheet and Email connection with attached official Inquiry Form PDF.',
        submittedAt: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      };

      // Generate Test PDF Base64
      try {
        const doc = PdfGenerationService.generateApplicationPdf(testLead as any);
        const dataUri = doc.output('datauristring');
        testLead.pdfBase64 = dataUri.split(',')[1] || '';
        testLead.pdfFileName = 'RS_Inquiry_Form_Test_Student.pdf';
      } catch (pdfErr) {
        console.warn('Test PDF base64 generation notice:', pdfErr);
      }

      // Save locally
      GoogleIntegrationService.saveLeadLocally(testLead as any);
      setLeads(GoogleIntegrationService.getLocalLeads());

      // Send to webhook if set
      const webhookSent = await GoogleIntegrationService.sendToWebhook(testLead);

      const token = GoogleIntegrationService.getAccessToken();
      if (token) {
        await GoogleIntegrationService.appendToGoogleSheet(token, testLead as any).catch(() => {});
      }

      if (webhookSent || token) {
        setTestLeadResult('✅ Test lead + Attached PDF sent! Check row in Google Sheet and attached PDF in inbox.');
      } else {
        setTestLeadResult('✅ Test lead recorded locally! (Paste Webhook URL below to sync to your Google Sheet automatically).');
      }
    } catch (e: any) {
      setTestLeadResult('⚠️ Error sending test: ' + (e?.message || 'Unknown error'));
    } finally {
      setTestingWebhook(false);
    }
  };

  const handleDisconnect = () => {
    GoogleIntegrationService.disconnect();
    setIsConnected(false);
    setStatusMsg('Disconnected from Google Workspace.');
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    GoogleIntegrationService.setWebhookUrl(webhookUrlInput);
    setSavedWebhookSuccess(true);
    setTimeout(() => setSavedWebhookSuccess(false), 3000);
  };

  const handleDownloadExcel = () => {
    GoogleIntegrationService.downloadLeadsCSV();
  };

  const sampleAppsScriptCode = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // 1. Ensure Table Headers exist with Red RS Theme
    var headers = [
      "Submission Date", 
      "Student Name", 
      "Phone / WhatsApp", 
      "Email Address", 
      "City", 
      "Preferred Destination", 
      "Degree Level", 
      "Target Intake", 
      "IELTS / Test Score", 
      "Academic Background", 
      "Message / Inquiry"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground("#DB0303")
        .setFontColor("#FFFFFF")
        .setFontWeight("bold");
    }
    
    // 2. Find exact next empty row
    var values = sheet.getRange("A:A").getValues();
    var nextRow = 1;
    while (nextRow <= values.length && values[nextRow - 1][0] !== "") {
      nextRow++;
    }

    var rowData = [
      data.submittedAt || new Date().toLocaleString(),
      data.fullName || "",
      data.phone || "",
      data.email || "",
      data.city || "",
      data.destination || "",
      data.studyLevel || "",
      data.targetIntake || "",
      data.ieltsStatus || "",
      data.academicBackground || "",
      data.message || ""
    ];

    // 3. Write row cleanly with white background and clear text
    var targetRange = sheet.getRange(nextRow, 1, 1, rowData.length);
    targetRange.setValues([rowData]);
    targetRange.setBackground("#FFFFFF");
    targetRange.setFontColor("#1E293B");
    targetRange.setFontWeight("normal");
    targetRange.setVerticalAlignment("middle");

    // 4. Prepare Official PDF Attachment
    var attachments = [];
    if (data.pdfBase64) {
      var pdfFileName = data.pdfFileName || ("RS_Inquiry_Form_" + (data.fullName || "Student").replace(/[^a-zA-Z0-9]/g, "_") + ".pdf");
      var pdfBlob = Utilities.newBlob(Utilities.base64Decode(data.pdfBase64), "application/pdf", pdfFileName);
      attachments.push(pdfBlob);
    }

    // 5. Auto-Email instant copy directly to rshighereducation@gmail.com with Attached PDF
    var targetEmail = "rshighereducation@gmail.com";
    var emailSubject = "🎓 New Student Lead with Attached Form PDF: " + (data.fullName || "Student") + " (" + (data.destination || "Study Abroad") + ")";
    var htmlContent = "<div style='font-family:Arial,sans-serif;max-width:600px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;'>" +
      "<div style='background:#DB0303;color:#ffffff;padding:20px;text-align:center;'><h2 style='margin:0;'>RS Higher Education Consultants</h2><p style='margin:4px 0 0;font-size:13px;'>Official Inquiry Form &amp; Student Lead</p></div>" +
      "<div style='padding:24px;font-size:14px;color:#334155;line-height:1.6;'>" +
      "<p style='background:#eff6ff;color:#1e40af;padding:10px 14px;border-radius:8px;font-size:13px;'>📎 <strong>Official Inquiry Form PDF Attached:</strong> The complete branded PDF application dossier generated for this student is attached to this email.</p>" +
      "<table style='width:100%;border-collapse:collapse;margin:16px 0;'>" +
      "<tr><td style='padding:6px 0;color:#64748b;width:40%;'><strong>Student Name:</strong></td><td style='padding:6px 0;color:#0f172a;font-weight:bold;'>" + (data.fullName || "") + "</td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>Phone / WhatsApp:</strong></td><td style='padding:6px 0;'><a href='https://wa.me/" + (data.phone || "").replace(/[^0-9]/g, "") + "' style='color:#DB0303;font-weight:bold;text-decoration:none;'>" + (data.phone || "") + " (Chat on WhatsApp)</a></td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>Email Address:</strong></td><td style='padding:6px 0;'><a href='mailto:" + (data.email || "") + "' style='color:#2563eb;'>" + (data.email || "") + "</a></td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>City:</strong></td><td style='padding:6px 0;'>" + (data.city || "Peshawar") + "</td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>Target Country:</strong></td><td style='padding:6px 0;font-weight:bold;color:#0f172a;'>" + (data.destination || "") + "</td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>Degree Level:</strong></td><td style='padding:6px 0;'>" + (data.studyLevel || "") + "</td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>Target Intake:</strong></td><td style='padding:6px 0;'>" + (data.targetIntake || "September 2026") + "</td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>IELTS / English:</strong></td><td style='padding:6px 0;'>" + (data.ieltsStatus || "N/A") + "</td></tr>" +
      "<tr><td style='padding:6px 0;color:#64748b;'><strong>Academic Background:</strong></td><td style='padding:6px 0;'>" + (data.academicBackground || "N/A") + "</td></tr>" +
      "</table>" +
      (data.message ? "<div style='background:#f8fafc;border-left:4px solid #DB0303;padding:12px;margin:14px 0;border-radius:4px;'><strong>Student Notes:</strong><p style='margin:4px 0 0;font-style:italic;color:#1e293b;'>\"" + data.message + "\"</p></div>" : "") +
      "<div style='margin-top:20px;text-align:center;'><a href='https://wa.me/" + (data.phone || "").replace(/[^0-9]/g, "") + "' style='background:#DB0303;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;'>Open Student Chat on WhatsApp</a></div>" +
      "</div>" +
      "<div style='background:#f1f5f9;padding:12px;text-align:center;font-size:11px;color:#64748b;'>RS Higher Education Consultants • Deans Trade Centre, Peshawar Cantt</div>" +
      "</div>";

    MailApp.sendEmail({
      to: targetEmail,
      subject: emailSubject,
      htmlBody: htmlContent,
      attachments: attachments
    });

    return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyAppsScript = () => {
    navigator.clipboard.writeText(sampleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      id="google-sync-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl my-6 bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#DB0303] rounded-2xl shadow-md">
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-red-300 uppercase tracking-wider font-heading">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Leads &amp; Excel Hub</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                Google Sheets &amp; Email Leads
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Target Official Email: <strong className="text-amber-300 font-bold">rshighereducation@gmail.com</strong>
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700/60 overflow-x-auto text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('auth')}
              className={`px-3 py-1.5 rounded-xl font-bold font-heading transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'auth'
                  ? 'bg-[#DB0303] text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Account Link</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-xl font-bold font-heading transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'leads'
                  ? 'bg-[#DB0303] text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>View All Leads ({leads.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('webhook')}
              className={`px-3 py-1.5 rounded-xl font-bold font-heading transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'webhook'
                  ? 'bg-[#DB0303] text-white shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Google Apps Script Webhook</span>
            </button>
          </div>
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: Google Account Link */}
          {activeTab === 'auth' && (
            <div className="space-y-5">
              {/* Status banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
                  isConnected
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                {isConnected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <span className="font-extrabold block text-sm">
                    {isConnected
                      ? 'Google Workspace Connected & Active'
                      : 'Authorize rshighereducation@gmail.com'}
                  </span>
                  <p className="leading-relaxed">
                    {isConnected
                      ? 'Every student inquiry from all forms automatically creates a row in your Google Drive spreadsheet and sends an email to rshighereducation@gmail.com.'
                      : 'Click the button below to authorize. If your browser blocks popups, make sure to allow popups in your browser address bar.'}
                  </p>
                </div>
              </div>

              {/* Connecting in progress helper banner */}
              {isAuthenticating && (
                <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    <span>Google Authorization Popup is Open</span>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    Please check your browser pop-up window (or browser tabs) to select <strong>rshighereducation@gmail.com</strong> and click <strong>Allow</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={handleCancelConnecting}
                    className="mt-1 px-3 py-1.5 bg-white border border-blue-300 text-blue-800 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Cancel / Stop Connecting
                  </button>
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {statusMsg && !isAuthenticating && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{statusMsg}</span>
                </div>
              )}

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Card 1: Google Sheet */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 font-heading">Google Sheet</h4>
                      <span className="text-[10px] text-slate-500">Live Google Drive Sheet</span>
                    </div>
                  </div>
                  {spreadsheetUrl ? (
                    <a
                      href={spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-heading flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>Open Google Sheet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleConnectGoogle}
                      disabled={isAuthenticating}
                      className="w-full py-2.5 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold font-heading transition-colors"
                    >
                      Authorize to Generate Sheet
                    </button>
                  )}
                </div>

                {/* Card 2: 1-Click Excel CSV Download */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 font-heading">Excel File (.csv)</h4>
                      <span className="text-[10px] text-slate-500">{leads.length} recorded leads</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadExcel}
                    className="w-full py-2.5 px-3 bg-[#DB0303] hover:bg-[#B30000] text-white rounded-xl text-xs font-bold font-heading flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel Sheet</span>
                  </button>
                </div>
              </div>

              {/* Troubleshooting note */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-800">What to do if connecting keeps loading:</span>
                  <p>
                    1. Check your browser address bar for a <strong>"Pop-up blocked"</strong> icon and click <strong>Always Allow</strong>.<br />
                    2. If you are in preview mode, click the <strong>Open in new window</strong> icon at the top right of your browser.<br />
                    3. You can also view and export all incoming student leads directly from the <strong>"View All Leads"</strong> tab or use the <strong>"Google Apps Script Webhook"</strong>!
                  </p>
                </div>
              </div>

              {/* Connect / Disconnect Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                {!isConnected ? (
                  <button
                    type="button"
                    onClick={handleConnectGoogle}
                    disabled={isAuthenticating}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs font-black rounded-xl font-heading shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isAuthenticating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    <span>Authorize rshighereducation@gmail.com</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleConnectGoogle}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors font-heading cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh Token</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium cursor-pointer"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: View All Inquiries Table */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">
                    Submitted Inquiries ({leads.length})
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Real-time list of student submissions recorded across all forms.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-heading flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel (.csv)</span>
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  <FileSpreadsheet className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">No student inquiries submitted yet</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Fill in the contact form or degree finder on the website to test a submission!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Phone / WhatsApp</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Destination</th>
                        <th className="p-3">Degree</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {leads.map((lead, idx) => (
                        <tr key={lead.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 whitespace-nowrap text-slate-500 text-[11px]">
                            {lead.submittedAt}
                          </td>
                          <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                            {lead.fullName}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="font-mono text-slate-700">{lead.phone}</span>
                          </td>
                          <td className="p-3 whitespace-nowrap text-slate-600">
                            {lead.email}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-md font-bold text-[10px]">
                              {lead.destination}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap text-slate-600 text-[11px]">
                            {lead.studyLevel}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <a
                                href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=${PdfGenerationService.getWhatsAppDossierMessage(lead)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1 transition-colors shadow-xs"
                                title="Chat on WhatsApp with pre-filled dossier"
                              >
                                <WhatsAppIcon className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => PdfGenerationService.downloadApplicationPdf(lead)}
                                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer"
                                title="Download Official PDF Application Dossier"
                              >
                                <FileText className="w-3 h-3 text-red-400" />
                                <span>PDF</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Google Apps Script Webhook Setup */}
          {activeTab === 'webhook' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-slate-900 block text-sm font-heading">
                  100% Zero-Login Google Sheet Auto-Sync (Webhook)
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  If you do not want to use OAuth popups, you can attach a free Google Apps Script to any Google Sheet. All website submissions will automatically append new rows directly into your spreadsheet!
                </p>
              </div>

              {/* Direct Link to Sheet */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-emerald-900 text-xs block">Active Google Sheet:</span>
                  <p className="text-[11px] text-emerald-700 font-mono break-all">
                    https://docs.google.com/spreadsheets/d/1M0y6rCtpurzZsYTlAc-tMFVo6V7AGkFEM47pNmj0eMI
                  </p>
                </div>
                <a
                  href="https://docs.google.com/spreadsheets/d/1M0y6rCtpurzZsYTlAc-tMFVo6V7AGkFEM47pNmj0eMI/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold font-heading flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0"
                >
                  <span>Open Sheet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Webhook URL input form */}
              <form onSubmit={handleSaveWebhook} className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                <label className="block font-bold text-slate-800 text-xs">
                  Your Google Apps Script Webhook URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#DB0303]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#DB0303] hover:bg-[#B30000] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shrink-0"
                  >
                    Save Webhook
                  </button>
                </div>
                {savedWebhookSuccess && (
                  <p className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Webhook URL saved successfully!
                  </p>
                )}
              </form>

              {/* 1-Click Test Lead Trigger */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs font-heading">Test Google Sheet Live Sync</h5>
                    <p className="text-[11px] text-slate-500">Send a sample verified inquiry to test your sheet and email notifications.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendTestLead}
                    disabled={testingWebhook}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    {testingWebhook ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{testingWebhook ? 'Sending Test...' : 'Send Test Lead'}</span>
                  </button>
                </div>
                {testLeadResult && (
                  <p className="text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    {testLeadResult}
                  </p>
                )}
              </div>

              {/* Ready-to-copy code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 text-[11px]">Google Apps Script Code (Copy &amp; Paste in Extensions → Apps Script):</span>
                  <button
                    type="button"
                    onClick={copyAppsScript}
                    className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedScript ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[10px] font-mono overflow-x-auto max-h-36">
                  {sampleAppsScriptCode}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            RS Higher Education Consultants • Peshawar
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 rounded-xl transition-colors font-heading cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
