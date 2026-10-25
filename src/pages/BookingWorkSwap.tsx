
import React, { useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';

import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLanguage } from '../contexts/LanguageContext';
import { isValidEmail, isValidPhone, sanitizeInput } from '../utils/security';

// Work-swap applications are delivered by email via FormSubmit, the same way
// as the accommodation booking form (see BookingStay.tsx). GitHub Pages is a
// static host with no backend, so email delivery is the only option here.
const BOOKING_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/rumahpapanklang01@gmail.com';

// Minimum work-swap duration (consecutive days) required by the venue.
const MIN_SWAP_DAYS = 14;

// Type definitions for the work-swap application form
export interface BookingWorkSwapFormData {
    // Basic Info
    name: string;
    email: string;
    phone: string;
    nationality: string;

    // Arrival Info
    arrivalDate: string;

    // Motivation
    purpose: string;

    // Other
    remarks: string;
}

const EMPTY_FORM: BookingWorkSwapFormData = {
    name: '',
    email: '',
    phone: '',
    nationality: '',
    arrivalDate: '',
    purpose: '',
    remarks: ''
};

export const BookingWorkSwap: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const [formData, setFormData] = useState<BookingWorkSwapFormData>(EMPTY_FORM);

    // Form validation errors
    const [errors, setErrors] = useState<Partial<Record<keyof BookingWorkSwapFormData, string>>>({});
    // Prevent double submission
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof BookingWorkSwapFormData, value: string) => {
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Validate all required fields
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof BookingWorkSwapFormData, string>> = {};
        const requiredMsg = language === 'zh' ? '此欄位為必填' : 'This field is required';
        const invalidEmailMsg = language === 'zh' ? '請輸入有效的電子郵件' : 'Please enter a valid email';
        const invalidPhoneMsg = language === 'zh' ? '請輸入有效的電話號碼' : 'Please enter a valid phone number';

        // Required text fields
        if (!sanitizeInput(formData.name)) newErrors.name = requiredMsg;
        if (!sanitizeInput(formData.email)) {
            newErrors.email = requiredMsg;
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = invalidEmailMsg;
        }
        if (!sanitizeInput(formData.phone)) {
            newErrors.phone = requiredMsg;
        } else if (!isValidPhone(formData.phone)) {
            newErrors.phone = invalidPhoneMsg;
        }
        if (!sanitizeInput(formData.nationality)) newErrors.nationality = requiredMsg;

        // Required arrival date
        if (!formData.arrivalDate) newErrors.arrivalDate = requiredMsg;

        // Required purpose
        if (!sanitizeInput(formData.purpose)) newErrors.purpose = requiredMsg;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        // Prevent double submission
        if (isSubmitting) return;

        // Validate form
        if (!validateForm()) {
            const errorMsg = language === 'zh' ? '請填寫所有必填欄位' : 'Please fill in all required fields';
            alert(errorMsg);
            return;
        }

        setIsSubmitting(true);

        try {
            // Sanitize data before submission
            const sanitizedData = {
                name: sanitizeInput(formData.name, 100),
                email: sanitizeInput(formData.email, 254),
                phone: sanitizeInput(formData.phone, 30),
                nationality: sanitizeInput(formData.nationality, 100),
                arrivalDate: formData.arrivalDate,
                purpose: sanitizeInput(formData.purpose, 3000),
                remarks: sanitizeInput(formData.remarks, 2000),
            };

            // Email the application via FormSubmit (no backend required).
            const response = await fetch(BOOKING_EMAIL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    _subject: `新換宿申請 / New Work-Swap Application - ${sanitizedData.name}`,
                    _template: 'table',
                    _captcha: 'false',
                    '表單類型 Form Type': '技能換宿 Work Swap',
                    '姓名 Name': sanitizedData.name,
                    'Email': sanitizedData.email,
                    '電話 Phone': sanitizedData.phone,
                    '國籍 Nationality': sanitizedData.nationality,
                    '預計抵達日期 Arrival Date': sanitizedData.arrivalDate,
                    '換宿原因與目的 Purpose': sanitizedData.purpose,
                    '備註 Remarks': sanitizedData.remarks || '—',
                }),
            });

            const result = await response.json().catch(() => null);
            const succeeded = result && (result.success === 'true' || result.success === true);

            if (!response.ok || !succeeded) {
                throw new Error(
                    (result && result.message) ||
                    (language === 'zh' ? '提交失敗，請稍後再試' : 'Submission failed, please try again')
                );
            }

            console.log('[BookingWorkSwap] Application submitted successfully:', result);

            const msg = language === 'zh' ? "申請已送出！我們會盡快聯繫您。" : "Application submitted! We will contact you shortly.";
            alert(msg);

            // Reset form after successful submission
            setFormData(EMPTY_FORM);
        } catch (error: unknown) {
            console.error('Submission error:', error);
            const detail = error instanceof Error ? error.message : '';
            const errorMsg = language === 'zh'
                ? `提交失敗：${detail || '請稍後再試'}`
                : `Submission failed: ${detail || 'Please try again later'}`;
            alert(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Translations
    const t = {
        title: language === 'zh' ? '技能換宿申請' : 'Work-Swap Application',
        subtitle: language === 'zh' ? '填寫下表，我們將盡快與您聯繫確認' : 'Fill out the form below, we will contact you shortly to confirm.',
        sectionBasic: language === 'zh' ? '基本資訊' : 'Basic Info',
        name: language === 'zh' ? '姓名 (Name)' : 'Name',
        namePlaceholder: language === 'zh' ? '請輸入姓名' : 'Enter your name',
        email: 'Email', // Common
        emailPlaceholder: 'example@email.com',
        phone: language === 'zh' ? '電話 (Phone)' : 'Phone',
        phonePlaceholder: '+886 912 345 678',
        nationality: language === 'zh' ? '國籍 (Nationality)' : 'Nationality',
        nationalityPlaceholder: language === 'zh' ? '例如：Taiwan' : 'e.g. Taiwan',
        sectionArrival: language === 'zh' ? '抵達資訊' : 'Arrival Info',
        arrivalDate: language === 'zh' ? '預計抵達時間 (Arrival Date)' : 'Expected Arrival Date',
        selectDate: language === 'zh' ? '選擇日期（年／月／日）' : 'Select Date (YYYY-MM-DD)',
        arrivalNote: language === 'zh'
            ? `※ 換宿需至少連續 2 週（${MIN_SWAP_DAYS} 天），請確認您能配合再報名。`
            : `※ The work swap requires a minimum of 2 consecutive weeks (${MIN_SWAP_DAYS} days). Please apply only if you can commit.`,
        sectionPurpose: language === 'zh' ? '換宿動機' : 'Motivation',
        purpose: language === 'zh' ? '換宿的原因與目的 (Purpose)' : 'Reason & Purpose of the Swap',
        purposePlaceholder: language === 'zh'
            ? '請詳述您想來班厝換宿的原因、可協助的內容（例如：菜園、導覽、活動、影像文字等），以及希望在這裡學習或體驗的事...'
            : 'Please describe in detail why you would like to join the work swap, what you can help with (e.g. garden, tours, events, photo/writing), and what you hope to learn or experience here...',
        sectionOther: language === 'zh' ? '其他' : 'Other',
        remarks: language === 'zh' ? '備註 (Remarks)' : 'Remarks',
        remarksPlaceholder: language === 'zh' ? '給館方的特殊要求或問題...' : 'Special requests or questions...',
        submit: language === 'zh' ? '送出申請' : 'Submit Application',
        submitting: language === 'zh' ? '送出中...' : 'Submitting...'
    };

    return (
        <div className="min-h-screen w-full bg-orange-100 font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            <HomeNavbar />

            <main className="w-full flex justify-center pt-32 desktop:pt-[165px] px-6 desktop:px-0">

                {/* Main Form Container - Matching BookingStay design */}
                <div className="w-full max-w-[1000px] bg-white rounded-[30px] shadow-sm border border-white p-8 desktop:p-16 relative overflow-hidden flex flex-col gap-16">

                    {/* Close Button (Navigates Back) */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute right-8 top-8 desktop:right-10 desktop:top-10 w-10 h-10 flex justify-center items-center hover:bg-zinc-100 rounded-full transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-neutral-900 text-3xl desktop:text-[60px] font-bold font-['Noto_Sans_TC'] leading-tight">
                            {t.title}
                        </h1>
                        <p className="text-zinc-800 text-lg desktop:text-2xl font-medium font-['Noto_Sans_TC']">
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Form Fields Container */}
                    <div className="flex flex-col gap-16">

                        {/* Section: Basic Info */}
                        <div className="flex flex-col gap-12">
                            <div className="w-32 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-2xl font-bold font-['Noto_Sans_TC'] whitespace-nowrap">{t.sectionBasic}</span>
                            </div>

                            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-[74px] gap-y-12">
                                {/* Name */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">{t.name}</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={t.namePlaceholder}
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">{t.email}</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder={t.emailPlaceholder}
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">{t.phone}</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder={t.phonePlaceholder}
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                                </div>

                                {/* Nationality */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">{t.nationality}</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={t.nationalityPlaceholder}
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.nationality}
                                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                                    />
                                    {errors.nationality && <span className="text-red-500 text-sm">{errors.nationality}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Section: Arrival Info */}
                        <div className="flex flex-col gap-12">
                            <div className="w-32 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-2xl font-bold font-['Noto_Sans_TC'] whitespace-nowrap">{t.sectionArrival}</span>
                            </div>

                            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-[74px] gap-y-12">
                                {/* Arrival Date */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">{t.arrivalDate}</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <div className="w-full border-b border-neutral-900 pb-2">
                                        <DatePicker
                                            selected={formData.arrivalDate ? new Date(formData.arrivalDate) : null}
                                            onChange={(date: Date | null) => handleInputChange('arrivalDate', date ? date.toISOString().split('T')[0] : '')}
                                            dateFormat="yyyy-MM-dd"
                                            minDate={new Date()}
                                            placeholderText={t.selectDate}
                                            className="w-full bg-transparent text-xl text-neutral-900 focus:outline-none font-medium cursor-pointer placeholder:text-stone-300"
                                            wrapperClassName="w-full"
                                            onFocus={(e) => (e.target as HTMLInputElement).readOnly = true}
                                        />
                                    </div>
                                    {errors.arrivalDate && <span className="text-red-500 text-sm">{errors.arrivalDate}</span>}
                                    {/* Minimum duration note */}
                                    <p className="mt-2 text-[#F1592C] text-base font-medium font-['Noto_Sans_TC'] leading-relaxed">
                                        {t.arrivalNote}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section: Purpose */}
                        <div className="flex flex-col gap-12">
                            <div className="w-32 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-2xl font-bold font-['Noto_Sans_TC'] whitespace-nowrap">{t.sectionPurpose}</span>
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex items-start gap-1">
                                    <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">{t.purpose}</label>
                                    <span className="text-red-500 text-lg font-bold">*</span>
                                </div>
                                <textarea
                                    className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 placeholder:font-medium focus:outline-none font-medium min-h-[200px] resize-none"
                                    placeholder={t.purposePlaceholder}
                                    value={formData.purpose}
                                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                                />
                                {errors.purpose && <span className="text-red-500 text-sm">{errors.purpose}</span>}
                            </div>
                        </div>

                        {/* Section: Other */}
                        <div className="flex flex-col gap-12">
                            <div className="w-32 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-2xl font-bold font-['Noto_Sans_TC'] whitespace-nowrap">{t.sectionOther}</span>
                            </div>

                            {/* Remarks */}
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">{t.remarks}</label>
                                <textarea
                                    className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 placeholder:font-medium focus:outline-none font-medium min-h-[120px] resize-none"
                                    placeholder={t.remarksPlaceholder}
                                    value={formData.remarks}
                                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-8 py-4 rounded-full border-[3px] border-neutral-800 flex justify-center items-center gap-2 hover:bg-neutral-900 hover:text-white transition-colors group disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="group-hover:text-white text-neutral-900">
                                    <path d="M7 28L25 15L7 4V12L20 15L7 18V28Z" fill="currentColor" />
                                </svg>
                                <span className="text-2xl font-bold font-['Noto_Sans_TC']">{isSubmitting ? t.submitting : t.submit}</span>
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};
