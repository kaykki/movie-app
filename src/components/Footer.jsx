import { getYear } from '../utilities/utilities';
import { authors } from '../global/global';
import React from 'react';
import seenemaLogo from '../assets/seenema.svg';
import emailIcon from '../assets/email.svg';
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';
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
      <div className="icon-wrapper">
        <img
          src={emailIcon}
          alt="Email Icon"
          className="email-icon"
          onClick={emailClick}
        />
        <img
          src={facebookIcon}
          alt="Facebook Icon"
          className="facebook-icon"
          onClick={facebookClick}
        />
        <img
          src={instagramIcon}
          alt="Instagram Icon"
          className="instagram-icon"
          onClick={instagramClick}
        />
      </div>
    </footer>
  )
}

export default Footer