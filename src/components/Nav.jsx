import { NavLink } from 'react-router-dom';

const Nav = ({ handleShowHideNav }) => {

    const closeNav = (e) => {
        if( window.innerWidth < 1040){
            handleShowHideNav();
        } else {
            e.target.blur();
        }

    }

    return (
        <nav className="main-nav" onClick={closeNav}>
          <span className='x-icon'>
            <span className='x-line'></span>
            <span className='x-line'></span>
          </span>
            <ul>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/favourites">Favourites</NavLink></li>
                
            </ul>
        </nav>
    );

};

export default Nav;