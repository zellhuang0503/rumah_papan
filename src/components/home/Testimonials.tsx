import React from 'react';
import { TESTIMONIALS_DATA } from '../../data/homeData';

export const Testimonials: React.FC = () => {
    return (
        <section className="w-full h-[288px] relative overflow-hidden bg-orange-100">
            <div className="absolute left-0 top-6 desktop:top-[31.5px] desktop:left-[77.25px] w-full desktop:w-[calc(100%-77px)] pl-6 desktop:pl-0 overflow-x-auto no-scrollbar pb-10">
                <div className="inline-flex justify-start items-center gap-6 desktop:gap-[48px] pr-6 desktop:pr-[120px]">
                    {TESTIMONIALS_DATA.map((item, index) => (
                        <div key={index} className="relative w-[320px] desktop:w-[453.75px] inline-flex flex-col justify-start items-start shrink-0 group">
                            <div className="self-stretch px-[24px] py-[30px] bg-white rounded-[22.5px] flex flex-col justify-start items-start gap-[30px] shadow-[0px_10.5px_14px_0px_rgba(0,0,0,0.17)] transition-transform hover:-translate-y-1">
                                <div className="self-stretch flex flex-col justify-start items-start gap-[9px]">
                                    <div className="self-stretch justify-start text-neutral-900 text-[27px] font-bold font-['Noto_Sans_TC'] leading-[36.75px]">
                                        {item.name}
                                    </div>
                                    <div className="self-stretch justify-start text-neutral-900 text-[18px] font-medium font-['Noto_Sans_TC'] leading-[24px]">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute left-[55.5px] top-[100%] w-[33px] h-[15px] bg-white -mt-[1px] [clip-path:polygon(0%_0%,100%_0%,50%_100%)]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
