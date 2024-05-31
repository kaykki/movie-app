import { getYear } from '../utilities/utilities';
import { authors } from '../global/global';
import React from 'react';
import logo from '/assets/images/movie-logo-2.svg'
import { Link } from 'react-router-dom';
import { appTitle } from '../global/global';

const Footer = () => {

  const emailClick = () => {
    window.location.href = 'https://mail.google.com';
  }
  const facebookClick = () => {
    window.location.href = 'https://facebook.com';
  }
  const instagramClick = () => {
    window.location.href = 'https://instagram.com';
  }

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