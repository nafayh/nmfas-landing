import './style/global.css';
import Navbar from './components/Navbar';
import styles from './page.module.css';

export const metadata = {
  title: 'NMFAS Advisory - Muslim Funeral Services',
  description: 'Find Muslim funeral services, cemeteries, and support in your area',
};

export default function RootLayout({ children }) {
  // We'll use client-side JS to handle the innerPage class
  // since we need to distinguish between pages with hero sections
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className={styles.mainContent}>
          {children}
        </main>
      </body>
    </html>
  );
}