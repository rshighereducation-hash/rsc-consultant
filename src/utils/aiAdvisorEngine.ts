import { BUSINESS_INFO } from '../data/businessInfo';
import { ALL_DESTINATIONS } from '../data/destinationsData';
import { SERVICES_DATA } from '../data/servicesData';
import { FAQ_DATA } from '../data/faqData';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
  timestamp: string;
  suggestedActions?: Array<{
    label: string;
    actionType: 'query' | 'whatsapp' | 'consultation' | 'destination' | 'pdf';
    payload: string;
  }>;
}

export const INITIAL_GREETING: ChatMessage = {
  id: 'msg-init-1',
  sender: 'ai',
  text: `Assalam-o-Alaikum! 🎓 I am your **AI Study Abroad Advisor** from RS Higher Education Consultants.

I can talk with you about anything you'd like to know:
• **University admissions, intakes, and tuition fees** across 16+ countries (Turkey, Cyprus, Germany, UK, Lithuania, China, etc.)
• **Visa requirements, bank statements & blocked accounts**
• **Document attestation** (BISE Board, IBCC, HEC, MOFA)
• **Career advice, study tips, or comparisons between countries**

How can I help you today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedActions: [
    { label: '🇹🇷 Study in Turkey ($1,235 Total)', actionType: 'query', payload: 'Tell me about studying in Turkey, initial deposit, partner universities, and visa requirements.' },
    { label: '🇨🇾 South Cyprus (€4,040 Deposit)', actionType: 'query', payload: 'What are the admission requirements, initial tuition deposit, and bank statement for Cyprus?' },
    { label: '🇩🇪 Germany Free Tuition & Blocked Account', actionType: 'query', payload: 'How can I apply for tuition-free public universities in Germany and the Sperrkonto blocked account?' },
    { label: '🇬🇧 UK CAS & 28-Day Bank Statement', actionType: 'query', payload: 'What are the UK student visa requirements, CAS letter, and bank maintenance rules?' },
    { label: '📄 Document Attestation (IBCC/HEC/MOFA)', actionType: 'query', payload: 'What is the step-by-step educational document attestation procedure for Pakistani students?' },
    { label: '📞 Talk to Senior Counselor (WhatsApp)', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hello%20RS%20Consultants!%20I%20am%20chatting%20with%20your%20AI%20Advisor%20and%20would%20like%20to%20speak%20with%20a%20senior%20counselor.' },
  ],
};

/**
 * Enhanced Intelligent Local Fallback Engine
 * Provides natural conversational dialogue, answers general and study queries,
 * and maintains context like modern AI assistants.
 */
export function generateLocalAdvisorResponse(userQuery: string): {
  text: string;
  suggestedActions?: Array<{
    label: string;
    actionType: 'query' | 'whatsapp' | 'consultation' | 'destination' | 'pdf';
    payload: string;
  }>;
} {
  const query = userQuery.toLowerCase().trim();

  // 1. General Greetings & Casual Conversational Questions
  if (/^(hi|hello|hey|salam|assalam|a\.o\.a|aoa|hy|hola|greetings)\b/i.test(query)) {
    return {
      text: `Walaikum Assalam and hello! It's a pleasure to connect with you. 

I am here to assist you with anything you need—whether you have questions about studying abroad, want recommendations based on your educational background and budget, or need step-by-step guidance on visas and documentation.

What would you like to explore today?`,
      suggestedActions: [
        { label: '🇹🇷 Explore Turkey', actionType: 'query', payload: 'Tell me about Turkey admission requirements and cost.' },
        { label: '🇩🇪 Explore Germany (Free Tuition)', actionType: 'query', payload: 'How can I study in Germany for free?' },
        { label: '🇨🇾 Explore South Cyprus', actionType: 'query', payload: 'Tell me about Cyprus admission requirements and initial deposit.' },
        { label: '🇬🇧 Explore United Kingdom', actionType: 'query', payload: 'What are the UK visa and CAS requirements?' },
      ],
    };
  }

  // 2. Who are you / Identity
  if (query.includes('who are you') || query.includes('what are you') || query.includes('your name') || query.includes('about yourself')) {
    return {
      text: `I am the official **AI Study Abroad Advisor** for **RS Higher Education Consultants**, built to provide you with instant, accurate, and transparent guidance on international education.

Our head office is located at **UG-389, Deans Trade Centre, Peshawar Cantt**, led by our CEO **Mr. Rehmat Shah**. We represent top universities and colleges across 16+ countries including Turkey, Germany, Cyprus, UK, Lithuania, China, and more.

Feel free to ask me any question about admissions, entry requirements, fees, visa rules, or document attestations!`,
      suggestedActions: [
        { label: '📍 Visit Peshawar Office', actionType: 'consultation', payload: 'consultation' },
        { label: '💬 Chat with Senior Counselor', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hello%20RS%20Consultants!%20I%20would%20like%20to%20connect%20with%20a%20counselor.' },
      ],
    };
  }

  // 3. How are you / Pleasantries
  if (query.includes('how are you') || query.includes('how r u') || query.includes('how do you do') || query.includes('whats up') || query.includes("what's up")) {
    return {
      text: `I'm doing great, thank you for asking! 😊 I'm ready and excited to help you plan your educational journey.

Are you looking to apply for an upcoming intake (Fall / Spring), or do you have a specific country or degree in mind?`,
      suggestedActions: [
        { label: '🎓 Bachelor Degree Options', actionType: 'query', payload: 'What are the best countries and requirements for Bachelor programs?' },
        { label: '🎯 Master Degree Options', actionType: 'query', payload: 'What are the best countries for Master degrees with good post-study work visas?' },
      ],
    };
  }

  // 4. Turkey / Türkiye Inquiries
  if (
    query.includes('turkey') ||
    query.includes('turkiye') ||
    query.includes('türkiye') ||
    query.includes('istanbul') ||
    query.includes('sabanci') ||
    query.includes('anatolia')
  ) {
    return {
      text: `### 🇹🇷 Study in Türkiye (Official 2026 Guidelines for Pakistani Students)

RS Higher Education Consultants represents **24 leading Turkish partner universities** (e.g., *Sabancı University, Yeditepe, Bahçeşehir, Bilgi, Medipol, Aydın, Üsküdar, Kadir Has*).

#### 📌 Financial Summary & Initial Investment:
• **Initial Tuition Deposit:** **$1,000** (Directly credited to your 1st-year university tuition to issue the unconditional Acceptance Letter).
• **Anatolia Visa Fee:** **~$235** (Embassy application & biometric processing).
• **Estimated Total Initial Cost:** **~$1,235**.

#### 📋 Key Requirements for Admission & Visa:
1. **Academic Transcripts:** Matric & Inter DMC/Certificates (Attested via Board ➔ IBCC ➔ MOFA) / Bachelor Degree & Transcripts (Attested via HEC ➔ MOFA).
2. **Financial Proof:** Bank statement of minimum **$7,000** maintained for 3 months with Account Maintenance Certificate.
3. **NADRA FRC:** Family Registration Certificate (By Birth).
4. **No IELTS Mandatory:** Many partner universities accept English as Medium of Instruction (MOI) certificates.
5. **Interview Preparation:** 18 standard embassy questions (Why Turkey, Sponsor occupation, ties to home country).

*Would you like to download our official **Turkey Admission & Visa Checklist (PDF)** or speak directly with our counselor on WhatsApp?*`,
      suggestedActions: [
        { label: '📥 Turkey checklist (PDF)', actionType: 'pdf', payload: 'turkey-checklist' },
        { label: '📝 Turkey Questioner (PDF)', actionType: 'pdf', payload: 'turkey-interview' },
        { label: '💬 Apply on WhatsApp (+92 334 4626284)', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hi%20RS%20Consultants!%20I%20want%20to%20apply%20for%20Turkey%20partner%20universities.' },
      ],
    };
  }

  // 5. Cyprus Inquiries
  if (
    query.includes('cyprus') ||
    query.includes('south cyprus') ||
    query.includes('nicosia') ||
    query.includes('limassol') ||
    query.includes('larnaca')
  ) {
    return {
      text: `### 🇨🇾 Study in Republic of Cyprus (EU European Union)

South Cyprus is an EU member state offering high-quality European degrees, affordable initial deposits, and part-time student work rights (20 hrs/week).

#### 📌 Financial Breakdown:
• **Bachelor Initial Deposit:** **€4,040** (Includes 1st year tuition installment + immigration entry clearance).
• **Master Initial Deposit:** **€4,520**.
• **Bank Statement:** **€7,000** (Maintained during visa processing).
• **Airport Show Money:** **€2,500** cash or international card upon arrival.

#### 📋 Partner Institutions & Attestation:
• We partner with **12 accredited colleges & universities** in Nicosia, Limassol, Larnaca, and Paphos (Casa College, CTL Eurocollege, CDA College, American College, etc.).
• **Document Attestation:** Color scans at 600 DPI. IBCC ➔ HEC ➔ MOFA ➔ Police Character Certificate & Medical Fitness (MOFA attested) ➔ Cyprus Ministry of Foreign Affairs attestation.

*Would you like to download the **Cyprus Official Checklist PDF** or apply today?*`,
      suggestedActions: [
        { label: '📥 Download Cyprus Checklist (PDF)', actionType: 'pdf', payload: 'cyprus-checklist' },
        { label: '🏛️ See 12 Cyprus Partner Colleges', actionType: 'query', payload: 'List all partner colleges in South Cyprus.' },
        { label: '💬 Chat with Cyprus Specialist', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hello!%20I%20want%20information%20on%20South%20Cyprus%20admission%20and%20initial%20deposit.' },
      ],
    };
  }

  // 6. Germany Inquiries
  if (
    query.includes('germany') ||
    query.includes('deutschland') ||
    query.includes('sperrkonto') ||
    query.includes('blocked account') ||
    query.includes('uni-assist') ||
    query.includes('aps')
  ) {
    return {
      text: `### 🇩🇪 Study in Germany (Tuition-Free Public Universities)

Germany is the top European destination for world-class engineering, IT, and business programs with **zero tuition fees** at public universities!

#### 📌 Key Facts & Financials:
• **Tuition Fee:** **€0 / Year** at public universities (Only a semester contribution of €150–€350 for free regional public transport).
• **Sperrkonto (Blocked Account):** **€11,904 / Year** (€992/month living allowance deposited into Expatrio, Coracle, or Fintiba).
• **Application Portal:** Uni-Assist (€75 for first university, €30 for each additional).
• **Work Rights:** 120 full days / 240 half days per year (20 hrs/week during semesters).
• **Post-Study Visa:** 18-month Job Seeker Residence Permit leading to EU Blue Card.

#### 📋 Minimum Requirements:
• Bachelor: 13 years of education (FSc + 1 year university / Studienkolleg) or 70%+ for direct entry.
• Master: 16 years bachelor degree (min 2.7–3.0 CGPA).
• Language: IELTS 6.5 (for English-taught) or German B1/B2 (for German-taught).

*We provide complete APS assistance, Uni-Assist application filing, blocked account setup, and German Embassy appointment prep.*`,
      suggestedActions: [
        { label: '📥 Download Germany Checklist (PDF)', actionType: 'pdf', payload: 'germany-checklist' },
        { label: '🏛️ Search German English Programs', actionType: 'query', payload: 'What English-taught master programs are available in Germany?' },
        { label: '💬 Book German Visa Guidance', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Assalam-o-Alaikum%20RS%20Consultants!%20I%20need%20help%20with%20Germany%20public%20university%20admission.' },
      ],
    };
  }

  // 7. UK Inquiries
  if (
    query.includes('uk') ||
    query.includes('united kingdom') ||
    query.includes('london') ||
    query.includes('cas') ||
    query.includes('ihs') ||
    query.includes('graduate route') ||
    query.includes('psw')
  ) {
    return {
      text: `### 🇬🇧 Study in the United Kingdom (World-Class Education)

The UK offers prestigious 3-year Bachelor and 1-year Master degrees with a **2-year Graduate Route Post-Study Work Visa (PSW)**!

#### 📌 Key Requirements & Process:
1. **CAS (Confirmation of Acceptance for Studies):** Issued by the university upon academic unconditional offer & initial tuition deposit (£3,000–£5,000).
2. **Maintenance Funds (Bank Statement):**
   • **Inside London:** £1,334 / month (up to 9 months = £12,006) + remaining tuition.
   • **Outside London:** £1,023 / month (up to 9 months = £9,207) + remaining tuition.
   • **Strict 28-Day Rule:** Funds must be maintained for at least 28 consecutive days before visa application.
3. **Language:** IELTS Academic / IELTS UKVI (typically 6.0–6.5) or PTE Academic. Many universities accept MOI / high English marks in Intermediate.
4. **Health Surcharge (IHS):** £776/year for UK National Health Service access.

*RS Higher Education provides priority CAS processing and UK Student Route visa documentation.*`,
      suggestedActions: [
        { label: '📥 Download UK Checklist (PDF)', actionType: 'pdf', payload: 'uk-checklist' },
        { label: '🏛️ Universities with No IELTS / Low Deposit', actionType: 'query', payload: 'Which UK universities accept students with low initial deposits or MOI?' },
        { label: '💬 Talk to UK Admissions Team', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hello!%20I%20am%20interested%20in%20UK%20September%20or%20January%20intake.' },
      ],
    };
  }

  // 8. Lithuania Inquiries
  if (
    query.includes('lithuania') ||
    query.includes('vilnius') ||
    query.includes('kaunas') ||
    query.includes('migris') ||
    query.includes('trp')
  ) {
    return {
      text: `### 🇱🇹 Study in Lithuania (European Union & Schengen Zone)

Lithuania offers affordable European degrees, modern campuses, and a direct pathway to an **EU Schengen Temporary Residence Permit (TRP)**.

#### 📌 Financials & Visa Highlights:
• **Tuition Fees:** **€2,500 – €5,000 / year** (Highly affordable for EU).
• **Bank Statement:** Minimum **€10,000** in student or sponsor's account.
• **Migris TRP Application Fee:** **€80** (Regular 2-month processing) / **€340** (Urgent 1-month processing).
• **Work Rights:** 20 hours/week during studies; full-time during vacations.
• **Travel Privilege:** Visa-free travel across all 29 Schengen European countries.

*Document attestation: Matric/Inter via IBCC & MOFA, Bachelor/Master via HEC & MOFA, plus Police Character Certificate.*`,
      suggestedActions: [
        { label: '📥 Download Lithuania Checklist (PDF)', actionType: 'pdf', payload: 'lithuania-checklist' },
        { label: '💬 Consult on Lithuania Intake', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hi%20RS%20Consultants!%20I%20want%20to%20apply%20for%20Lithuania%20Schengen%20TRP.' },
      ],
    };
  }

  // 9. China Inquiries
  if (
    query.includes('china') ||
    query.includes('csc') ||
    query.includes('chinese') ||
    query.includes('mbbs in china') ||
    query.includes('provincial scholarship')
  ) {
    return {
      text: `### 🇨🇳 Study in China (Full CSC & Provincial Scholarships)

China is the premier global hub for **MBBS, Computer Science, AI, and Engineering** with generous government scholarships!

#### 📌 Scholarship Opportunities:
• **Chinese Government Scholarship (CSC / Type A & B):** 100% Free Tuition + Free University Accommodation + Monthly Living Stipend (**2,500 RMB** for Bachelor / **3,000 RMB** for Master / **3,500 RMB** for PhD).
• **Provincial & University Scholarships:** Partial to 100% tuition fee waivers.
• **English Medium MBBS:** PMDC / WHO approved medical universities with worldwide recognition.
• **No IELTS Required:** Most Chinese universities accept English Proficiency Certificates (MOI) issued by your college/university.

*Contact us at our Peshawar office for early seat booking and CSC portal registration!*`,
      suggestedActions: [
        { label: '🏥 MBBS in China Requirements', actionType: 'query', payload: 'What are the requirements for MBBS in China with English medium?' },
        { label: '💬 Check China Scholarship Eligibility', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Assalam-o-Alaikum!%20I%20want%20to%20apply%20for%20China%20CSC%20or%20Provincial%20scholarship.' },
      ],
    };
  }

  // 10. Attestation Questions (IBCC, HEC, MOFA)
  if (
    query.includes('attestation') ||
    query.includes('ibcc') ||
    query.includes('hec') ||
    query.includes('mofa') ||
    query.includes('apostille') ||
    query.includes('verification')
  ) {
    return {
      text: `### 📄 Complete Document Attestation Procedure for Pakistani Students

RS Higher Education Consultants guides you step-by-step through official Pakistani government attestation:

#### 1. Matric (10th) & Intermediate (12th / FSc / ICS / ICom):
1. **BISE Board Verification:** Get your DMC and Original Certificate verified in sealed envelopes from your respective educational board (BISE Peshawar, Mardan, Swat, Abbottabad, FBISE, etc.).
2. **IBCC Attestation:** Submit the verified board documents to the Inter Board Coordination Commission (IBCC) for QR-code attestation.
3. **MOFA Attestation:** Ministry of Foreign Affairs (MOFA) attests the IBCC-verified documents.

#### 2. Bachelor & Master Degrees:
1. **University Verification:** Transcripts and original degree checked.
2. **HEC Attestation:** Higher Education Commission online appointment and stamp with security ticket.
3. **MOFA Attestation:** Final verification by Ministry of Foreign Affairs.

#### 3. Supporting Documents:
• **Police Character Certificate:** Issued by Police Khidmat Markaz and attested by MOFA.
• **Medical Fitness Certificate:** From approved lab / government hospital and attested by MOFA.
• **NADRA FRC:** Family Registration Certificate (By Birth).

*We provide document scrutiny at our Peshawar office to prevent any embassy objection!*`,
      suggestedActions: [
        { label: '📍 Visit Office in Peshawar', actionType: 'consultation', payload: 'Office UG-389 Deans Trade Centre Peshawar' },
        { label: '💬 WhatsApp Document Review', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hi!%20Can%20you%20review%20my%20documents%20for%20IBCC%20and%20MOFA%20attestation?' },
      ],
    };
  }

  // 11. Contact & Office Location
  if (
    query.includes('office') ||
    query.includes('address') ||
    query.includes('location') ||
    query.includes('contact') ||
    query.includes('phone') ||
    query.includes('whatsapp') ||
    query.includes('peshawar') ||
    query.includes('deans') ||
    query.includes('timing')
  ) {
    return {
      text: `### 📍 RS Higher Education Consultants — Contact & Office Details

You are always welcome to visit our head office or reach us directly:

• 🏢 **Office Address:** Office No. **UG-389, Upper Ground Floor, Deans Trade Centre**, Peshawar Cantt, KPK, Pakistan.
• 📞 **Direct Phone / WhatsApp:** **+92 334 4626284**
• ✉️ **Official Email:** **info@rshec.pk**
• 🌐 **Official Website:** **www.rshec.pk**
• ⏰ **Office Timings:** Monday – Saturday | 9:00 AM – 6:00 PM (PKT)

*Our CEO Mr. Rehmat Shah and senior education counselors offer 100% free one-on-one profile assessments in person or online.*`,
      suggestedActions: [
        { label: '📞 Chat on WhatsApp (+92 334 4626284)', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hello%20RS%20Consultants!%20I%20would%20like%20to%20visit%20your%20Peshawar%20office%20for%20counseling.' },
        { label: '📅 Book Free In-Person Session', actionType: 'consultation', payload: 'consultation' },
      ],
    };
  }

  // 12. Cost / Budget Inquiries
  if (
    query.includes('cost') ||
    query.includes('fee') ||
    query.includes('cheap') ||
    query.includes('affordable') ||
    query.includes('budget') ||
    query.includes('low cost')
  ) {
    return {
      text: `### 💰 Most Affordable Study Abroad Destinations for Pakistani Students

Depending on your budget, here are our recommended pathways:

1. **Tuition-Free Option: Germany 🇩🇪**
   • Tuition: **€0 (Free)**
   • Initial cost: Blocked Account (€11,904 for your own living expenses) + Uni-assist fee.
2. **Lowest Initial Deposit: Turkey 🇹🇷**
   • Initial Deposit: **$1,000**
   • Visa Fee: **~$235**
   • Total initial budget: **~$1,235** (Tuition ~ $2,000–$4,500/year).
3. **Affordable European EU Degree: South Cyprus 🇨🇾**
   • Initial Tuition Deposit: **€4,040 (Bachelor) / €4,520 (Master)**.
   • Includes immigration approval and partial semester fee.
4. **Schengen Residency: Lithuania 🇱🇹**
   • Tuition: **€2,500 – €5,000 / year**.
   • TRP Fee: €80 / €340.
5. **Full Scholarships: China 🇨🇳**
   • 100% Free Tuition + Free Accommodation + Monthly Stipend (CSC Scholarship).

*What is your estimated budget and qualification? We will match the perfect destination for you.*`,
      suggestedActions: [
        { label: '🇹🇷 Explore Turkey ($1,235 Total)', actionType: 'query', payload: 'Tell me more about Turkey partner universities.' },
        { label: '🇨🇾 Explore Cyprus (€4,040 Deposit)', actionType: 'query', payload: 'Tell me more about Cyprus initial deposit.' },
        { label: '💬 Send My Profile for Free Evaluation', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hello%20RS%20Consultants!%20I%20would%20like%20a%20free%20budget%20and%20country%20evaluation.' },
      ],
    };
  }

  // 13. Services provided by RS
  if (
    query.includes('service') ||
    query.includes('what do you do') ||
    query.includes('process') ||
    query.includes('help')
  ) {
    return {
      text: `### 🌟 Full-Spectrum Study Abroad Services at RS Higher Education

We manage your journey end-to-end with high transparency and zero hidden terms:

1. **Free Profile Assessment & Course Selection** (Matching your grades, budget, and career goals).
2. **University Admission & Offer Letter Filing** (Direct liaison with admissions committees).
3. **Document Attestation Assistance** (IBCC, HEC, MOFA, Police, Medical).
4. **Statement of Purpose (SOP) & Academic CV Writing** (Tailored for high visa approval).
5. **Financial & Bank Statement Auditing** (Ensuring compliance with embassy rules).
6. **Embassy / Anatolia / VFS Appointment Booking & Visa File Prep**.
7. **One-on-One Mock Visa Interview Coaching** (Rigorous practice with actual consular questions).
8. **Pre-Departure Briefing, Student Housing & Airport Pickup**.

*Contact us today to start your application!*`,
      suggestedActions: [
        { label: '📅 Book Free Appointment', actionType: 'consultation', payload: 'consultation' },
        { label: '📞 Chat on WhatsApp (+92 334 4626284)', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Assalam-o-Alaikum%20RS%20Consultants!%20I%20want%20to%20start%20my%20admission%20process.' },
      ],
    };
  }

  // 14. Natural Conversational Generic Fallback (Talks properly like modern conversational AI)
  return {
    text: `That's a great question! 

To give you the most accurate advice, could you share a bit more about your background? For example:
• What is your **highest qualification** (Matric, Inter/FSc, Bachelor, or Master)?
• What **field of study** are you interested in (e.g., Computer Science, Engineering, Business, Medicine)?
• Do you have a preferred **destination** (e.g., Turkey, Cyprus, Germany, UK, Lithuania, China) or a specific **budget**?

I can provide personalized recommendations on eligibility, tuition fees, scholarships, bank statement requirements, and visa approval strategies.

You can also speak directly with our senior counseling team at our Peshawar office or on WhatsApp at **+92 334 4626284**.`,
    suggestedActions: [
      { label: '🇹🇷 Study in Turkey Details', actionType: 'query', payload: 'Tell me about Turkey admission requirements and cost.' },
      { label: '🇨🇾 South Cyprus Details', actionType: 'query', payload: 'Tell me about Cyprus admission requirements and initial deposit.' },
      { label: '🇩🇪 Germany Free Tuition', actionType: 'query', payload: 'How can I study in Germany for free?' },
      { label: '🇬🇧 UK Student Visa & CAS', actionType: 'query', payload: 'What are the UK visa and CAS requirements?' },
      { label: '💬 Chat on WhatsApp with Counselor', actionType: 'whatsapp', payload: 'https://wa.me/923344626284?text=Hello%20RS%20Higher%20Education%20Consultants!%20I%20need%20personalized%20study%20abroad%20guidance.' },
    ],
  };
}
