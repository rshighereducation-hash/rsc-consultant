import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useBrand } from '../context/BrandContext';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Sparkles,
  RefreshCw,
  Link as LinkIcon,
  ShieldCheck,
  AlertCircle,
  FileText,
  FileCheck2,
  Download,
  Eye
} from 'lucide-react';

export const MediaUploadModal: React.FC = () => {
  const {
    uploadModalState,
    closeUploadModal,
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
  } = useBrand();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!uploadModalState.isOpen || !uploadModalState.type) return null;

  const isLogo = uploadModalState.type === 'logo';
  const isFormLogo = uploadModalState.type === 'form-logo';
  const isHero = uploadModalState.type === 'hero-photo';
  const isStudent = uploadModalState.type === 'student-banner';
  const isSuccess = uploadModalState.type === 'success-banner';
  const isServices = uploadModalState.type === 'services-banner';
  const isLaptopLogo = uploadModalState.type === 'laptop-logo';
  const isUniBanner = uploadModalState.type === 'uni-banner';
  const isShowcaseLogo = uploadModalState.type === 'showcase-logo';
  const isFaqBanner = uploadModalState.type === 'faq-banner';
  const isTurkeyChecklistPdf = uploadModalState.type === 'turkey-checklist-pdf';
  const isTurkeyInterviewPdf = uploadModalState.type === 'turkey-interview-pdf';
  const isGermanyChecklistPdf = uploadModalState.type === 'germany-checklist-pdf';
  const isLithuaniaChecklistPdf = uploadModalState.type === 'lithuania-checklist-pdf';
  const isUkChecklistPdf = uploadModalState.type === 'uk-checklist-pdf';
  const isCyprusChecklistPdf = uploadModalState.type === 'cyprus-checklist-pdf';
  const isPdfUpload = isTurkeyChecklistPdf || isTurkeyInterviewPdf || isGermanyChecklistPdf || isLithuaniaChecklistPdf || isUkChecklistPdf || isCyprusChecklistPdf;

  const currentAsset = isLogo
    ? customLogo
    : isFormLogo
    ? (customFormLogo || customLogo)
    : isHero
    ? customHeroPhoto
    : isStudent
    ? customStudentBanner
    : isSuccess
    ? customSuccessBanner
    : isServices
    ? customServicesBanner
    : isLaptopLogo
    ? customLaptopLogo
    : isUniBanner
    ? customUniBanner
    : isShowcaseLogo
    ? customShowcaseLogo
    : isFaqBanner
    ? customFaqBanner
    : isTurkeyChecklistPdf
    ? customTurkeyChecklistPdf
    : isTurkeyInterviewPdf
    ? customTurkeyInterviewPdf
    : isGermanyChecklistPdf
    ? customGermanyChecklistPdf
    : isLithuaniaChecklistPdf
    ? customLithuaniaChecklistPdf
    : isUkChecklistPdf
    ? customUkChecklistPdf
    : isCyprusChecklistPdf
    ? customCyprusChecklistPdf
    : customCeoPhoto;

  const currentAssetName = isTurkeyChecklistPdf
    ? customTurkeyChecklistName
    : isTurkeyInterviewPdf
    ? customTurkeyInterviewName
    : isGermanyChecklistPdf
    ? customGermanyChecklistName
    : isLithuaniaChecklistPdf
    ? customLithuaniaChecklistName
    : isUkChecklistPdf
    ? customUkChecklistName
    : isCyprusChecklistPdf
    ? customCyprusChecklistName
    : null;

  // Process file (image or PDF) to base64
  const processUploadedFile = (file: File) => {
    if (isPdfUpload) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isImg = file.type.startsWith('image/');

      if (!isPdf && !isImg) {
        setErrorMsg('Please select a valid PDF document or image file (PDF, PNG, JPG).');
        return;
      }

      if (file.size > 25 * 1024 * 1024) {
        setErrorMsg('File size exceeds 25MB. Please choose a smaller PDF file.');
        return;
      }

      setIsProcessing(true);
      setErrorMsg(null);
      setSuccessMsg(null);
      setUploadedFileName(file.name);
      setUploadedFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        setIsProcessing(false);
      };
      reader.onerror = () => {
        setErrorMsg('Failed to read document file.');
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
      return;
    }

    // Image processing
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, JPEG, SVG, or WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 15MB. Please choose a smaller file.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setUploadedFileName(file.name);
    setUploadedFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;

      // If it's SVG, keep direct data URL
      if (file.type === 'image/svg+xml') {
        setPreviewUrl(result);
        setIsProcessing(false);
        return;
      }

      // For raster images, optimize size using canvas to prevent exceeding localStorage quota
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = isLogo || isShowcaseLogo || isLaptopLogo ? 800 : isHero || isStudent ? 1600 : 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (file.type === 'image/png') {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedPng = canvas.toDataURL('image/png');
            setPreviewUrl(optimizedPng);
          } else {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedJpg = canvas.toDataURL('image/jpeg', 0.9);
            setPreviewUrl(optimizedJpg);
          }
        } else {
          setPreviewUrl(result);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setPreviewUrl(result);
        setIsProcessing(false);
      };
      img.src = result;
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read image file.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
    setUploadedFileName(urlInput.trim().split('/').pop() || 'Custom Document');
    setErrorMsg(null);
  };

  const handleSave = () => {
    if (!previewUrl) return;

    if (isTurkeyChecklistPdf) {
      setCustomTurkeyChecklistPdf(previewUrl, uploadedFileName || 'Turkey_Checklist_Custom.pdf');
      setSuccessMsg('Turkey checklist PDF uploaded and saved successfully! Downloads will now serve this file.');
    } else if (isTurkeyInterviewPdf) {
      setCustomTurkeyInterviewPdf(previewUrl, uploadedFileName || 'Turkey_Questioner_Custom.pdf');
      setSuccessMsg('Turkey Questioner PDF uploaded and saved successfully! Downloads will now serve this file.');
    } else if (isGermanyChecklistPdf) {
      setCustomGermanyChecklistPdf(previewUrl, uploadedFileName || 'Germany_Checklist_Custom.pdf');
      setSuccessMsg('Germany checklist PDF uploaded and saved successfully! Downloads will now serve this file.');
    } else if (isLithuaniaChecklistPdf) {
      setCustomLithuaniaChecklistPdf(previewUrl, uploadedFileName || 'Lithuania_Checklist_Custom.pdf');
      setSuccessMsg('Lithuania checklist PDF uploaded and saved successfully! Downloads will now serve this file.');
    } else if (isUkChecklistPdf) {
      setCustomUkChecklistPdf(previewUrl, uploadedFileName || 'UK_Checklist_Custom.pdf');
      setSuccessMsg('UK checklist PDF uploaded and saved successfully! Downloads will now serve this file.');
    } else if (isCyprusChecklistPdf) {
      setCustomCyprusChecklistPdf(previewUrl, uploadedFileName || 'Cyprus_Checklist_Custom.pdf');
      setSuccessMsg('Cyprus checklist PDF uploaded and saved successfully! Downloads will now serve this file.');
    } else if (isLogo) {
      setCustomLogo(previewUrl);
      setSuccessMsg('Original brand logo updated successfully across the site!');
    } else if (isFormLogo) {
      setCustomFormLogo(previewUrl);
      setSuccessMsg('Form header brand logo updated successfully!');
    } else if (isHero) {
      setCustomHeroPhoto(previewUrl);
      setSuccessMsg('Hero banner picture updated successfully!');
    } else if (isStudent) {
      setCustomStudentBanner(previewUrl);
      setSuccessMsg('Student picture updated successfully!');
    } else if (isSuccess) {
      setCustomSuccessBanner(previewUrl);
      setSuccessMsg('Student success picture updated successfully!');
    } else if (isServices) {
      setCustomServicesBanner(previewUrl);
      setSuccessMsg('Services student picture updated successfully!');
    } else if (isLaptopLogo) {
      setCustomLaptopLogo(previewUrl);
      setSuccessMsg('Laptop screen logo updated successfully!');
    } else if (isUniBanner) {
      setCustomUniBanner(previewUrl);
      setSuccessMsg('Universities campus architecture picture updated successfully!');
    } else if (isShowcaseLogo) {
      setCustomShowcaseLogo(previewUrl);
      setSuccessMsg('Brand Showcase card logo updated independently!');
    } else if (isFaqBanner) {
      setCustomFaqBanner(previewUrl);
      setSuccessMsg('FAQ graduation & mentorship background picture updated successfully!');
    } else {
      setCustomCeoPhoto(previewUrl);
      setSuccessMsg('Founder & CEO photo updated successfully!');
    }

    setTimeout(() => {
      closeUploadModal();
      setPreviewUrl(null);
      setUploadedFileName(null);
      setUploadedFileSize(null);
      setUrlInput('');
      setSuccessMsg(null);
    }, 900);
  };

  const handleResetToDefault = () => {
    if (isTurkeyChecklistPdf) {
      setCustomTurkeyChecklistPdf(null);
      setPreviewUrl(null);
      setUploadedFileName(null);
      setSuccessMsg('Turkey checklist reset to default official generated PDF.');
    } else if (isTurkeyInterviewPdf) {
      setCustomTurkeyInterviewPdf(null);
      setPreviewUrl(null);
      setUploadedFileName(null);
      setSuccessMsg('Turkey Questioner reset to default official generated PDF.');
    } else if (isGermanyChecklistPdf) {
      setCustomGermanyChecklistPdf(null);
      setPreviewUrl(null);
      setUploadedFileName(null);
      setSuccessMsg('Germany checklist reset to default official generated PDF.');
    } else if (isLithuaniaChecklistPdf) {
      setCustomLithuaniaChecklistPdf(null);
      setPreviewUrl(null);
      setUploadedFileName(null);
      setSuccessMsg('Lithuania checklist reset to default official generated PDF.');
    } else if (isUkChecklistPdf) {
      setCustomUkChecklistPdf(null);
      setPreviewUrl(null);
      setUploadedFileName(null);
      setSuccessMsg('UK checklist reset to default official generated PDF.');
    } else if (isCyprusChecklistPdf) {
      setCustomCyprusChecklistPdf(null);
      setPreviewUrl(null);
      setUploadedFileName(null);
      setSuccessMsg('Cyprus checklist reset to default official generated PDF.');
    } else if (isLogo) {
      setCustomLogo(null);
      setPreviewUrl(null);
      setSuccessMsg('Logo reset to default RS Higher Education vector insignia.');
    } else if (isFormLogo) {
      setCustomFormLogo(null);
      setPreviewUrl(null);
      setSuccessMsg('Form logo reset to default official RS Higher Education emblem.');
    } else if (isHero) {
      setCustomHeroPhoto(null);
      setPreviewUrl(null);
      setSuccessMsg('Hero picture reset to default international students photo.');
    } else if (isStudent) {
      setCustomStudentBanner(null);
      setPreviewUrl(null);
      setSuccessMsg('Student picture reset to default international campus photograph.');
    } else if (isSuccess) {
      setCustomSuccessBanner(null);
      setPreviewUrl(null);
      setSuccessMsg('Student success picture reset to default graduates photograph.');
    } else if (isServices) {
      setCustomServicesBanner(null);
      setPreviewUrl(null);
      setSuccessMsg('Services picture reset to default students study session photograph.');
    } else if (isLaptopLogo) {
      setCustomLaptopLogo(null);
      setPreviewUrl(null);
      setSuccessMsg('Laptop screen logo reset to official RS brand insignia.');
    } else if (isUniBanner) {
      setCustomUniBanner(null);
      setPreviewUrl(null);
      setSuccessMsg('Universities picture reset to default global campuses architecture photograph.');
    } else if (isShowcaseLogo) {
      setCustomShowcaseLogo(null);
      setPreviewUrl(null);
      setSuccessMsg('Showcase logo reset to default insignia.');
    } else if (isFaqBanner) {
      setCustomFaqBanner(null);
      setPreviewUrl(null);
      setSuccessMsg('FAQ graduation background picture reset to official convocation photo.');
    } else {
      setCustomCeoPhoto(null);
      setPreviewUrl(null);
      setSuccessMsg('Photo reset to default Founder & CEO portrait.');
    }

    setTimeout(() => {
      closeUploadModal();
      setSuccessMsg(null);
    }, 800);
  };

  const handleTestDownloadPreview = () => {
    const fileToDownload = previewUrl || currentAsset;
    if (!fileToDownload) return;
    const a = document.createElement('a');
    a.href = fileToDownload;
    a.download =
      uploadedFileName ||
      currentAssetName ||
      (isGermanyChecklistPdf
        ? 'Germany_Checklist.pdf'
        : isTurkeyChecklistPdf
        ? 'Turkey_Checklist.pdf'
        : isTurkeyInterviewPdf
        ? 'Turkey_Questioner.pdf'
        : isLithuaniaChecklistPdf
        ? 'Lithuania_Checklist.pdf'
        : isUkChecklistPdf
        ? 'UK_Checklist.pdf'
        : isCyprusChecklistPdf
        ? 'Cyprus_Checklist.pdf'
        : 'Document.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      id="media-upload-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-red-100 relative space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeUploadModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-50 text-[#DB0303] border border-red-100">
            {isPdfUpload ? <FileText className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#DB0303] uppercase tracking-wider font-heading">
              <Sparkles className="w-3 h-3" />
              <span>{isPdfUpload ? 'Upload PDF from PC' : 'Import Asset from PC'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              {isGermanyChecklistPdf
                ? 'Upload Germany Checklist (PDF)'
                : isTurkeyChecklistPdf
                ? 'Upload Turkey Checklist (PDF)'
                : isTurkeyInterviewPdf
                ? 'Upload Turkey Questioner (PDF)'
                : isLithuaniaChecklistPdf
                ? 'Upload Lithuania Checklist (PDF)'
                : isUkChecklistPdf
                ? 'Upload UK Checklist (PDF)'
                : isCyprusChecklistPdf
                ? 'Upload Cyprus Checklist (PDF)'
                : isLogo
                ? 'Upload Original Brand Logo'
                : isHero
                ? 'Upload Hero Banner Picture'
                : isStudent
                ? 'Upload / Replace Student Picture'
                : isSuccess
                ? 'Upload / Replace Success Student Picture'
                : isServices
                ? 'Upload / Replace Services Student Picture'
                : isLaptopLogo
                ? 'Upload Laptop Screen Logo'
                : isUniBanner
                ? 'Upload / Replace Universities Architecture Photo'
                : isShowcaseLogo
                ? 'Upload Brand Showcase Card Logo'
                : isFaqBanner
                ? 'Upload / Replace FAQ Graduation & Mentorship Picture'
                : 'Upload Founder & CEO Picture'}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isGermanyChecklistPdf
            ? 'Browse and upload your exact Germany University & Visa Checklist PDF file directly from your computer. Once saved, clicking "Download Germany Checklist (PDF)" anywhere on the website will download this exact document.'
            : isTurkeyChecklistPdf
            ? 'Browse and upload your exact Turkey Admission & Visa Checklist PDF file directly from your computer. Once saved, clicking "Turkey checklist (PDF)" anywhere on the website will download this exact document.'
            : isTurkeyInterviewPdf
            ? 'Browse and upload your exact Turkey 18-Question Interview Questioner PDF file directly from your computer. Once saved, clicking "Turkey Questioner (PDF)" anywhere on the website will download this exact document.'
            : isLithuaniaChecklistPdf
            ? 'Browse and upload your exact Lithuania Admission & Visa Checklist PDF file directly from your computer.'
            : isUkChecklistPdf
            ? 'Browse and upload your exact UK Requirements & Admission Process Checklist PDF file directly from your computer.'
            : isCyprusChecklistPdf
            ? 'Browse and upload your exact Cyprus Requirements & Admission Process Checklist PDF file directly from your computer.'
            : isLogo
            ? 'Import your official RS Higher Education Consultants logo from your computer. Transparent PNG or SVG formats work best.'
            : isHero
            ? 'Import a custom photo or graphic for the main hero banner from your PC (e.g. students, campus, office, or visa success).'
            : isStudent
            ? 'Import a custom horizontal photograph of students, university life, or study visa achievers from your PC.'
            : isSuccess
            ? 'Import a custom horizontal photograph of successful Pakistani students, graduates, or visa achievers from your PC.'
            : isServices
            ? 'Import a custom horizontal photograph of students in consultation, academic counselling, or university study from your PC.'
            : isLaptopLogo
            ? 'Import your RS company logo or portal graphic to be displayed clearly on the laptop screens in the students consultation picture.'
            : isUniBanner
            ? 'Import a custom wide horizontal photograph combining top world university buildings, architectural campuses, or study destinations from your PC.'
            : isShowcaseLogo
            ? 'Upload a dedicated logo specifically for this Brand Showcase & Trust card from your PC. This is independent and will not change any other logo across the website.'
            : isFaqBanner
            ? 'Import a custom photograph from your PC (such as graduation convocation, academic gown portrait, or university mentorship session).'
            : 'Import an updated executive portrait or photograph for Founder & CEO Rahmat Shah from your PC.'}
        </p>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-[#DB0303] bg-red-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-[#DB0303] hover:bg-slate-50/80 bg-slate-50/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={isPdfUpload ? '.pdf, application/pdf, image/png, image/jpeg' : 'image/png, image/jpeg, image/jpg, image/svg+xml, image/webp'}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="space-y-3 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-[#DB0303]">
              {isPdfUpload ? <FileCheck2 className="w-7 h-7" /> : <ImageIcon className="w-7 h-7" />}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800 font-heading">
                {isPdfUpload ? 'Click to browse PDF from your PC or drag & drop here' : 'Click to browse or drag & drop image here'}
              </p>
              <p className="text-xs text-slate-500">
                {isPdfUpload ? 'Supports official .PDF files or scans (up to 25MB)' : 'Supports PNG, JPG, JPEG, SVG, WEBP (up to 15MB)'}
              </p>
            </div>

            <button
              type="button"
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs font-heading flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#DB0303]" />
              <span>Browse File from PC</span>
            </button>
          </div>
        </div>

        {/* Live Preview Box */}
        {(previewUrl || currentAsset) && (
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-700 font-bold font-heading">
              <span>{previewUrl ? 'Selected New File:' : 'Current Active File:'}</span>
              {previewUrl && (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-semibold">
                  Ready to Apply
                </span>
              )}
            </div>

            {isPdfUpload ? (
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#DB0303] shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 font-heading truncate">
                      {uploadedFileName || currentAssetName || (isTurkeyChecklistPdf ? 'Turkey_Checklist.pdf' : 'Turkey_Questioner.pdf')}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {uploadedFileSize ? `Size: ${uploadedFileSize}` : 'Custom document ready for student download'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestDownloadPreview}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  title="Test Download Document"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Test File</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4 bg-white rounded-xl border border-slate-200 overflow-hidden min-h-[120px] max-h-[220px]">
                <img
                  src={previewUrl || currentAsset || ''}
                  alt="Brand asset preview"
                  className="max-h-48 max-w-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        )}

        {/* Paste Direct URL option */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 font-heading flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>{isPdfUpload ? 'Or paste direct PDF URL:' : 'Or paste direct image URL:'}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder={isPdfUpload ? 'https://example.com/official-turkey-checklist.pdf' : 'https://example.com/my-original-logo.png'}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#DB0303] focus:ring-1 focus:ring-[#DB0303]"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl font-heading"
            >
              Load URL
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {currentAsset ? (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="w-full sm:w-auto px-4 py-2.5 text-slate-600 hover:text-red-700 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default {isPdfUpload ? 'Generated PDF' : isLogo ? 'Logo' : 'Photo'}</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={closeUploadModal}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl font-heading transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!previewUrl || isProcessing}
              onClick={handleSave}
              className={`px-6 py-2.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs font-bold rounded-xl font-heading shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !previewUrl || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? 'Processing...' : 'Apply & Save Document'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
