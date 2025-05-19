import { useState } from 'react';
import styles from '../page.module.css';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileMenu}>
      <button 
        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`${styles.mobileNav} ${isOpen ? styles.show : ''}`}>
        <a href="#about">About Us</a>
        <a href="#services">Services</a>
        <a href="#faqs">FAQs</a>
        <a href="#contact">Contact</a>
        <button className={styles.getStartedBtn}>Get Started</button>
      </div>
    </div>
  );
}
