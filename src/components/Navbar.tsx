import React, { useState, useEffect } from 'react';
import { RSLogo } from './RSLogo';
import { CountryFlag } from './CountryFlag';
import { ALL_DESTINATIONS } from '../data/destinationsData';
import {
  ChevronDown,
  Globe2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, destinationSlug?: string) => void;
  onOpenConsultation: () => void;
  onOpenGoogleSync?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenConsultation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [destinationsMegaOpen, setDestinationsMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Study Destinations', view: 'destinations', isMega: true },
    { label: 'Universities', view: 'universities' },
    { label: 'Services', view: 'services' },
    { label: 'Student Success', view: 'success' },
    { label: 'Course Finder', view: 'finder' },
    { label: 'FAQ', view: 'faq' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string, destinationSlug?: string) => {
    onNavigate(view, destinationSlug);
    setDestinationsMegaOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-red-950/5 border-b border-red-100 py-2'
          : 'bg-white border-b border-slate-100 py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="nav-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none rounded-lg py-0.5 transition-transform hover:scale-[1.01] cursor-pointer"
              title="RS Higher Education Consultants (Click to go Home)"
            >
              <RSLogo theme="light" size="md" variant="horizontal" />
            </button>
          </div>

          {/* Desktop & Laptop Navigation Bar (1024px+) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;

              if (link.isMega) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDestinationsMegaOpen(true)}
                    onMouseLeave={() => setDestinationsMegaOpen(false)}
                  >
                  <button
                    id="mega-menu-trigger"
                    onClick={() => handleNavClick('destinations')}
                    className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold rounded-xl transition-all font-heading cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-white bg-[#DB0303] shadow-md shadow-red-500/20'
                        : 'text-slate-700 hover:text-[#DB0303] hover:bg-red-50/70'
                    }`}
                  >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          destinationsMegaOpen ? 'rotate-180 text-[#DB0303]' : ''
                        }`}
                      />
                    </button>

                    {/* Mega Menu Dropdown */}
                    {destinationsMegaOpen && (
                      <div
                        id="mega-menu-container"
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[840px] max-w-[90vw] bg-white border border-red-100 rounded-3xl shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-red-50">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-red-50 text-[#DB0303] rounded-xl">
                              <Globe2 className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-slate-900 font-extrabold text-sm font-heading">
                                16 Global Study Destinations
                              </h4>
                              <p className="text-[11px] text-slate-500">
                                Comprehensive admissions and student visa guidance for Pakistani students
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNavClick('destinations')}
                            className="text-xs text-[#DB0303] hover:text-[#B30000] flex items-center gap-1 font-bold transition-colors font-heading cursor-pointer"
                          >
                            <span>Explore All Countries</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-4 gap-2.5">
                          {ALL_DESTINATIONS.map((dest) => (
                            <button
                              key={dest.id}
                              id={`mega-dest-${dest.slug}`}
                              onClick={() => handleNavClick('destination-detail', dest.slug)}
                              className="group text-left p-2.5 rounded-2xl hover:bg-red-50/70 border border-transparent hover:border-red-100 transition-all flex items-start gap-2.5 cursor-pointer"
                            >
                              <div className="shrink-0 p-1 bg-slate-50 group-hover:bg-white rounded-xl shadow-xs group-hover:scale-110 transition-transform">
                                <CountryFlag
                                  countryCode={dest.slug}
                                  countryName={dest.countryName}
                                  fallbackEmoji={dest.flagEmoji}
                                  size="md"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 group-hover:text-[#DB0303] transition-colors truncate font-heading">
                                  {dest.countryName}
                                </p>
                                <p className="text-[10px] text-slate-500 truncate">
                                  {dest.universities.length} Institutions
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-red-50/50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                          <div className="flex items-center gap-2 text-xs text-slate-700">
                            <Sparkles className="w-4 h-4 text-[#DB0303]" />
                            <span className="font-semibold">Unsure which country matches your budget &amp; qualifications?</span>
                          </div>
                          <button
                            onClick={onOpenConsultation}
                            className="text-xs bg-[#DB0303] hover:bg-[#B30000] text-white px-4 py-2 rounded-xl font-bold transition-colors font-heading shadow-sm cursor-pointer"
                          >
                            Get Free Profile Assessment
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.view}`}
                  onClick={() => handleNavClick(link.view)}
                  className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold rounded-xl transition-all font-heading cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-[#DB0303] shadow-md shadow-red-500/20'
                      : 'text-slate-700 hover:text-[#DB0303] hover:bg-red-50/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              id="header-apply-btn"
              onClick={() => handleNavClick('finder')}
              className="hidden md:inline-flex px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-[#DB0303] bg-red-50 hover:bg-red-100/80 border border-red-200 rounded-xl transition-all font-heading items-center gap-1 cursor-pointer shadow-2xs"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Course Finder</span>
            </button>
            <button
              id="header-consultation-btn"
              onClick={onOpenConsultation}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white bg-[#DB0303] hover:bg-[#B30000] active:scale-95 shadow-md shadow-red-600/30 rounded-xl transition-all font-heading flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-hamburger-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#DB0303] hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#DB0303]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Drawer Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 bg-white rounded-2xl p-4 shadow-xl border border-red-50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={`mobile-drawer-${link.label}`}
                    id={`mobile-drawer-nav-${link.view}`}
                    onClick={() => handleNavClick(link.view)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl transition-all font-heading text-left cursor-pointer ${
                      isActive
                        ? 'text-white bg-[#DB0303] shadow-xs'
                        : 'text-slate-700 bg-slate-50 hover:bg-red-50 hover:text-[#DB0303]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('finder')}
                className="w-full py-2.5 px-3 text-xs font-bold text-[#DB0303] bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-1.5 font-heading cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Search All Courses &amp; Programs</span>
              </button>
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-3 text-xs font-bold text-white bg-[#DB0303] rounded-xl flex items-center justify-center gap-1.5 font-heading shadow-md cursor-pointer"
              >
                <span>Schedule In-Person Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

