import { getYear } from '../utilities/utilities';
import { authors } from '../global/global';
import React from 'react';
import logo from '/assets/images/seenema-logo.svg'
import { Link } from 'react-router-dom';
import { appTitle } from '../global/global';

const Footer = () => {
    return (
        <footer>
            <Link className='logo' to="/">
                <img src={logo} alt="Seenema Logo" />
                <h1>{appTitle}</h1>
            </Link>
            <p>&copy; {getYear() + " by " + authors} </p>

        </footer>
    )
}

export default Footer