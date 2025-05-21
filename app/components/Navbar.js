import Link from 'next/link';
import styles from '../page.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>      <div className={styles.logo}>
        <Link href="/">NMFAS <span className={styles.logoText}>Advisory</span></Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/services">Our Services</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/guidance">Islamic Guidance</Link>
        <Link href="/locations">Find Local Services</Link>
        <Link href="/about">About</Link>
        <button className={styles.getStartedBtn}>Get Help</button>
      </div>
    </nav>
  );
}
