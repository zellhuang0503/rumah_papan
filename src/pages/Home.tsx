import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Polaroid } from '../components/Polaroid';
import { IMAGES } from '../utils/assets';

export const Home: React.FC = () => {
    return (
        <MainLayout>
            <div className="relative w-full h-screen">
                {/* Header / Nav Area */}
                <header className="absolute top-0 right-0 p-8 flex gap-4 z-50">
                    {/* Language Switcher Placeholders */}
                    <button className="w-10 h-10 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-sm">
                        中
                    </button>
                    <button className="w-10 h-10 rounded-full border border-secondary text-secondary font-bold flex items-center justify-center text-sm">
                        EN
                    </button>
                </header>

                {/* Main Content Area */}
                <div className="absolute top-20 left-20 z-20">
                    <h1 className="text-6xl font-serif text-primary mb-4 opacity-90">
                        班達故事館
                    </h1>
                    <h2 className="text-4xl font-sans text-secondary opacity-60">
                        Rumah Papan
                    </h2>
                </div>

                {/* Welcome Text */}
                <div className="absolute top-32 right-1/4 text-right opacity-40 font-serif">
                    <p className="text-2xl">Welcome to</p>
                    <p className="text-xl">Rumah Papan</p>
                </div>


                {/* Scattered Polaroids */}
                <Polaroid
                    src={IMAGES.polaroids[0]}
                    className="absolute top-1/3 left-1/4 w-64 -rotate-6"
                    caption="Our Story"
                />

                <Polaroid
                    src={IMAGES.polaroids[1]}
                    className="absolute bottom-1/4 left-1/2 w-56 rotate-12"
                    caption="Community"
                />

                <Polaroid
                    src={IMAGES.polaroids[2]}
                    className="absolute top-1/4 right-32 w-72 -rotate-3"
                    caption="Heritage"
                />

                {/* CTA Button */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                    <Button onClick={() => console.log('Enter')}>
                        進入新村
                    </Button>
                </div>

                {/* Footer Vector / Decoration */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 bg-secondary h-32 opacity-20"></div>
            </div>
        </MainLayout>
    );
};
