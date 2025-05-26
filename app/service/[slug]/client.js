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
                </Link>{service.name === 'Faizan e Islam - Funeral Services' && (
  <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden' }}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2371.597343121215!2d-2.279984684157163!3d53.45612317999813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bae2c1a3e5b9f%3A0x1a2b3c4d5e6f7g8h!2sFaizan-e-Islam%20Mosque%2C%20229%20Ayres%20Rd%2C%20Manchester%20M16%200WZ%2C%20UK!5e0!3m2!1sen!2suk!4v1622547890123!5m2!1sen!2suk"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Faizan-e-Islam Mosque Location"
    ></iframe>
  </div>
   )}
                {service.name === 'Leeds Grand Mosque' && (
                  <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2357.456789123456!2d-1.555123684150123!3d53.80098797999876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c1a347d3b0d%3A0x9b3c4d5e6f7g8h9i!2sLeeds%20Grand%20Mosque%2C%209%20Woodsley%20Rd%2C%20Leeds%20LS6%201SN%2C%20UK!5e0!3m2!1sen!2suk!4v1634567890123!5m2!1sen!2suk"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Leeds Grand Mosque Location"
                    ></iframe>
                  </div>
)}

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
