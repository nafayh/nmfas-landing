import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../page.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        <section className={styles.heroLanding}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
