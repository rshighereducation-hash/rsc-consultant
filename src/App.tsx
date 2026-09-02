import React, { useState, useEffect } from 'react';
import { BrandProvider } from './context/BrandContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { DestinationGrid } from './components/DestinationGrid';
import { DestinationFinder } from './components/DestinationFinder';
import { StudentJourney } from './components/StudentJourney';
import { ServicesSection } from './components/ServicesSection';
import { UniversityCarousel } from './components/UniversityCarousel';
import { SuccessStories } from './components/SuccessStories';
import { ResourcesSection } from './components/ResourcesSection';
import { FAQSection } from './components/FAQSection';
import { ContactForm } from './components/ContactForm';
import { OfficeLocation } from './components/OfficeLocation';
import { DestinationDetailView } from './components/DestinationDetailView';
import { AboutSection } from './components/AboutSection';
import { FounderSection } from './components/FounderSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalModals } from './components/LegalModals';
import { GoogleSyncModal } from './components/GoogleSyncModal';
import { getDestinationBySlug } from './data/destinationsData';
import { BUSINESS_INFO } from './data/businessInfo';
import {
  Sparkles,
  Phone,
  Globe2,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState<string | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isGoogleSyncOpen, setIsGoogleSyncOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedDestinationSlug]);

  const handleNavigate = (view: string, destinationSlug?: string) => {
    if (destinationSlug) {
      setSelectedDestinationSlug(destinationSlug);
      setCurrentView('destination-detail');
    } else {
      setSelectedDestinationSlug(null);
      setCurrentView(view);
    }
  };

  const handleSelectDestination = (slug: string) => {
    setSelectedDestinationSlug(slug);
    setCurrentView('destination-detail');
  };

  const activeDestination = selectedDestinationSlug
    ? getDestinationBySlug(selectedDestinationSlug)
    : null;

  return (
    <BrandProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#DB0303] selection:text-white font-sans">
      {/* Sticky Header Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onOpenGoogleSync={() => setIsGoogleSyncOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* VIEW 1: DESTINATION DETAIL VIEW */}
        {currentView === 'destination-detail' && activeDestination ? (
          <DestinationDetailView
            destination={activeDestination}
            onBack={() => handleNavigate('destinations')}
            onOpenConsultation={() => setIsConsultationModalOpen(true)}
            onSelectOtherDestination={handleSelectDestination}
          />
        ) : currentView === 'about' ? (
          /* VIEW 2: ABOUT US PAGE */
          <div className="pt-28">
            <AboutSection onOpenConsultation={() => setIsConsultationModalOpen(true)} />
            <FounderSection onOpenConsultation={() => setIsConsultationModalOpen(true)} />
            <StatsCounter />
            <div className="py-20 bg-slate-50/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContactForm />
              </div>
            </div>
          </div>
        ) : currentView === 'destinations' ? (
          /* VIEW 3: ALL DESTINATIONS PAGE */
          <div className="pt-28">
            <DestinationGrid
              onSelectDestination={handleSelectDestination}
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
            />
            <DestinationFinder
              onSelectDestination={handleSelectDestination}
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
            />
          </div>
        ) : currentView === 'services' ? (
          /* VIEW 4: ALL SERVICES PAGE */
          <div className="pt-28">
            <ServicesSection onOpenConsultation={() => setIsConsultationModalOpen(true)} />
            <StudentJourney onOpenConsultation={() => setIsConsultationModalOpen(true)} />
          </div>
        ) : currentView === 'universities' ? (
          /* VIEW 5: UNIVERSITIES PAGE */
          <div className="pt-28">
            <UniversityCarousel
              onSelectDestination={handleSelectDestination}
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
            />
          </div>
        ) : currentView === 'finder' ? (
          /* VIEW 6: COURSE FINDER PAGE */
          <div className="pt-28 pb-12">
            <DestinationFinder
              onSelectDestination={handleSelectDestination}
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
            />
          </div>
        ) : currentView === 'success' ? (
          /* VIEW 7: STUDENT SUCCESS STORIES PAGE */
          <div className="pt-28">
            <SuccessStories onOpenConsultation={() => setIsConsultationModalOpen(true)} />
            <StatsCounter />
          </div>
        ) : currentView === 'resources' ? (
          /* VIEW 8: RESOURCES & GUIDES PAGE */
          <div className="pt-28">
            <ResourcesSection onOpenConsultation={() => setIsConsultationModalOpen(true)} />
          </div>
        ) : currentView === 'faq' ? (
          /* VIEW 9: FAQ PAGE */
          <div className="pt-28">
            <FAQSection />
          </div>
        ) : currentView === 'contact' ? (
          /* VIEW 10: CONTACT & OFFICE PAGE */
          <div className="pt-32 pb-20 bg-slate-50/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider bg-red-50 px-3.5 py-1 rounded-full border border-red-200 font-heading">
                  Get In Touch
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
                  Contact RS Higher Education Consultants
                </h1>
                <p className="text-slate-600 text-sm sm:text-base">
                  Visit our office in Deans Trade Centre Peshawar, call us directly, or send your profile for an immediate confidential assessment.
                </p>
              </div>

              {/* Contact Inquiry Form at Top */}
              <div className="w-full">
                <ContactForm />
              </div>

              {/* Horizontal Office Location & Interactive Map Section Underneath */}
              <div className="w-full">
                <OfficeLocation />
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 0: HOME LANDING PAGE (DEFAULT) */
          <div className="space-y-0">
            {/* 1. Hero Section */}
            <Hero
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
              onExploreDestinations={() => handleNavigate('destinations')}
              onSelectDestination={handleSelectDestination}
            />

            {/* 2. Metrics & Stats */}
            <StatsCounter />

            {/* 3. Founder & CEO Leadership Message */}
            <FounderSection onOpenConsultation={() => setIsConsultationModalOpen(true)} />

            {/* 4. 12 Core Services Showcase */}
            <ServicesSection
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
              showBanner={false}
            />

            {/* 5. Student Success Stories */}
            <SuccessStories
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
              showBanner={false}
            />
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Global Quick Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultDestination={selectedDestinationSlug || ''}
      />

      {/* Legal & Regulatory Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Google Sheets & Email Leads Hub Modal */}
      <GoogleSyncModal
        isOpen={isGoogleSyncOpen}
        onClose={() => setIsGoogleSyncOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenGoogleSync={() => setIsGoogleSyncOpen(true)}
      />
    </div>
    </BrandProvider>
  );
}

export default App;
