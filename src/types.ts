export interface University {
  id: string;
  name: string;
  country: string;
  countryName?: string;
  countrySlug?: string;
  flagEmoji?: string;
  city: string;
  shortDescription?: string;
  officialWebsite?: string;
  websiteUrl?: string;
  ranking?: string;
  logoText?: string;
  popularPrograms: string[];
}

export interface PopularField {
  name: string;
  desc?: string;
  description?: string;
  examples?: string[];
  iconName?: string;
}

export interface AdmissionRequirement {
  academic: string;
  english: string;
  documents?: string[];
  notes?: string;
  specialNotes?: string;
}

export interface ProcessStep {
  step: string | number;
  title: string;
  description: string;
}

export interface VisaRequirement {
  name?: string;
  processingTime?: string;
  financialProof?: string;
  requiredDocuments?: string[];
  documentChecklist?: string[];
  overview?: string;
  officialNotice?: string;
  officialPortalUrl?: string;
  officialAuthority?: string;
  officialLink?: string;
}

export interface EstimatedCost {
  currency?: string;
  tuitionUndergrad: string;
  tuitionPostgrad?: string;
  livingMonthly?: string;
  livingExpenses?: string;
  visaFee?: string;
  healthInsurance?: string;
}

export interface Scholarship {
  name: string;
  coverage: string;
  provider?: string;
  criteria?: string;
  type?: string;
  description?: string;
}

export interface Intake {
  month: string;
  term?: string;
  name?: string;
  deadline?: string;
  applicationDeadline?: string;
  programs?: string;
}

export interface WorkRights {
  duringStudy: string;
  postStudy?: string;
  postStudyWork?: string;
  jobMarket?: string;
  notes?: string;
}

export interface OfficialLink {
  title: string;
  url: string;
  agency?: string;
}

export interface Destination {
  id: string;
  countryName: string;
  slug: string;
  flagEmoji: string;
  flagCode: string;
  heroImage: string;
  tagline: string;
  overview: string;
  whyStudy?: { title: string; description: string }[];
  whyStudyHere?: { title: string; description: string }[];
  popularFields: PopularField[];
  admissionRequirements?: AdmissionRequirement;
  entryRequirements?: {
    undergraduate: AdmissionRequirement;
    postgraduate: AdmissionRequirement;
  };
  admissionProcess: ProcessStep[];
  visaProcess: VisaRequirement;
  estimatedCosts: EstimatedCost;
  scholarships: Scholarship[];
  intakes: Intake[];
  workOpportunities: WorkRights;
  officialGovernmentLinks?: OfficialLink[];
  universities: University[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyBenefits: string[];
  iconName: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  homeCity: string;
  destination: string;
  destinationFlag: string;
  university: string;
  degree: string;
  intake: string;
  quote: string;
  rating: number;
  isPlaceholder?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Admissions' | 'Visas' | 'Scholarships' | 'Finances & Work' | 'RS Process';
  question: string;
  answer: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  tags: string[];
}

export interface LeadSubmission {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  qualification?: string;
  currentInstitution?: string;
  destination?: string;
  studyLevel?: string;
  course?: string;
  intake?: string;
  budget?: string;
  ieltsStatus?: string;
  academicBackground?: string;
  message?: string;
}
