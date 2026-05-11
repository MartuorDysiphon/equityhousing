import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import styles from './navigation.module.css';
import Logo from '../../assets/equity.png';

function Navbar() {
  const { isSignedIn, user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/residences', label: 'Residences' },
    { path: '/features', label: 'Property Features' },
    { path: '/community', label: 'Community' },
    { path: '/student', label: 'Student Life' },
  ];

  const isActive = (path) => location.pathname === path;

  const userDisplayName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'User';

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={Logo} alt="Equity Housing" />
        </Link>

        <nav className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {isSignedIn ? (
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <UserButton afterSignOutUrl="/" />
                <span className={styles.userName}>{userDisplayName}</span>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className={styles.loginBtn}>
                Login / Sign Up
              </button>
            </SignInButton>
          )}
        </div>

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuInner}>
            {isSignedIn && (
              <>
                <div className={styles.mobileUserInfo}>
                  <div className={styles.mobileUserAvatar}>
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt={userDisplayName} />
                    ) : (
                      <div className={styles.mobileUserInitial}>
                        {userDisplayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={styles.mobileUserDetails}>
                    <span className={styles.mobileUserName}>{userDisplayName}</span>
                    <span className={styles.mobileUserEmail}>{user?.emailAddresses?.[0]?.emailAddress}</span>
                  </div>
                </div>
                <div className={styles.mobileDivider}></div>
              </>
            )}
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            
            <div className={styles.mobileDivider}></div>
            
            {isSignedIn ? (
              <div className={styles.mobileSignOut}>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className={styles.mobileLoginBtn} onClick={closeMenu}>
                  Login / Sign Up
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;