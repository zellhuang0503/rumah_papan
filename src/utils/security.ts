/**
 * Security Utilities
 * 
 * This module provides security-related helper functions to protect against
 * common web vulnerabilities like XSS via malicious URLs.
 */

/**
 * List of allowed URL protocols to prevent javascript: and other dangerous protocols
 */
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

/**
 * Validates and sanitizes a URL to prevent XSS attacks via javascript: protocol injection.
 * 
 * @param url - The URL to validate (can be from CMS or user input)
 * @param fallback - Optional fallback URL if validation fails (defaults to '#')
 * @returns A safe URL string
 * 
 * @example
 * // Safe URLs pass through
 * sanitizeUrl('https://example.com') // => 'https://example.com'
 * 
 * // Dangerous URLs are blocked
 * sanitizeUrl('javascript:alert(1)') // => '#'
 * 
 * // Relative URLs are allowed
 * sanitizeUrl('/about') // => '/about'
 */
export function sanitizeUrl(url: string | undefined | null, fallback: string = '#'): string {
    // Handle null/undefined/empty
    if (!url || typeof url !== 'string') {
        return fallback;
    }

    const trimmedUrl = url.trim();

    // Allow relative URLs (starting with / or .)
    if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('./') || trimmedUrl.startsWith('../')) {
        return trimmedUrl;
    }

    // Allow anchor links
    if (trimmedUrl.startsWith('#')) {
        return trimmedUrl;
    }

    try {
        const parsed = new URL(trimmedUrl);
        
        // Check if protocol is in allowed list
        if (ALLOWED_PROTOCOLS.includes(parsed.protocol.toLowerCase())) {
            return trimmedUrl;
        }
        
        // Block dangerous protocols (javascript:, data:, vbscript:, etc.)
        console.warn(`[Security] Blocked potentially dangerous URL: ${trimmedUrl}`);
        return fallback;
    } catch {
        // If URL parsing fails, it might be a relative URL without leading slash
        // or malformed - be conservative and use fallback
        // Allow simple paths like "about" or "contact"
        if (/^[a-zA-Z0-9\-_./]+$/.test(trimmedUrl) && !trimmedUrl.includes(':')) {
            return trimmedUrl;
        }
        
        console.warn(`[Security] Blocked malformed URL: ${trimmedUrl}`);
        return fallback;
    }
}

/**
 * Validates an email address format
 * 
 * @param email - The email to validate
 * @returns boolean indicating if email format is valid
 */
export function isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    // Basic email regex - not perfect but catches most issues
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Validates a phone number format (international)
 * 
 * @param phone - The phone number to validate
 * @returns boolean indicating if phone format is valid
 */
export function isValidPhone(phone: string): boolean {
    if (!phone || typeof phone !== 'string') return false;
    // Allow digits, spaces, dashes, parentheses, and + for international
    const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
    return phoneRegex.test(phone.trim());
}

/**
 * Sanitizes user input by removing potentially dangerous characters
 * for display purposes (not for HTML - React handles that)
 * 
 * @param input - User input string
 * @param maxLength - Maximum allowed length (default 1000)
 * @returns Sanitized string
 */
export function sanitizeInput(input: string | undefined | null, maxLength: number = 1000): string {
    if (!input || typeof input !== 'string') return '';
    return input.trim().slice(0, maxLength);
}

/**
 * Validates a number is within expected range
 * 
 * @param value - The value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param defaultValue - Default value if validation fails
 * @returns A valid number within range
 */
export function validateNumberRange(
    value: number | string | undefined | null,
    min: number,
    max: number,
    defaultValue: number
): number {
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    
    if (num === undefined || num === null || isNaN(num)) {
        return defaultValue;
    }
    
    return Math.max(min, Math.min(max, num));
}
