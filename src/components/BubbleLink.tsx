import React from 'react';
import { Link } from 'react-router-dom';

interface BubbleLinkProps {
    text: string;
    to?: string;
    onClick?: () => void;
    className?: string; // For positioning
    variant?: 'default' | 'large';
    isActive?: boolean;
}

export const BubbleLink: React.FC<BubbleLinkProps> = ({ text, to = "#", onClick, className = "", variant = 'default', isActive = false }) => {
    const isLarge = variant === 'large';

    // User requested "shrink a little more".
    // Previous: px-9 py-5, text-2xl
    // New: px-8 py-4 (32, 16), text-xl (20px)
    const paddingClass = 'px-8 py-4';
    // Active text should be solid black, inactive is/was black/80
    const textClass = `text-xl font-medium font-['Noto_Sans_TC'] leading-8 ${isActive ? 'text-[#242527]' : 'text-black/80'}`;

    // Active background: Orange #F1592C (based on user image/project), Inactive: #F3E3CB
    const bgClass = isActive ? 'bg-[#F1592C]' : 'bg-[#F3E3CB]';

    const Content = () => (
        // Border: 2px
        <div className={`relative border-[2px] border-[#242527] rounded-full ${paddingClass} flex flex-col items-center justify-center gap-1 group transition-transform hover:scale-105 ${bgClass} z-10`}>
            <span className={`${textClass} tracking-wide whitespace-nowrap`}>
                {text}
            </span>
            {/* Triangle / Pointer at bottom */}
            {/* Original 10px */}
            <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#242527]"></div>
        </div>
    );

    if (to && !onClick) {
        return (
            <Link to={to} className={`${className}`}>
                <Content />
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${className}`}>
            <Content />
        </button>
    );
};
