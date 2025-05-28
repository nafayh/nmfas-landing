'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          NMFAS
        </Link>
        <div className={styles.searchBox}>
        </div>
      </div>
      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </nav>
  );
}