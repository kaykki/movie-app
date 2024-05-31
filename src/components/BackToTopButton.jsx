import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        showBackToTop && (
            <button className='back-to-top-btn' onClick={scrollToTop}>
                Back to Top
            </button>
        )
    );
};

export default BackToTopButton;
