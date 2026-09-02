import React, { useState } from 'react';

interface CountryFlagProps {
  countryCode: string; // 2-letter ISO code (e.g. 'gb', 'us', 'de', 'ca', 'au', etc.)
  countryName: string;
  fallbackEmoji?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const COUNTRY_CODE_MAP: Record<string, string> = {
  uk: 'gb',
  'united kingdom': 'gb',
  usa: 'us',
  'united states': 'us',
  canada: 'ca',
  australia: 'au',
  germany: 'de',
  france: 'fr',
  belgium: 'be',
  austria: 'at',
  hungary: 'hu',
  lithuania: 'lt',
  portugal: 'pt',
  romania: 'ro',
  turkiye: 'tr',
  turkey: 'tr',
  'south-cyprus': 'cy',
  cyprus: 'cy',
  china: 'cn',
  malaysia: 'my',
  italy: 'it',
  italia: 'it',
  it: 'it',
  pakistan: 'pk',
  pk: 'pk',
  spain: 'es',
  netherlands: 'nl',
  poland: 'pl',
  sweden: 'se',
  finland: 'fi',
  norway: 'no',
  denmark: 'dk',
  ireland: 'ie',
  'new zealand': 'nz',
  nz: 'nz',
};

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  countryName,
  fallbackEmoji,
  className = '',
  size = 'sm',
}) => {
  const [imgError, setImgError] = useState(false);

  const normalizedKey = (countryCode || countryName || '').toLowerCase().trim();
  const iso = COUNTRY_CODE_MAP[normalizedKey] || (normalizedKey.length === 2 ? normalizedKey : 'un');

  const sizeClasses = {
    xs: 'w-4 h-3 rounded-[2px]',
    sm: 'w-5 h-3.5 rounded-[3px]',
    md: 'w-6 h-4 rounded-[3px]',
    lg: 'w-8 h-5.5 rounded-[4px]',
  };

  const flagUrl = `https://flagcdn.com/${iso}.svg`;

  if (imgError && fallbackEmoji) {
    return <span className="text-base leading-none select-none">{fallbackEmoji}</span>;
  }

  return (
    <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-2xs border border-slate-200/80 bg-slate-100 ${sizeClasses[size]} ${className}`}>
      <img
        src={flagUrl}
        alt={`${countryName} flag`}
        className="w-full h-full object-cover select-none"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </span>
  );
};
