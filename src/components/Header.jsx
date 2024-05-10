import { Link } from 'react-router-dom';
import Nav from './Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import { appTitle } from '../global/global';

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    }

    const isDesktop = (e) => {
        if(e.matches){
            setShowNav(false);
        }
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 1040px)');
        mediaQuery.addEventListener('change', isDesktop);

        return() => mediaQuery.removeEventListener('change', isDesktop);
    }, []);


  return (
    <header className={showNav ? 'show' : ''}>
            <h1><Link className="logo" to="/">{appTitle}</Link></h1>
            <div className="search-container">
            <input type="text" className="search-input" placeholder="Search"/>
            <button type="submit" className="search-button" ><i className="fas fa-search"></i></button>
            </div>
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