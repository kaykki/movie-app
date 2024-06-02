import { Link } from 'react-router-dom';
import Nav from './Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import logo from '/assets/images/seenema-logo.svg'
import Searchbar from './Searchbar';
import { appTitle } from '../global/global';

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

            <Link className="logo" to="/">
                <img src={logo} alt="Seenema Logo"/>
                <h1>{appTitle}</h1>
            </Link>

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