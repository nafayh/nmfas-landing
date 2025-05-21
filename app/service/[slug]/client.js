'use client';

import { funeralServices } from '../../data/funeralServices';
import styles from '../../page.module.css';
import Link from 'next/link';
import { createSlug } from '../../utils/urlUtils';
import Navbar from '../../components/Navbar';

export default function ServiceClient({ slug }) {
  const service = funeralServices.find(s => 
    createSlug(s.name).toLowerCase() === slug?.toLowerCase()
  );

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.serviceMain}>
        {!service ? (
          <div className={styles.errorContainer}>
            <h1>Service Not Found</h1>
            <Link href="/search" className={styles.backButton}>← Back to Search</Link>
          </div>
        ) : (
          <div className={styles.serviceDetailContainer}>
            <div className={styles.serviceHeader}>
              <h1>{service.name}</h1>
            </div>
            
            <div className={styles.serviceGrid}>
              <div className={styles.serviceCard}>
                <h3>📍 Location</h3>
                <p className={styles.addressText}>{service.address}</p>
                <Link 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`}
                  target="_blank"
                  className={styles.directionLink}
                >
                  Get Directions →
                </Link>
              </div>

              <div className={styles.serviceCard}>
                <h3>📞 Contact Details</h3>
                <p className={styles.contactText}>
                  Phone: {service.phone}
                  {service.mobile && (
                    <span className={styles.mobileNumber}>
                      <br />Mobile: {service.mobile}
                    </span>
                  )}
                </p>
                {service.email && (
                  <a href={`mailto:${service.email}`} className={styles.emailLink}>
                    ✉️ {service.email}
                  </a>
                )}
                {service.website && (
                  <a 
                    href={`https://${service.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.websiteLink}
                  >
                    🌐 {service.website}
                  </a>
                )}
              </div>

              {service.hours && (
                <div className={styles.serviceCard}>
                  <h3>⏰ Opening Hours</h3>
                  <p className={styles.hoursText}>{service.hours}</p>
                </div>
              )}
            </div>

            <div className={styles.backLinkContainer}>
              <Link href="/search" className={styles.backButton}>
                ← Back to Search Results
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
