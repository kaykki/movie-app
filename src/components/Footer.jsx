import { getYear } from '../utilities/utilities';
import { authors } from '../global/global';
import React from 'react';
import seenemaLogo from '../assets/seenema.svg';
import { Link } from 'react-router-dom';

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
      <Link to="/">
        <img src={seenemaLogo} alt="Seenema Logo" className="footer-logo" />
      </Link>
      <p>&copy; {getYear() + " by " + authors} </p>

    </footer>
  )
}

export default Footer