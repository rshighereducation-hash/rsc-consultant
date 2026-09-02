import { Destination, University } from '../types';
import { DESTINATIONS_PART_1 } from './destinationsPart1';
import { DESTINATIONS_PART_2 } from './destinationsPart2';

export const ALL_DESTINATIONS: Destination[] = [
  ...DESTINATIONS_PART_1,
  ...DESTINATIONS_PART_2,
];

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  const s = slug.toLowerCase().trim();
  if (s === 'turkey') return ALL_DESTINATIONS.find((d) => d.slug === 'turkiye' || d.slug === 'turkey');
  if (s === 'cyprus' || s === 'north-cyprus') return ALL_DESTINATIONS.find((d) => d.slug === 'south-cyprus' || d.slug === 'cyprus');
  return ALL_DESTINATIONS.find((d) => d.slug.toLowerCase() === s || d.id.toLowerCase() === s);
};

export const getAllUniversities = (): University[] => {
  return ALL_DESTINATIONS.flatMap((d) =>
    d.universities.map((u) => ({
      ...u,
      countryName: u.countryName || d.countryName,
      countrySlug: u.countrySlug || d.slug,
      flagEmoji: u.flagEmoji || d.flagEmoji,
      websiteUrl: u.websiteUrl || u.officialWebsite || '#',
    }))
  );
};

export const getFeaturedUniversities = (count: number = 24): University[] => {
  const all = getAllUniversities();
  return all.slice(0, count);
};
