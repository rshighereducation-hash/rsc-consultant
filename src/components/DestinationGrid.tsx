import React, { useState } from 'react';
import { ALL_DESTINATIONS } from '../data/destinationsData';
import { Destination } from '../types';
import { CountryFlag } from './CountryFlag';
import {
  Globe2,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';

interface DestinationGridProps {
  onSelectDestination: (slug: string) => void;
  onOpenConsultation: () => void;
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({
  onSelectDestination,
  onOpenConsultation,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'europe' | 'north-america' | 'asia'>('all');

  const filterCategories = [
    { id: 'all', label: 'All 16 Destinations' },
    { id: 'popular', label: 'Most Popular from Pakistan' },
    { id: 'europe', label: 'Schengen & UK' },
    { id: 'north-america', label: 'USA & Canada' },
    { id: 'asia', label: 'Asia & Mediterranean' },
  ];

  const getFilteredDestinations = (): Destination[] => {
    switch (activeFilter) {
      case 'popular':
        return ALL_DESTINATIONS.filter((d) =>
          ['uk', 'germany', 'canada', 'australia', 'malaysia', 'turkiye', 'usa', 'hungary'].includes(d.slug)
        );
      case 'europe':
        return ALL_DESTINATIONS.filter((d) =>
          ['uk', 'germany', 'france', 'belgium', 'romania', 'hungary', 'lithuania', 'austria', 'portugal'].includes(d.slug)
        );
      case 'north-america':
        return ALL_DESTINATIONS.filter((d) => ['usa', 'canada', 'australia'].includes(d.slug));
      case 'asia':
        return ALL_DESTINATIONS.filter((d) => ['china', 'malaysia', 'turkiye', 'south-cyprus'].includes(d.slug));
      default:
        return ALL_DESTINATIONS;
    }
  };

  const filteredList = getFilteredDestinations();

  return (
    <section id="destinations-section" className="py-20 bg-gradient-to-b from-white via-red-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Choose Your Study Destination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            16 Global Study Destinations for Pakistani Students
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Explore admission intakes, visa compliance rules, scholarship options, and 10 featured accredited universities for each destination.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterCategories.map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all font-heading ${
                  activeFilter === tab.id
                    ? 'bg-[#DB0303] text-white shadow-md shadow-red-600/25 scale-105'
                    : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200 hover:border-red-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((country) => (
            <div
              key={country.id}
              id={`destination-card-${country.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-red-300 hover:shadow-xl hover:shadow-red-950/5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Card Hero Image with Flag & Highlights */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={country.heroImage}
                    alt={`${country.countryName} Higher Education Study Destination`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Flag and Country Name Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2 border border-slate-100">
                    <CountryFlag
                      countryCode={country.slug}
                      countryName={country.countryName}
                      fallbackEmoji={country.flagEmoji}
                      size="sm"
                    />
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      {country.countryName}
                    </span>
                  </div>

                  {/* Universities count pill */}
                  <div className="absolute bottom-3 right-3 bg-red-600/90 backdrop-blur-md text-[11px] font-bold text-white px-2.5 py-1 rounded-xl border border-red-400 flex items-center gap-1 shadow-sm font-heading">
                    <Building2 className="w-3 h-3" />
                    <span>{country.universities.length} Universities</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-[#DB0303] font-bold uppercase tracking-wide font-heading">
                    {country.tagline}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {country.overview}
                  </p>

                  {/* Key Highlights */}
                  <div className="pt-2.5 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                      <span className="truncate">
                        <strong className="text-slate-900 font-bold">Intakes:</strong> {country.intakes[0]?.month || 'Annual'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                      <span className="truncate">
                        <strong className="text-slate-900 font-bold">Work:</strong> {country.workOpportunities.duringStudy.split(';')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-4 bg-red-50/40 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  id={`btn-explore-${country.slug}`}
                  onClick={() => onSelectDestination(country.slug)}
                  className="w-full py-2.5 px-3 rounded-2xl bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-heading shadow-sm shadow-red-600/20 active:scale-98"
                >
                  <span>Explore {country.countryName} Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Destination Assistance Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-[#DB0303] to-[#B30000] rounded-3xl text-white shadow-xl shadow-red-600/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              Need personalized guidance on which country fits your profile?
            </h3>
            <p className="text-red-100 text-xs sm:text-sm max-w-xl font-medium">
              Our Peshawar counselors evaluate your Intermediate, A-Levels or Bachelor percentage, budget, and English test scores to recommend your optimum route.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="shrink-0 px-7 py-4 bg-white hover:bg-slate-50 text-[#DB0303] text-sm font-bold rounded-2xl transition-all font-heading shadow-md hover:scale-105 active:scale-95"
          >
            Get Free Country Assessment
          </button>
        </div>
      </div>
    </section>
  );
};
