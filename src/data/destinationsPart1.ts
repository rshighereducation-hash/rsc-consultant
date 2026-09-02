import { Destination } from '../types';

export const DESTINATIONS_PART_1: Destination[] = [
  {
    id: 'usa',
    countryName: 'United States',
    slug: 'usa',
    flagEmoji: '🇺🇸',
    flagCode: 'us',
    heroImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'World-Leading Research, STEM OPT & Global Career Prestige',
    overview: 'The United States is the premier global education powerhouse, offering over 4,000 accredited institutions, cutting-edge STEM programs, flexible interdisciplinary curricula, and up to 36 months of STEM OPT work authorization.',
    whyStudy: [
      { title: 'Global Academic Dominance', description: 'Home to the majority of the world’s top 100 universities with world-class faculty and facilities.' },
      { title: 'STEM OPT Extension', description: 'Graduates in STEM fields can work in the US for up to 3 years post-graduation on F-1 OPT.' },
      { title: 'Generous Assistantships', description: 'Graduate research and teaching assistantships (GRA/GTA) provide tuition waivers and monthly stipends.' },
      { title: 'Practical Training & Internships', description: 'Curricular Practical Training (CPT) allows hands-on industry internships during your studies.' }
    ],
    popularFields: [
      { name: 'Computer Science & AI', desc: 'Software engineering, machine learning, and cybersecurity.' },
      { name: 'Data Science & Analytics', desc: 'Big data architecture, business intelligence, and cloud systems.' },
      { name: 'Engineering & Robotics', desc: 'Mechanical, electrical, biomedical, and civil disciplines.' },
      { name: 'MBA & Finance', desc: 'Fintech, quantitative finance, and strategic management.' },
      { name: 'Biotechnology & Health', desc: 'Genomics, pharmaceuticals, and public health systems.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 65%+ in Intermediate (FSc/ICS) or A-Levels. Postgraduate: 2.75+ CGPA in 4-year Bachelor degree from HEC-recognized university.',
      english: 'IELTS: 6.5 overall (no band < 6.0) or TOEFL iBT: 80+ or PTE: 58+. Duolingo accepted by many institutions.',
      documents: ['Transcripts & Degree Certificates (HEC attested for PG)', 'Statement of Purpose (SOP)', '2-3 Letters of Recommendation (LOR)', 'Passport (valid 6+ months)', 'Updated CV/Resume', 'Bank Statement & Affidavit of Support', 'GRE/GMAT (optional for many programs)'],
      notes: 'Requirements vary by institution and department. Many US universities now waive GRE for Pakistani applicants.'
    },
    admissionProcess: [
      { step: '01', title: 'Profile Assessment', description: 'Academic evaluation and GPA conversion by senior RS counselor in Peshawar.' },
      { step: '02', title: 'University & Course Selection', description: 'Shortlisting ambitious, target, and safe universities matching budget and goals.' },
      { step: '03', title: 'Document Preparation', description: 'Polishing SOP, resume, recommendations, and financial paperwork.' },
      { step: '04', title: 'Application Submission', description: 'Submitting applications via university portals with application fee waivers where possible.' },
      { step: '05', title: 'Offer Letter & I-20 Issuance', description: 'Receiving acceptance and paying SEVIS deposit to obtain official Form I-20.' },
      { step: '06', title: 'SEVIS Fee Payment', description: 'Filing I-901 SEVIS fee with US Immigration and Customs Enforcement.' },
      { step: '07', title: 'DS-160 & Visa Slot', description: 'Completing DS-160 form and booking F-1 visa appointment at US Embassy Islamabad or Consulate Karachi.' },
      { step: '08', title: 'Visa Interview Preparation', description: 'Intensive 1-on-1 mock interviews at RS office simulating consular questions.' },
      { step: '09', title: 'Visa Decision', description: 'Receiving F-1 student visa stamp in passport.' },
      { step: '10', title: 'Pre-Departure Briefing', description: 'Guidance on health insurance, flight booking, forex, housing, and port-of-entry procedures.' }
    ],
    visaProcess: {
      name: 'F-1 Non-Immigrant Student Visa',
      processingTime: '2 to 8 weeks (depending on appointment wait times)',
      financialProof: '1st year tuition + living expenses (Form I-20 amount) shown in sponsor bank account with 6 months history.',
      requiredDocuments: ['Valid Pakistani Passport', 'Form I-20 signed by DSO and Student', 'DS-160 Confirmation Barcode', 'SEVIS I-901 Receipt ($350)', 'Visa Application Fee Receipt (MRV)', 'Academic Transcripts, Degrees & Test Scores', 'Financial Proof & Affidavit of Support', 'Proof of Home Ties to Pakistan'],
      officialNotice: 'Visa policies are set by the US Department of State and USCIS. Approval depends on demonstrating bona fide student intent and verifiable funding.',
      officialPortalUrl: 'https://travel.state.gov/content/travel/en/us-visas/study.html'
    },
    estimatedCosts: {
      currency: 'USD',
      tuitionUndergrad: '$18,000 – $38,000 / year',
      tuitionPostgrad: '$16,000 – $34,000 / year',
      livingMonthly: '$900 – $1,600 / month',
      visaFee: '$185 (MRV) + $350 (SEVIS)',
      healthInsurance: '$1,200 – $2,200 / year'
    },
    scholarships: [
      { name: 'Fulbright Foreign Student Program', coverage: 'Fully funded (Tuition, living, airfare, health)', provider: 'USEFP / US Dept of State', criteria: 'Merit-based for Masters/PhD with commitment to return to Pakistan.' },
      { name: 'Institutional Merit Scholarships', coverage: '$3,000 – $20,000 / year tuition waiver', provider: 'Individual US Universities', criteria: 'High GPA (3.2+), strong SOP, and early application.' },
      { name: 'Graduate Assistantships (GRA/GTA)', coverage: '100% Tuition Waiver + $1,200–$2,000 monthly stipend', provider: 'US University Academic Departments', criteria: 'Competitive evaluation based on research skills and faculty interview.' }
    ],
    intakes: [
      { month: 'August / September', term: 'Fall Intake (Major)', applicationDeadline: 'December – March (prior)' },
      { month: 'January', term: 'Spring Intake (Secondary)', applicationDeadline: 'August – October (prior)' },
      { month: 'May / June', term: 'Summer Intake (Limited)', applicationDeadline: 'January – February (prior)' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 20 hours/week on-campus during semesters; up to 40 hours/week during official breaks.',
      postStudy: '12 months standard Optional Practical Training (OPT); +24 months additional extension for STEM graduates (36 months total).',
      notes: 'Off-campus work is permitted via CPT after completing 1 academic year.'
    },
    officialGovernmentLinks: [
      { title: 'US Department of State – Student Visas', url: 'https://travel.state.gov/content/travel/en/us-visas/study.html', agency: 'US Dept of State' },
      { title: 'Study in the States (DHS)', url: 'https://studyinthestates.dhs.gov/', agency: 'Department of Homeland Security' }
    ],
    universities: [
      { id: 'us-1', name: 'Arizona State University', country: 'USA', city: 'Tempe, AZ', shortDescription: '#1 in the US for Innovation, world-class STEM and business programs.', officialWebsite: 'https://www.asu.edu', popularPrograms: ['Computer Science', 'Data Analytics', 'Business'] },
      { id: 'us-2', name: 'Northeastern University', country: 'USA', city: 'Boston, MA', shortDescription: 'Global leader in cooperative education (co-op) and industrial internships.', officialWebsite: 'https://www.northeastern.edu', popularPrograms: ['Information Systems', 'Cybersecurity', 'Finance'] },
      { id: 'us-3', name: 'University of South Florida', country: 'USA', city: 'Tampa, FL', shortDescription: 'Top-tier public research university with generous international scholarships.', officialWebsite: 'https://www.usf.edu', popularPrograms: ['Biomedical Sciences', 'Engineering', 'Marketing'] },
      { id: 'us-4', name: 'George Mason University', country: 'USA', city: 'Fairfax, VA', shortDescription: 'Strategic location near Washington D.C. with high government & tech access.', officialWebsite: 'https://www.gmu.edu', popularPrograms: ['Data Science', 'Public Policy', 'Software Dev'] },
      { id: 'us-5', name: 'University of Texas at Arlington', country: 'USA', city: 'Arlington, TX', shortDescription: 'Tier-1 research university in the thriving Dallas-Fort Worth tech hub.', officialWebsite: 'https://www.uta.edu', popularPrograms: ['Computer Engineering', 'Civil Eng', 'Health'] },
      { id: 'us-6', name: 'Illinois Institute of Technology', country: 'USA', city: 'Chicago, IL', shortDescription: 'Renowned technology and architecture institution in downtown Chicago.', officialWebsite: 'https://www.iit.edu', popularPrograms: ['Artificial Intelligence', 'Architecture', 'Finance'] },
      { id: 'us-7', name: 'Pace University', country: 'USA', city: 'New York, NY', shortDescription: 'Located in Lower Manhattan, premier career placement and Wall St links.', officialWebsite: 'https://www.pace.edu', popularPrograms: ['Finance', 'Information Tech', 'Media'] },
      { id: 'us-8', name: 'Oregon State University', country: 'USA', city: 'Corvallis, OR', shortDescription: 'Top-tier research institution with excellence in Forestry, Agri & Robotics.', officialWebsite: 'https://www.oregonstate.edu', popularPrograms: ['Robotics', 'Environmental Science', 'CS'] },
      { id: 'us-9', name: 'University of Cincinnati', country: 'USA', city: 'Cincinnati, OH', shortDescription: 'Inventor of cooperative education with mandatory paid co-op placements.', officialWebsite: 'https://www.uc.edu', popularPrograms: ['Mechanical Eng', 'Design', 'MBA'] },
      { id: 'us-10', name: 'University of North Texas', country: 'USA', city: 'Denton, TX', shortDescription: 'Highly affordable tuition rates and vibrant international student community.', officialWebsite: 'https://www.unt.edu', popularPrograms: ['Applied Tech', 'Logistics', 'CS'] }
    ]
  },
  {
    id: 'canada',
    countryName: 'Canada',
    slug: 'canada',
    flagEmoji: '🇨🇦',
    flagCode: 'ca',
    heroImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop',
    tagline: 'High Quality of Life, Post-Graduation Work Permits (PGWP) & Safe Campuses',
    overview: 'Canada stands among the most popular study destinations for Pakistani students, celebrated for world-class public universities, welcoming multicultural communities, and pathways to permanent residency via PGWP.',
    whyStudy: [
      { title: 'Post-Graduation Work Permit (PGWP)', description: 'Eligible graduates can obtain an open work permit for up to 3 years to gain Canadian work experience.' },
      { title: 'Globally Ranked Qualifications', description: 'Canadian degrees carry the same academic credibility as US and UK credentials.' },
      { title: 'Safe & Welcoming Environment', description: 'Canada consistently ranks among the top 10 safest countries globally with large Pakistani diaspora.' },
      { title: 'Co-op Education Programs', description: 'Integrated paid work semesters built directly into degree curriculums.' }
    ],
    popularFields: [
      { name: 'Computer Software & Cloud Tech', desc: 'Software engineering, cybersecurity, and cloud operations.' },
      { name: 'Business Administration & SCM', desc: 'Supply chain management, international business, and analytics.' },
      { name: 'Health Administration & Nursing', desc: 'Healthcare informatics, pharmacy, and nursing science.' },
      { name: 'Engineering & Construction Tech', desc: 'Project management, civil engineering, and green tech.' },
      { name: 'Data Analytics & AI', desc: 'Business analytics and machine learning applications.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 65%+ in Intermediate (FSc/ICS) or equivalent A-Levels. Postgraduate: 2.8+ CGPA in 4-year Bachelor degree.',
      english: 'IELTS Academic: 6.5 overall (minimum 6.0 in each band) or PTE Academic: 60+ overall.',
      documents: ['Official Academic Transcripts & Degree Certificates', 'Statement of Purpose (SOP / Letter of Intent)', 'Two Academic/Professional Reference Letters', 'Updated Resume', 'Copy of Valid Passport', 'Provincial Attestation Letter (PAL) where required'],
      notes: 'Applicants must secure a Provincial Attestation Letter (PAL) from their designated learning institution (DLI).'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Profile Evaluation', description: 'Review of academic background and selection of DLI-approved Canadian institutions.' },
      { step: '02', title: 'Program & University Shortlist', description: 'Selecting programs aligned with student career goals and PGWP eligibility.' },
      { step: '03', title: 'Application Filing', description: 'Submitting online application along with statement of purpose and academic transcripts.' },
      { step: '04', title: 'Letter of Acceptance (LOA)', description: 'Receiving formal unconditional/conditional Letter of Acceptance from DLI.' },
      { step: '05', title: 'Tuition Deposit & PAL Request', description: 'Paying initial tuition deposit to secure seat and generate Provincial Attestation Letter.' },
      { step: '06', title: 'GIC & Financial Preparation', description: 'Setting up Guaranteed Investment Certificate (GIC) or verified bank statement.' },
      { step: '07', title: 'Medical Exam & Biometrics', description: 'Undergoing upfront medical exam at authorized IOM panel physician.' },
      { step: '08', title: 'Study Permit Submission', description: 'Submitting online study permit application on IRCC portal with comprehensive SOP.' },
      { step: '09', title: 'Passport Submission (PPR)', description: 'Receiving passport request letter and submitting passport to VFS Global for visa stamping.' },
      { step: '10', title: 'Arrival & Port of Entry', description: 'RS pre-departure session covering SIN card, health insurance, and landing procedures.' }
    ],
    visaProcess: {
      name: 'Canadian Study Permit',
      processingTime: '6 to 12 weeks',
      financialProof: '1st year tuition fee paid + $20,635 CAD living cost proof (via GIC or liquid bank funds).',
      requiredDocuments: ['Letter of Acceptance (LOA) from DLI', 'Provincial Attestation Letter (PAL)', 'Proof of Financial Support (GIC/Bank Statement)', 'Upfront Medical Exam Sheet', 'Police Character Certificate', 'Detailed Statement of Purpose (Study Plan)', 'Valid Passport & Digital Photos', 'Biometrics (booked at VFS)'],
      officialNotice: 'IRCC updates study permit regulations periodically. Always consult official IRCC guidelines for updated cost thresholds and eligible DLIs.',
      officialPortalUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html'
    },
    estimatedCosts: {
      currency: 'CAD',
      tuitionUndergrad: '$16,000 – $32,000 / year',
      tuitionPostgrad: '$15,000 – $28,000 / year',
      livingMonthly: '$1,200 – $1,800 / month',
      visaFee: '$150 CAD (Permit) + $85 CAD (Biometrics)',
      healthInsurance: '$600 – $1,100 / year'
    },
    scholarships: [
      { name: 'Vanier Canada Graduate Scholarships', coverage: '$50,000 per year for 3 years (Doctoral)', provider: 'Government of Canada', criteria: 'High research potential and academic leadership.' },
      { name: 'University Entrance Awards', coverage: '$2,000 – $10,000 one-time / recurring', provider: 'Canadian Universities (York, Windsor, Dalhousie)', criteria: 'Awarded automatically based on academic percentage (80%+).' }
    ],
    intakes: [
      { month: 'September', term: 'Fall Intake (Primary)', applicationDeadline: 'January – April' },
      { month: 'January', term: 'Winter Intake (Secondary)', applicationDeadline: 'June – September' },
      { month: 'May', term: 'Spring/Summer Intake (Selected)', applicationDeadline: 'November – January' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 24 hours per week off-campus during regular academic terms; full-time during scheduled breaks.',
      postStudy: 'Up to 3-year open Post-Graduation Work Permit (PGWP) based on program duration.',
      notes: 'Students must maintain full-time enrollment status to remain work-authorized.'
    },
    officialGovernmentLinks: [
      { title: 'IRCC – Study in Canada', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html', agency: 'Immigration, Refugees and Citizenship Canada' }
    ],
    universities: [
      { id: 'ca-1', name: 'University of Windsor', country: 'Canada', city: 'Windsor, ON', shortDescription: 'Premier engineering and automotive research near the US border.', officialWebsite: 'https://www.uwindsor.ca', popularPrograms: ['Engineering', 'Computer Science', 'Business'] },
      { id: 'ca-2', name: 'York University', country: 'Canada', city: 'Toronto, ON', shortDescription: 'One of Canada’s largest institutions with Schulich School of Business.', officialWebsite: 'https://www.yorku.ca', popularPrograms: ['Business', 'Law', 'Information Tech'] },
      { id: 'ca-3', name: 'Memorial University of Newfoundland', country: 'Canada', city: "St. John's, NL", shortDescription: 'Highly affordable tuition rates with world-class marine and engineering faculties.', officialWebsite: 'https://www.mun.ca', popularPrograms: ['Ocean Engineering', 'Geology', 'MBA'] },
      { id: 'ca-4', name: 'Concordia University', country: 'Canada', city: 'Montreal, QC', shortDescription: 'Dynamic urban research university known for tech, arts, and Gina Cody Engineering.', officialWebsite: 'https://www.concordia.ca', popularPrograms: ['Software Eng', 'Finance', 'Design'] },
      { id: 'ca-5', name: 'University of Manitoba', country: 'Canada', city: 'Winnipeg, MB', shortDescription: 'Western Canada’s first university with abundant PR pathways through provincial nominee streams.', officialWebsite: 'https://umanitoba.ca', popularPrograms: ['Agri-Science', 'Civil Eng', 'Health Sciences'] },
      { id: 'ca-6', name: 'Dalhousie University', country: 'Canada', city: 'Halifax, NS', shortDescription: 'U15 leading Canadian research university in scenic Atlantic Canada.', officialWebsite: 'https://www.dal.ca', popularPrograms: ['Computer Science', 'Commerce', 'Pharmacy'] },
      { id: 'ca-7', name: 'Brock University', country: 'Canada', city: 'St. Catharines, ON', shortDescription: 'Renowned Goodman School of Business and vibrant co-op programs.', officialWebsite: 'https://brocku.ca', popularPrograms: ['Accounting', 'Biotechnology', 'Public Health'] },
      { id: 'ca-8', name: 'Thompson Rivers University', country: 'Canada', city: 'Kamloops, BC', shortDescription: 'Flexible pathways, open learning, and strong student support in British Columbia.', officialWebsite: 'https://www.tru.ca', popularPrograms: ['Tourism', 'Computing', 'Business'] },
      { id: 'ca-9', name: 'University of Regina', country: 'Canada', city: 'Regina, SK', shortDescription: 'Excellent graduate retention programs and affordable living in Saskatchewan.', officialWebsite: 'https://www.uregina.ca', popularPrograms: ['Petroleum Eng', 'Data Analytics', 'Nursing'] },
      { id: 'ca-10', name: 'Lakehead University', country: 'Canada', city: 'Thunder Bay, ON', shortDescription: '#1 undergraduate research university in Canada with high employability.', officialWebsite: 'https://www.lakeheadu.ca', popularPrograms: ['Forestry', 'Computer Science', 'Civil Eng'] }
    ]
  },
  {
    id: 'uk',
    countryName: 'United Kingdom',
    slug: 'uk',
    flagEmoji: '🇬🇧',
    flagCode: 'gb',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
    tagline: '1-Year Master Degrees, 2-Year Graduate Route Visa & Academic Prestige',
    overview: 'The United Kingdom provides globally celebrated education with accelerated 1-year Master degrees, 3-year Bachelor programs, and the Graduate Route post-study work visa allowing 2 years of unrestricted work in the UK.',
    whyStudy: [
      { title: 'Accelerated Degree Duration', description: '1-Year Master and 3-Year Bachelor programs save both time and overall living costs.' },
      { title: 'Graduate Route (PSW)', description: '2 years of post-study work authorization (3 years for PhDs) with no minimum salary or sponsorship needed.' },
      { title: 'IELTS Waivers Available', description: 'Many UK partner universities accept MOI (Medium of Instruction) or high English marks in Intermediate.' },
      { title: 'Academic Heritage & Quality', description: 'Degrees backed by the UK Quality Assurance Agency (QAA) and Russell Group excellence.' }
    ],
    popularFields: [
      { name: 'Fintech & International Business', desc: 'Corporate finance, auditing, management, and global commerce.' },
      { name: 'Artificial Intelligence & Data', desc: 'Deep learning, autonomous systems, and big data management.' },
      { name: 'Public Health & Global Medicine', desc: 'Epidemiology, health management, and clinical research.' },
      { name: 'Law & International Relations', desc: 'LLM programs, commercial dispute resolution, and diplomacy.' },
      { name: 'Mechanical & Automotive Tech', desc: 'Renewable energy engineering and aerospace systems.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 60%+ in Intermediate (FSc/ICS) or 3 A-Level passes (B/C grades). Postgraduate: 2.5+ CGPA in Bachelor degree.',
      english: 'IELTS: 6.0–6.5 overall or PTE: 59+ or Duolingo or English waiver based on 70%+ in Intermediate English.',
      documents: ['Academic Transcripts and Certificates', 'Personal Statement (UCAS or University specific)', 'One or Two Reference Letters on official letterhead', 'Passport Copy', 'CV (for PG applicants)', 'TB Screening Certificate from IOM Pakistan'],
      notes: 'Certain universities require an internal credibility interview before issuing the Confirmation of Acceptance for Studies (CAS).'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & University Selection', description: 'Selection from top UK partner universities with fast CAS turnaround.' },
      { step: '02', title: 'Application Submission', description: 'Filing application directly via university agent portal or UCAS.' },
      { step: '03', title: 'Conditional Offer Letter', description: 'Receiving offer letter stating conditions (e.g. final transcript or fee deposit).' },
      { step: '04', title: 'Pre-CAS Credibility Interview', description: 'RS expert coaching for university internal credibility check.' },
      { step: '05', title: 'Tuition Deposit Payment', description: 'Paying required initial deposit (typically £3,000–£5,000) directly to university.' },
      { step: '06', title: '28-Day Bank Statement Verification', description: 'Maintaining required funds for 28 consecutive days in approved Pakistani bank.' },
      { step: '07', title: 'CAS Issuance', description: 'University issues Confirmation of Acceptance for Studies (CAS) reference number.' },
      { step: '08', title: 'TB Test at IOM', description: 'Undergoing Tuberculosis screening at IOM Islamabad, Lahore, or Karachi.' },
      { step: '09', title: 'Student Visa Application (UKVI)', description: 'Filing online UK Student Visa application and paying Immigration Health Surcharge (IHS).' },
      { step: '10', title: 'Biometrics & Visa Stamp', description: 'Attending VFS Global biometrics appointment and receiving passport with vignette.' }
    ],
    visaProcess: {
      name: 'UK Student Visa (Points-Based System)',
      processingTime: '3 to 5 weeks (Priority 5-day service available)',
      financialProof: 'Tuition balance + £9,207 (outside London) or £12,006 (inside London) held for 28 consecutive days.',
      requiredDocuments: ['Valid Passport', 'CAS Statement from Sponsor University', '28-Day Bank Statement & Bank Letter', 'IOM TB Test Certificate', 'Academic Certificates listed on CAS', 'ATAS Certificate (for selected STEM postgraduate programs)', 'English Test Certificate (if applicable)'],
      officialNotice: 'UK Visas and Immigration (UKVI) enforces strict financial criteria. Statements must remain untouched for the full 28-day holding period.',
      officialPortalUrl: 'https://www.gov.uk/student-visa'
    },
    estimatedCosts: {
      currency: 'GBP (£)',
      tuitionUndergrad: '£13,000 – £22,000 / year',
      tuitionPostgrad: '£14,000 – £24,000 / year',
      livingMonthly: '£800 – £1,300 / month',
      visaFee: '£490 (Visa) + £776/year (IHS Surcharge)',
      healthInsurance: 'Covered under NHS via IHS Surcharge'
    },
    scholarships: [
      { name: 'Chevening Scholarships', coverage: 'Fully funded (Tuition, living allowance, flights)', provider: 'UK Foreign, Commonwealth & Development Office', criteria: 'Outstanding leadership qualities and 2+ years work experience.' },
      { name: 'Commonwealth Scholarships', coverage: 'Full tuition + monthly stipend', provider: 'Commonwealth Scholarship Commission', criteria: 'Academic merit and developmental impact for Pakistani students.' },
      { name: 'University Vice-Chancellor Merit Awards', coverage: '£2,000 – £6,000 direct tuition fee reduction', provider: 'Individual UK Partner Universities', criteria: 'Early deposit payment and 3.0+ CGPA.' }
    ],
    intakes: [
      { month: 'September / October', term: 'Autumn Intake (Main)', applicationDeadline: 'June – August' },
      { month: 'January / February', term: 'Winter Intake (Major)', applicationDeadline: 'October – December' },
      { month: 'May / June', term: 'Summer Intake (Selected Universities)', applicationDeadline: 'March – April' }
    ],
    workOpportunities: {
      duringStudy: '20 hours per week during term-time; 40 hours per week during vacations.',
      postStudy: '2 years Graduate Route visa (3 years for doctoral graduates) for full-time work across the UK.',
      notes: 'No sponsor needed during the 2-year Graduate Route.'
    },
    officialGovernmentLinks: [
      { title: 'GOV.UK – Student Visa', url: 'https://www.gov.uk/student-visa', agency: 'UK Visas and Immigration' }
    ],
    universities: [
      { id: 'uk-1', name: 'University of Hertfordshire', country: 'United Kingdom', city: 'Hatfield, UK', shortDescription: 'Top modern university 25 minutes from Central London with high employability.', officialWebsite: 'https://www.herts.ac.uk', popularPrograms: ['Computer Science', 'Business', 'Engineering'] },
      { id: 'uk-2', name: 'University of East London', country: 'United Kingdom', city: 'London, UK', shortDescription: 'Career-led university located in vibrant Royal Docks & Stratford.', officialWebsite: 'https://www.uel.ac.uk', popularPrograms: ['Data Science', 'Civil Engineering', 'MBA'] },
      { id: 'uk-3', name: 'Coventry University', country: 'United Kingdom', city: 'Coventry, UK', shortDescription: 'Ranked 5 Stars for Employability with ultra-modern engineering campus.', officialWebsite: 'https://www.coventry.ac.uk', popularPrograms: ['Automotive Eng', 'Finance', 'Cybersecurity'] },
      { id: 'uk-4', name: 'University of Chester', country: 'United Kingdom', city: 'Chester, UK', shortDescription: 'Historic campus with generous international scholarships and low living costs.', officialWebsite: 'https://www.chester.ac.uk', popularPrograms: ['Public Health', 'Management', 'Law'] },
      { id: 'uk-5', name: 'University of Greenwich', country: 'United Kingdom', city: 'London, UK', shortDescription: 'UNESCO World Heritage campus in London with strong industry links.', officialWebsite: 'https://www.gre.ac.uk', popularPrograms: ['Architecture', 'Accounting', 'Big Data'] },
      { id: 'uk-6', name: 'Teesside University', country: 'United Kingdom', city: 'Middlesbrough, UK', shortDescription: 'Leader in animation, digital forensics, and affordable student lifestyle.', officialWebsite: 'https://www.tees.ac.uk', popularPrograms: ['Animation', 'Mechanical Eng', 'Health'] },
      { id: 'uk-7', name: 'De Montfort University', country: 'United Kingdom', city: 'Leicester, UK', shortDescription: 'Renowned for fashion, technology, and global DMUworks placements.', officialWebsite: 'https://www.dmu.ac.uk', popularPrograms: ['Software Dev', 'Business Management', 'Design'] },
      { id: 'uk-8', name: 'University of Dundee', country: 'United Kingdom', city: 'Dundee, Scotland', shortDescription: 'Top 30 in the UK with excellence in biomedical science and law.', officialWebsite: 'https://www.dundee.ac.uk', popularPrograms: ['Biomedical Sciences', 'LLM', 'Computing'] },
      { id: 'uk-9', name: 'Manchester Metropolitan University', country: 'United Kingdom', city: 'Manchester, UK', shortDescription: 'Dynamic hub in the heart of Manchester with Triple-Accredited Business School.', officialWebsite: 'https://www.mmu.ac.uk', popularPrograms: ['Marketing', 'Sport Science', 'Data'] },
      { id: 'uk-10', name: 'University of Northampton', country: 'United Kingdom', city: 'Northampton, UK', shortDescription: 'Award-winning waterside campus with dedicated international support.', officialWebsite: 'https://www.northampton.ac.uk', popularPrograms: ['Logistics', 'Education', 'Computing'] }
    ]
  },
  {
    id: 'germany',
    countryName: 'Germany',
    slug: 'germany',
    flagEmoji: '🇩🇪',
    flagCode: 'de',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Tuition-Free Public Universities, Engineering Excellence & 18-Month Jobseeker Visa',
    overview: 'Germany is Europe’s technological and industrial engine, renowned for tuition-free education at public universities, world-renowned engineering programs, and an 18-month post-study work visa leading to EU Blue Card residency.',
    whyStudy: [
      { title: 'Zero or Low Tuition at Public Universities', description: 'Most public universities charge zero tuition fees, only a nominal semester contribution (€150–€350).' },
      { title: 'Engineering & Tech Prestige', description: 'Unrivaled industrial links with Siemens, BMW, Bosch, SAP, and Volkswagen.' },
      { title: '18-Month Jobseeker Visa', description: 'Graduates receive 18 months to secure employment in their field.' },
      { title: 'EU Blue Card & PR Track', description: 'Fast-tracked permanent residence after 21–27 months of qualified employment.' }
    ],
    popularFields: [
      { name: 'Mechanical & Automotive Engineering', desc: 'Mechatronics, automotive systems, and advanced thermodynamics.' },
      { name: 'Computer Science & Embedded Systems', desc: 'AI, cloud computing, and real-time systems.' },
      { name: 'Renewable & Sustainable Energy', desc: 'Solar engineering, grid storage, and environmental tech.' },
      { name: 'International Business & Logistics', desc: 'Supply chain management and global corporate strategy.' },
      { name: 'Biomedical & Biotechnology', desc: 'Medical devices, genomics, and bioprocess tech.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: 12 years of Pakistani education requires 1-year Studienkolleg (Foundation) + FSP exam, OR 13+ years of education for direct entry. Postgraduate: 4-year Bachelor degree with 2.8+ CGPA in relevant discipline.',
      english: 'English-taught programs: IELTS 6.5 or TOEFL iBT 85+. German-taught programs: TestDaF or Goethe Zertifikat B2/C1.',
      documents: ['APS Certificate (Mandatory for Pakistan)', 'Attested Degrees & Transcripts (IBCC / HEC / MOFA)', 'Letter of Motivation (SOP)', 'Academic CV (Tabular format)', '2 Recommendation Letters', 'Blocked Account Confirmation (Sperrkonto)'],
      notes: 'The APS (Akademische Prüfstelle) verification certificate is required before applying for German student visas in Pakistan.'
    },
    admissionProcess: [
      { step: '01', title: 'Eligibility & APS Filing', description: 'Verification of academic equivalence on Anabin database and APS document submission.' },
      { step: '02', title: 'University Selection & Uni-Assist', description: 'Preparing applications via Uni-Assist or direct university application portals.' },
      { step: '03', title: 'VPD / Offer Letter', description: 'Receiving Vorprüfungsdokumentation (VPD) and unconditional admission letter (Zulassungsbescheid).' },
      { step: '04', title: 'Opening Blocked Account', description: 'Setting up blocked account (Coracle, Expatrio, or Fintiba) and transferring €11,904.' },
      { step: '05', title: 'Statutory Health Insurance', description: 'Securing German public health insurance (TK, Barmer, or DAK).' },
      { step: '06', title: 'German Embassy Visa Appointment', description: 'Registering on German Embassy Islamabad / Consulate Karachi visa waitlist.' },
      { step: '07', title: 'Visa Application & Interview', description: 'Submitting motivation letter, APS certificate, blocked account, and transcripts.' },
      { step: '08', title: 'Visa Stamping', description: 'Receiving National D-Type visa sticker.' },
      { step: '09', title: 'Travel & City Registration (Anmeldung)', description: 'Arriving in Germany and completing city hall registration.' },
      { step: '10', title: 'Residence Permit (Aufenthaltstitel)', description: 'Converting entry visa into multi-year student residence permit at local Ausländerbehörde.' }
    ],
    visaProcess: {
      name: 'National Visa for Study Purposes (Category D)',
      processingTime: '6 to 16 weeks',
      financialProof: 'German Blocked Account (Sperrkonto) with €11,904 (€992/month) OR official declaration of commitment (Verpflichtungserklärung).',
      requiredDocuments: ['APS Certificate', 'Admission Letter from German University', 'Blocked Account Confirmation Certificate', 'Proof of Health Insurance', 'Motivational Letter written in German/English', 'HEC/IBCC Attested Transcripts', 'Valid Pakistani Passport'],
      officialNotice: 'Embassy appointment wait times can be significant. Early planning and prompt APS processing are critical.',
      officialPortalUrl: 'https://pakistan.diplo.de/pk-en/service/05-VisaEinreise/-/1672322'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€0 (Public) to €9,000/yr (Private)',
      tuitionPostgrad: '€0 (Public) to €12,000/yr (Private)',
      livingMonthly: '€850 – €1,100 / month',
      visaFee: '€75',
      healthInsurance: '€110 – €130 / month'
    },
    scholarships: [
      { name: 'DAAD Scholarships (EPOS & Helmut-Schmidt)', coverage: 'Full monthly allowance (€934), health insurance, travel grant', provider: 'German Academic Exchange Service (DAAD)', criteria: '2+ years professional experience and outstanding academic record.' },
      { name: 'Deutschlandstipendium', coverage: '€300 / month merit stipend', provider: 'German Federal Government + Corporate Sponsors', criteria: 'Top academic performance at enrolled German university.' }
    ],
    intakes: [
      { month: 'October', term: 'Winter Semester (Main Intake)', applicationDeadline: 'May 15 – July 15' },
      { month: 'April', term: 'Summer Semester (Secondary)', applicationDeadline: 'November 15 – January 15' }
    ],
    workOpportunities: {
      duringStudy: '140 full days or 280 half days per calendar year (recently increased by German law).',
      postStudy: '18-month jobseeker residence permit upon successful graduation.',
      notes: 'EU Blue Card transition possible with qualifying employment contract.'
    },
    officialGovernmentLinks: [
      { title: 'German Embassy Islamabad – Visa Section', url: 'https://pakistan.diplo.de', agency: 'Federal Foreign Office Germany' },
      { title: 'DAAD – Study in Germany', url: 'https://www.daad.de', agency: 'DAAD' }
    ],
    universities: [
      { id: 'de-1', name: 'IU International University of Applied Sciences', country: 'Germany', city: 'Berlin / Bad Honnef', shortDescription: 'Largest private university in Germany with flexible English-taught degrees.', officialWebsite: 'https://www.iu.org', popularPrograms: ['Data Science', 'MBA', 'Artificial Intelligence'] },
      { id: 'de-2', name: 'GISMA University of Applied Sciences', country: 'Germany', city: 'Potsdam / Berlin', shortDescription: 'AMBA-accredited business school focusing on tech leadership and global management.', officialWebsite: 'https://www.gisma.com', popularPrograms: ['Business Analytics', 'Computer Science', 'Leadership'] },
      { id: 'de-3', name: 'SRH University of Applied Sciences', country: 'Germany', city: 'Heidelberg / Berlin', shortDescription: 'CORE learning principle with high practical project orientation.', officialWebsite: 'https://www.srh-hochschule-heidelberg.de', popularPrograms: ['International Business', 'Applied CS', 'Design'] },
      { id: 'de-4', name: 'University of Europe for Applied Sciences (UE)', country: 'Germany', city: 'Hamburg / Berlin', shortDescription: 'Pioneering degrees in tech, media, sports, and business.', officialWebsite: 'https://www.ue-germany.com', popularPrograms: ['Software Engineering', 'Digital Media', 'Management'] },
      { id: 'de-5', name: 'Arden University Berlin', country: 'Germany', city: 'Berlin, Germany', shortDescription: 'Career-focused UK degrees delivered at modern campus in Berlin.', officialWebsite: 'https://arden.ac.uk/berlin', popularPrograms: ['Data Analytics', 'Healthcare Mgmt', 'Marketing'] },
      { id: 'de-6', name: 'Technical University of Munich (TUM)', country: 'Germany', city: 'Munich, Germany', shortDescription: '#1 ranked German university for engineering, robotics, and entrepreneurship.', officialWebsite: 'https://www.tum.de', popularPrograms: ['Informatics', 'Mechanical Eng', 'Management & Tech'] },
      { id: 'de-7', name: 'RWTH Aachen University', country: 'Germany', city: 'Aachen, Germany', shortDescription: 'Global powerhouse in automotive, mechanical, and production engineering.', officialWebsite: 'https://www.rwth-aachen.de', popularPrograms: ['Automotive Engineering', 'Metallurgy', 'Robotics'] },
      { id: 'de-8', name: 'TU Berlin (Technical University of Berlin)', country: 'Germany', city: 'Berlin, Germany', shortDescription: 'Distinguished member of TU9 alliance located in Germany’s capital.', officialWebsite: 'https://www.tu.berlin', popularPrograms: ['Urban Management', 'Information Systems', 'Renewable Energy'] },
      { id: 'de-9', name: 'Heidelberg University', country: 'Germany', city: 'Heidelberg, Germany', shortDescription: 'Oldest university in Germany, internationally eminent in medicine and sciences.', officialWebsite: 'https://www.uni-heidelberg.de', popularPrograms: ['Translational Medical Research', 'Physics', 'Biosciences'] },
      { id: 'de-10', name: 'Frankfurt School of Finance & Management', country: 'Germany', city: 'Frankfurt, Germany', shortDescription: 'Top European business school in the financial capital of continental Europe.', officialWebsite: 'https://www.frankfurt-school.de', popularPrograms: ['Master in Finance', 'Data Analytics', 'Management'] }
    ]
  },
  {
    id: 'france',
    countryName: 'France',
    slug: 'france',
    flagEmoji: '🇫🇷',
    flagCode: 'fr',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Grandes Écoles, 5-Year Schengen Visa for Alumni & State Housing Subsidies (CAF)',
    overview: 'France offers prestigious Grandes Écoles, world-class business and luxury management programs taught in English, government housing subsidies (CAF) for all international students, and special 5-year short-stay Schengen visas for Master graduates.',
    whyStudy: [
      { title: 'Top-Ranked Business Schools', description: 'Home to Europe’s most prestigious business schools (INSEAD, HEC Paris, ESSEC, ESCP).' },
      { title: 'French Government Housing Subsidy (CAF)', description: 'All international students can claim 30%–40% monthly rent reimbursement from the French government.' },
      { title: '5-Year Schengen Visa for Alumni', description: 'Pakistani students completing a Master degree in France qualify for a 5-year multi-entry Schengen travel visa.' },
      { title: 'Affordable Public Tuition & Scholarships', description: 'Subsidized tuition rates and Eiffel Excellence scholarship programs.' }
    ],
    popularFields: [
      { name: 'Luxury Brand & Fashion Management', desc: 'Haute couture marketing, heritage retail, and global branding.' },
      { name: 'International Business & Supply Chain', desc: 'Procurement, strategic consulting, and corporate finance.' },
      { name: 'Culinary Arts & Hospitality', desc: 'Gastronomy, wine management, and boutique hotel leadership.' },
      { name: 'Aerospace Engineering & Tech', desc: 'Aviation systems, satellite tech, and fluid dynamics.' },
      { name: 'Artificial Intelligence & Data', desc: 'Applied machine learning and computer vision.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 60%+ in Intermediate. Postgraduate: 4-year Bachelor with 2.6+ CGPA.',
      english: 'IELTS: 6.0–6.5 or TOEFL iBT: 80+ or Duolingo: 105+ or Medium of Instruction (MOI) certificate.',
      documents: ['Campus France Registration File', 'Attested Transcripts and Diplomas', 'Statement of Purpose (Lettre de motivation)', 'Curriculum Vitae', 'Two Academic Recommendation Letters', 'Proof of Financial Means'],
      notes: 'All Pakistani applicants must complete the mandatory Études en France (Campus France Pakistan) interview process.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & School Selection', description: 'Shortlisting Triple-Accredited (EQUIS, AACSB, AMBA) French institutions.' },
      { step: '02', title: 'School Application & Interview', description: 'Online application followed by video admission interview with faculty.' },
      { step: '03', title: 'Letter of Acceptance', description: 'Receiving formal admission confirmation and paying initial seat deposit.' },
      { step: '04', title: 'Campus France Pakistan Creation', description: 'Creating account on Études en France portal and uploading documents.' },
      { step: '05', title: 'Campus France Interview', description: 'In-person or virtual interview with Campus France officer in Islamabad/Karachi/Lahore.' },
      { step: '06', title: 'Attestation de Campus France', description: 'Receiving official clearance certificate authorizing visa appointment.' },
      { step: '07', title: 'Financial & Housing Proof', description: 'Preparing €615/month living funds proof and initial accommodation certificate (Attestation d’hébergement).' },
      { step: '08', title: 'France-Visas Portal Filing', description: 'Completing visa application on official France-Visas portal.' },
      { step: '09', title: 'VFS Biometrics & Visa Stamping', description: 'Submitting file at VFS France and receiving Long-Stay Student Visa (VLS-TS).' },
      { step: '10', title: 'Arrival & OFII Validation', description: 'Validating VLS-TS visa online with OFII upon arrival in France.' }
    ],
    visaProcess: {
      name: 'Long-Stay Visa with Residence Permit (VLS-TS)',
      processingTime: '3 to 6 weeks',
      financialProof: 'Minimum €615 per month for 1 academic year (€7,380) shown in student or sponsor bank account.',
      requiredDocuments: ['Campus France Interview Confirmation (Attestation Études en France)', 'Official Admission Letter (Attestation d’admission)', 'Proof of Accommodation for first 3 months', 'Bank Statement with 3-6 months history', 'Valid Passport & Photographs', 'France-Visas Application Summary Sheet', 'Travel Insurance for initial period'],
      officialNotice: 'France requires both Campus France clearance and consular visa approval. Processing must be initiated at least 2 months prior to intake.',
      officialPortalUrl: 'https://france-visas.gouv.fr/'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€6,000 – €14,000 / year',
      tuitionPostgrad: '€9,000 – €18,000 / year',
      livingMonthly: '€700 – €1,200 / month (reduced by CAF housing support)',
      visaFee: '€50 (Visa) + Campus France fee',
      healthInsurance: 'Free universal healthcare via French Sécurité Sociale (CPAM)'
    },
    scholarships: [
      { name: 'Eiffel Excellence Scholarship Program', coverage: '€1,181 monthly allowance for Master; €1,800 for PhD + flights + health', provider: 'French Ministry for Europe and Foreign Affairs', criteria: 'Top academic elite nominated by French universities.' },
      { name: 'Charpak Scholarship Program', coverage: '€700/month living allowance + student visa fee waiver + tuition support', provider: 'Embassy of France in Pakistan', criteria: 'Merit-based for Pakistani students in high-priority fields.' }
    ],
    intakes: [
      { month: 'September / October', term: 'Fall Intake (Primary)', applicationDeadline: 'May – July' },
      { month: 'January / February', term: 'Spring Intake (Major for Business Schools)', applicationDeadline: 'October – December' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 964 hours per year (approx. 60% of normal work year / ~20 hours/week).',
      postStudy: '1-year APS / Recherche d’emploi permit to seek employment or start a business.',
      notes: 'Eligible for 5-year multi-entry Schengen circulation visa after graduation.'
    },
    officialGovernmentLinks: [
      { title: 'France-Visas Official Portal', url: 'https://france-visas.gouv.fr/', agency: 'Republic of France' },
      { title: 'Campus France Pakistan', url: 'https://www.pakistan.campusfrance.org/', agency: 'Campus France' }
    ],
    universities: [
      { id: 'fr-1', name: 'KEDGE Business School', country: 'France', city: 'Bordeaux / Marseille', shortDescription: 'Triple-accredited (EQUIS, AMBA, AACSB) world top 40 business school.', officialWebsite: 'https://kedge.edu', popularPrograms: ['Global Supply Chain', 'Wine & Spirits', 'Marketing'] },
      { id: 'fr-2', name: 'NEOMA Business School', country: 'France', city: 'Rouen / Reims / Paris', shortDescription: 'Top French Grande École renowned for finance, luxury, and digital transformation.', officialWebsite: 'https://neoma-bs.com', popularPrograms: ['Luxury Marketing', 'Corporate Finance', 'FinTech'] },
      { id: 'fr-3', name: 'Rennes School of Business', country: 'France', city: 'Rennes, France', shortDescription: 'Most international business school in France with 95% non-French faculty.', officialWebsite: 'https://www.rennes-sb.com', popularPrograms: ['Data & Business Analytics', 'AI for Business', 'Strategy'] },
      { id: 'fr-4', name: 'TBS Education', country: 'France', city: 'Toulouse / Paris', shortDescription: 'Triple-accredited aerospace and aeronautics management leader.', officialWebsite: 'https://www.tbs-education.com', popularPrograms: ['Aerospace Management', 'Big Data', 'Finance'] },
      { id: 'fr-5', name: 'EPITA School of Engineering and Computer Science', country: 'France', city: 'Paris, France', shortDescription: 'Premier French graduate school in computer intelligence, cybersecurity, and software.', officialWebsite: 'https://www.epita.fr', popularPrograms: ['Computer Science', 'Cybersecurity', 'AI Systems'] },
      { id: 'fr-6', name: 'Montpellier Business School', country: 'France', city: 'Montpellier, France', shortDescription: 'Pioneer in inclusive management and sustainable corporate governance.', officialWebsite: 'https://www.montpellier-bs.com', popularPrograms: ['International Business', 'Digital Transformation', 'SCM'] },
      { id: 'fr-7', name: 'ICN Business School', country: 'France', city: 'Nancy / Paris', shortDescription: 'Renowned for the Artem transdisciplinary art, management, and engineering model.', officialWebsite: 'https://www.icn-artem.com', popularPrograms: ['Brand Management', 'Audit & Risk', 'Tech Management'] },
      { id: 'fr-8', name: 'EM Normandie Business School', country: 'France', city: 'Le Havre / Paris / Caen', shortDescription: 'Centuries of academic tradition with focus on port logistics and global commerce.', officialWebsite: 'https://www.em-normandie.com', popularPrograms: ['Supply Chain & Logistics', 'Events', 'Fintech'] },
      { id: 'fr-9', name: 'SKEMA Business School', country: 'France', city: 'Sophia Antipolis / Paris', shortDescription: 'Global research institution located in Europe’s Silicon Valley.', officialWebsite: 'https://www.skema.edu', popularPrograms: ['Financial Markets', 'Global Luxury', 'Entrepreneurship'] },
      { id: 'fr-10', name: 'Institut Polytechnique de Paris', country: 'France', city: 'Palaiseau, France', shortDescription: 'Elite institute combining École Polytechnique and top engineering schools.', officialWebsite: 'https://www.ip-paris.fr', popularPrograms: ['Applied Mathematics', 'Nuclear Energy', 'Nanotech'] }
    ]
  },
  {
    id: 'belgium',
    countryName: 'Belgium',
    slug: 'belgium',
    flagEmoji: '🇧🇪',
    flagCode: 'be',
    heroImage: 'https://images.unsplash.com/photo-1572979203492-26449fc76214?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Heart of the European Union, Highly Affordable Public Tuition & Global Institutions',
    overview: 'Located at the geometric center of Western Europe, Belgium hosts the headquarters of the EU and NATO. It offers high-ranking research universities with exceptionally affordable tuition fees and direct access to European policy, diplomacy, and commerce.',
    whyStudy: [
      { title: 'Capital of the European Union', description: 'Unrivaled networking and internship access to EU institutions, international NGOs, and multinationals.' },
      { title: 'Highly Affordable Tuition', description: 'Public Flemish and Walloon universities offer annual tuition fees significantly lower than the UK or USA.' },
      { title: 'Schengen Orientation Year', description: 'Graduates receive a 12-month search year (zoekjaar) to seek employment or launch an enterprise.' },
      { title: 'Trilingual International Society', description: 'Extensive range of English-taught bachelor and master degrees in Brussels, Ghent, Antwerp, and Leuven.' }
    ],
    popularFields: [
      { name: 'European Studies & International Relations', desc: 'EU governance, diplomacy, human rights, and public policy.' },
      { name: 'Biomedical & Biotechnology', desc: 'Pharmaceutical innovation, molecular biology, and clinical trials.' },
      { name: 'Data Engineering & Computer Science', desc: 'Distributed computing, privacy engineering, and network architecture.' },
      { name: 'Economics & Business Administration', desc: 'Quantitative economics, maritime logistics, and finance.' },
      { name: 'Chemical & Materials Science', desc: 'Polymer science, sustainable chemistry, and catalysis.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Intermediate (FSc/ICS) with high grades + equivalence certificate from Flemish/French Community. Postgraduate: 4-year Bachelor with 2.8+ CGPA.',
      english: 'IELTS: 6.5 overall (minimum 6.0) or TOEFL iBT: 85+ or Duolingo: 110+.',
      documents: ['Certified Academic Diplomas and Transcripts', 'Equivalence Attestation (if required)', 'Detailed Academic Motivation Letter', 'Two Letters of Recommendation', 'Police Clearance Certificate (Apostilled/Attested)', 'Proof of Solvency (Annex 32 or Blocked Account)'],
      notes: 'Visa applications require payment of a Belgian federal administrative fee prior to submission.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Profile Evaluation', description: 'Reviewing transcripts against Belgian community equivalence standards.' },
      { step: '02', title: 'University Application Filing', description: 'Submitting direct online application to Belgian research or applied science universities.' },
      { step: '03', title: 'Admission Certificate', description: 'Receiving formal acceptance letter (Attestation d’inscription).' },
      { step: '04', title: 'Belgian Admin Fee Payment', description: 'Paying Belgian Immigration Office (Dozier) federal fee (€224–€398).' },
      { step: '05', title: 'Financial Solvency Setup', description: 'Setting up University Blocked Account (minimum €803/month) or formal Annex 32 guarantor.' },
      { step: '06', title: 'Medical Certificate', description: 'Medical check-up by embassy-designated medical doctor.' },
      { step: '07', title: 'Police Character Certificate', description: 'Obtaining verified certificate of good conduct from Ministry of Foreign Affairs Pakistan.' },
      { step: '08', title: 'Visa Application on Visa On Web', description: 'Filing D-Type Long Stay Student Visa on the official Belgian portal.' },
      { step: '09', title: 'VFS Biometrics & Submission', description: 'Submitting original files at Belgian Visa Application Centre.' },
      { step: '10', title: 'Arrival & Residence Card (A-Card)', description: 'Registering at the Belgian Town Hall (Maison Communale) for national residence card.' }
    ],
    visaProcess: {
      name: 'Long Stay Visa (Type D) for Studies',
      processingTime: '4 to 8 weeks',
      financialProof: 'Minimum €803 per month for the academic year, secured via university blocked account or formal Belgian guarantor (Annex 32).',
      requiredDocuments: ['Attestation of Higher Education Registration', 'Proof of Financial Solvency (Blocked Account / Annex 32)', 'Original Police Character Certificate attested by MOFA', 'Medical Certificate issued by embassy-approved doctor', 'Proof of Federal Administrative Fee Payment', 'Valid Passport and 3 Photographs'],
      officialNotice: 'The Belgian Immigration Office (Office des Étrangers) strictly verifies financial solvency. Blocked account transfers must be authenticated.',
      officialPortalUrl: 'https://dofi.ibz.be/en/themes/study'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€1,000 – €4,500 / year (Public)',
      tuitionPostgrad: '€1,500 – €6,000 / year (Public)',
      livingMonthly: '€750 – €1,100 / month',
      visaFee: '€224 Federal Fee + €180 Visa Fee',
      healthInsurance: '€100 – €150 / year (Belgian Mutualité)'
    },
    scholarships: [
      { name: 'Master Mind Scholarships (Flanders)', coverage: 'Grant of €10,000 + tuition fee waiver per academic year', provider: 'Flemish Ministry of Education and Training', criteria: 'Outstanding academic record (GPA 3.5+) for Masters in Flanders.' },
      { name: 'ARES Scholarships (Wallonia-Brussels)', coverage: 'Full tuition + monthly living allowance + airfare', provider: 'Federation Wallonia-Brussels', criteria: 'Development-oriented Master programs for eligible partner countries.' }
    ],
    intakes: [
      { month: 'September', term: 'Autumn Semester (Primary Intake)', applicationDeadline: 'February 1 – April 30' },
      { month: 'February', term: 'Spring Semester (Limited Courses)', applicationDeadline: 'October 1 – November 15' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 20 hours per week during academic semesters; unlimited during official school holidays.',
      postStudy: '12-month Search Year (Orientation Year) residence permit to secure employment or launch an innovative venture.',
      notes: 'Eligible for single permit work authorization upon finding qualifying employer.'
    },
    officialGovernmentLinks: [
      { title: 'Belgian Immigration Office – Studying in Belgium', url: 'https://dofi.ibz.be/en/themes/study', agency: 'Federal Public Service Interior' },
      { title: 'Study in Flanders', url: 'https://www.studyinflanders.be', agency: 'Flemish Government' }
    ],
    universities: [
      { id: 'be-1', name: 'KU Leuven', country: 'Belgium', city: 'Leuven, Belgium', shortDescription: 'Ranked #1 most innovative university in Europe, top 50 in the world.', officialWebsite: 'https://www.kuleuven.be', popularPrograms: ['Engineering', 'Law', 'Computer Science'] },
      { id: 'be-2', name: 'Ghent University', country: 'Belgium', city: 'Ghent, Belgium', shortDescription: 'Top 100 global research university celebrated for biotechnology and life sciences.', officialWebsite: 'https://www.ugent.be', popularPrograms: ['Bioinformatics', 'Veterinary', 'Environmental Science'] },
      { id: 'be-3', name: 'Vrije Universiteit Brussel (VUB)', country: 'Belgium', city: 'Brussels, Belgium', shortDescription: 'Dynamic urban university in the heart of Europe’s diplomatic capital.', officialWebsite: 'https://www.vub.be', popularPrograms: ['European Studies', 'Applied CS', 'International Law'] },
      { id: 'be-4', name: 'University of Antwerp', country: 'Belgium', city: 'Antwerp, Belgium', shortDescription: 'Leading international hub for logistics, economics, and biomedical innovation.', officialWebsite: 'https://www.uantwerpen.be', popularPrograms: ['Supply Chain & Logistics', 'Finance', 'Epidemiology'] },
      { id: 'be-5', name: 'Université Libre de Bruxelles (ULB)', country: 'Belgium', city: 'Brussels, Belgium', shortDescription: 'Prestigious French-speaking research university with numerous Nobel laureates.', officialWebsite: 'https://www.ulb.be', popularPrograms: ['Economics', 'Public Health', 'Political Science'] },
      { id: 'be-6', name: 'UCLouvain', country: 'Belgium', city: 'Louvain-la-Neuve, Belgium', shortDescription: 'Belgium’s largest French-speaking university with exceptional science parks.', officialWebsite: 'https://uclouvain.be', popularPrograms: ['Management', 'Actuarial Science', 'Civil Eng'] },
      { id: 'be-7', name: 'University of Liège', country: 'Belgium', city: 'Liège, Belgium', shortDescription: 'Renowned for space engineering, biotechnology, and veterinary medicine.', officialWebsite: 'https://www.uliege.be', popularPrograms: ['Aerospace Systems', 'Management', 'Biochem'] },
      { id: 'be-8', name: 'Hasselt University', country: 'Belgium', city: 'Hasselt, Belgium', shortDescription: 'Innovative campus with top-ranked statistics, data science, and architecture.', officialWebsite: 'https://www.uhasselt.be', popularPrograms: ['Biostatistics', 'Data Science', 'Transportation'] },
      { id: 'be-9', name: 'Antwerp Management School', country: 'Belgium', city: 'Antwerp, Belgium', shortDescription: 'Top-ranked international business school offering specialized master degrees.', officialWebsite: 'https://www.antwerpmanagementschool.be', popularPrograms: ['Maritime Management', 'Strategic IT', 'Fashion'] },
      { id: 'be-10', name: 'Vlerick Business School', country: 'Belgium', city: 'Brussels / Ghent', shortDescription: 'Triple-accredited leading European management school.', officialWebsite: 'https://www.vlerick.com', popularPrograms: ['International MBA', 'Financial Management', 'Marketing'] }
    ]
  },
  {
    id: 'romania',
    countryName: 'Romania',
    slug: 'romania',
    flagEmoji: '🇷🇴',
    flagCode: 'ro',
    heroImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Affordable European Education, Fast Admission & English-Taught Medicine/IT',
    overview: 'Romania offers high-quality, EU-recognized medical, engineering, and IT degrees with low tuition fees, affordable living costs, no complex entrance exams for many faculties, and full integration into the European Schengen Area.',
    whyStudy: [
      { title: 'EU-Recognized Medical & Dental Degrees', description: 'Direct WHO, WFME, and PMDC/GMC recognized General Medicine and Dentistry in English.' },
      { title: 'Very Low Tuition & Living Costs', description: 'Tuition starts from €2,000/year and living expenses are among the lowest in the European Union.' },
      { title: 'Fast Ministry Acceptance Letter (Scrisoare)', description: 'Direct acceptance letter issued by the Romanian Ministry of Education.' },
      { title: 'Schengen Member Status', description: 'Free travel across all Schengen member states during your studies.' }
    ],
    popularFields: [
      { name: 'General Medicine & Dentistry', desc: '6-year MD & 5-year DMD programs taught entirely in English.' },
      { name: 'Computer Science & Software Tech', desc: 'Software engineering, cybersecurity, and algorithms.' },
      { name: 'Civil & Mechanical Engineering', desc: 'Structural engineering, robotics, and industrial design.' },
      { name: 'Pharmacy & Health Sciences', desc: 'Clinical pharmacy, pharmacology, and drug development.' },
      { name: 'Business Administration & Management', desc: 'International trade, finance, and tourism management.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 60%+ in Intermediate (FSc Pre-Medical for Medicine; Pre-Engineering for Tech). Postgraduate: Bachelor degree in relevant field.',
      english: 'English Proficiency Certificate from previous institution OR IELTS (5.5–6.0) OR university internal English test.',
      documents: ['Attested Intermediate/Bachelor Transcripts & Certificates', 'Birth Certificate (MOFA attested)', 'Police Character Certificate', 'Medical Certificate certifying fitness to study abroad', 'Valid Passport Copy', 'Ministry Application Form'],
      notes: 'All foreign academic documents must be certified by the Ministry of Foreign Affairs (MOFA) Pakistan before submission.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Program Choice', description: 'Selecting Romanian university and checking Ministry quota availability.' },
      { step: '02', title: 'Document Translation & Attestation', description: 'MOFA attestation and certified Romanian translation of educational records.' },
      { step: '03', title: 'Submission to Ministry of Education', description: 'University forwards file to Romanian Ministry of National Education.' },
      { step: '04', title: 'Acceptance Letter Issuance', description: 'Receipt of official Letter of Acceptance to Studies (Scrisoare de acceptare la studii).' },
      { step: '05', title: 'Tuition Fee Payment', description: 'Transferring 1st year tuition fee directly to university bank account.' },
      { step: '06', title: 'Accommodation Booking', description: 'Securing university dormitory or private certified rental contract.' },
      { step: '07', title: 'eVisa Application (D/SD)', description: 'Registering application on the Romanian Ministry of Foreign Affairs eVisa portal.' },
      { step: '08', title: 'Embassy Appointment Islamabad', description: 'Attending visa interview at Romanian Embassy in Islamabad.' },
      { step: '09', title: 'Long Stay D-Visa Stamp', description: 'Receiving Long Stay Student Visa in passport.' },
      { step: '10', title: 'Arrival & Residence Permit (Permis de Ședere)', description: 'Registering with General Inspectorate for Immigration (IGI) in Romania.' }
    ],
    visaProcess: {
      name: 'Long-Stay Visa for Study Purposes (Type D/SD)',
      processingTime: '3 to 6 weeks',
      financialProof: 'Proof of tuition fee payment + minimum €500/month living expense proof for the duration of the visa.',
      requiredDocuments: ['Ministry Letter of Acceptance (Original)', 'Proof of 1-Year Tuition Payment', 'Proof of Accommodation in Romania', 'Police Clearance Certificate (MOFA attested)', 'Medical Insurance valid for Romania', 'Bank Statement showing sufficient maintenance funds', 'Valid Pakistani Passport'],
      officialNotice: 'The Romanian Ministry acceptance letter is valid only for the specified academic year and university.',
      officialPortalUrl: 'https://evisa.mae.ro/'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€2,000 – €6,000 / year (Medicine: €6,000–€8,500/yr)',
      tuitionPostgrad: '€2,200 – €5,000 / year',
      livingMonthly: '€400 – €650 / month',
      visaFee: '€120',
      healthInsurance: '€30 – €50 / month'
    },
    scholarships: [
      { name: 'Romanian Government Scholarships (MFA)', coverage: 'Free tuition + free accommodation in dormitories + monthly allowance', provider: 'Romanian Ministry of Foreign Affairs (MFA)', criteria: 'Merit-based annual competition for non-EU international students.' },
      { name: 'University Academic Excellence Awards', coverage: 'Partial tuition fee reduction (up to 30%)', provider: 'Individual Romanian Universities', criteria: 'Top ranking in semester academic assessments.' }
    ],
    intakes: [
      { month: 'October', term: 'Autumn Intake (Annual Primary)', applicationDeadline: 'May 1 – July 31' },
      { month: 'February', term: 'Preparatory Year Intake', applicationDeadline: 'November – December' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 4 hours per day (20 hours per week) without needing a separate work permit.',
      postStudy: '9-month residence permit extension to seek employment in Romania or convert to work residence.',
      notes: 'Romania is a fast-growing European IT and medical outsourcing hub.'
    },
    officialGovernmentLinks: [
      { title: 'Romanian Ministry of Foreign Affairs eVisa', url: 'https://evisa.mae.ro/', agency: 'Romanian MFA' },
      { title: 'Study in Romania Official Portal', url: 'https://studyinromania.gov.ro/', agency: 'Ministry of Education Romania' }
    ],
    universities: [
      { id: 'ro-1', name: 'University of Bucharest', country: 'Romania', city: 'Bucharest, Romania', shortDescription: 'Leading Romanian comprehensive university founded in 1864.', officialWebsite: 'https://unibuc.ro', popularPrograms: ['Computer Science', 'Law', 'International Relations'] },
      { id: 'ro-2', name: 'Politehnica University of Bucharest', country: 'Romania', city: 'Bucharest, Romania', shortDescription: 'Largest technical and engineering university in Romania and Eastern Europe.', officialWebsite: 'https://upb.ro', popularPrograms: ['Automatic Control & CS', 'Telecommunications', 'Mechanical Eng'] },
      { id: 'ro-3', name: 'Babeș-Bolyai University', country: 'Romania', city: 'Cluj-Napoca, Romania', shortDescription: 'Highest ranked Romanian university in global academic rankings.', officialWebsite: 'https://www.ubbcluj.ro', popularPrograms: ['Mathematics', 'Economics', 'Environmental Science'] },
      { id: 'ro-4', name: 'Carol Davila University of Medicine and Pharmacy', country: 'Romania', city: 'Bucharest, Romania', shortDescription: 'Premier medical school in Romania training top doctors across Europe.', officialWebsite: 'https://umfcd.ro', popularPrograms: ['General Medicine', 'Dentistry', 'Pharmacy'] },
      { id: 'ro-5', name: 'Iuliu Hațieganu University of Medicine and Pharmacy', country: 'Romania', city: 'Cluj-Napoca, Romania', shortDescription: 'Distinguished French and English medical programs with modern simulation labs.', officialWebsite: 'https://www.umfcluj.ro', popularPrograms: ['Medicine in English', 'Dentistry', 'Nursing'] },
      { id: 'ro-6', name: 'Technical University of Cluj-Napoca', country: 'Romania', city: 'Cluj-Napoca, Romania', shortDescription: 'Hub of Romania’s IT capital with intense software company partnerships.', officialWebsite: 'https://www.utcluj.ro', popularPrograms: ['Software Eng', 'Robotics', 'Civil Engineering'] },
      { id: 'ro-7', name: 'Alexandru Ioan Cuza University', country: 'Romania', city: 'Iași, Romania', shortDescription: 'Oldest higher education institution in modern Romania.', officialWebsite: 'https://www.uaic.ro', popularPrograms: ['Computer Science', 'Business Admin', 'Chemistry'] },
      { id: 'ro-8', name: 'Grigore T. Popa University of Medicine and Pharmacy', country: 'Romania', city: 'Iași, Romania', shortDescription: 'Historic medical university with vast international student body.', officialWebsite: 'https://www.umfiasi.ro', popularPrograms: ['General Medicine', 'Dental Medicine', 'Bioengineering'] },
      { id: 'ro-9', name: 'West University of Timișoara', country: 'Romania', city: 'Timișoara, Romania', shortDescription: 'Dynamic university in European Capital of Culture.', officialWebsite: 'https://www.uvt.ro', popularPrograms: ['Economics', 'Computer Science', 'Arts'] },
      { id: 'ro-10', name: 'Transilvania University of Brașov', country: 'Romania', city: 'Brașov, Romania', shortDescription: 'Surrounded by mountains with excellent forestry, automotive, and tech faculties.', officialWebsite: 'https://www.unitbv.ro', popularPrograms: ['Automotive Engineering', 'Wood Tech', 'Business'] }
    ]
  },
  {
    id: 'hungary',
    countryName: 'Hungary',
    slug: 'hungary',
    flagEmoji: '🇭🇺',
    flagCode: 'hu',
    heroImage: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Stipendium Hungaricum Fully-Funded Scholarships, Central European Excellence',
    overview: 'Hungary is a premier destination in Central Europe, famous for the fully funded Stipendium Hungaricum scholarship program for Pakistani students, highly prestigious medical schools, and high-tech engineering degrees in vibrant Budapest.',
    whyStudy: [
      { title: 'Stipendium Hungaricum Scholarships', description: 'Over 400 fully funded scholarship seats allocated specifically for Pakistani students via HEC annually.' },
      { title: 'World-Renowned Medicine & Dentistry', description: 'Semmelweis, Debrecen, and Szeged degrees are recognized globally (GMC, USMLE, PMDC).' },
      { title: 'Affordable Self-Funded Options', description: 'Very low tuition fees (€3,000–€6,000) and highly affordable European living costs in Budapest and Debrecen.' },
      { title: '9-Month Post-Study Job-Search Visa', description: 'Opportunity to stay and work in Hungary or across the Schengen area after graduating.' }
    ],
    popularFields: [
      { name: 'General Medicine & Pharmacy', desc: 'World-renowned medical training and clinical rotations.' },
      { name: 'Computer Science & Software Dev', desc: 'Cybersecurity, algorithmic design, and big data.' },
      { name: 'Mechatronics & Vehicle Engineering', desc: 'Automotive research with Audi, Mercedes, and BMW plants in Hungary.' },
      { name: 'Business Administration & Management', desc: 'International economics, corporate finance, and marketing.' },
      { name: 'Agricultural & Environmental Science', desc: 'Food engineering, precision agriculture, and sustainability.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 65%+ in Intermediate (FSc/ICS) or A-Levels. Postgraduate: 2.8+ CGPA in 4-year Bachelor degree.',
      english: 'IELTS: 5.5–6.5 or TOEFL iBT: 72+ or University Internal Entrance Exam.',
      documents: ['Attested Transcripts and Certificates (IBCC & HEC)', 'Medical Certificate (Hep B/C, HIV, Chest X-ray)', 'Statement of Purpose / Motivation Letter', 'Updated Resume / CV', 'Copy of Valid Passport', 'Two Academic Recommendation Letters'],
      notes: 'Medical and dental programs require a written and oral entrance examination in Biology and Chemistry.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Route Selection', description: 'Determining whether to apply via Stipendium Hungaricum (HEC) or direct self-funded route.' },
      { step: '02', title: 'Application Submission & Entrance Exam', description: 'Registering on university portal and sitting online written/oral assessment.' },
      { step: '03', title: 'Acceptance Letter (Értesítés)', description: 'Receiving formal acceptance letter and paying initial tuition deposit.' },
      { step: '04', title: 'Accommodation Certificate', description: 'Arranging university dormitory or private lease contract for visa purposes.' },
      { step: '05', title: 'Financial Proof Setup', description: 'Maintaining 6-month bank statement demonstrating full tuition and living support.' },
      { step: '06', title: 'Embassy Appointment Booking', description: 'Scheduling appointment at the Embassy of Hungary in Islamabad.' },
      { step: '07', title: 'Visa Interview in Islamabad', description: 'Submitting original files and participating in student credibility interview.' },
      { step: '08', title: 'D-Type Visa Grant', description: 'Receiving single-entry D-Visa sticker authorizing entry into Hungary.' },
      { step: '09', title: 'Arrival in Hungary', description: 'Traveling to Budapest/Debrecen and checking into accommodation.' },
      { step: '10', title: 'Residence Permit Collection', description: 'Collecting biometric Residence Permit (Tartózkodási Engedély) at National Directorate (OIF).' }
    ],
    visaProcess: {
      name: 'Residence Permit for the Purpose of Studies (D-Visa)',
      processingTime: '3 to 6 weeks',
      financialProof: 'Tuition receipt + €6,000–€8,000 in student or parent bank account with 6 months verifiable history.',
      requiredDocuments: ['Official University Admission Certificate', 'Proof of Tuition Payment', 'Proof of Accommodation in Hungary', 'Attested Educational Certificates (HEC/MOFA)', 'Medical Certificate of Fitness', 'Bank Statement & Affidavit of Support', 'Valid Pakistani Passport'],
      officialNotice: 'The Hungarian Embassy in Islamabad conducts mandatory oral interviews evaluating English fluency and motivation.',
      officialPortalUrl: 'http://www.bmbah.hu/index.php?lang=en'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€3,000 – €6,500 / year (Medicine: €12,000–€16,000/yr)',
      tuitionPostgrad: '€3,500 – €7,500 / year',
      livingMonthly: '€500 – €800 / month',
      visaFee: '€110',
      healthInsurance: '€150 – €250 / year'
    },
    scholarships: [
      { name: 'Stipendium Hungaricum Scholarship', coverage: '100% Tuition Waiver + Free Dormitory/Housing Allowance + Monthly Stipend + Health Insurance', provider: 'Tempus Public Foundation / Hungarian Government & HEC Pakistan', criteria: 'Merit-based through HEC HAT test and university interviews.' },
      { name: 'Erasmus+ Mobility Grants', coverage: '€400–€800 monthly exchange support', provider: 'European Commission', criteria: 'Available during semester exchange at partner European universities.' }
    ],
    intakes: [
      { month: 'September', term: 'Autumn Semester (Primary Intake)', applicationDeadline: 'January 15 (Scholarship) / June 15 (Self-funded)' },
      { month: 'February', term: 'Spring Semester (Selected Tech Courses)', applicationDeadline: 'November 15' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 30 hours per week during term time; up to 66 working days per year outside term time.',
      postStudy: '9-month Study-to-Work residence permit upon degree completion.',
      notes: 'Budapest is home to major regional service hubs for Morgan Stanley, BlackRock, and IBM.'
    },
    officialGovernmentLinks: [
      { title: 'Study in Hungary (Tempus Public Foundation)', url: 'https://studyinhungary.hu', agency: 'Tempus Public Foundation' },
      { title: 'Hungarian National Directorate-General for Aliens Policing (OIF)', url: 'http://www.bmbah.hu', agency: 'Ministry of Interior Hungary' }
    ],
    universities: [
      { id: 'hu-1', name: 'University of Debrecen', country: 'Hungary', city: 'Debrecen, Hungary', shortDescription: 'Largest international student community in Hungary with world-renowned medical and IT faculties.', officialWebsite: 'https://unideb.hu', popularPrograms: ['Medicine', 'Computer Science', 'Biochemical Eng'] },
      { id: 'hu-2', name: 'Eötvös Loránd University (ELTE)', country: 'Hungary', city: 'Budapest, Hungary', shortDescription: 'Hungary’s premier research university producing five Nobel laureates.', officialWebsite: 'https://www.elte.hu', popularPrograms: ['Informatics', 'Psychology', 'International Relations'] },
      { id: 'hu-3', name: 'Budapest University of Technology and Economics (BME)', country: 'Hungary', city: 'Budapest, Hungary', shortDescription: 'Top technical institute in Central Europe with outstanding engineering heritage.', officialWebsite: 'https://www.bme.hu', popularPrograms: ['Mechanical Eng', 'Architecture', 'Computer Eng'] },
      { id: 'hu-4', name: 'Semmelweis University', country: 'Hungary', city: 'Budapest, Hungary', shortDescription: 'Top 250 global medical institution specialized exclusively in healthcare and life sciences.', officialWebsite: 'https://semmelweis.hu', popularPrograms: ['General Medicine', 'Dentistry', 'Pharmaceutical Sciences'] },
      { id: 'hu-5', name: 'University of Szeged', country: 'Hungary', city: 'Szeged, Hungary', shortDescription: 'Ranked top university in Hungary; home to Nobel laureate Albert Szent-Györgyi.', officialWebsite: 'https://u-szeged.hu', popularPrograms: ['Medicine', 'Computer Science', 'Business Admin'] },
      { id: 'hu-6', name: 'University of Pécs', country: 'Hungary', city: 'Pécs, Hungary', shortDescription: 'First university in Hungary (founded in 1367) with extensive English degree offerings.', officialWebsite: 'https://international.pte.hu', popularPrograms: ['Architecture', 'Dentistry', 'Business'] },
      { id: 'hu-7', name: 'Corvinus University of Budapest', country: 'Hungary', city: 'Budapest, Hungary', shortDescription: 'Leading university in Central Europe for economics, finance, and business.', officialWebsite: 'https://www.uni-corvinus.hu', popularPrograms: ['Applied Economics', 'Finance', 'International Business'] },
      { id: 'hu-8', name: 'Óbuda University', country: 'Hungary', city: 'Budapest, Hungary', shortDescription: 'Specialized in robotics, mechatronics, and applied technology.', officialWebsite: 'https://uni-obuda.hu', popularPrograms: ['Mechatronics', 'Cybersecurity', 'Industrial Design'] },
      { id: 'hu-9', name: 'Széchenyi István University', country: 'Hungary', city: 'Győr, Hungary', shortDescription: 'Intense industrial partnership with Audi Hungaria in automotive and logistics engineering.', officialWebsite: 'https://admissions.sze.hu', popularPrograms: ['Vehicle Engineering', 'Logistics', 'Civil Eng'] },
      { id: 'hu-10', name: 'Budapest Business University (BBU)', country: 'Hungary', city: 'Budapest, Hungary', shortDescription: 'Hungary’s largest business and applied management university.', officialWebsite: 'https://uni-bge.hu', popularPrograms: ['Tourism & Catering', 'Commerce & Marketing', 'Finance'] }
    ]
  }
];
