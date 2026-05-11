// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

// Material UI Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <div className={styles.logo}>
              <span className={styles.logoRed}>Equity</span>
              <span>Residences</span>
            </div>
            <p className={styles.tagline}>
              Purpose-built student living designed for comfort, community, and focus.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/equityhousingsa" className={styles.socialIcon} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/equityhousingsa/" className={styles.socialIcon} aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://api.whatsapp.com/send?phone=27825808046" className={styles.socialIcon} aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksColumn}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/residences">Residences</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/student">Student Life</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.linksColumn}>
            <h4>Resources</h4>
            <ul>
              <li><Link to="/apply">Apply Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactColumn}>
            <h4>Get in Touch</h4>
            <ul className={styles.contactList}>
              <li>
                <LocationOnIcon />
                <span>94 Zastron Street, Bloemfontein , 9300</span>
              </li>
              <li>
                <PhoneIcon />
                <span>+27 82 580 8046</span>
              </li>
              <li>
                <EmailIcon />
                <span>info@equityhousing.co.za</span>
              </li>
              <li>
                <AccessTimeIcon />
                <span>Mon-Fri: 9am - 5pm | Sat: 10am - 2pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Equity Residences. All rights reserved.
          </div>
          <div className={styles.bottomLinks}>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
          <button onClick={scrollToTop} className={styles.backToTop}>
            <KeyboardArrowUpIcon />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;