import { Destination } from '../types';

export const DESTINATIONS_PART_2: Destination[] = [
  {
    id: 'lithuania',
    countryName: 'Lithuania',
    slug: 'lithuania',
    flagEmoji: '🇱🇹',
    flagCode: 'lt',
    heroImage: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'European Fintech Capital, High Quality Laser Tech & Affordable Tuition',
    overview: 'Lithuania is a progressive Baltic EU nation with modern English-taught degree programs, low cost of living, streamlined TRP (Temporary Residence Permit) processing, and a booming tech and fintech ecosystem in Vilnius and Kaunas.',
    whyStudy: [
      { title: 'European Fintech Capital', description: 'Vilnius is ranked #1 in the EU for licensed fintech companies with high tech startup demand.' },
      { title: 'Affordable Tuition & Living', description: 'Tuition fees range between €2,000 and €4,500/year with budget-friendly student dormitories.' },
      { title: 'Schengen Full Integration', description: 'Visa-free travel across 29 Schengen member states throughout your academic studies.' },
      { title: '12-Month Post-Study Job Search Permit', description: 'Graduates can extend their residence permit to seek employment or establish a company.' }
    ],
    popularFields: [
      { name: 'Financial Technology (FinTech)', desc: 'Blockchain, compliance, digital banking, and payments.' },
      { name: 'Laser Technology & Photonics', desc: 'World-leading precision optics and industrial laser systems.' },
      { name: 'Informatics & Software Engineering', desc: 'Full-stack development, cloud security, and big data.' },
      { name: 'Aviation Management & Piloting', desc: 'Commercial flight operations and airport logistics.' },
      { name: 'International Business & Economics', desc: 'Global marketing, trade, and strategic finance.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 60%+ in Intermediate (FSc/ICS) with SKVC recognition. Postgraduate: Bachelor degree with 2.5+ CGPA.',
      english: 'IELTS: 5.5–6.0 or TOEFL iBT: 70+ or Duolingo: 95+ or University Online English Interview.',
      documents: ['SKVC Equivalence Certificate', 'Attested Transcripts and Certificates (IBCC/HEC/MOFA)', 'Motivation Letter', 'Curriculum Vitae', 'Passport Copy', 'Bank Certificate (showing min €400/month)'],
      notes: 'Lithuanian universities require document assessment by the Centre for Quality Assessment in Higher Education (SKVC).'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Program Choice', description: 'Selecting program and verifying entry requirements on DreamApply Lithuania portal.' },
      { step: '02', title: 'SKVC Recognition Filing', description: 'Submitting academic documents to SKVC for Lithuanian qualification equivalence.' },
      { step: '03', title: 'University Application & Interview', description: 'Applying via DreamApply and attending online motivation interview.' },
      { step: '04', title: 'Letter of Acceptance & Contract', description: 'Signing Study Agreement and paying 1st year tuition fee.' },
      { step: '05', title: 'Mediation Letter (Tarpininkavimo)', description: 'University generates official electronic mediation letter for MIGRIS system.' },
      { step: '06', title: 'MIGRIS Application Filing', description: 'Submitting online Temporary Residence Permit (TRP) application on the Lithuanian Migration portal.' },
      { step: '07', title: 'VFS Biometrics & Verification', description: 'Submitting biometric data and original apostilled police clearance at VFS.' },
      { step: '08', title: 'TRP Decision', description: 'Lithuanian Migration Department issues electronic TRP card approval.' },
      { step: '09', title: 'National D-Visa / Travel', description: 'Collecting visa stamp / TRP card and flying to Vilnius/Kaunas.' },
      { step: '10', title: 'Declaration of Place of Residence', description: 'Registering local address with Eldership (Seniūnija).' }
    ],
    visaProcess: {
      name: 'Temporary Residence Permit (TRP) for Studies / National D-Visa',
      processingTime: '4 to 8 weeks (via MIGRIS)',
      financialProof: 'Tuition paid + €400/month for 12 months (€4,800) in student bank account + return ticket funds (€800).',
      requiredDocuments: ['University Electronic Mediation Letter (Tarpininkavimo raštas)', 'Proof of Paid Tuition Fee', 'Attested Police Clearance Certificate (Apostilled/MOFA)', 'Bank Certificate & Bank Statement (6 months)', 'Valid Passport with 1+ year validity', 'Health Insurance policy valid in Schengen area'],
      officialNotice: 'Lithuanian immigration uses the digital MIGRIS portal. Police records must have no criminal convictions.',
      officialPortalUrl: 'https://www.migracija.lt/en/noriu-studijuoti'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€2,200 – €5,000 / year',
      tuitionPostgrad: '€2,800 – €6,000 / year',
      livingMonthly: '€450 – €750 / month',
      visaFee: '€160 (TRP State Fee)',
      healthInsurance: '€100 – €180 / year'
    },
    scholarships: [
      { name: 'Lithuanian State Scholarships for Full-Time Master Studies', coverage: 'Full tuition fee waiver + €550 monthly living stipend', provider: 'Education Exchanges Support Foundation (SMPF)', criteria: 'Merit-based for international students with 8.5/10 GPA equivalent.' },
      { name: 'University Tuition Fee Waivers', coverage: '50%–100% reduction for academic excellence', provider: 'Vilnius University, KTU, VILNIUS TECH', criteria: 'Awarded to top 10% applicants in intake cohort.' }
    ],
    intakes: [
      { month: 'September', term: 'Autumn Intake (Main)', applicationDeadline: 'May 1 – July 1' },
      { month: 'February', term: 'Spring Intake (Selected Programs)', applicationDeadline: 'November 15 – December 15' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 20 hours per week for Bachelor students; up to 40 hours per week for Master students during entire academic year.',
      postStudy: '12 months Temporary Residence Permit extension to seek employment or start a tech business.',
      notes: 'Lithuanian law permits Master students to work full-time while completing their studies.'
    },
    officialGovernmentLinks: [
      { title: 'Migration Department of Lithuania (MIGRIS)', url: 'https://www.migracija.lt', agency: 'Ministry of the Interior Lithuania' },
      { title: 'Study in Lithuania Official Portal', url: 'https://www.studyin.lt', agency: 'SMPF' }
    ],
    universities: [
      { id: 'lt-1', name: 'Vilnius University', country: 'Lithuania', city: 'Vilnius, Lithuania', shortDescription: 'Oldest university in the Baltic states (1579), top 400 global QS ranking.', officialWebsite: 'https://www.vu.lt', popularPrograms: ['Medicine', 'Software Engineering', 'International Business'] },
      { id: 'lt-2', name: 'Kaunas University of Technology (KTU)', country: 'Lithuania', city: 'Kaunas, Lithuania', shortDescription: 'Leading tech institute in Baltics with intense robotics and chemical engineering.', officialWebsite: 'https://en.ktu.edu', popularPrograms: ['Informatics', 'Mechatronics', 'Artificial Intelligence'] },
      { id: 'lt-3', name: 'VILNIUS TECH (Vilnius Gediminas Technical University)', country: 'Lithuania', city: 'Vilnius, Lithuania', shortDescription: 'Leader in engineering, architecture, aviation, and transport logistics.', officialWebsite: 'https://vilniustech.lt', popularPrograms: ['Civil Engineering', 'Aviation Management', 'Data Science'] },
      { id: 'lt-4', name: 'Vytautas Magnus University (VMU)', country: 'Lithuania', city: 'Kaunas, Lithuania', shortDescription: 'Liberal arts powerhouse with diverse international programs and language studies.', officialWebsite: 'https://www.vdu.lt', popularPrograms: ['Applied Informatics', 'Diplomacy', 'Molecular Biology'] },
      { id: 'lt-5', name: 'Lithuanian University of Health Sciences (LSMU)', country: 'Lithuania', city: 'Kaunas, Lithuania', shortDescription: 'Top medical and veterinary university with advanced hospital training.', officialWebsite: 'https://lsmu.lt', popularPrograms: ['General Medicine', 'Dentistry', 'Pharmacy'] },
      { id: 'lt-6', name: 'Klaipėda University', country: 'Lithuania', city: 'Klaipėda, Lithuania', shortDescription: 'Specialized in marine engineering, port logistics, and renewable sea energy.', officialWebsite: 'https://www.ku.lt', popularPrograms: ['Marine Transport', 'Informatics', 'Public Health'] },
      { id: 'lt-7', name: 'ISM University of Management and Economics', country: 'Lithuania', city: 'Vilnius, Lithuania', shortDescription: 'Top-ranked private business school founded by BI Norwegian Business School.', officialWebsite: 'https://www.ism.lt', popularPrograms: ['Finance & Accounting', 'International Business', 'Economics'] },
      { id: 'lt-8', name: 'LCC International University', country: 'Lithuania', city: 'Klaipėda, Lithuania', shortDescription: 'North American accredited liberal arts model with 100% English medium.', officialWebsite: 'https://lcc.lt', popularPrograms: ['International Relations', 'Psychology', 'Business Admin'] },
      { id: 'lt-9', name: 'Mykolas Romeris University (MRU)', country: 'Lithuania', city: 'Vilnius, Lithuania', shortDescription: 'Premier social sciences, cybersecurity, and law university in Vilnius.', officialWebsite: 'https://www.mruni.eu', popularPrograms: ['Cybersecurity Management', 'International Law', 'Informatics'] },
      { id: 'lt-10', name: 'Vilnius College of Technologies and Design (VTDK)', country: 'Lithuania', city: 'Vilnius, Lithuania', shortDescription: 'Applied professional engineering, graphic design, and logistics.', officialWebsite: 'https://vtdko.lt', popularPrograms: ['Graphic Design', 'Civil Engineering', 'Automotive Transport'] }
    ]
  },
  {
    id: 'austria',
    countryName: 'Austria',
    slug: 'austria',
    flagEmoji: '🇦🇹',
    flagCode: 'at',
    heroImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1200&auto=format&fit=crop',
    tagline: 'World’s Most Livable Cities, Historic Prestige & Central European Hub',
    overview: 'Austria boasts Vienna (repeatedly voted the world’s most livable city), centuries of academic excellence, low public tuition fees (€726/semester), and the Red-White-Red Card pathway to long-term Austrian permanent residence.',
    whyStudy: [
      { title: '#1 Most Livable City in the World', description: 'Vienna offers unmatched public transport, safety, cultural richness, and student lifestyle.' },
      { title: 'Highly Affordable Public Tuition', description: 'Public universities charge only approx. €726 per semester for non-EU international students.' },
      { title: 'Red-White-Red Card (Rot-Weiß-Rot)', description: 'Graduates can obtain a 12-month search visa and transition to the points-based skilled worker card.' },
      { title: 'Central European Business Gateway', description: 'Headquarters for hundreds of multinational Central & Eastern European operations.' }
    ],
    popularFields: [
      { name: 'Computer Science & Software Tech', desc: 'Software engineering, visual computing, and quantum science.' },
      { name: 'Music, Fine Arts & Cultural Management', desc: 'Classical composition, performing arts, and heritage curation.' },
      { name: 'Applied Economics & Business', desc: 'Quantitative finance, international marketing, and logistics.' },
      { name: 'Biotechnology & Molecular Life Sciences', desc: 'Biomedical engineering, genomics, and bioprocess tech.' },
      { name: 'Mechanical & Environmental Engineering', desc: 'Hydro energy, alpine ecology, and robotics.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Intermediate (FSc/ICS) with high grades + special qualification certificate (Nachweis der besonderen Universitätsreife). Postgraduate: 4-year Bachelor degree with 3.0+ CGPA.',
      english: 'English programs: IELTS 6.5+ or TOEFL iBT 88+. German programs: Goethe/ÖSD B2 or C1.',
      documents: ['Apostilled/MOFA-Attested Transcripts and Diplomas', 'Special Qualification Certificate (Universitätsreife)', 'Statement of Motivation', 'Tabular CV in Europass format', 'Proof of Adequate Financial Means', 'Valid Passport'],
      notes: 'Austrian public universities require verified proof that the applicant is eligible to study the chosen subject in their home country.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Subject Verification', description: 'Checking Austrian curriculum equivalence and language requirements.' },
      { step: '02', title: 'Document Attestation & MOFA/Embassy Legalization', description: 'Attestation of all academic documents via IBCC/HEC, MOFA, and Austrian Embassy.' },
      { step: '03', title: 'University Application Filing', description: 'Submitting dossier directly to Austrian university registrar.' },
      { step: '04', title: 'Bescheid (Admission Notice)', description: 'Receiving formal letter of admission (Zulassungsbescheid).' },
      { step: '05', title: 'Accomodation Booking (OeAD)', description: 'Securing student housing lease contract via OeAD housing or student dorms.' },
      { step: '06', title: 'Financial Solvency Setup', description: 'Setting up Austrian bank account or verified Pakistani account meeting age-specific balance requirements.' },
      { step: '07', title: 'Health Insurance Policy', description: 'Purchasing comprehensive travel health insurance until Austrian public insurance (ÖGK) takes over.' },
      { step: '08', title: 'Austrian Embassy Islamabad Filing', description: 'Submitting Residence Permit (Aufenthaltsbewilligung - Student) application.' },
      { step: '09', title: 'Approval & D-Visa Collection', description: 'Embassy issues 4-month D-Visa for travel to Austria.' },
      { step: '10', title: 'Registration & Residence Card (Aufenthaltstitel)', description: 'Collecting plastic Residence Permit card from MA 35 in Vienna or provincial authority.' }
    ],
    visaProcess: {
      name: 'Residence Permit for Students (Aufenthaltsbewilligung – Student)',
      processingTime: '8 to 16 weeks',
      financialProof: 'Under 24 yrs: ~€672/month (€8,064/yr); 24+ yrs: ~€1,217/month (€14,604/yr) in verifiable bank account.',
      requiredDocuments: ['Admission Notice (Zulassungsbescheid)', 'Rental Contract (Wohnrechtsvereinbarung / OeAD)', 'Super-Legalized Police Clearance Certificate', 'Birth Certificate legalized by Embassy', 'Bank Confirmation with 6-month statement', 'Comprehensive Health Insurance Policy', 'Valid Pakistani Passport'],
      officialNotice: 'Austrian residence permits require legalized documents (diplomas, police clearance, birth certificates).',
      officialPortalUrl: 'https://www.oead.at/en/to-austria/entry-and-residence'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€726.72 / semester (Public) to €8,000/yr (Private)',
      tuitionPostgrad: '€726.72 / semester (Public) to €12,000/yr (Private)',
      livingMonthly: '€850 – €1,250 / month',
      visaFee: '€160 (Residence Permit Fee)',
      healthInsurance: '€69.13 / month (Subsidized ÖGK Student Rate)'
    },
    scholarships: [
      { name: 'Ernst Mach Grant for Studying in Austria', coverage: '€1,050 monthly grant + travel subsidy for 1–9 months', provider: 'OeAD-GmbH / Austrian Federal Ministry of Education', criteria: 'Postgraduate and PhD students engaged in research projects.' },
      { name: 'Franz Werfel & Richard Plaschka Fellowships', coverage: '€1,150 monthly research grant', provider: 'Austrian Agency for Education and Internationalisation', criteria: 'University teachers and researchers in humanities and social sciences.' }
    ],
    intakes: [
      { month: 'October', term: 'Winter Semester (Primary)', applicationDeadline: 'July 15 – September 5' },
      { month: 'March', term: 'Summer Semester (Secondary)', applicationDeadline: 'January 5 – February 5' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 20 hours per week for Bachelor, Master, and PhD students with employer employment permit (Beschäftigungsbewilligung).',
      postStudy: '12-month jobseeker residence permit upon graduation, leading directly to Red-White-Red Card.',
      notes: 'No labor market test (Ersatzkraftverfahren) required when transitioning from Austrian degree to Red-White-Red Card.'
    },
    officialGovernmentLinks: [
      { title: 'OeAD – Entry and Residence in Austria', url: 'https://oead.at/en/to-austria/entry-and-residence', agency: 'OeAD Austria' },
      { title: 'Austrian Federal Ministry of the Interior (BMI)', url: 'https://www.bmi.gv.at', agency: 'BMI Austria' }
    ],
    universities: [
      { id: 'at-1', name: 'University of Vienna (Universität Wien)', country: 'Austria', city: 'Vienna, Austria', shortDescription: 'One of the oldest and largest universities in Europe (founded 1365).', officialWebsite: 'https://www.univie.ac.at', popularPrograms: ['Data Science', 'Economics', 'Molecular Biology'] },
      { id: 'at-2', name: 'TU Wien (Vienna University of Technology)', country: 'Austria', city: 'Vienna, Austria', shortDescription: 'Top technical institute in Austria leading research in robotics and civil tech.', officialWebsite: 'https://www.tuwien.at', popularPrograms: ['Computer Science', 'Electrical Eng', 'Mechanical Eng'] },
      { id: 'at-3', name: 'WU (Vienna University of Economics and Business)', country: 'Austria', city: 'Vienna, Austria', shortDescription: 'Triple-accredited leading business school with stunning modern campus.', officialWebsite: 'https://www.wu.ac.at', popularPrograms: ['International Management', 'Supply Chain', 'FinTech'] },
      { id: 'at-4', name: 'Graz University of Technology (TU Graz)', country: 'Austria', city: 'Graz, Austria', shortDescription: 'Center of excellence in automotive engineering and cyber-physical systems.', officialWebsite: 'https://www.tugraz.at', popularPrograms: ['Biomedical Eng', 'Computer Science', 'Production'] },
      { id: 'at-5', name: 'University of Innsbruck', country: 'Austria', city: 'Innsbruck, Austria', shortDescription: 'Renowned alpine research university in the scenic heart of Tyrol.', officialWebsite: 'https://www.uibk.ac.at', popularPrograms: ['Atmospheric Sciences', 'Management', 'Chemistry'] },
      { id: 'at-6', name: 'Johannes Kepler University Linz (JKU)', country: 'Austria', city: 'Linz, Austria', shortDescription: 'Pioneered AI degree programs in Austria under Sepp Hochreiter.', officialWebsite: 'https://www.jku.at', popularPrograms: ['Artificial Intelligence', 'Mechatronics', 'Law'] },
      { id: 'at-7', name: 'Modul University Vienna', country: 'Austria', city: 'Vienna, Austria', shortDescription: 'Austria’s leading international private university on Kahlenberg.', officialWebsite: 'https://www.modul.ac.at', popularPrograms: ['International Tourism', 'Applied Data Science', 'Business'] },
      { id: 'at-8', name: 'Webster Vienna Private University', country: 'Austria', city: 'Vienna, Austria', shortDescription: 'American accredited dual-degree curriculum in historic Palais Wenkheim.', officialWebsite: 'https://www.webster.ac.at', popularPrograms: ['International Relations', 'Media Comm', 'Business'] },
      { id: 'at-9', name: 'University of Klagenfurt', country: 'Austria', city: 'Klagenfurt, Austria', shortDescription: 'Top young university near Lake Wörthersee specializing in cybersecurity.', officialWebsite: 'https://www.aau.at', popularPrograms: ['Informatics', 'Game Studies', 'Management'] },
      { id: 'at-10', name: 'MCI The Entrepreneurial School', country: 'Austria', city: 'Innsbruck, Austria', shortDescription: 'Renowned business and engineering institution focused on innovation.', officialWebsite: 'https://www.mci.edu', popularPrograms: ['Biotechnology', 'Executive Management', 'Mechatronics'] }
    ]
  },
  {
    id: 'turkiye',
    countryName: 'Türkiye',
    slug: 'turkiye',
    flagEmoji: '🇹🇷',
    flagCode: 'tr',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Türkiye Bursları Scholarships, Cultural Affinity & Modern University Campuses',
    overview: 'Türkiye is one of the most culturally welcoming destinations for Pakistani students, offering prestigious government-funded scholarships (Türkiye Bursları), English-taught engineering and medical degrees, modern facilities, and a seamless bridge between Asia and Europe.',
    whyStudy: [
      { title: 'Türkiye Bursları Fully Funded Scholarship', description: 'Over 1,000 Pakistani students win full tuition, free accommodation, monthly stipend, and air tickets annually.' },
      { title: 'Strong Cultural & Brotherly Bonds', description: 'Deep historical ties and welcoming environment making Pakistani students feel at home.' },
      { title: 'Affordable World-Class Education', description: 'Low annual tuition fees ($2,500–$8,000 for English private degrees) and budget-friendly living.' },
      { title: 'Strategic Eurasian Hub', description: 'Gateway between European and Middle Eastern markets with robust industrial partnerships.' }
    ],
    popularFields: [
      { name: 'General Medicine & Dentistry', desc: 'English-medium MD & DMD programs with world-class teaching hospitals.' },
      { name: 'Computer Engineering & AI', desc: 'Software systems, defense technology, and big data.' },
      { name: 'Aviation & Aerospace Engineering', desc: 'UAV systems, flight dynamics, and avionics (Baykar/TAI ecosystem).' },
      { name: 'Architecture & Civil Engineering', desc: 'Megastructure construction, earthquake engineering, and urban planning.' },
      { name: 'International Relations & Islamic Banking', desc: 'Diplomacy, Middle Eastern studies, and participation finance.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 65%+ in Intermediate (FSc/ICS) or A-Levels. SAT test optional/recommended for top public universities. Postgraduate: 2.7+ CGPA in 4-year Bachelor degree.',
      english: 'IELTS: 6.0–6.5 or TOEFL iBT: 78+ or University English Proficiency Exam on campus.',
      documents: ['Attested Transcripts and Equivalence (Denklik Belgesi)', 'Passport Copy (minimum 1-year validity)', 'Statement of Purpose / Study Plan', 'Two Recommendation Letters', 'Biometric Photographs (white background)', 'Bank Statement proving financial capacity'],
      notes: 'Pakistani students require high school diploma equivalence (Denklik Belgesi) issued by the Turkish Embassy or Ministry of National Education.'
    },
    admissionProcess: [
      { step: '01', title: 'Profile Evaluation & Scholarship Screening', description: 'Evaluating eligibility for Türkiye Bursları scholarship or direct private university scholarship.' },
      { step: '02', title: 'University Application Filing', description: 'Direct submission to top Turkish private/foundation universities with immediate conditional letter.' },
      { step: '03', title: 'Official Acceptance & Deposit', description: 'Receiving official acceptance letter and paying required deposit to registrar.' },
      { step: '04', title: 'Official Visa Support Letter', description: 'University issues formal visa confirmation letter to Turkish Consulate.' },
      { step: '05', title: 'Anatolia Visa Appointment Booking', description: 'Booking student visa appointment at Anatolia Travel Services (Peshawar/Islamabad/Lahore).' },
      { step: '06', title: 'Document Attestation & Submission', description: 'Submitting original attested educational certificates, bank statements, and health insurance.' },
      { step: '07', title: 'Visa Sticker Grant', description: 'Receiving single-entry Turkish Education Visa in passport.' },
      { step: '08', title: 'Travel & Campus Arrival', description: 'Arriving in Istanbul/Ankara and checking into university dormitory.' },
      { step: '09', title: 'University Registration (Kayıt)', description: 'Final registration at university student affairs office with original documents.' },
      { step: '10', title: 'Student Residence Permit (İkamet)', description: 'Filing e-İkamet on Göç İdaresi portal and receiving Turkish Ikamet card.' }
    ],
    visaProcess: {
      name: 'Education / Student Visa (Single Entry)',
      processingTime: '2 to 4 weeks (via Anatolia Travel Services)',
      financialProof: 'Bank statement with min $4,000–$6,000 equivalent with 3-6 months transaction history and sponsor affidavit.',
      requiredDocuments: ['Official University Acceptance Letter', 'Tuition Fee Deposit Receipt', 'Attested Educational Certificates (IBCC/HEC/MOFA)', 'Police Character Certificate', 'Travel Health Insurance for Türkiye', 'Anatolia Visa Application Form', 'Valid Pakistani Passport'],
      officialNotice: 'Students apply for the Turkish student visa via Anatolia Travel Services centers located across Pakistan.',
      officialPortalUrl: 'https://www.konsolosluk.gov.tr/'
    },
    estimatedCosts: {
      currency: 'USD ($)',
      tuitionUndergrad: '$2,500 – $7,500 / year (Medicine: $12,000–$22,000/yr)',
      tuitionPostgrad: '$2,800 – $8,000 / year',
      livingMonthly: '$350 – $600 / month',
      visaFee: '$100 – $150 (Visa + Anatolia service fee)',
      healthInsurance: '$50 – $100 / year (General Health Insurance - GSS)'
    },
    scholarships: [
      { name: 'Türkiye Bursları Government Scholarship', coverage: '100% Tuition Waiver + Free Dormitory + Monthly Stipend (₺3,500–₺6,000) + Airfare + 1-yr Turkish Language Course', provider: 'YTB / Government of Türkiye', criteria: 'Merit-based application (minimum 75% for general; 90% for Medicine).' },
      { name: 'RS Partner University Merit Grants', coverage: '25% – 75% direct tuition fee discounts', provider: 'Koç, Sabancı, Bilgi, Medipol, Bahçeşehir, Aydın', criteria: 'Early submission with strong FSc/A-Level marks.' }
    ],
    intakes: [
      { month: 'September / October', term: 'Fall Semester (Main Intake)', applicationDeadline: 'February 20 (Scholarships) / August 31 (Direct)' },
      { month: 'February', term: 'Spring Semester (Selected Faculties)', applicationDeadline: 'December 15 – January 20' }
    ],
    workOpportunities: {
      duringStudy: 'Undergraduate students can work after their first year (up to 24 hours/week); Master and PhD students can work with official work permit.',
      postStudy: '1-year short-term residence permit for job search, leading to company-sponsored Turkish work permit.',
      notes: 'Istanbul is a major regional hub for aerospace, fintech, e-commerce (Trendyol), and manufacturing.'
    },
    officialGovernmentLinks: [
      { title: 'Türkiye Bursları Official Portal', url: 'https://www.turkiyeburslari.gov.tr', agency: 'Presidency for Turks Abroad (YTB)' },
      { title: 'Study in Türkiye (CoHE / YÖK)', url: 'https://www.studyinturkiye.gov.tr', agency: 'Council of Higher Education Türkiye' }
    ],
    universities: [
      { id: 'tr-1', name: 'Koç University', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'Top ranked Turkish university, globally prominent in research and medicine.', officialWebsite: 'https://www.ku.edu.tr', popularPrograms: ['Computer Science', 'Medicine', 'Economics'] },
      { id: 'tr-2', name: 'Sabancı University', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'Innovative interdisciplinary model ranked in world top 500.', officialWebsite: 'https://www.sabanciuniv.edu', popularPrograms: ['Data Analytics', 'Mechatronics', 'Finance'] },
      { id: 'tr-3', name: 'Middle East Technical University (METU)', country: 'Türkiye', city: 'Ankara, Türkiye', shortDescription: 'Premier public technical university; 100% English medium in all disciplines.', officialWebsite: 'https://www.metu.edu.tr', popularPrograms: ['Aerospace Eng', 'Computer Eng', 'Civil Eng'] },
      { id: 'tr-4', name: 'Istanbul Medipol University', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'State-of-the-art medical megahospital complex with English MD & Dentistry.', officialWebsite: 'https://www.medipol.edu.tr', popularPrograms: ['General Medicine', 'Dentistry', 'Biomedical Eng'] },
      { id: 'tr-5', name: 'Bahçeşehir University (BAU)', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'Global network university located on the picturesque shores of the Bosphorus.', officialWebsite: 'https://bau.edu.tr', popularPrograms: ['Software Engineering', 'Architecture', 'Business'] },
      { id: 'tr-6', name: 'Bilkent University', country: 'Türkiye', city: 'Ankara, Türkiye', shortDescription: 'First private non-profit university in Türkiye, renowned for engineering and arts.', officialWebsite: 'https://w3.bilkent.edu.tr', popularPrograms: ['Electrical Eng', 'International Relations', 'CS'] },
      { id: 'tr-7', name: 'Istanbul Bilgi University', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'QS 4-Star accredited with strong international business and media faculties.', officialWebsite: 'https://www.bilgi.edu.tr', popularPrograms: ['Digital Game Design', 'Law', 'International Finance'] },
      { id: 'tr-8', name: 'Altınbaş University', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'Highly popular among international students for medicine, pharmacy, and engineering.', officialWebsite: 'https://altinbas.edu.tr', popularPrograms: ['Pharmacy', 'General Medicine', 'Management'] },
      { id: 'tr-9', name: 'Istanbul Aydın University', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'Technological university with massive campus and industry techno-center.', officialWebsite: 'https://www.aydin.edu.tr', popularPrograms: ['Software Eng', 'Aviation Management', 'Dentistry'] },
      { id: 'tr-10', name: 'Boğaziçi University', country: 'Türkiye', city: 'Istanbul, Türkiye', shortDescription: 'Prestigious public research institution with historical American collegiate heritage.', officialWebsite: 'https://bogazici.edu.tr', popularPrograms: ['Computer Science', 'Management', 'Psychology'] }
    ]
  },
  {
    id: 'south-cyprus',
    countryName: 'South Cyprus',
    slug: 'south-cyprus',
    flagEmoji: '🇨🇾',
    flagCode: 'cy',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
    tagline: 'European Union Member, Mediterranean Climate & English-Medium Higher Education',
    overview: 'South Cyprus (Republic of Cyprus) is a full European Union member state situated in the Eastern Mediterranean. It offers accredited European university degrees taught in English, high safety, affordable tuition, and clear transfer pathways across Europe.',
    whyStudy: [
      { title: 'Full European Union Member State', description: 'Degrees comply with the Bologna Process and European Higher Education Area (EHEA) standards.' },
      { title: 'English as Common Lingua Franca', description: 'Over 80% of the population speaks fluent English with British academic legal and higher education traditions.' },
      { title: 'Sunny Mediterranean Lifestyle & Safety', description: 'Consistently ranked among the safest countries in the world with low crime and beautiful coastal cities.' },
      { title: 'Part-Time Work Rights', description: 'International students are legally permitted to work part-time in designated sectors during studies.' }
    ],
    popularFields: [
      { name: 'Hotel & Tourism Management', desc: 'Boutique hospitality, casino operations, and international resort leadership.' },
      { name: 'Computer Science & Cybersecurity', desc: 'Cloud infrastructure, mobile apps, and cyber forensics.' },
      { name: 'Business Administration & Maritime Trade', desc: 'Shipping logistics, international trade, and accounting (ACCA).' },
      { name: 'General Medicine & Biomedical Sciences', desc: 'Clinical medical training partnered with European hospitals.' },
      { name: 'Civil & Oil and Gas Engineering', desc: 'Structural engineering and Eastern Mediterranean offshore energy.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 55%+ in Intermediate (FSc/ICS/FA) or A-Levels. Postgraduate: 2.4+ CGPA in Bachelor degree.',
      english: 'IELTS: 5.5–6.0 or TOEFL: 70+ or University Internal Placement Test on arrival.',
      documents: ['MOFA Attested Transcripts & Certificates', 'Police Clearance Certificate (Apostilled/MOFA)', 'Medical Test Reports (HIV, Hep B/C, VDRL, Chest X-Ray)', 'Bank Guarantee Letter & Statement', 'Valid Passport (minimum 2 years validity)', 'Completed Cyprus Entry Application'],
      notes: 'Entry permits for South Cyprus are authorized by the Civil Registry and Migration Department in Nicosia.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Program Choice', description: 'Selecting degree in Nicosia, Limassol, Larnaca, or Paphos.' },
      { step: '02', title: 'Conditional Offer Letter', description: 'Submitting academic transcripts and receiving formal offer letter.' },
      { step: '03', title: 'Medical Tests & Attestation', description: 'Completing required blood tests and X-Ray, followed by MOFA attestation.' },
      { step: '04', title: 'Tuition Fee Payment', description: 'Transferring 1st semester/annual tuition deposit to university account.' },
      { step: '05', title: 'Migration Filing in Nicosia', description: 'University submits student dossier directly to the Migration Department in Cyprus.' },
      { step: '06', title: 'Entry Permit (M-61) Issuance', description: 'Migration Department in Nicosia issues official White Paper Entry Permit (M-61).' },
      { step: '07', title: 'Flight Booking & Travel Clearance', description: 'Booking flights via Transit Hub (e.g. Dubai/Doha) to Larnaca (LCA) or Paphos (PFO).' },
      { step: '08', title: 'Arrival at Larnaca Airport', description: 'Airport immigration verification with original M-61 Entry Permit.' },
      { step: '09', title: 'Campus Medical & Registration', description: 'Repeating mandatory localized blood test and finalizing university enrollment.' },
      { step: '10', title: 'Temporary Residence Permit Card', description: 'Biometric capture and issuance of Republic of Cyprus Student ARC card.' }
    ],
    visaProcess: {
      name: 'Republic of Cyprus Student Entry Permit (M-61 / Blue Slip)',
      processingTime: '3 to 6 weeks (Processed directly via Ministry of Interior Cyprus)',
      financialProof: 'Bank statement of €6,000–€7,000 + bank guarantee deposit (€500–€850) refundable upon graduation.',
      requiredDocuments: ['Official University Acceptance Letter', 'MOFA Attested Intermediate/Bachelor Certificates', 'Police Clearance Certificate (MOFA attested)', 'Medical Fitness Certificate (HIV, Hep B/C, TB, VDRL)', 'Bank Statement & Guarantee Letter', 'Passport copy with 2-year validity'],
      officialNotice: 'Admission and Entry Permits for South Cyprus are processed strictly through the recognized authorities in the Republic of Cyprus.',
      officialPortalUrl: 'http://www.moi.gov.cy/crmd'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€3,800 – €7,500 / year (Medicine: €9,000–€18,000/yr)',
      tuitionPostgrad: '€4,200 – €8,500 / year',
      livingMonthly: '€450 – €750 / month',
      visaFee: '€70 Entry Permit + €34 ARC Card',
      healthInsurance: '€120 – €180 / year'
    },
    scholarships: [
      { name: 'University Academic Excellence Scholarships', coverage: '30% to 50% tuition reduction', provider: 'University of Nicosia, European University Cyprus, Frederick University', criteria: 'Granted automatically based on 70%+ in Intermediate/Bachelor marks.' },
      { name: 'Sports & Athletic Scholarships', coverage: '20% to 40% tuition assistance', provider: 'Cypriot Universities', criteria: 'Outstanding performance in university varsity sports.' }
    ],
    intakes: [
      { month: 'October', term: 'Fall Semester (Main)', applicationDeadline: 'August 15' },
      { month: 'February', term: 'Spring Semester (Major)', applicationDeadline: 'December 15' },
      { month: 'June', term: 'Summer Term (English & Preparatory)', applicationDeadline: 'April 30' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 20 hours per week in government-approved sectors (hospitality, logistics, food service, agriculture) after completing initial 6 months.',
      postStudy: 'Graduates may apply for post-study work or company employment permit with Cypriot companies.',
      notes: 'Limassol is Europe’s largest ship-management capital with strong maritime finance careers.'
    },
    officialGovernmentLinks: [
      { title: 'Civil Registry and Migration Department (CRMD)', url: 'http://www.moi.gov.cy/crmd', agency: 'Ministry of Interior Cyprus' },
      { title: 'Higher Education in Cyprus (KYSATS)', url: 'http://www.kysats.ac.cy', agency: 'Ministry of Education, Sport and Youth' }
    ],
    universities: [
      { id: 'cy-1', name: 'University of Nicosia (UNIC)', country: 'South Cyprus', city: 'Nicosia, Cyprus', shortDescription: 'Largest university in Southern Europe teaching in English, #1 in Blockchain.', officialWebsite: 'https://www.unic.ac.cy', popularPrograms: ['Digital Currency / Blockchain', 'Medicine', 'Computer Science'] },
      { id: 'cy-2', name: 'European University Cyprus (EUC)', country: 'South Cyprus', city: 'Nicosia, Cyprus', shortDescription: 'Member of Galileo Global Education; top medical and dental faculties.', officialWebsite: 'https://euc.ac.cy', popularPrograms: ['Dentistry', 'General Medicine', 'Cybersecurity'] },
      { id: 'cy-3', name: 'University of Cyprus (UCY)', country: 'South Cyprus', city: 'Nicosia, Cyprus', shortDescription: 'Leading public research institution ranked in world top 500.', officialWebsite: 'https://www.ucy.ac.cy', popularPrograms: ['Economics', 'Electrical Engineering', 'Civil Eng'] },
      { id: 'cy-4', name: 'Frederick University', country: 'South Cyprus', city: 'Nicosia / Limassol', shortDescription: 'Renowned for maritime engineering, architecture, and technology.', officialWebsite: 'https://www.frederick.ac.cy', popularPrograms: ['Maritime Studies', 'Automotive Eng', 'Computer Science'] },
      { id: 'cy-5', name: 'Cyprus University of Technology (CUT / TEPAK)', country: 'South Cyprus', city: 'Limassol, Cyprus', shortDescription: 'Premier public institute of technology situated in coastal Limassol.', officialWebsite: 'https://www.cut.ac.cy', popularPrograms: ['Hotel & Tourism Mgmt', 'Chemical Eng', 'Communication'] },
      { id: 'cy-6', name: 'Neapolis University Pafos', country: 'South Cyprus', city: 'Paphos, Cyprus', shortDescription: 'Modern campus focusing on real estate, finance, civil engineering, and law.', officialWebsite: 'https://www.nup.ac.cy', popularPrograms: ['Real Estate Management', 'Architecture', 'AI Systems'] },
      { id: 'cy-7', name: 'UCLan Cyprus (University of Central Lancashire)', country: 'South Cyprus', city: 'Larnaca, Cyprus', shortDescription: 'Only British university campus in Cyprus granting dual UK & Cypriot degrees.', officialWebsite: 'https://www.uclancyprus.ac.cy', popularPrograms: ['LLB Law', 'Computing', 'Hospitality & Tourism'] },
      { id: 'cy-8', name: 'Philips University', country: 'South Cyprus', city: 'Nicosia, Cyprus', shortDescription: 'Longstanding academic reputation in business, accounting, and nursing.', officialWebsite: 'https://philipsuni.ac.cy', popularPrograms: ['Accounting & Finance', 'Nursing', 'MBA'] },
      { id: 'cy-9', name: 'American University of Beirut – Mediterraneo (AUB)', country: 'South Cyprus', city: 'Paphos, Cyprus', shortDescription: 'European branch of the prestigious American University of Beirut.', officialWebsite: 'https://www.aub.edu.lb/aubmed', popularPrograms: ['Computer Science', 'Business Admin', 'Engineering Mgmt'] },
      { id: 'cy-10', name: 'Cyprus International Institute of Management (CIIM)', country: 'South Cyprus', city: 'Nicosia / Limassol', shortDescription: 'Top postgraduate business school for executive leadership and data analytics.', officialWebsite: 'https://www.uol.ac.cy', popularPrograms: ['Business Analytics', 'Human Resources', 'MBA'] }
    ]
  },
  {
    id: 'australia',
    countryName: 'Australia',
    slug: 'australia',
    flagEmoji: '🇦🇺',
    flagCode: 'au',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Group of Eight (Go8) Excellence, High Minimum Wage & Post-Study Work Streams',
    overview: 'Australia is a premier global education destination known for Group of Eight (Go8) world-top 50 universities, high student part-time wages, generous regional post-study work extensions, and unmatched outdoor lifestyle.',
    whyStudy: [
      { title: 'World Top 50 Universities', description: '7 Australian universities rank in the global top 50 with world-leading research facilities.' },
      { title: 'Generous Post-Study Work (Subclass 485)', description: 'Graduates receive 2 to 4+ years of post-study work authorization, with extra years in regional areas.' },
      { title: 'Highest Minimum Wage Globally', description: 'High hourly minimum wage ($24.10+ AUD/hr) allowing students to comfortably offset living costs.' },
      { title: 'Genuine Student (GS) Streamlined Visas', description: 'Clear, transparent assessment based on genuine academic and career progression.' }
    ],
    popularFields: [
      { name: 'Information Technology & Cybersecurity', desc: 'Cloud computing, network security, enterprise systems, and AI.' },
      { name: 'Mining, Civil & Renewable Engineering', desc: 'Resource engineering, infrastructure, and green power grids.' },
      { name: 'Nursing & Healthcare Sciences', desc: 'Clinical nursing, aged care management, and physiotherapy.' },
      { name: 'Accounting & Business Analytics', desc: 'CPA/CA pathways, financial modeling, and risk intelligence.' },
      { name: 'Agricultural Science & Agribusiness', desc: 'Food security, sustainable farming, and biotechnology.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 65%+ in Intermediate or A-Levels. Postgraduate: 2.8+ CGPA in 4-year Bachelor degree from HEC-recognized university.',
      english: 'IELTS Academic: 6.5 overall (minimum 6.0 each) OR PTE Academic: 58+ overall (minimum 50 each).',
      documents: ['HEC Attested Transcripts and Degree Certificate', 'Genuine Student (GS) Statement', 'Two Academic References', 'Financial Evidence (1 year tuition + living + travel)', 'Valid Passport', 'Resume / CV with verified employment history'],
      notes: 'Australia replaced the GTE statement with the Genuine Student (GS) assessment focusing on course relevance and career outcomes.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & University Selection', description: 'Selecting Level-1 / Level-2 Australian universities and CRICOS registered programs.' },
      { step: '02', title: 'Application Submission', description: 'Submitting application along with academic records and English test score.' },
      { step: '03', title: 'Offer Letter Issuance', description: 'Receiving formal conditional/unconditional offer from university.' },
      { step: '04', title: 'Genuine Student (GS) Assessment', description: 'Comprehensive GS statement review and financial verification by university admissions.' },
      { step: '05', title: 'Tuition Deposit & OSHC Payment', description: 'Paying 1st semester tuition fee and Overseas Student Health Cover (OSHC).' },
      { step: '06', title: 'Confirmation of Enrolment (CoE)', description: 'University generates official electronic Confirmation of Enrolment (eCoE).' },
      { step: '07', title: 'HAP ID & Upfront Medical Exam', description: 'Undergoing medical check-up with IOM panel physician in Pakistan.' },
      { step: '08', title: 'Subclass 500 Visa Filing', description: 'Filing Student Visa (Subclass 500) online via ImmiAccount.' },
      { step: '09', title: 'Biometrics at VFS Global', description: 'Completing biometrics capture at Australian Visa Application Centre.' },
      { step: '10', title: 'Visa Grant & Pre-Departure', description: 'Receiving electronic visa grant letter (VEVO) and booking flights.' }
    ],
    visaProcess: {
      name: 'Student Visa (Subclass 500)',
      processingTime: '4 to 8 weeks',
      financialProof: '1st year tuition fee + $29,710 AUD annual living cost + $2,000 AUD travel allowance held in approved bank account.',
      requiredDocuments: ['Confirmation of Enrolment (eCoE)', 'Overseas Student Health Cover (OSHC) policy certificate', 'Genuine Student (GS) Statement', 'Verifiable Bank Statement & Income Sources', 'Medical Clearance (HAP ID)', 'Valid Pakistani Passport', 'Academic Degrees & Transcripts'],
      officialNotice: 'Department of Home Affairs assesses applications under the Simplified Student Visa Framework (SSVF). Maintain genuine progression.',
      officialPortalUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500'
    },
    estimatedCosts: {
      currency: 'AUD ($)',
      tuitionUndergrad: '$22,000 – $42,000 / year',
      tuitionPostgrad: '$24,000 – $45,000 / year',
      livingMonthly: '$1,600 – $2,500 / month',
      visaFee: '$1,600 AUD',
      healthInsurance: '$600 – $900 / year (OSHC)'
    },
    scholarships: [
      { name: 'Australia Awards Scholarships', coverage: 'Fully funded (Tuition, living stipend, return airfare, establishment allowance, OSHC)', provider: 'Department of Foreign Affairs and Trade (DFAT)', criteria: 'Merit-based for Pakistani students contributing to development priorities.' },
      { name: 'Vice-Chancellor International Merit Scholarships', coverage: '20% to 50% tuition fee reduction across all years', provider: 'Deakin, La Trobe, Wollongong, Griffith, Swinburne', criteria: 'Granted automatically based on 75%+ GPA in previous degree.' }
    ],
    intakes: [
      { month: 'February / March', term: 'Semester 1 (Primary)', applicationDeadline: 'October – December' },
      { month: 'July / August', term: 'Semester 2 (Major)', applicationDeadline: 'March – May' },
      { month: 'November', term: 'Trimester 3 / Summer (Selected Courses)', applicationDeadline: 'August – September' }
    ],
    workOpportunities: {
      duringStudy: '48 hours per fortnight (2 weeks) during study terms; unlimited hours during semester breaks.',
      postStudy: 'Temporary Graduate Visa (Subclass 485) offering 2 to 4 years post-study work authorization.',
      notes: 'Studying in designated regional areas (Adelaide, Perth, Gold Coast, Wollongong) grants an additional 1 to 2 years PSW.'
    },
    officialGovernmentLinks: [
      { title: 'Department of Home Affairs – Student Visa (Subclass 500)', url: 'https://immi.homeaffairs.gov.au', agency: 'Australian Government' },
      { title: 'Study Australia Official Portal', url: 'https://www.studyaustralia.gov.au', agency: 'Austrade' }
    ],
    universities: [
      { id: 'au-1', name: 'Deakin University', country: 'Australia', city: 'Melbourne / Geelong, VIC', shortDescription: 'Top 1% global university with world-leading sports science, IT, and nursing.', officialWebsite: 'https://www.deakin.edu.au', popularPrograms: ['Cybersecurity', 'Data Science', 'Business Analytics'] },
      { id: 'au-2', name: 'La Trobe University', country: 'Australia', city: 'Melbourne / Bendigo, VIC', shortDescription: 'Renowned for health sciences, business, and generous regional scholarships.', officialWebsite: 'https://www.latrobe.edu.au', popularPrograms: ['Public Health', 'Informatics', 'Civil Eng'] },
      { id: 'au-3', name: 'University of Wollongong (UOW)', country: 'Australia', city: 'Wollongong / Sydney, NSW', shortDescription: 'Global top 1% engineering and computing powerhouse with beachside campus.', officialWebsite: 'https://www.uow.edu.au', popularPrograms: ['Software Engineering', 'Supply Chain', 'Mining Eng'] },
      { id: 'au-4', name: 'Griffith University', country: 'Australia', city: 'Brisbane / Gold Coast, QLD', shortDescription: 'Ranked #1 in Australia for Hospitality and Tourism Management.', officialWebsite: 'https://www.griffith.edu.au', popularPrograms: ['Hospitality & Tourism', 'Nursing', 'Environmental Science'] },
      { id: 'au-5', name: 'Swinburne University of Technology', country: 'Australia', city: 'Melbourne, VIC', shortDescription: 'Pioneering technology institute with deep industry connections and design labs.', officialWebsite: 'https://www.swinburne.edu.au', popularPrograms: ['Artificial Intelligence', 'Aviation', 'Design'] },
      { id: 'au-6', name: 'University of South Australia (UniSA)', country: 'Australia', city: 'Adelaide, SA', shortDescription: 'Enterprise university in affordable Adelaide offering regional visa benefits.', officialWebsite: 'https://www.unisa.edu.au', popularPrograms: ['Data Science', 'Pharmacy', 'Engineering Management'] },
      { id: 'au-7', name: 'Western Sydney University', country: 'Australia', city: 'Sydney, NSW', shortDescription: 'Ranked #1 globally for UN Sustainable Development Goals (THE Impact Rankings).', officialWebsite: 'https://www.westernsydney.edu.au', popularPrograms: ['Construction Management', 'Nursing', 'Business'] },
      { id: 'au-8', name: 'Edith Cowan University (ECU)', country: 'Australia', city: 'Perth, WA', shortDescription: 'Australia’s top cybersecurity institute and WAAPA performing arts academy.', officialWebsite: 'https://www.ecu.edu.au', popularPrograms: ['Cybersecurity', 'Petroleum Eng', 'Paramedicine'] },
      { id: 'au-9', name: 'University of Tasmania (UTAS)', country: 'Australia', city: 'Hobart / Launceston, TAS', shortDescription: 'Exceptional marine biology and exclusive regional migration incentives.', officialWebsite: 'https://www.utas.edu.au', popularPrograms: ['Marine Science', 'Agri-Business', 'Information Systems'] },
      { id: 'au-10', name: 'Victoria University', country: 'Australia', city: 'Melbourne, VIC', shortDescription: 'Famous for the revolutionary VU Block Model of focused single-subject learning.', officialWebsite: 'https://www.vu.edu.au', popularPrograms: ['Project Management', 'Sport Science', 'ERP Systems'] }
    ]
  },
  {
    id: 'china',
    countryName: 'China',
    slug: 'china',
    flagEmoji: '🇨🇳',
    flagCode: 'cn',
    heroImage: 'https://images.unsplash.com/photo-1508804185372-83b811e9d51c?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Chinese Government Scholarships (CSC), CPEC Priority & High-Tech Facilities',
    overview: 'China is a dominant global academic powerhouse offering the prestigious Chinese Government Scholarship (CSC) with full funding for Pakistani students, cutting-edge AI and engineering labs, and direct CPEC infrastructure and trade opportunities.',
    whyStudy: [
      { title: 'Chinese Government Scholarship (CSC)', description: 'Thousands of fully funded Bachelor, Master, and PhD scholarship seats for Pakistani applicants.' },
      { title: 'World-Class STEM Infrastructure', description: 'Unprecedented research funding in AI, supercomputing, robotics, and clean energy.' },
      { title: 'CPEC Career Advantage', description: 'Pakistani graduates with Chinese language proficiency command premium careers in CPEC projects.' },
      { title: 'Extremely Low Self-Funded Costs', description: 'Tuition and living costs start from just $2,000–$3,500/year for self-funded students.' }
    ],
    popularFields: [
      { name: 'Artificial Intelligence & Robotics', desc: 'Autonomous driving, drone tech, computer vision, and neural networks.' },
      { name: 'Civil & Transport Infrastructure', desc: 'High-speed rail, megabridge engineering, and smart city architecture.' },
      { name: 'General Medicine (MBBS in English)', desc: 'WHO, WFME, and PMDC recognized 5+1 year medical degrees.' },
      { name: 'Renewable Energy & Solar Power', desc: 'Photovoltaic manufacturing, wind power, and battery tech.' },
      { name: 'International Trade & E-Commerce', desc: 'Cross-border logistics, supply chain, and digital commerce (Alibaba model).' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 65%+ in Intermediate (FSc/ICS). Postgraduate: 2.8+ CGPA in 4-year Bachelor degree.',
      english: 'English Proficiency Certificate (MOI) from previous institution OR IELTS 6.0+.',
      documents: ['Foreigner Physical Examination Form (Medical)', 'Attested Academic Transcripts & Degrees (MOFA)', 'Two Letters of Recommendation by Professors', 'Detailed Study Plan / Research Proposal (800+ words)', 'Non-Criminal Record (Police Certificate)', 'JW201 / JW202 Visa Application Form'],
      notes: 'Scholarship applications (CSC Type A via HEC or Type B directly via universities) require professor acceptance letters for higher success.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Category Determination', description: 'Selecting CSC Type A, Type B, Provincial Scholarship, or self-funded route.' },
      { step: '02', title: 'Supervisor Contact & Acceptance', description: 'Contacting professors for provisional supervision acceptance letters.' },
      { step: '03', title: 'CSC / University Portal Submission', description: 'Filing digital applications on CampusChina.org and university portal.' },
      { step: '04', title: 'Admission Notice & JW202 Form', description: 'Receiving formal Admission Letter and official JW201/JW202 Visa Form.' },
      { step: '05', title: 'Foreigner Physical Examination', description: 'Completing standard Chinese medical fitness form with hospital doctor.' },
      { step: '06', title: 'Visa Application on Gerry’s / Chinese Visa Centre', description: 'Submitting X1 visa application at Chinese Visa Application Service Center in Pakistan.' },
      { step: '07', title: 'X1 Visa Stamping', description: 'Receiving long-term X1 Student Visa in passport.' },
      { step: '08', title: 'Travel & Campus Arrival', description: 'Flying to Beijing/Shanghai/Wuhan/Guangzhou and checking into international student apartment.' },
      { step: '09', title: 'University Registration', description: 'Completing on-campus registration and tuition settlement.' },
      { step: '10', title: 'Residence Permit Conversion', description: 'Converting X1 visa into Foreigner Residence Permit at local Entry-Exit Bureau (PSB).' }
    ],
    visaProcess: {
      name: 'X1 Student Visa (Long-Term > 180 Days)',
      processingTime: '1 to 3 weeks',
      financialProof: 'CSC Scholarship Certificate OR bank statement showing $3,000–$5,000 equivalent for self-funded students.',
      requiredDocuments: ['Original Admission Notice (Luqu Tongzhishu)', 'Original JW201 or JW202 Form issued by Ministry of Education', 'Foreigner Physical Examination Record', 'Police Character Certificate (MOFA attested)', 'Valid Passport (1+ year validity)', 'Photographs with white background'],
      officialNotice: 'Students must convert their single-entry X1 visa into a multi-entry Residence Permit within 30 days of arrival in China.',
      officialPortalUrl: 'https://www.visaforchina.cn/'
    },
    estimatedCosts: {
      currency: 'USD ($)',
      tuitionUndergrad: '$2,000 – $4,500 / year (MBBS: $4,500–$7,500/yr)',
      tuitionPostgrad: '$2,500 – $5,000 / year',
      livingMonthly: '$250 – $500 / month',
      visaFee: '$80 – $120',
      healthInsurance: '800 RMB / year (~$110 USD)'
    },
    scholarships: [
      { name: 'Chinese Government Scholarship (CSC - Silk Road & Bilateral)', coverage: '100% Tuition Waiver + Free University Dormitory + Comprehensive Medical Insurance + Monthly Stipend (Master: 3,000 RMB; PhD: 3,500 RMB)', provider: 'China Scholarship Council (CSC)', criteria: 'Merit-based for Pakistani students in STEM, agriculture, and infrastructure.' },
      { name: 'Provincial Government Scholarships (e.g. Jiangsu, Zhejiang, Shanghai)', coverage: 'Full or partial tuition fee coverage + accommodation subsidy', provider: 'Chinese Provincial Governments', criteria: 'Awarded to top international students enrolled at provincial universities.' }
    ],
    intakes: [
      { month: 'September', term: 'Autumn Intake (Primary & Scholarship Intake)', applicationDeadline: 'January 15 – April 30' },
      { month: 'March', term: 'Spring Intake (Preparatory & Selected Programs)', applicationDeadline: 'November 1 – December 31' }
    ],
    workOpportunities: {
      duringStudy: 'Part-time work and on-campus work-study (Qingong Jianxue) allowed with university and local PSB approval.',
      postStudy: 'Foreign graduates with Master degrees and qualifying tech job offers can obtain Chinese Z-Work Visa directly.',
      notes: 'Shenzhen and Shanghai offer high-tech entrepreneurial incubation for international graduates.'
    },
    officialGovernmentLinks: [
      { title: 'China Scholarship Council (Campus China)', url: 'https://www.campuschina.org', agency: 'Ministry of Education China' },
      { title: 'Chinese Visa Application Service Center', url: 'https://www.visaforchina.cn', agency: 'Ministry of Foreign Affairs China' }
    ],
    universities: [
      { id: 'cn-1', name: 'Tsinghua University', country: 'China', city: 'Beijing, China', shortDescription: '#1 ranked university in Asia; world top 15 in engineering and computer science.', officialWebsite: 'https://www.tsinghua.edu.cn', popularPrograms: ['Computer Science', 'Civil Engineering', 'Global Affairs'] },
      { id: 'cn-2', name: 'Peking University', country: 'China', city: 'Beijing, China', shortDescription: 'Premier research university with eminent humanities, sciences, and Yenching Academy.', officialWebsite: 'https://www.pku.edu.cn', popularPrograms: ['Data Science', 'International Relations', 'Chemistry'] },
      { id: 'cn-3', name: 'Zhejiang University', country: 'China', city: 'Hangzhou, China', shortDescription: 'Located in the tech capital of Alibaba with world-leading robotics labs.', officialWebsite: 'https://www.zju.edu.cn', popularPrograms: ['Artificial Intelligence', 'Agriculture', 'Control Eng'] },
      { id: 'cn-4', name: 'Shanghai Jiao Tong University', country: 'China', city: 'Shanghai, China', shortDescription: 'Historic C9 League powerhouse celebrated for biomedical and marine engineering.', officialWebsite: 'https://en.sjtu.edu.cn', popularPrograms: ['Mechanical Eng', 'Naval Architecture', 'Medicine'] },
      { id: 'cn-5', name: 'Fudan University', country: 'China', city: 'Shanghai, China', shortDescription: 'Renowned for international business, journalism, public health, and medicine.', officialWebsite: 'https://www.fudan.edu.cn', popularPrograms: ['Finance', 'Public Health', 'Software Eng'] },
      { id: 'cn-6', name: 'University of Science and Technology of China (USTC)', country: 'China', city: 'Hefei, China', shortDescription: 'Pioneer in quantum physics, nanotechnology, and advanced computing.', officialWebsite: 'https://en.ustc.edu.cn', popularPrograms: ['Quantum Information', 'Materials Science', 'Robotics'] },
      { id: 'cn-7', name: 'Harbin Institute of Technology (HIT)', country: 'China', city: 'Harbin, China', shortDescription: 'World leader in aerospace, satellite engineering, and welding technology.', officialWebsite: 'https://en.hit.edu.cn', popularPrograms: ['Aerospace Engineering', 'Robotics', 'Civil Eng'] },
      { id: 'cn-8', name: 'Wuhan University', country: 'China', city: 'Wuhan, China', shortDescription: 'Famous for geo-informatics, GPS remote sensing, and international law.', officialWebsite: 'https://en.whu.edu.cn', popularPrograms: ['Geodesy & GIS', 'Software Engineering', 'Law'] },
      { id: 'cn-9', name: 'Xi’an Jiaotong University', country: 'China', city: 'Xi’an, China', shortDescription: 'Heart of the ancient Silk Road with massive CPEC technological research center.', officialWebsite: 'https://en.xjtu.edu.cn', popularPrograms: ['Energy & Power', 'Electrical Eng', 'MBBS'] },
      { id: 'cn-10', name: 'Huazhong University of Science and Technology (HUST)', country: 'China', city: 'Wuhan, China', shortDescription: 'Renowned for optoelectronics, medical robotics, and Tongji Medical College.', officialWebsite: 'https://english.hust.edu.cn', popularPrograms: ['Optoelectronics', 'Mechanical Eng', 'Clinical Medicine'] }
    ]
  },
  {
    id: 'malaysia',
    countryName: 'Malaysia',
    slug: 'malaysia',
    flagEmoji: '🇲🇾',
    flagCode: 'my',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop',
    tagline: 'EMGS Electronic Visas (eVAL), Dual-Degree UK/Aust Campuses & Halal Friendly',
    overview: 'Malaysia is a premier higher education hub in Southeast Asia, celebrated for branches of top British and Australian universities, world top 100 public institutions, 100% Halal-friendly lifestyle, highly affordable tuition, and the seamless EMGS eVAL visa approval system.',
    whyStudy: [
      { title: 'Western Degrees at 1/3rd Cost', description: 'Earn identical UK and Australian degrees (Nottingham, Monash, Curtin) at a fraction of the tuition.' },
      { title: 'Streamlined EMGS eVisa System', description: 'Electronic Visa Approval Letter (eVAL) issued smoothly with high Pakistani visa approval rates.' },
      { title: 'Halal Environment & High Comfort', description: '100% Muslim-friendly lifestyle with mosques, prayer facilities, and diverse halal food across all campuses.' },
      { title: 'Top Ranked Public Universities', description: 'Universiti Malaya (UM) ranks #60 globally, with 5 public universities in the world top 200.' }
    ],
    popularFields: [
      { name: 'Computer Science, AI & Cyber', desc: 'Software engineering, enterprise cloud systems, and data analytics.' },
      { name: 'Islamic Finance & Banking', desc: 'World leader in Sukuk issuance, Shariah finance, and fintech.' },
      { name: 'Petroleum & Chemical Engineering', desc: 'Petronas-linked exploration, drilling, and process safety.' },
      { name: 'Biomedical & Pharmacy', desc: 'Pharmaceutical chemistry, medical lab tech, and public healthcare.' },
      { name: 'Business Administration & SCM', desc: 'Port logistics, digital marketing, and international commerce.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 60%+ in Intermediate (FSc/ICS/FA) or A-Levels. Postgraduate: 2.75+ CGPA in 4-year Bachelor degree.',
      english: 'IELTS: 5.5–6.0 or TOEFL iBT: 60+ or PTE: 50+ or English proficiency letter (conditional).',
      documents: ['All Academic Transcripts and Certificates (Attested)', 'EMGS Health Declaration Form', 'Passport (all pages scanned with 18+ months validity)', 'White Background Passport Photos', 'Statement of Purpose / Research Proposal (for Master/PhD)', 'Receipt of EMGS Processing Fee'],
      notes: 'Education Malaysia Global Services (EMGS) requires scanning every page of the student’s passport including blank pages.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & Campus Selection', description: 'Choosing between Top Public Research Universities (UM, UTM, USM) or Foreign Branch Campuses.' },
      { step: '02', title: 'University Application Filing', description: 'Submitting application and receiving formal Letter of Offer.' },
      { step: '03', title: 'EMGS Visa Processing Fee', description: 'Paying EMGS visa and medical insurance processing fee.' },
      { step: '04', title: 'EMGS Tracking & Approval (eVAL)', description: 'Tracking EMGS bar progress from 0% to 100% and receiving electronic Visa Approval Letter (eVAL).' },
      { step: '05', title: 'Single Entry Visa (SEV)', description: 'Applying for Single Entry Visa online (eVISA) or at Malaysian High Commission Islamabad / Consulate Karachi.' },
      { step: '06', title: 'Travel & Airport Clearance', description: 'Booking flight to Kuala Lumpur (KUL); university representative assists with airport clearance.' },
      { step: '07', title: 'Post-Arrival Medical Screening', description: 'Undergoing mandatory EMGS medical screening at designated clinic within 7 days.' },
      { step: '08', title: 'Final Campus Enrollment', description: 'Completing course registration and ID card issuance.' },
      { step: '09', title: 'Student Pass Sticker Grant', description: 'Malaysian Immigration stamps multi-entry Student Pass in passport.' },
      { step: '10', title: 'i-Kad Collection', description: 'Collecting national foreign student identification card (i-Kad).' }
    ],
    visaProcess: {
      name: 'Electronic Visa Approval Letter (eVAL) & Student Pass',
      processingTime: '2 to 5 weeks (via EMGS digital tracking)',
      financialProof: 'Bank statement showing $3,000–$5,000 equivalent with sponsor support affidavit.',
      requiredDocuments: ['Official University Offer Letter', 'Approved eVAL Certificate from EMGS', 'Complete Passport Scan (all pages)', 'EMGS Health Declaration Form', 'Attested Educational Certificates (MOFA)', 'Single Entry Visa (eVISA) confirmation'],
      officialNotice: 'EMGS handles the centralized processing of all student visas in collaboration with Malaysian Immigration.',
      officialPortalUrl: 'https://educationmalaysia.gov.my/'
    },
    estimatedCosts: {
      currency: 'USD ($)',
      tuitionUndergrad: '$2,500 – $6,000 / year (Foreign branch: $7,000–$11,000/yr)',
      tuitionPostgrad: '$2,800 – $6,500 / year',
      livingMonthly: '$350 – $600 / month',
      visaFee: '~$500 USD (EMGS processing + medical + insurance)',
      healthInsurance: 'Included in EMGS processing fee'
    },
    scholarships: [
      { name: 'Malaysian International Scholarship (MIS)', coverage: 'Full tuition fee waiver + RM 1,500 monthly living allowance', provider: 'Ministry of Higher Education Malaysia (MOHE)', criteria: 'Merit-based for postgraduate (Master/PhD) students with high CGPA (3.5+).' },
      { name: 'RS Partner University Scholarships', coverage: '20% to 50% tuition reduction', provider: 'APU, Taylor’s, Sunway, UCSI, UNITEN, UTP', criteria: 'Granted based on academic marks in Intermediate or Bachelor.' }
    ],
    intakes: [
      { month: 'September / October', term: 'Semester 1 (Primary Intake)', applicationDeadline: 'July 15' },
      { month: 'February / March', term: 'Semester 2 (Major Intake)', applicationDeadline: 'December 15' },
      { month: 'July', term: 'Summer Intake (Selected Universities)', applicationDeadline: 'May 15' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 20 hours per week during semester breaks and holidays of more than 7 days in restaurants, petrol kiosks, mini markets, and hotels.',
      postStudy: 'Employment Pass (Category I, II, III) available upon securing employment with Malaysian or multinational tech firms.',
      notes: 'Kuala Lumpur and Cyberjaya host major regional tech hubs for Google, Microsoft, and Dell.'
    },
    officialGovernmentLinks: [
      { title: 'Education Malaysia Global Services (EMGS)', url: 'https://educationmalaysia.gov.my', agency: 'Ministry of Higher Education Malaysia' },
      { title: 'Immigration Department of Malaysia', url: 'https://www.imi.gov.my', agency: 'Ministry of Home Affairs' }
    ],
    universities: [
      { id: 'my-1', name: 'Universiti Malaya (UM)', country: 'Malaysia', city: 'Kuala Lumpur, Malaysia', shortDescription: '#1 ranked university in Malaysia, top 60 in the world (QS World Rankings).', officialWebsite: 'https://www.um.edu.my', popularPrograms: ['Engineering', 'Computer Science', 'Business'] },
      { id: 'my-2', name: 'Asia Pacific University of Technology & Innovation (APU)', country: 'Malaysia', city: 'Kuala Lumpur, Malaysia', shortDescription: 'Premier technology and cybersecurity hub with 100% employability record.', officialWebsite: 'https://www.apu.edu.my', popularPrograms: ['Cybersecurity', 'Artificial Intelligence', 'Software Eng'] },
      { id: 'my-3', name: 'Taylor’s University', country: 'Malaysia', city: 'Subang Jaya, Malaysia', shortDescription: '#1 private university in Southeast Asia; top 20 globally for hospitality.', officialWebsite: 'https://university.taylors.edu.my', popularPrograms: ['Hospitality & Tourism', 'Architecture', 'Business'] },
      { id: 'my-4', name: 'Sunway University', country: 'Malaysia', city: 'Petaling Jaya, Malaysia', shortDescription: 'Pioneering institution partnered with Lancaster University UK and Harvard.', officialWebsite: 'https://sunwayuniversity.edu.my', popularPrograms: ['Actuarial Science', 'Biomedicine', 'FinTech'] },
      { id: 'my-5', name: 'Universiti Teknologi Malaysia (UTM)', country: 'Malaysia', city: 'Johor Bahru / KL', shortDescription: 'Leading engineering and technology public university in Malaysia.', officialWebsite: 'https://www.utm.my', popularPrograms: ['Civil Engineering', 'Petroleum Eng', 'Computer Science'] },
      { id: 'my-6', name: 'Universiti Sains Malaysia (USM)', country: 'Malaysia', city: 'Penang, Malaysia', shortDescription: 'Apex status research university celebrated for pharmacy and medical sciences.', officialWebsite: 'https://www.usm.my', popularPrograms: ['Pharmacy', 'Medical Sciences', 'Environmental Tech'] },
      { id: 'my-7', name: 'UCSI University', country: 'Malaysia', city: 'Kuala Lumpur, Malaysia', shortDescription: 'Top 300 global university known for pharmacy, petroleum, and music.', officialWebsite: 'https://www.ucsiuniversity.edu.my', popularPrograms: ['Petroleum Eng', 'Pharmacy', 'Biotechnology'] },
      { id: 'my-8', name: 'Universiti Teknologi PETRONAS (UTP)', country: 'Malaysia', city: 'Perak, Malaysia', shortDescription: 'Top-tier private engineering university wholly owned by PETRONAS.', officialWebsite: 'https://www.utp.edu.my', popularPrograms: ['Petroleum Geoscience', 'Chemical Eng', 'Mechanical Eng'] },
      { id: 'my-9', name: 'University of Nottingham Malaysia', country: 'Malaysia', city: 'Semenyih, Malaysia', shortDescription: 'Full British branch campus conferring direct UK Russell Group degrees.', officialWebsite: 'https://www.nottingham.edu.my', popularPrograms: ['International Relations', 'Chemical Eng', 'Economics'] },
      { id: 'my-10', name: 'Monash University Malaysia', country: 'Malaysia', city: 'Sunway City, Malaysia', shortDescription: 'Australian Group of Eight (Go8) branch campus in vibrant Sunway City.', officialWebsite: 'https://www.monash.edu.my', popularPrograms: ['Medicine', 'Mechatronics', 'Business Analytics'] }
    ]
  },
  {
    id: 'portugal',
    countryName: 'Portugal',
    slug: 'portugal',
    flagEmoji: '🇵🇹',
    flagCode: 'pt',
    heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd81?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Schengen Gateway, Fast Permanent Residency Track & Vibrant Tech Hub',
    overview: 'Portugal combines centuries of academic heritage with an exceptionally friendly immigration system, 5-year naturalization path, world-class climate, English-taught Master and Bachelor programs, and affordable European tuition fees.',
    whyStudy: [
      { title: '5-Year Pathway to EU Citizenship', description: 'Years spent on a legal student residence count towards the 5-year requirement for Portuguese citizenship / PR.' },
      { title: 'Very Low Tuition Fees', description: 'Tuition at top public research universities starts from €1,500 to €3,500/year.' },
      { title: 'Web Summit & European Silicon Coast', description: 'Lisbon and Porto host Europe’s biggest tech summit and hundreds of global tech scale-ups.' },
      { title: 'Top Ranked European Business Schools', description: 'Nova SBE and Católica Lisbon rank among the Financial Times European top 30.' }
    ],
    popularFields: [
      { name: 'Computer Science, Data & Cloud', desc: 'Full-stack engineering, distributed systems, and AI.' },
      { name: 'International Economics & Finance', desc: 'Quantitative finance, banking, and econometric modeling.' },
      { name: 'Civil, Environmental & Naval Engineering', desc: 'Coastal engineering, renewable ocean power, and transport.' },
      { name: 'Biomedical Engineering & Health', desc: 'Neurosciences, medical informatics, and biotechnology.' },
      { name: 'Hospitality, Tourism & Cultural Heritage', desc: 'International tourism economics and heritage architecture.' }
    ],
    admissionRequirements: {
      academic: 'Undergraduate: Minimum 60%+ in Intermediate (FSc/ICS) with ENES equivalence. Postgraduate: 2.5+ CGPA in 4-year Bachelor degree.',
      english: 'IELTS: 6.0–6.5 or TOEFL iBT: 80+ or Medium of Instruction (MOI) certificate from previous university.',
      documents: ['Attested Transcripts and Diplomas (MOFA attested)', 'Police Clearance Certificate (Apostilled/MOFA)', 'Letter of Motivation', 'Curriculum Vitae (Europass)', 'Proof of Financial Means (Term deposit or bank statement)', 'Valid Passport'],
      notes: 'Portuguese public universities require document legalization by the Ministry of Foreign Affairs (MOFA) Pakistan.'
    },
    admissionProcess: [
      { step: '01', title: 'Consultation & School Selection', description: 'Selecting program on university portal (Universidade de Lisboa, Porto, Coimbra, Nova).' },
      { step: '02', title: 'Application Dossier Submission', description: 'Online submission during candidate phase (Fase 1 or Fase 2).' },
      { step: '03', title: 'Carta de Aceitação (Offer Letter)', description: 'Receiving formal acceptance letter and paying initial enrollment fee.' },
      { step: '04', title: 'Financial Proof Setup', description: 'Maintaining required living funds (minimum €820/month) in verifiable bank account.' },
      { step: '05', title: 'Accommodation Certificate', description: 'Securing student dormitory lease or registered rental agreement in Portugal.' },
      { step: '06', title: 'Police Clearance Legalization', description: 'Obtaining verified police record attested by MOFA Pakistan.' },
      { step: '07', title: 'VFS Portugal Visa Filing', description: 'Submitting National D-Visa for Studies (D4/D5) at VFS Global Pakistan.' },
      { step: '08', title: 'Embassy Processing & D-Visa Sticker', description: 'Receiving National D-Visa sticker authorizing travel to Portugal.' },
      { step: '09', title: 'Travel & Arrival in Portugal', description: 'Arriving in Lisbon/Porto/Coimbra and starting university orientation.' },
      { step: '10', title: 'AIMA Appointment & Residence Card (Título de Residência)', description: 'Attending AIMA (formerly SEF) biometric appointment to collect Portuguese Residence Card.' }
    ],
    visaProcess: {
      name: 'National Visa for Study Purposes (D4 / D5 Visa)',
      processingTime: '6 to 12 weeks',
      financialProof: 'Minimum €820/month for 12 months (€9,840) in student or sponsor bank account with 6-month transaction statement.',
      requiredDocuments: ['Official Acceptance Letter (Carta de Aceitação)', 'Proof of Accommodation in Portugal', 'Police Clearance Certificate (MOFA attested)', 'Travel Health Insurance valid for Schengen area', 'Bank Statement and Declaration of Financial Responsibility', 'Valid Pakistani Passport'],
      officialNotice: 'The D-Visa is valid for 120 days and 2 entries. Students attend an AIMA appointment in Portugal to receive their full Residence Card.',
      officialPortalUrl: 'https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa'
    },
    estimatedCosts: {
      currency: 'EUR (€)',
      tuitionUndergrad: '€1,500 – €4,500 / year (Public)',
      tuitionPostgrad: '€2,000 – €6,000 / year (Public)',
      livingMonthly: '€550 – €850 / month',
      visaFee: '€90',
      healthInsurance: '€120 – €200 / year (Free access to SNS public health once resident)'
    },
    scholarships: [
      { name: 'FCT Doctoral and Research Fellowships', coverage: 'Full tuition fee + €1,250 monthly research stipend + social security', provider: 'Fundação para a Ciência e a Tecnologia (FCT)', criteria: 'Merit-based for PhD and research Master students.' },
      { name: 'University International Student Merit Reductions', coverage: '30% to 50% tuition waiver', provider: 'Universidade de Coimbra, Porto, Aveiro', criteria: 'Granted automatically to top incoming international candidates.' }
    ],
    intakes: [
      { month: 'September / October', term: 'Fase 1 & Fase 2 (Primary Annual Intake)', applicationDeadline: 'January – May' },
      { month: 'February', term: 'Spring Semester (Selected Postgraduate Courses)', applicationDeadline: 'October – November' }
    ],
    workOpportunities: {
      duringStudy: 'Up to 20 hours per week during academic terms; full-time during holidays with notification to AIMA.',
      postStudy: '1-year post-study residence permit for job seeking or establishing a startup in Portugal.',
      notes: 'Portugal offers the Tech Visa program facilitating immediate work contracts with registered tech startups.'
    },
    officialGovernmentLinks: [
      { title: 'Portuguese Ministry of Foreign Affairs (Vistos MNE)', url: 'https://vistos.mne.gov.pt', agency: 'Ministry of Foreign Affairs Portugal' },
      { title: 'Agency for Integration, Migration and Asylum (AIMA)', url: 'https://aima.gov.pt', agency: 'AIMA Portugal' }
    ],
    universities: [
      { id: 'pt-1', name: 'University of Lisbon (Universidade de Lisboa)', country: 'Portugal', city: 'Lisbon, Portugal', shortDescription: 'Largest university in Portugal with Instituto Superior Técnico (IST) engineering.', officialWebsite: 'https://www.ulisboa.pt', popularPrograms: ['Computer Science', 'Civil Engineering', 'Pharmacy'] },
      { id: 'pt-2', name: 'University of Porto (Universidade do Porto)', country: 'Portugal', city: 'Porto, Portugal', shortDescription: 'Top-ranked Portuguese research university with world-class science and engineering.', officialWebsite: 'https://www.up.pt', popularPrograms: ['Artificial Intelligence', 'Biomedical Eng', 'Economics'] },
      { id: 'pt-3', name: 'Nova University Lisbon (NOVA)', country: 'Portugal', city: 'Lisbon, Portugal', shortDescription: 'Renowned for Nova School of Business and Economics (Nova SBE).', officialWebsite: 'https://www.unl.pt', popularPrograms: ['Finance', 'International Management', 'Data Science'] },
      { id: 'pt-4', name: 'University of Coimbra (Universidade de Coimbra)', country: 'Portugal', city: 'Coimbra, Portugal', shortDescription: 'UNESCO World Heritage university founded in 1290; one of the oldest in the world.', officialWebsite: 'https://www.uc.pt', popularPrograms: ['Law', 'Civil Engineering', 'Biotechnology'] },
      { id: 'pt-5', name: 'University of Aveiro (Universidade de Aveiro)', country: 'Portugal', city: 'Aveiro, Portugal', shortDescription: 'Known as the Portuguese Venice; leader in telecommunications and materials.', officialWebsite: 'https://www.ua.pt', popularPrograms: ['Telecommunications', 'Materials Science', 'Design'] },
      { id: 'pt-6', name: 'University of Minho (Universidade do Minho)', country: 'Portugal', city: 'Braga / Guimarães', shortDescription: 'Top modern institution famous for software engineering and industrial tech.', officialWebsite: 'https://www.uminho.pt', popularPrograms: ['Software Engineering', 'Polymer Eng', 'Bioinformatics'] },
      { id: 'pt-7', name: 'ISCTE – University Institute of Lisbon', country: 'Portugal', city: 'Lisbon, Portugal', shortDescription: 'Specialized in business, digital technologies, sociology, and public policy.', officialWebsite: 'https://www.iscte-iul.pt', popularPrograms: ['Business Analytics', 'Digital Systems', 'Marketing'] },
      { id: 'pt-8', name: 'Católica Lisbon School of Business and Economics', country: 'Portugal', city: 'Lisbon, Portugal', shortDescription: 'Triple-accredited FT Top European Business School.', officialWebsite: 'https://www.clsbe.lisboa.ucp.pt', popularPrograms: ['Master in Finance', 'Management', 'Strategic Innovation'] },
      { id: 'pt-9', name: 'University of Beira Interior (UBI)', country: 'Portugal', city: 'Covilhã, Portugal', shortDescription: 'Affordable campus with recognized aeronautical engineering and medicine.', officialWebsite: 'https://www.ubi.pt', popularPrograms: ['Aeronautical Eng', 'Medicine', 'Fashion Design'] },
      { id: 'pt-10', name: 'University of Algarve (Universidade do Algarve)', country: 'Portugal', city: 'Faro, Portugal', shortDescription: 'Renowned for oceanography, marine biology, and hospitality in Southern Portugal.', officialWebsite: 'https://www.ualg.pt', popularPrograms: ['Marine Biology', 'Tourism Management', 'Biomedicine'] }
    ]
  }
];
