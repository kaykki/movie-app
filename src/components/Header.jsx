import { useState, useEffect } from 'react';
import Nav from './Nav';
import Searchbar from './Searchbar';
import Logo from './Logo';

const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    }

    const isDesktop = (e) => {
        if (e.matches) {
            setShowNav(false);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 1040px)');
        mediaQuery.addEventListener('change', isDesktop);

        return () => mediaQuery.removeEventListener('change', isDesktop);
    }, []);

    return (
        <header className={showNav ? 'show' : ''}>
            <Logo />
            {!isMobile && (<Searchbar />)}
            <button className="btn-main-nav"
                onClick={toggleNav}>
                <span className="hamburger-icon">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </span>
            </button>
            <Nav handleShowHideNav={toggleNav} />
        </header>
    )
}

export default Header