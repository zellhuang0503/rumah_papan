import React, { useState } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';

import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Type definitions for future Supabase integration
export interface BookingStayFormData {
    // Basic Info
    name: string;
    email: string;
    phone: string;
    nationality: string;

    // Check-in Info
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;

    // Needs
    preferredBedType: 'Double' | 'Bunk' | 'Single' | '';
    roomCount: number;

    // Other
    paymentMethod: 'Credit Card' | 'Cash' | '';
    remarks: string;
}

export const BookingStay: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BookingStayFormData>({
        name: '',
        email: '',
        phone: '',
        nationality: '',
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: '',
        preferredBedType: '',
        roomCount: 1,
        paymentMethod: '',
        remarks: ''
    });

    const handleInputChange = (field: keyof BookingStayFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log("Submitting form:", formData);
        alert("申請已送出！我們會盡快聯繫您。");
        // Future: Call Supabase API here
    };

    return (
        <div className="min-h-screen w-full bg-orange-100 font-sans selection:bg-[#F1592C] selection:text-white pb-[120px]">
            {/* Navbar is optional on a dedicated form page, but good for context. 
                 User design looks like a modal card, so we'll center it on the page. */}
            <HomeNavbar />

            <main className="w-full flex justify-center pt-32 desktop:pt-[165px] px-6 desktop:px-0">

                {/* Main Form Container - Matching Design Styles */}
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
                            預約住宿申請
                        </h1>
                        <p className="text-zinc-800 text-lg desktop:text-2xl font-medium font-['Noto_Sans_TC']">
                            填寫下表，我們將盡快與您聯繫確認
                        </p>
                    </div>

                    {/* Form Fields Container */}
                    <div className="flex flex-col gap-16">

                        {/* Section: Basic Info */}
                        <div className="flex flex-col gap-12">
                            <div className="w-24 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-2xl font-bold font-['Noto_Sans_TC']">基本資訊</span>
                            </div>

                            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-[74px] gap-y-12">
                                {/* Name */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">姓名 (Name)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="請輸入姓名"
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">Email</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">電話 (Phone)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="+886 912 345 678"
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                </div>

                                {/* Nationality */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">國籍 (Nationality)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="例如：Taiwan"
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-stone-300 focus:outline-none font-medium"
                                        value={formData.nationality}
                                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Check-in Info */}
                        <div className="flex flex-col gap-12">
                            <div className="w-24 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">入住資訊</span>
                            </div>

                            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-[74px] gap-y-12">
                                {/* Check-in Date */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">入住日期 (Check-in Date)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <div className="w-full border-b border-neutral-900 pb-2">
                                        <DatePicker
                                            selected={formData.checkInDate ? new Date(formData.checkInDate) : null}
                                            onChange={(date: Date | null) => handleInputChange('checkInDate', date ? date.toISOString().split('T')[0] : '')}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="選擇日期"
                                            className="w-full bg-transparent text-xl text-neutral-900 focus:outline-none font-medium cursor-pointer placeholder:text-stone-300"
                                            wrapperClassName="w-full"
                                            onFocus={(e) => (e.target as HTMLInputElement).readOnly = true}
                                        />
                                    </div>
                                </div>

                                {/* Check-in Time */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">預計入住時間 (Check-in Time)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <div className="relative w-full border-b border-neutral-900">
                                        <select
                                            className="w-full py-2 bg-transparent text-xl text-neutral-900 focus:outline-none font-medium cursor-pointer appearance-none"
                                            value={formData.checkInTime}
                                            onChange={(e) => handleInputChange('checkInTime', e.target.value)}
                                        >
                                            <option value="" disabled>選擇時間</option>
                                            {Array.from({ length: 29 }).map((_, i) => {
                                                const hour = Math.floor(i / 2) + 8; // Start from 08:00
                                                const min = i % 2 === 0 ? '00' : '30';
                                                const time = `${hour.toString().padStart(2, '0')}:${min}`;
                                                if (hour >= 22 && min === '30') return null; // End at 22:00
                                                return <option key={time} value={time}>{time}</option>;
                                            })}
                                        </select>
                                        {/* Dropdown Arrow */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Check-out Date */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">退房日期 (Check-out Date)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <div className="w-full border-b border-neutral-900 pb-2">
                                        <DatePicker
                                            selected={formData.checkOutDate ? new Date(formData.checkOutDate) : null}
                                            onChange={(date: Date | null) => handleInputChange('checkOutDate', date ? date.toISOString().split('T')[0] : '')}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="選擇日期"
                                            className="w-full bg-transparent text-xl text-neutral-900 focus:outline-none font-medium cursor-pointer placeholder:text-stone-300"
                                            wrapperClassName="w-full"
                                            onFocus={(e) => (e.target as HTMLInputElement).readOnly = true}
                                        />
                                    </div>
                                </div>

                                {/* Check-out Time */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">預計退房時間 (Check-out Time)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <div className="relative w-full border-b border-neutral-900">
                                        <select
                                            className="w-full py-2 bg-transparent text-xl text-neutral-900 focus:outline-none font-medium cursor-pointer appearance-none"
                                            value={formData.checkOutTime}
                                            onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
                                        >
                                            <option value="" disabled>選擇時間</option>
                                            {Array.from({ length: 29 }).map((_, i) => {
                                                const hour = Math.floor(i / 2) + 8; // Start from 08:00
                                                const min = i % 2 === 0 ? '00' : '30';
                                                const time = `${hour.toString().padStart(2, '0')}:${min}`;
                                                if (hour >= 22 && min === '30') return null; // End at 22:00
                                                return <option key={time} value={time}>{time}</option>;
                                            })}
                                        </select>
                                        {/* Dropdown Arrow */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Room Count */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1">
                                        <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">所需房間數量 (No. of Rooms)</label>
                                        <span className="text-red-500 text-lg font-bold">*</span>
                                    </div>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 focus:outline-none font-medium"
                                        value={formData.roomCount}
                                        onChange={(e) => handleInputChange('roomCount', parseInt(e.target.value) || 1)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Needs */}
                        <div className="flex flex-col gap-12">
                            <div className="w-24 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-2xl font-bold font-['Noto_Sans_TC']">需求選擇</span>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-1">
                                    <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">首選床型 (Preferred Bed Type)</label>
                                    <span className="text-red-500 text-lg font-bold">*</span>
                                </div>
                                <div className="flex flex-wrap gap-8">
                                    {['雙人床 (Double)', '上下舖 (Bunk)', '單人床 (Single)'].map((type) => {
                                        const typeValue = type.split(' ')[0] === '雙人床' ? 'Double' : type.split(' ')[0] === '上下舖' ? 'Bunk' : 'Single';
                                        return (
                                            <label key={type} className="flex items-center gap-3 cursor-pointer">
                                                <div className={`w-5 h-5 rounded-full border border-neutral-900 flex justify-center items-center ${formData.preferredBedType === typeValue ? 'bg-neutral-900' : ''}`}>
                                                    {formData.preferredBedType === typeValue && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="bedType"
                                                    className="hidden"
                                                    checked={formData.preferredBedType === typeValue}
                                                    onChange={() => handleInputChange('preferredBedType', typeValue)}
                                                />
                                                <span className="text-neutral-900 text-lg font-normal font-['Noto_Sans_TC']">{type}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Section: Other */}
                        <div className="flex flex-col gap-12">
                            <div className="w-12 border-b-2 border-neutral-900 pb-1">
                                <span className="text-neutral-900 text-2xl font-bold font-['Noto_Sans_TC']">其他</span>
                            </div>

                            {/* Payment Method */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-1">
                                    <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">付款方式 (Payment Method)</label>
                                    <span className="text-red-500 text-lg font-bold">*</span>
                                </div>
                                <div className="flex flex-wrap gap-8">
                                    {['信用卡 (Credit Card)', '現金 (Cash)'].map((type) => {
                                        const typeValue = type.includes('Credit') ? 'Credit Card' : 'Cash';
                                        return (
                                            <label key={type} className="flex items-center gap-3 cursor-pointer">
                                                <div className={`w-5 h-5 rounded-full border border-neutral-900 flex justify-center items-center ${formData.paymentMethod === typeValue ? 'bg-neutral-900' : ''}`}>
                                                    {formData.paymentMethod === typeValue && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    className="hidden"
                                                    checked={formData.paymentMethod === typeValue}
                                                    onChange={() => handleInputChange('paymentMethod', typeValue)}
                                                />
                                                <span className="text-neutral-900 text-lg font-normal font-['Noto_Sans_TC']">{type}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Remarks */}
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-neutral-900 text-base font-bold font-['Noto_Sans_TC']">備註 (Remarks)</label>
                                <textarea
                                    className="w-full py-2 border-b border-neutral-900 bg-transparent text-xl text-neutral-900 placeholder:text-zinc-800 placeholder:font-medium focus:outline-none font-medium min-h-[120px] resize-none"
                                    placeholder="給館方的特殊要求或問題..."
                                    value={formData.remarks}
                                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-4 rounded-full border-[3px] border-neutral-800 flex justify-center items-center gap-2 hover:bg-neutral-900 hover:text-white transition-colors group"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="group-hover:text-white text-neutral-900">
                                    <path d="M7 28L25 15L7 4V12L20 15L7 18V28Z" fill="currentColor" />
                                </svg>
                                <span className="text-2xl font-bold font-['Noto_Sans_TC']">送出申請</span>
                            </button>
                        </div>

                    </div>
                </div>
            </main>

            {/* Simple Footer or Copyright if needed, but user design is card based. Keeping clean for now.
                Actually, putting SiteFooter might distract from the "form" focus, but global consistency suggests it.
                I will leave it out or simple as per "modal" feel, checking Page wrapper.
            */}
        </div>
    );
};
