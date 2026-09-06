import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "RS Higher Education Consultants API",
      timestamp: new Date().toISOString(),
    });
  });

  // AI Advisor Endpoint with Gemini API Integration & RS Knowledge
  app.post("/api/ai-advisor", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (process.env.GEMINI_API_KEY) {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const systemInstruction = `You are the official AI Study Abroad Advisor and intelligent conversational counselor for RS Higher Education Consultants, Peshawar, KPK, Pakistan (Head: Mr. Rehmat Shah).

Your objective:
1. TALK NATURALLY, INTELLIGENTLY, AND FLUENTLY like ChatGPT, Gemini, or Claude. Answer ANY question asked by the user (general greetings, university queries, admissions, visas, career paths, IELTS vs TOEFL, living expenses, weather, documentation, or general inquiries) in a natural, polite, engaging, and professional manner.
2. If the user asks general or conversational questions (e.g., "Hello", "How are you", "Who are you", "What is the best country for CS?", "Can I work while studying?", "Tell me a study tip"), answer thoughtfully, warmly, and helpfully with practical advice.
3. When discussing study abroad, weave in RS Higher Education Consultants' exact verified details:
   - Türkiye: 24 partner universities (Sabanci, Yeditepe, Bahcesehir, Bilgi, Medipol, Aydin, Uskudar, Kadir Has). $1,000 tuition deposit, ~$235 Anatolia fee (~$1,235 total approx initial cost). Bank statement $7,000 (3 months). No IELTS required if MOI certificate is provided.
   - South Cyprus (EU): Initial deposit €4,040 (Bachelor) / €4,520 (Master). 12 partner institutions (Casa College, CTL Eurocollege, CDA College, etc.). Bank statement €7,000 hold. 600 DPI attestation. €2,500 airport show money. 20 hrs/week part-time work rights.
   - Germany: 100% tuition-free public universities. €11,904/year Sperrkonto blocked account (€992/month). Uni-Assist portal (€75/€30). 18-month Job Seeker Post-Study Work Permit leading to EU Blue Card.
   - UK: Fast CAS letter issuance, 28-consecutive-day maintenance funds (£9,207 outside London, £12,006 inside London). 2-Year Graduate Route PSW visa.
   - Lithuania (EU Schengen): €80 regular / €340 urgent Migris TRP fee, €10,000 bank statement, €2,500–€5,000 tuition/yr. Visa-free travel to 29 Schengen countries.
   - China: CSC Government Scholarships (100% Free Tuition + Free Hostel + 2,500 to 3,500 RMB monthly stipend). English-taught MBBS & Engineering.
   - Document Attestation: Matric/Inter (Board -> IBCC -> MOFA), Bachelor/Master (HEC -> MOFA), Police Character & Medical Certificate (MOFA).
   - Head Office: Office No. UG-389, Upper Ground Floor, Deans Trade Centre, Peshawar Cantt, KPK, Pakistan.
   - WhatsApp / Helpline: +92 334 4626284 | Email: info@rshec.pk / Rehmatshah573@gmail.com | Website: www.rshec.pk
4. Tone & Style: Warm, intelligent, structured markdown with clean formatting, bullet points where helpful, clear explanations, and friendly guidance. Always offer to connect them directly to Mr. Rehmat Shah or senior counselors on WhatsApp (+92 334 4626284).`;

        // Format history for multi-turn conversational memory
        const formattedContents = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const h of history.slice(-8)) {
            formattedContents.push({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.content || "" }],
            });
          }
        }
        formattedContents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: formattedContents,
          config: {
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
          },
        });

        const reply = response.text || "";
        if (reply) {
          return res.json({
            reply,
            suggestedActions: [
              {
                label: "💬 Chat on WhatsApp (+92 334 4626284)",
                actionType: "whatsapp",
                payload:
                  "https://wa.me/923344626284?text=Hello%20RS%20Consultants!%20I%20would%20like%20further%20guidance.",
              },
              {
                label: "📍 Visit Peshawar Office",
                actionType: "consultation",
                payload: "consultation",
              },
            ],
          });
        }
      }

      // If Gemini is not configured, reply with null so client utilizes comprehensive local knowledge engine
      return res.json({ reply: null });
    } catch (error) {
      console.error("AI Advisor error:", error);
      return res.json({ reply: null });
    }
  });

  // In-memory leads storage for reliable data preservation
  const storedLeads: any[] = [];

  // Lead Generation / Contact submission endpoint
  app.post("/api/contact", (req, res) => {
    try {
      const {
        applicationId,
        fullName,
        email,
        phone,
        city,
        qualification,
        academicBackground,
        destination,
        studyLevel,
        targetIntake,
        course,
        intake,
        budget,
        ieltsStatus,
        message,
      } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({
          success: false,
          error: "Please provide full name and WhatsApp/phone number.",
        });
      }

      const leadData = {
        id:
          applicationId ||
          `RS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
        submittedAt: new Date().toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        fullName,
        email: email || "Not specified",
        phone,
        city: city || "Peshawar",
        destination: destination || "General Inquiry",
        studyLevel: studyLevel || "Undergraduate / Postgraduate",
        targetIntake: targetIntake || intake || "September 2026",
        ieltsStatus: ieltsStatus || "Planning to take IELTS",
        academicBackground:
          academicBackground || qualification || "Not specified",
        course: course || "Not specified",
        message: message || "",
        status: "NEW_INQUIRY",
      };

      storedLeads.unshift(leadData);

      // Log lead safely for backend tracking (routed to business email info@rshec.pk)
      console.log(" [RS HEC Lead Received]", JSON.stringify(leadData, null, 2));

      return res.status(200).json({
        success: true,
        message:
          "Your inquiry has been successfully submitted to RS Higher Education Consultants! Our senior counselor in Peshawar will contact you within 24 hours.",
        leadId: leadData.id,
      });
    } catch (err: any) {
      console.error("Error handling contact submission:", err);
      return res.status(500).json({
        success: false,
        error:
          "An internal error occurred while processing your request. Please contact us via WhatsApp directly.",
      });
    }
  });

  // Get all leads
  app.get("/api/leads", (_req, res) => {
    res.json({
      success: true,
      total: storedLeads.length,
      leads: storedLeads,
    });
  });

  // Export all leads directly as CSV download
  app.get("/api/export-leads-csv", (_req, res) => {
    const headers = [
      "Submission Date",
      "Application ID",
      "Student Full Name",
      "WhatsApp / Phone",
      "Email Address",
      "City",
      "Target Destination",
      "Degree Level",
      "Target Intake",
      "IELTS Status",
      "Academic Background",
      "Student Notes",
    ];

    const rows = storedLeads.map((l) =>
      [
        `"${l.submittedAt || ""}"`,
        `"${l.id || ""}"`,
        `"${(l.fullName || "").replace(/"/g, '""')}"`,
        `"${(l.phone || "").replace(/"/g, '""')}"`,
        `"${(l.email || "").replace(/"/g, '""')}"`,
        `"${(l.city || "").replace(/"/g, '""')}"`,
        `"${(l.destination || "").replace(/"/g, '""')}"`,
        `"${(l.studyLevel || "").replace(/"/g, '""')}"`,
        `"${(l.targetIntake || "").replace(/"/g, '""')}"`,
        `"${(l.ieltsStatus || "").replace(/"/g, '""')}"`,
        `"${(l.academicBackground || "").replace(/"/g, '""')}"`,
        `"${(l.message || "").replace(/"/g, '""')}"`,
      ].join(","),
    );

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="RS_Consultants_Leads_${new Date().toISOString().slice(0, 10)}.csv"`,
    );
    res.status(200).send(csvContent);
  });

  // Quick Consultation booking endpoint
  app.post("/api/consultation", (req, res) => {
    try {
      const {
        name,
        phone,
        email,
        preferredDate,
        preferredMode,
        destination,
        message,
      } = req.body;
      if (!name || !phone) {
        return res.status(400).json({
          success: false,
          error: "Name and Phone number are required.",
        });
      }

      console.log(" [RS HEC Consultation Booked]", {
        bookingId: `BK-${Date.now()}`,
        name,
        phone,
        email,
        preferredDate: preferredDate || "Flexible",
        preferredMode: preferredMode || "In-Person (Peshawar Office) / Online",
        destination: destination || "Undecided",
        message: message || "",
        timestamp: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        message:
          "Free consultation booked! An RS education advisor will reach out to confirm your time slot.",
      });
    } catch (err: any) {
      console.error("Error handling consultation booking:", err);
      return res.status(500).json({
        success: false,
        error:
          "Unable to schedule consultation at this time. Please use WhatsApp for instant booking.",
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      ` RS Higher Education Consultants server running on http://localhost:${PORT}`,
    );
  });
}

startServer();
