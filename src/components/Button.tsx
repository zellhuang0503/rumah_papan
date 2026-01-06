import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    onClick
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full px-8 py-3 font-bold text-xl transition-colors font-sans';

    const variants = {
        primary: 'bg-primary text-white hover:bg-opacity-90',
        secondary: 'bg-secondary text-white hover:bg-opacity-90',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
