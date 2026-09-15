// Google Sheet Integration
// RS Higher Education Consultants

export interface StudentLeadPayload {
  applicationId?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  destination: string;
  currentAddress?: string;
  permanentAddress?: string;
  preferredCourse?: string;
  studyLevel: string;
  targetIntake?: string;
  ieltsStatus?: string;
  academicBackground?: string;
  academicRows?: {
    degree?: string;
    year?: string;
    grade?: string;
    institute?: string;
  }[];
  hearAboutUs?: string;
  message?: string;
  submittedAt?: string;
  pdfBase64?: string;
  pdfFileName?: string;
}

export const TARGET_BUSINESS_EMAIL = "rshighereducation@gmail.com";

export const USER_LINKED_SPREADSHEET_ID =
  "1uOnlfKowJLKBwQweL1NcGtzAYtjnzTuzQrE8FtiKBYg";

export const USER_LINKED_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${USER_LINKED_SPREADSHEET_ID}/edit`;

// Google Apps Script URL
const GOOGLE_SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbxGVmgsXHCis_RZJgNYpe0b6Gz3ZONtzErhjZsHYDpf7EsKt45BeRdM9DrfnmbXQiNe/exec";

export class GoogleIntegrationService {
  /**
   * Save lead locally
   */
  static saveLeadLocally(lead: StudentLeadPayload) {
    try {
      const key = "rs_all_student_leads_v1";

      const existing = this.getLocalLeads();

      const newLead = {
        ...lead,
        id: `RS-${Date.now()}`,
        submittedAt: lead.submittedAt || new Date().toLocaleString(),
      };

      existing.unshift(newLead);

      localStorage.setItem(key, JSON.stringify(existing.slice(0, 500)));
    } catch (error) {
      console.warn("Could not save lead locally:", error);
    }
  }

  /**
   * Get locally saved leads
   */
  static getLocalLeads(): any[] {
    try {
      const data = localStorage.getItem("rs_all_student_leads_v1");

      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Send student form data to Google Sheet
   */
  static async sendToWebhook(lead: StudentLeadPayload): Promise<boolean> {
    if (!GOOGLE_SHEET_API_URL) {
      console.warn("Google Sheet URL is not configured.");
      return false;
    }

    const payload = {
      reference: lead.applicationId || "",
      name: lead.fullName || "",
      mobileNumber: lead.phone || "",
      email: lead.email || "",
      address: lead.currentAddress || lead.permanentAddress || "",
      city: lead.city || "",
      destination: lead.destination || "",
      course: lead.preferredCourse || "",
      intake: lead.targetIntake || "",
      englishTest: lead.ieltsStatus || "",
      degree: lead.academicRows?.[0]?.degree || lead.studyLevel || "",
      message: lead.message || "",
      hearAboutUs: lead.hearAboutUs || "",
      date: lead.submittedAt || new Date().toLocaleDateString("en-GB"),
    };

    try {
      await fetch(GOOGLE_SHEET_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      return true;
    } catch (error) {
      console.error("Google Sheet submission failed:", error);

      return false;
    }
  }

  /**
   * Compatibility method
   */
  static getAccessToken(): string | null {
    return null;
  }

  /**
   * Compatibility method
   */
  static async appendToGoogleSheet(
    _token: string,
    lead: StudentLeadPayload,
  ): Promise<string> {
    await this.sendToWebhook(lead);

    return USER_LINKED_SPREADSHEET_URL;
  }

  /**
   * Compatibility method
   */
  static async sendNotificationEmail(
    _token: string,
    _lead: StudentLeadPayload,
    _recipient: string = TARGET_BUSINESS_EMAIL,
  ): Promise<boolean> {
    return false;
  }

  /**
   * Compatibility method
   */
  static async uploadPdfToDrive(
    _token: string,
    _pdfBlob: Blob,
    _studentName: string,
  ): Promise<string | null> {
    return null;
  }

  static init() {
    // No Google login required.
  }

  static isConnected(): boolean {
    return false;
  }

  static getCurrentUser(): null {
    return null;
  }

  static async disconnect() {
    // No Google account connection required.
  }

  static async requestGoogleAuth(_loginHint?: string): Promise<string> {
    throw new Error(
      "Google OAuth is not required for Google Sheet submission.",
    );
  }

  static getWebhookUrl(): string {
    return GOOGLE_SHEET_API_URL;
  }

  static setWebhookUrl(_url: string) {
    // URL is configured directly in this file.
  }

  /**
   * Export local leads as CSV
   */
  static downloadLeadsCSV() {
    const leads = this.getLocalLeads();

    if (leads.length === 0) {
      alert("No form submissions recorded yet.");
      return;
    }

    const headers = [
      "Date",
      "Name",
      "Mobile Number",
      "Email",
      "Address",
      "City",
      "Destination",
      "Course",
      "Intake",
      "English Test",
      "Degree",
      "Message",
      "Reference",
    ];

    const csvRows = [
      headers.map((h) => `"${h}"`).join(","),

      ...leads.map((lead) =>
        [
          lead.applicationId || "",
          lead.submittedAt || "",
          lead.fullName || "",
          lead.phone || "",
          lead.email || "",
          lead.currentAddress || "",
          lead.city || "",
          lead.destination || "",
          lead.preferredCourse || "",
          lead.targetIntake || "",
          lead.ieltsStatus || "",
          lead.academicRows?.[0]?.degree || lead.studyLevel || "",
          lead.message || "",
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ];

    const csvString = "\uFEFF" + csvRows.join("\r\n");

    const blob = new Blob([csvString], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `RS_Consultants_Student_Leads_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
}

GoogleIntegrationService.init();
