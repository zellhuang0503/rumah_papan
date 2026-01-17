import React from 'react';
import { X } from 'lucide-react';
import { getWebsiteGuideData } from '../data/websiteGuide';
import { useLanguage } from '../contexts/LanguageContext';

interface WebsiteGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WebsiteGuideModal: React.FC<WebsiteGuideModalProps> = ({ isOpen, onClose }) => {
    const { language } = useLanguage();
    const websiteGuideData = getWebsiteGuideData(language);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content Wrapper - Scaled 0.75x */}
            <div className="scale-75 origin-center">
                {/* Modal Content */}
                <div className="relative w-full max-w-[1233px] pl-8 pr-5 py-5 lg:pl-16 lg:pr-10 lg:py-10 bg-white rounded-[56px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.30)] shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row justify-between items-start lg:items-end overflow-hidden animate-in fade-in zoom-in-95 duration-200 gap-8 lg:gap-0">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 lg:top-10 lg:right-10 p-2 rounded-full hover:bg-neutral-100 transition-colors z-20"
                    >
                        <X className="w-6 h-6 text-neutral-500" />
                    </button>

                    {/* Left Side: Title & Intro */}
                    <div className="w-full lg:w-96 flex flex-col justify-start items-start shrink-0">
                        <div className="self-stretch flex flex-col justify-start items-start">
                            <div className="self-stretch justify-start text-neutral-900 text-sm font-medium font-serif leading-5">
                                {websiteGuideData.subTitle}
                            </div>
                            <div className="self-stretch justify-start text-neutral-900 text-6xl font-bold font-sans leading-[84px]">
                                {websiteGuideData.mainTitle}
                            </div>
                        </div>
                        <div className="self-stretch justify-start text-neutral-900 text-2xl font-medium font-sans leading-8 mt-4 lg:mt-0">
                            {websiteGuideData.intro}
                        </div>
                    </div>

                    {/* Right Side: Steps */}
                    <div className="w-full lg:h-[764px] lg:w-auto p-0 lg:p-5 rounded-3xl flex flex-col justify-between items-start">
                        {websiteGuideData.steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="w-full lg:w-[565px] flex justify-start items-start gap-4 lg:gap-6">
                                    <div className="w-20 lg:w-28 h-20 lg:h-24 flex justify-center items-center text-neutral-500 text-6xl lg:text-8xl font-light font-serif shrink-0">
                                        {step.number}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-start items-start gap-3">
                                        <div className="self-stretch flex justify-start items-center gap-3">
                                            <div className="flex-1 justify-start text-black/80 text-2xl lg:text-4xl font-bold font-sans leading-tight lg:leading-[57.40px]">
                                                {step.title}
                                            </div>
                                        </div>
                                        <div className="self-stretch justify-start text-neutral-900 text-lg lg:text-2xl font-medium font-sans leading-7 lg:leading-8 whitespace-pre-line">
                                            {step.description}
                                        </div>
                                    </div>
                                </div>
                                {index < websiteGuideData.steps.length - 1 && (
                                    <div className="w-full lg:w-[565px] h-px bg-neutral-900 my-6 lg:my-0 opacity-20 lg:opacity-100"></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
