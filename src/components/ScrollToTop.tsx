import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Always start at the top
        window.scrollTo(0, 0);

        // Prevent browser from restoring scroll position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, [pathname]);

    return null;
};
