export const BUSINESS_INFO = {
  brandName: 'RS Higher Education Consultants',
  shortName: 'RS HEC',
  slogan: 'Your Gateway to Global Education',
  supportingMessage: 'Choose Your Destination. Build Your Future.',
  email: 'info@rshec.pk',
  phone: '+92 334 4626284',
  phoneClean: '+923344626284',
  whatsappNumber: '923344626284',
  whatsappDisplay: '+92 334 4626284',
  address: {
    full: 'Office No. UG-389, Deans Trade Centre, Peshawar, KPK, Pakistan',
    office: 'Office No. UG-389',
    building: 'Deans Trade Centre',
    road: 'Saddar Road, Peshawar Cantt',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
    landmark: 'Upper Ground Floor, Deans Trade Centre, Near Saddar',
    mapsUrl: 'https://maps.app.goo.gl/AZ8Gwq6PdELtw6fR6?g_st=aw'
  },
  officeCity: 'Peshawar, KPK',
  website: 'rshec.pk',
  openingHours: 'Monday – Saturday: 10:00 AM – 6:00 PM (PKT)',
  hours: {
    weekdays: 'Monday – Saturday',
    time: '10:00 AM – 6:00 PM (PKT)',
    sunday: 'Sunday'
  },
  social: {
    facebook: 'https://www.facebook.com/share/19h5HbrG62/',
    instagram: 'https://www.instagram.com/rshighereducation/',
    instagramInvite: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=d0icbab',
    tiktok: 'https://www.tiktok.com/@rshec.pk?_r=1&_t=ZS-992DnxgxUTU',
    linkedin: 'https://www.linkedin.com/company/rs-higher-education-consultants/',
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/share/19h5HbrG62/',
    instagram: 'https://www.instagram.com/rshighereducation/',
    tiktok: 'https://www.tiktok.com/@rshec.pk?_r=1&_t=ZS-992DnxgxUTU',
    linkedin: 'https://www.linkedin.com/company/rs-higher-education-consultants/',
  },
  founder: {
    name: 'Rahmat Shah',
    title: 'Founder & Chief Executive Officer',
    shortTitle: 'Founder & CEO',
    company: 'RS Higher Education Consultants',
    credentials: 'Lead International Education Strategist & Student Mentor',
    email: 'info@rshec.pk',
    phone: '+92 334 4626284',
    location: 'Deans Trade Centre, Peshawar, Pakistan',
    quote: 'Students’ satisfaction is my first priority. True educational consultancy is about unlocking human potential with honesty, rigorous preparation, and ethical guidance.',
    message: `Welcome to RS Higher Education Consultants. When I founded this organization in Peshawar, my vision was clear: to build an educational consultancy that Pakistani students and their families could trust wholeheartedly.

For too long, students in Khyber Pakhtunkhwa and across Pakistan have faced confusing advice, misleading claims, and hidden charges. At RS Higher Education Consultants, we have dismantled that model. Every student who walks through our doors receives clinical profile evaluation, honest eligibility assessments, and tailored academic pathways across 16 world-class study destinations.

Studying abroad is one of the most significant milestones in a student's life. It builds character, fosters international networks, and opens global career horizons. My dedicated team and I are personally committed to standing by your side—from your initial course shortlisting and SOP refinement to visa lodgment and airport departure. 

Your ambition is our responsibility. We look forward to guiding you toward your global academic dreams with integrity and excellence.`,
    pillars: [
      {
        title: 'Ethical & Transparent Advisory',
        desc: 'Zero fake guarantees or hidden charges. We provide 100% candid eligibility advice grounded in official embassy regulations.'
      },
      {
        title: 'Direct Strategic Mentorship',
        desc: 'Every student case is reviewed with personalized attention to maximize admission offer letters and scholarship success.'
      },
      {
        title: '16 Global Study Pathways',
        desc: 'Direct admissions access to 160+ accredited universities spanning the UK, USA, Canada, Australia, Europe, and Asia.'
      },
      {
        title: 'End-to-End Student Care',
        desc: 'Comprehensive support from document attestation and SOP structuring to interview coaching and pre-departure briefings.'
      }
    ]
  },
  defaultWhatsappMessage: 'Hello RS Higher Education Consultants, I would like guidance about studying abroad.',
};

export const getDestinationWhatsappLink = (countryName: string) => {
  const text = encodeURIComponent(
    `Hello RS Higher Education Consultants, I am interested in studying in ${countryName}. Please guide me about admission and visa requirements.`
  );
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
};
