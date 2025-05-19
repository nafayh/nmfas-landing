import Link from 'next/link';
import styles from '../page.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">NMFAS</Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="#about">About Us</Link>
        <Link href="#services">Services</Link>
        <Link href="#faqs">FAQs</Link>
        <Link href="#contact">Contact</Link>
        <button className={styles.getStartedBtn}>Get Started</button>
      </div>
    </nav>
  );
}
