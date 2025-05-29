'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../page.module.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolledNav : ''} ${isHomePage ? styles.homeNav : styles.innerNav}`}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <span className={styles.nmfas}>NMFAS</span>
          <span className={styles.advisory}>Advisory</span>
        </Link>

        <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileActive : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/service/search">Directories</Link>
          <Link href="/support-services">Support Services</Link>
          <Link href="/about">About Us</Link>
          <Link href="/affiliations">Affiliations</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact" className={styles.getHelp}>Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;