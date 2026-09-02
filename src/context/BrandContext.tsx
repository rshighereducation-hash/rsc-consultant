import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BrandContextType {
  customLogo: string | null;
  customFormLogo: string | null;
  customCeoPhoto: string | null;
  customHeroPhoto: string | null;
  customStudentBanner: string | null;
  customSuccessBanner: string | null;
  customServicesBanner: string | null;
  customLaptopLogo: string | null;
  customUniBanner: string | null;
  customShowcaseLogo: string | null;
  customFaqBanner: string | null;
  customTurkeyChecklistPdf: string | null;
  customTurkeyChecklistName: string | null;
  customTurkeyInterviewPdf: string | null;
  customTurkeyInterviewName: string | null;
  customGermanyChecklistPdf: string | null;
  customGermanyChecklistName: string | null;
  customLithuaniaChecklistPdf: string | null;
  customLithuaniaChecklistName: string | null;
  customUkChecklistPdf: string | null;
  customUkChecklistName: string | null;
  customCyprusChecklistPdf: string | null;
  customCyprusChecklistName: string | null;
  setCustomLogo: (url: string | null) => void;
  setCustomFormLogo: (url: string | null) => void;
  setCustomCeoPhoto: (url: string | null) => void;
  setCustomHeroPhoto: (url: string | null) => void;
  setCustomStudentBanner: (url: string | null) => void;
  setCustomSuccessBanner: (url: string | null) => void;
  setCustomServicesBanner: (url: string | null) => void;
  setCustomLaptopLogo: (url: string | null) => void;
  setCustomUniBanner: (url: string | null) => void;
  setCustomShowcaseLogo: (url: string | null) => void;
  setCustomFaqBanner: (url: string | null) => void;
  setCustomTurkeyChecklistPdf: (url: string | null, name?: string) => void;
  setCustomTurkeyInterviewPdf: (url: string | null, name?: string) => void;
  setCustomGermanyChecklistPdf: (url: string | null, name?: string) => void;
  setCustomLithuaniaChecklistPdf: (url: string | null, name?: string) => void;
  setCustomUkChecklistPdf: (url: string | null, name?: string) => void;
  setCustomCyprusChecklistPdf: (url: string | null, name?: string) => void;
  openLogoModal: () => void;
  openFormLogoModal: () => void;
  openCeoPhotoModal: () => void;
  openHeroPhotoModal: () => void;
  openStudentBannerModal: () => void;
  openSuccessBannerModal: () => void;
  openServicesBannerModal: () => void;
  openLaptopLogoModal: () => void;
  openUniBannerModal: () => void;
  openShowcaseLogoModal: () => void;
  openFaqBannerModal: () => void;
  openTurkeyChecklistModal: () => void;
  openTurkeyInterviewModal: () => void;
  openGermanyChecklistModal: () => void;
  openLithuaniaChecklistModal: () => void;
  openUkChecklistModal: () => void;
  openCyprusChecklistModal: () => void;
  closeUploadModal: () => void;
  uploadModalState: {
    isOpen: boolean;
    type: 'logo' | 'form-logo' | 'ceo-photo' | 'hero-photo' | 'student-banner' | 'success-banner' | 'services-banner' | 'laptop-logo' | 'uni-banner' | 'showcase-logo' | 'faq-banner' | 'turkey-checklist-pdf' | 'turkey-interview-pdf' | 'germany-checklist-pdf' | 'lithuania-checklist-pdf' | 'uk-checklist-pdf' | 'cyprus-checklist-pdf' | null;
  };
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

const LOCAL_STORAGE_LOGO_KEY = 'rs_custom_logo_v1';
const LOCAL_STORAGE_FORM_LOGO_KEY = 'rs_custom_form_logo_v1';
const LOCAL_STORAGE_CEO_PHOTO_KEY = 'rs_custom_ceo_photo_v1';
const LOCAL_STORAGE_HERO_PHOTO_KEY = 'rs_custom_hero_photo_v1';
const LOCAL_STORAGE_STUDENT_BANNER_KEY = 'rs_custom_student_banner_v1';
const LOCAL_STORAGE_SUCCESS_BANNER_KEY = 'rs_custom_success_banner_v1';
const LOCAL_STORAGE_SERVICES_BANNER_KEY = 'rs_custom_services_banner_v1';
const LOCAL_STORAGE_LAPTOP_LOGO_KEY = 'rs_custom_laptop_logo_v1';
const LOCAL_STORAGE_UNI_BANNER_KEY = 'rs_custom_uni_banner_v1';
const LOCAL_STORAGE_SHOWCASE_LOGO_KEY = 'rs_custom_showcase_logo_v1';
const LOCAL_STORAGE_FAQ_BANNER_KEY = 'rs_custom_faq_banner_v1';
const LOCAL_STORAGE_TURKEY_CHECKLIST_PDF_KEY = 'rs_custom_turkey_checklist_pdf_v1';
const LOCAL_STORAGE_TURKEY_CHECKLIST_NAME_KEY = 'rs_custom_turkey_checklist_name_v1';
const LOCAL_STORAGE_TURKEY_INTERVIEW_PDF_KEY = 'rs_custom_turkey_interview_pdf_v1';
const LOCAL_STORAGE_TURKEY_INTERVIEW_NAME_KEY = 'rs_custom_turkey_interview_name_v1';
const LOCAL_STORAGE_GERMANY_CHECKLIST_PDF_KEY = 'rs_custom_germany_checklist_pdf_v1';
const LOCAL_STORAGE_GERMANY_CHECKLIST_NAME_KEY = 'rs_custom_germany_checklist_name_v1';
const LOCAL_STORAGE_LITHUANIA_CHECKLIST_PDF_KEY = 'rs_custom_lithuania_checklist_pdf_v1';
const LOCAL_STORAGE_LITHUANIA_CHECKLIST_NAME_KEY = 'rs_custom_lithuania_checklist_name_v1';
const LOCAL_STORAGE_UK_CHECKLIST_PDF_KEY = 'rs_custom_uk_checklist_pdf_v1';
const LOCAL_STORAGE_UK_CHECKLIST_NAME_KEY = 'rs_custom_uk_checklist_name_v1';
const LOCAL_STORAGE_CYPRUS_CHECKLIST_PDF_KEY = 'rs_custom_cyprus_checklist_pdf_v1';
const LOCAL_STORAGE_CYPRUS_CHECKLIST_NAME_KEY = 'rs_custom_cyprus_checklist_name_v1';

export const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customLogo, setCustomLogoState] = useState<string | null>(null);
  const [customFormLogo, setCustomFormLogoState] = useState<string | null>(null);
  const [customCeoPhoto, setCustomCeoPhotoState] = useState<string | null>(null);
  const [customHeroPhoto, setCustomHeroPhotoState] = useState<string | null>(null);
  const [customStudentBanner, setCustomStudentBannerState] = useState<string | null>(null);
  const [customSuccessBanner, setCustomSuccessBannerState] = useState<string | null>(null);
  const [customServicesBanner, setCustomServicesBannerState] = useState<string | null>(null);
  const [customLaptopLogo, setCustomLaptopLogoState] = useState<string | null>(null);
  const [customUniBanner, setCustomUniBannerState] = useState<string | null>(null);
  const [customShowcaseLogo, setCustomShowcaseLogoState] = useState<string | null>(null);
  const [customFaqBanner, setCustomFaqBannerState] = useState<string | null>(null);
  const [customTurkeyChecklistPdf, setCustomTurkeyChecklistPdfState] = useState<string | null>(null);
  const [customTurkeyChecklistName, setCustomTurkeyChecklistNameState] = useState<string | null>(null);
  const [customTurkeyInterviewPdf, setCustomTurkeyInterviewPdfState] = useState<string | null>(null);
  const [customTurkeyInterviewName, setCustomTurkeyInterviewNameState] = useState<string | null>(null);
  const [customGermanyChecklistPdf, setCustomGermanyChecklistPdfState] = useState<string | null>(null);
  const [customGermanyChecklistName, setCustomGermanyChecklistNameState] = useState<string | null>(null);
  const [customLithuaniaChecklistPdf, setCustomLithuaniaChecklistPdfState] = useState<string | null>(null);
  const [customLithuaniaChecklistName, setCustomLithuaniaChecklistNameState] = useState<string | null>(null);
  const [customUkChecklistPdf, setCustomUkChecklistPdfState] = useState<string | null>(null);
  const [customUkChecklistName, setCustomUkChecklistNameState] = useState<string | null>(null);
  const [customCyprusChecklistPdf, setCustomCyprusChecklistPdfState] = useState<string | null>(null);
  const [customCyprusChecklistName, setCustomCyprusChecklistNameState] = useState<string | null>(null);
  const [uploadModalState, setUploadModalState] = useState<{
    isOpen: boolean;
    type: 'logo' | 'form-logo' | 'ceo-photo' | 'hero-photo' | 'student-banner' | 'success-banner' | 'services-banner' | 'laptop-logo' | 'uni-banner' | 'showcase-logo' | 'faq-banner' | 'turkey-checklist-pdf' | 'turkey-interview-pdf' | 'germany-checklist-pdf' | 'lithuania-checklist-pdf' | 'uk-checklist-pdf' | 'cyprus-checklist-pdf' | null;
  }>({
    isOpen: false,
    type: null,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem(LOCAL_STORAGE_LOGO_KEY);
      if (savedLogo) setCustomLogoState(savedLogo);

      const savedFormLogo = localStorage.getItem(LOCAL_STORAGE_FORM_LOGO_KEY);
      if (savedFormLogo) setCustomFormLogoState(savedFormLogo);

      const savedCeoPhoto = localStorage.getItem(LOCAL_STORAGE_CEO_PHOTO_KEY);
      if (savedCeoPhoto) setCustomCeoPhotoState(savedCeoPhoto);

      const savedHeroPhoto = localStorage.getItem(LOCAL_STORAGE_HERO_PHOTO_KEY);
      if (savedHeroPhoto) setCustomHeroPhotoState(savedHeroPhoto);

      const savedStudentBanner = localStorage.getItem(LOCAL_STORAGE_STUDENT_BANNER_KEY);
      if (savedStudentBanner) setCustomStudentBannerState(savedStudentBanner);

      const savedSuccessBanner = localStorage.getItem(LOCAL_STORAGE_SUCCESS_BANNER_KEY);
      if (savedSuccessBanner) setCustomSuccessBannerState(savedSuccessBanner);

      const savedServicesBanner = localStorage.getItem(LOCAL_STORAGE_SERVICES_BANNER_KEY);
      if (savedServicesBanner) setCustomServicesBannerState(savedServicesBanner);

      const savedLaptopLogo = localStorage.getItem(LOCAL_STORAGE_LAPTOP_LOGO_KEY);
      if (savedLaptopLogo) setCustomLaptopLogoState(savedLaptopLogo);

      const savedUniBanner = localStorage.getItem(LOCAL_STORAGE_UNI_BANNER_KEY);
      if (savedUniBanner) setCustomUniBannerState(savedUniBanner);

      const savedShowcaseLogo = localStorage.getItem(LOCAL_STORAGE_SHOWCASE_LOGO_KEY);
      if (savedShowcaseLogo) setCustomShowcaseLogoState(savedShowcaseLogo);

      const savedFaqBanner = localStorage.getItem(LOCAL_STORAGE_FAQ_BANNER_KEY);
      if (savedFaqBanner) setCustomFaqBannerState(savedFaqBanner);

      const savedTurkeyChecklist = localStorage.getItem(LOCAL_STORAGE_TURKEY_CHECKLIST_PDF_KEY);
      if (savedTurkeyChecklist) setCustomTurkeyChecklistPdfState(savedTurkeyChecklist);
      const savedTurkeyChecklistName = localStorage.getItem(LOCAL_STORAGE_TURKEY_CHECKLIST_NAME_KEY);
      if (savedTurkeyChecklistName) setCustomTurkeyChecklistNameState(savedTurkeyChecklistName);

      const savedTurkeyInterview = localStorage.getItem(LOCAL_STORAGE_TURKEY_INTERVIEW_PDF_KEY);
      if (savedTurkeyInterview) setCustomTurkeyInterviewPdfState(savedTurkeyInterview);
      const savedTurkeyInterviewName = localStorage.getItem(LOCAL_STORAGE_TURKEY_INTERVIEW_NAME_KEY);
      if (savedTurkeyInterviewName) setCustomTurkeyInterviewNameState(savedTurkeyInterviewName);

      const savedGermanyChecklist = localStorage.getItem(LOCAL_STORAGE_GERMANY_CHECKLIST_PDF_KEY);
      if (savedGermanyChecklist) setCustomGermanyChecklistPdfState(savedGermanyChecklist);
      const savedGermanyChecklistName = localStorage.getItem(LOCAL_STORAGE_GERMANY_CHECKLIST_NAME_KEY);
      if (savedGermanyChecklistName) setCustomGermanyChecklistNameState(savedGermanyChecklistName);

      const savedLithuaniaChecklist = localStorage.getItem(LOCAL_STORAGE_LITHUANIA_CHECKLIST_PDF_KEY);
      if (savedLithuaniaChecklist) setCustomLithuaniaChecklistPdfState(savedLithuaniaChecklist);
      const savedLithuaniaChecklistName = localStorage.getItem(LOCAL_STORAGE_LITHUANIA_CHECKLIST_NAME_KEY);
      if (savedLithuaniaChecklistName) setCustomLithuaniaChecklistNameState(savedLithuaniaChecklistName);

      const savedUkChecklist = localStorage.getItem(LOCAL_STORAGE_UK_CHECKLIST_PDF_KEY);
      if (savedUkChecklist) setCustomUkChecklistPdfState(savedUkChecklist);
      const savedUkChecklistName = localStorage.getItem(LOCAL_STORAGE_UK_CHECKLIST_NAME_KEY);
      if (savedUkChecklistName) setCustomUkChecklistNameState(savedUkChecklistName);

      const savedCyprusChecklist = localStorage.getItem(LOCAL_STORAGE_CYPRUS_CHECKLIST_PDF_KEY);
      if (savedCyprusChecklist) setCustomCyprusChecklistPdfState(savedCyprusChecklist);
      const savedCyprusChecklistName = localStorage.getItem(LOCAL_STORAGE_CYPRUS_CHECKLIST_NAME_KEY);
      if (savedCyprusChecklistName) setCustomCyprusChecklistNameState(savedCyprusChecklistName);
    } catch (e) {
      console.warn('Could not load brand assets from localStorage', e);
    }
  }, []);

  const setCustomLogo = (url: string | null) => {
    setCustomLogoState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_LOGO_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_LOGO_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom logo to localStorage', e);
    }
  };

  const setCustomFormLogo = (url: string | null) => {
    setCustomFormLogoState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_FORM_LOGO_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_FORM_LOGO_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom form logo to localStorage', e);
    }
  };

  const setCustomCeoPhoto = (url: string | null) => {
    setCustomCeoPhotoState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_CEO_PHOTO_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_CEO_PHOTO_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom CEO photo to localStorage', e);
    }
  };

  const setCustomHeroPhoto = (url: string | null) => {
    setCustomHeroPhotoState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_HERO_PHOTO_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_HERO_PHOTO_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom hero photo to localStorage', e);
    }
  };

  const setCustomStudentBanner = (url: string | null) => {
    setCustomStudentBannerState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_STUDENT_BANNER_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_STUDENT_BANNER_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom student banner to localStorage', e);
    }
  };

  const setCustomSuccessBanner = (url: string | null) => {
    setCustomSuccessBannerState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_SUCCESS_BANNER_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_SUCCESS_BANNER_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom success banner to localStorage', e);
    }
  };

  const setCustomServicesBanner = (url: string | null) => {
    setCustomServicesBannerState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_SERVICES_BANNER_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_SERVICES_BANNER_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom services banner to localStorage', e);
    }
  };

  const setCustomLaptopLogo = (url: string | null) => {
    setCustomLaptopLogoState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_LAPTOP_LOGO_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_LAPTOP_LOGO_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom laptop logo to localStorage', e);
    }
  };

  const setCustomUniBanner = (url: string | null) => {
    setCustomUniBannerState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_UNI_BANNER_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_UNI_BANNER_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom universities banner to localStorage', e);
    }
  };

  const setCustomShowcaseLogo = (url: string | null) => {
    setCustomShowcaseLogoState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_SHOWCASE_LOGO_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_SHOWCASE_LOGO_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom showcase logo to localStorage', e);
    }
  };

  const setCustomFaqBanner = (url: string | null) => {
    setCustomFaqBannerState(url);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_FAQ_BANNER_KEY, url);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_FAQ_BANNER_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom FAQ banner to localStorage', e);
    }
  };

  const setCustomTurkeyChecklistPdf = (url: string | null, name?: string) => {
    setCustomTurkeyChecklistPdfState(url);
    const fileName = name || (url ? 'Turkey_Checklist_Custom.pdf' : null);
    setCustomTurkeyChecklistNameState(fileName);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_TURKEY_CHECKLIST_PDF_KEY, url);
        if (fileName) localStorage.setItem(LOCAL_STORAGE_TURKEY_CHECKLIST_NAME_KEY, fileName);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TURKEY_CHECKLIST_PDF_KEY);
        localStorage.removeItem(LOCAL_STORAGE_TURKEY_CHECKLIST_NAME_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom Turkey checklist PDF to localStorage', e);
    }
  };

  const setCustomTurkeyInterviewPdf = (url: string | null, name?: string) => {
    setCustomTurkeyInterviewPdfState(url);
    const fileName = name || (url ? 'Turkey_Questioner_Custom.pdf' : null);
    setCustomTurkeyInterviewNameState(fileName);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_TURKEY_INTERVIEW_PDF_KEY, url);
        if (fileName) localStorage.setItem(LOCAL_STORAGE_TURKEY_INTERVIEW_NAME_KEY, fileName);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TURKEY_INTERVIEW_PDF_KEY);
        localStorage.removeItem(LOCAL_STORAGE_TURKEY_INTERVIEW_NAME_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom Turkey interview PDF to localStorage', e);
    }
  };

  const setCustomGermanyChecklistPdf = (url: string | null, name?: string) => {
    setCustomGermanyChecklistPdfState(url);
    const fileName = name || (url ? 'Germany_Checklist_Custom.pdf' : null);
    setCustomGermanyChecklistNameState(fileName);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_GERMANY_CHECKLIST_PDF_KEY, url);
        if (fileName) localStorage.setItem(LOCAL_STORAGE_GERMANY_CHECKLIST_NAME_KEY, fileName);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_GERMANY_CHECKLIST_PDF_KEY);
        localStorage.removeItem(LOCAL_STORAGE_GERMANY_CHECKLIST_NAME_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom Germany checklist PDF to localStorage', e);
    }
  };

  const setCustomLithuaniaChecklistPdf = (url: string | null, name?: string) => {
    setCustomLithuaniaChecklistPdfState(url);
    const fileName = name || (url ? 'Lithuania_Checklist_Custom.pdf' : null);
    setCustomLithuaniaChecklistNameState(fileName);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_LITHUANIA_CHECKLIST_PDF_KEY, url);
        if (fileName) localStorage.setItem(LOCAL_STORAGE_LITHUANIA_CHECKLIST_NAME_KEY, fileName);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_LITHUANIA_CHECKLIST_PDF_KEY);
        localStorage.removeItem(LOCAL_STORAGE_LITHUANIA_CHECKLIST_NAME_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom Lithuania checklist PDF to localStorage', e);
    }
  };

  const setCustomUkChecklistPdf = (url: string | null, name?: string) => {
    setCustomUkChecklistPdfState(url);
    const fileName = name || (url ? 'UK_Checklist_Custom.pdf' : null);
    setCustomUkChecklistNameState(fileName);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_UK_CHECKLIST_PDF_KEY, url);
        if (fileName) localStorage.setItem(LOCAL_STORAGE_UK_CHECKLIST_NAME_KEY, fileName);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_UK_CHECKLIST_PDF_KEY);
        localStorage.removeItem(LOCAL_STORAGE_UK_CHECKLIST_NAME_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom UK checklist PDF to localStorage', e);
    }
  };

  const setCustomCyprusChecklistPdf = (url: string | null, name?: string) => {
    setCustomCyprusChecklistPdfState(url);
    const fileName = name || (url ? 'Cyprus_Checklist_Custom.pdf' : null);
    setCustomCyprusChecklistNameState(fileName);
    try {
      if (url) {
        localStorage.setItem(LOCAL_STORAGE_CYPRUS_CHECKLIST_PDF_KEY, url);
        if (fileName) localStorage.setItem(LOCAL_STORAGE_CYPRUS_CHECKLIST_NAME_KEY, fileName);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_CYPRUS_CHECKLIST_PDF_KEY);
        localStorage.removeItem(LOCAL_STORAGE_CYPRUS_CHECKLIST_NAME_KEY);
      }
    } catch (e) {
      console.warn('Could not save custom Cyprus checklist PDF to localStorage', e);
    }
  };

  const openLogoModal = () => {
    setUploadModalState({ isOpen: true, type: 'logo' });
  };

  const openFormLogoModal = () => {
    setUploadModalState({ isOpen: true, type: 'form-logo' });
  };

  const openCeoPhotoModal = () => {
    setUploadModalState({ isOpen: true, type: 'ceo-photo' });
  };

  const openHeroPhotoModal = () => {
    setUploadModalState({ isOpen: true, type: 'hero-photo' });
  };

  const openStudentBannerModal = () => {
    setUploadModalState({ isOpen: true, type: 'student-banner' });
  };

  const openSuccessBannerModal = () => {
    setUploadModalState({ isOpen: true, type: 'success-banner' });
  };

  const openServicesBannerModal = () => {
    setUploadModalState({ isOpen: true, type: 'services-banner' });
  };

  const openLaptopLogoModal = () => {
    setUploadModalState({ isOpen: true, type: 'laptop-logo' });
  };

  const openUniBannerModal = () => {
    setUploadModalState({ isOpen: true, type: 'uni-banner' });
  };

  const openShowcaseLogoModal = () => {
    setUploadModalState({ isOpen: true, type: 'showcase-logo' });
  };

  const openFaqBannerModal = () => {
    setUploadModalState({ isOpen: true, type: 'faq-banner' });
  };

  const openTurkeyChecklistModal = () => {
    setUploadModalState({ isOpen: true, type: 'turkey-checklist-pdf' });
  };

  const openTurkeyInterviewModal = () => {
    setUploadModalState({ isOpen: true, type: 'turkey-interview-pdf' });
  };

  const openGermanyChecklistModal = () => {
    setUploadModalState({ isOpen: true, type: 'germany-checklist-pdf' });
  };

  const openLithuaniaChecklistModal = () => {
    setUploadModalState({ isOpen: true, type: 'lithuania-checklist-pdf' });
  };

  const openUkChecklistModal = () => {
    setUploadModalState({ isOpen: true, type: 'uk-checklist-pdf' });
  };

  const openCyprusChecklistModal = () => {
    setUploadModalState({ isOpen: true, type: 'cyprus-checklist-pdf' });
  };

  const closeUploadModal = () => {
    setUploadModalState({ isOpen: false, type: null });
  };

  return (
    <BrandContext.Provider
      value={{
        customLogo,
        customFormLogo,
        customCeoPhoto,
        customHeroPhoto,
        customStudentBanner,
        customSuccessBanner,
        customServicesBanner,
        customLaptopLogo,
        customUniBanner,
        customShowcaseLogo,
        customFaqBanner,
        customTurkeyChecklistPdf,
        customTurkeyChecklistName,
        customTurkeyInterviewPdf,
        customTurkeyInterviewName,
        customGermanyChecklistPdf,
        customGermanyChecklistName,
        customLithuaniaChecklistPdf,
        customLithuaniaChecklistName,
        customUkChecklistPdf,
        customUkChecklistName,
        customCyprusChecklistPdf,
        customCyprusChecklistName,
        setCustomLogo,
        setCustomFormLogo,
        setCustomCeoPhoto,
        setCustomHeroPhoto,
        setCustomStudentBanner,
        setCustomSuccessBanner,
        setCustomServicesBanner,
        setCustomLaptopLogo,
        setCustomUniBanner,
        setCustomShowcaseLogo,
        setCustomFaqBanner,
        setCustomTurkeyChecklistPdf,
        setCustomTurkeyInterviewPdf,
        setCustomGermanyChecklistPdf,
        setCustomLithuaniaChecklistPdf,
        setCustomUkChecklistPdf,
        setCustomCyprusChecklistPdf,
        openLogoModal,
        openFormLogoModal,
        openCeoPhotoModal,
        openHeroPhotoModal,
        openStudentBannerModal,
        openSuccessBannerModal,
        openServicesBannerModal,
        openLaptopLogoModal,
        openUniBannerModal,
        openShowcaseLogoModal,
        openFaqBannerModal,
        openTurkeyChecklistModal,
        openTurkeyInterviewModal,
        openGermanyChecklistModal,
        openLithuaniaChecklistModal,
        openUkChecklistModal,
        openCyprusChecklistModal,
        closeUploadModal,
        uploadModalState,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = (): BrandContextType => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
