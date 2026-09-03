// Google Sheets, Google Drive & Gmail Integration Service for RS Higher Education Consultants
// Target Business Email: rshighereducation@gmail.com

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

export interface StudentLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  destination: string;
  studyLevel: string;
  targetIntake?: string;
  ieltsStatus?: string;
  academicBackground?: string;
  message?: string;
  submittedAt?: string;
  pdfBase64?: string;
  pdfFileName?: string;
}

export const TARGET_BUSINESS_EMAIL = "rshighereducation@gmail.com";
export const USER_LINKED_SPREADSHEET_ID =
  "1M0y6rCtpurzZsYTlAc-tMFVo6V7AGkFEM47pNmj0eMI";
export const USER_LINKED_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${USER_LINKED_SPREADSHEET_ID}/edit?usp=sharing`;

const LOCAL_STORAGE_TOKEN_KEY = "rs_google_access_token_v1";
const LOCAL_STORAGE_SPREADSHEET_ID_KEY = "rs_leads_spreadsheet_id_v1";
const LOCAL_STORAGE_SAVED_LEADS_KEY = "rs_all_student_leads_v1";

// Initialize Firebase App & Auth
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const auth = getAuth(firebaseApp);

export class GoogleIntegrationService {
  private static accessToken: string | null = null;
  private static tokenExpiry: number = 0;
  private static currentUser: User | null = null;

  static init() {
    try {
      // If previous old sheet was stored, automatically upgrade to new sheet
      const storedSheetId = localStorage.getItem(
        LOCAL_STORAGE_SPREADSHEET_ID_KEY,
      );
      if (
        storedSheetId === "19ebPP2n8Z8IS3_dDEfIQ5oIWpb9d_RRNEe9ePVfI_80" ||
        !storedSheetId
      ) {
        localStorage.setItem(
          LOCAL_STORAGE_SPREADSHEET_ID_KEY,
          USER_LINKED_SPREADSHEET_ID,
        );
      }

      const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      const storedExpiry = localStorage.getItem("rs_google_token_expiry_v1");
      if (
        storedToken &&
        storedExpiry &&
        Date.now() < parseInt(storedExpiry, 10)
      ) {
        this.accessToken = storedToken;
        this.tokenExpiry = parseInt(storedExpiry, 10);
      }

      onAuthStateChanged(auth, (user) => {
        this.currentUser = user;
        if (!user) {
          // Token expired or logged out
        }
      });
    } catch (e) {
      console.warn("Could not restore Google token", e);
    }
  }

  static getAccessToken(): string | null {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }
    return null;
  }

  static getCurrentUser(): User | null {
    return this.currentUser || auth.currentUser;
  }

  static isConnected(): boolean {
    return !!this.getAccessToken();
  }

  static async disconnect() {
    this.accessToken = null;
    this.tokenExpiry = 0;
    this.currentUser = null;
    try {
      await signOut(auth);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem("rs_google_token_expiry_v1");
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Request Google OAuth token via official Firebase Google Provider
   */
  static async requestGoogleAuth(
    loginHint: string = "rshighereducation@gmail.com",
  ): Promise<string> {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/spreadsheets");
      provider.addScope("https://www.googleapis.com/auth/drive.file");
      provider.addScope("https://www.googleapis.com/auth/gmail.send");
      provider.setCustomParameters({
        login_hint: loginHint,
        prompt: "consent",
      });

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential?.accessToken) {
        throw new Error(
          "Google sign-in succeeded but did not return an API access token. Please check account permissions.",
        );
      }

      this.accessToken = credential.accessToken;
      this.currentUser = result.user;
      this.tokenExpiry = Date.now() + 3600 * 1000; // 1 hour token duration

      try {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, this.accessToken);
        localStorage.setItem(
          "rs_google_token_expiry_v1",
          this.tokenExpiry.toString(),
        );
      } catch (err) {
        console.warn(err);
      }

      return this.accessToken;
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      if (error?.code === "auth/popup-closed-by-user") {
        throw new Error(
          "Google Sign-in popup was closed before completing authorization.",
        );
      }
      if (error?.code === "auth/popup-blocked") {
        throw new Error(
          "Browser popup blocked. Please allow popups for this site or open in a new tab.",
        );
      }
      throw new Error(
        error?.message || "Google authorization could not be completed.",
      );
    }
  }

  /**
   * Save lead locally so it can always be exported to Excel / CSV even offline
   */
  static saveLeadLocally(lead: StudentLeadPayload) {
    try {
      const existing = this.getLocalLeads();
      const newLead = {
        ...lead,
        id: `RS-${Date.now()}`,
        submittedAt: lead.submittedAt || new Date().toLocaleString(),
      };
      existing.unshift(newLead);
      localStorage.setItem(
        LOCAL_STORAGE_SAVED_LEADS_KEY,
        JSON.stringify(existing.slice(0, 500)),
      );
    } catch (e) {
      console.warn("Could not save lead locally", e);
    }
  }

  static getLocalLeads(): any[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_SAVED_LEADS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Ensure or Create dedicated Google Spreadsheet for Leads
   */
  static async getOrCreateSpreadsheet(token: string): Promise<string> {
    try {
      const targetId =
        localStorage.getItem(LOCAL_STORAGE_SPREADSHEET_ID_KEY) ||
        USER_LINKED_SPREADSHEET_ID;
      if (targetId) {
        // Verify access
        const checkRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${targetId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (checkRes.ok) {
          localStorage.setItem(LOCAL_STORAGE_SPREADSHEET_ID_KEY, targetId);
          return targetId;
        }
      }
    } catch (e) {
      console.warn("Verifying linked spreadsheet access", e);
    }

    // Default to the user's provided spreadsheet ID
    localStorage.setItem(
      LOCAL_STORAGE_SPREADSHEET_ID_KEY,
      USER_LINKED_SPREADSHEET_ID,
    );
    return USER_LINKED_SPREADSHEET_ID;
  }

  /**
   * Append new student submission row to Google Sheet
   */
  static async appendToGoogleSheet(
    token: string,
    lead: StudentLeadPayload,
  ): Promise<string> {
    const spreadsheetId = await this.getOrCreateSpreadsheet(token);
    const dateStr = lead.submittedAt || new Date().toLocaleString();

    const row = [
      dateStr,
      lead.fullName,
      lead.phone,
      lead.email,
      lead.city || "Peshawar",
      lead.destination || "General Inquiry",
      lead.studyLevel || "Master / Postgraduate",
      lead.targetIntake || "September 2026",
      lead.ieltsStatus || "Planning to take",
      lead.academicBackground || "N/A",
      lead.message || "",
      "New Lead",
    ];

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [row],
        }),
      },
    );

    if (!appendRes.ok) {
      const err = await appendRes.json();
      throw new Error(
        err.error?.message || "Failed to append row to Google Sheet",
      );
    }

    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  }

  /**
   * Send Email Notification to rshighereducation@gmail.com via Gmail API
   */
  static async sendNotificationEmail(
    token: string,
    lead: StudentLeadPayload,
    recipient: string = "rshighereducation@gmail.com",
  ): Promise<boolean> {
    const subject = `🎓 New Student Application Lead: ${lead.fullName} (${lead.destination || "Study Abroad"})`;

    const emailBody = [
      `From: RS Higher Education Consultants <${recipient}>`,
      `To: ${recipient}`,
      `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">`,
      `  <div style="background: #DB0303; color: #ffffff; padding: 20px; text-align: center;">`,
      `    <h1 style="margin: 0; font-size: 20px; font-weight: bold;">RS Higher Education Consultants</h1>`,
      `    <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">New Student Consultation Form Submitted</p>`,
      `  </div>`,
      `  <div style="padding: 24px; color: #334155; font-size: 14px; line-height: 1.6;">`,
      `    <h2 style="font-size: 16px; color: #0f172a; margin-top: 0; border-bottom: 2px solid #fee2e2; padding-bottom: 8px;">Applicant Information</h2>`,
      `    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; width: 40%; color: #64748b;">Full Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${lead.fullName}</td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">WhatsApp / Phone:</td><td style="padding: 8px 0; color: #DB0303; font-weight: bold;"><a href="tel:${lead.phone}" style="color: #DB0303; text-decoration: none;">${lead.phone}</a> &nbsp; <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}" style="background: #25D366; color: white; padding: 2px 8px; border-radius: 4px; text-decoration: none; font-size: 11px;">Open WhatsApp</a></td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #2563eb;">${lead.email}</a></td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">City / Domicile:</td><td style="padding: 8px 0;">${lead.city || "Peshawar, Pakistan"}</td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Target Destination:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${lead.destination}</td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Degree Level:</td><td style="padding: 8px 0;">${lead.studyLevel}</td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Target Intake:</td><td style="padding: 8px 0;">${lead.targetIntake || "September 2026"}</td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">IELTS / English:</td><td style="padding: 8px 0;">${lead.ieltsStatus || "Not specified"}</td></tr>`,
      `      <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Academic Background:</td><td style="padding: 8px 0;">${lead.academicBackground || "N/A"}</td></tr>`,
      `    </table>`,
      lead.message
        ? `    <div style="background: #f8fafc; border-left: 4px solid #DB0303; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;"><strong style="display: block; font-size: 12px; color: #64748b; margin-bottom: 4px;">Student Message:</strong><p style="margin: 0; color: #1e293b; font-style: italic;">"${lead.message}"</p></div>`
        : "",
      `    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">`,
      `      <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; background: #DB0303; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none;">Reply to Student on WhatsApp</a>`,
      `    </div>`,
      `  </div>`,
      `  <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #64748b;">`,
      `    RS Higher Education Consultants • Office UG-389, Deans Trade Centre, Peshawar Cantt, Pakistan`,
      `  </div>`,
      `</div>`,
    ].join("\r\n");

    // Encode message in base64url format
    const base64Encoded = btoa(unescape(encodeURIComponent(emailBody)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: base64Encoded }),
      },
    );

    return res.ok;
  }

  /**
   * Uploads official inquiry PDF directly to user's Google Drive in 'RS HEC Student Applications' folder
   */
  static async uploadPdfToDrive(
    token: string,
    pdfBlob: Blob,
    studentName: string,
  ): Promise<string | null> {
    try {
      const metadata = {
        name: `RS_Inquiry_Form_${(studentName || "Student").replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().slice(0, 10)}.pdf`,
        mimeType: "application/pdf",
      };

      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" }),
      );
      form.append("file", pdfBlob);

      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        },
      );

      if (res.ok) {
        const data = await res.json();
        return data.id || null;
      }
      return null;
    } catch (e) {
      console.warn("Google Drive direct upload warning:", e);
      return null;
    }
  }

  /**
   * Post lead payload to a custom Google Sheet Webhook / Apps Script URL
   */
  static async sendToWebhook(lead: StudentLeadPayload): Promise<boolean> {
    const webhookUrl = this.getWebhookUrl();
    if (!webhookUrl) return false;

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors", // standard for Google Apps Script Webhooks
        body: JSON.stringify(lead),
      });
      return true;
    } catch (e) {
      console.warn("Webhook post failed", e);
      return false;
    }
  }

  static getWebhookUrl(): string | null {
    try {
      return localStorage.getItem("rs_google_sheet_webhook_v1");
    } catch (e) {
      return null;
    }
  }

  static setWebhookUrl(url: string) {
    try {
      if (url.trim()) {
        localStorage.setItem("rs_google_sheet_webhook_v1", url.trim());
      } else {
        localStorage.removeItem("rs_google_sheet_webhook_v1");
      }
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Export all locally captured leads directly as an Excel CSV file download
   */
  static downloadLeadsCSV() {
    const leads = this.getLocalLeads();
    if (leads.length === 0) {
      alert("No form submissions recorded yet.");
      return;
    }

    const headers = [
      "Submission Date",
      "Student Name",
      "Phone Number",
      "Email",
      "City",
      "Destination",
      "Degree Level",
      "Intake",
      "IELTS Status",
      "Academic Background",
      "Message",
    ];

    const csvRows = [
      headers.map((h) => `"${h}"`).join(","),
      ...leads.map((lead) =>
        [
          `"${lead.submittedAt || ""}"`,
          `"${(lead.fullName || "").replace(/"/g, '""')}"`,
          `"${(lead.phone || "").replace(/"/g, '""')}"`,
          `"${(lead.email || "").replace(/"/g, '""')}"`,
          `"${(lead.city || "").replace(/"/g, '""')}"`,
          `"${(lead.destination || "").replace(/"/g, '""')}"`,
          `"${(lead.studyLevel || "").replace(/"/g, '""')}"`,
          `"${(lead.targetIntake || "").replace(/"/g, '""')}"`,
          `"${(lead.ieltsStatus || "").replace(/"/g, '""')}"`,
          `"${(lead.academicBackground || "").replace(/"/g, '""')}"`,
          `"${(lead.message || "").replace(/"/g, '""')}"`,
        ].join(","),
      ),
    ];

    const csvString = "\uFEFF" + csvRows.join("\r\n"); // BOM for Excel utf-8
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `RS_Consultants_Student_Leads_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Auto init
GoogleIntegrationService.init();
