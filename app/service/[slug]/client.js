'use client';

import { useState, useEffect } from 'react';
import styles from '../../page.module.css';
import Link from 'next/link';
import { createServiceSlug } from '../../utils/mapUtils';
import { getLatestListings } from '../../utils/dataUtils';
import Navbar from '../../components/Navbar';
import MapComponent from '../../components/MapComponent';

export default function ServiceClient({ slug }) {
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const listings = getLatestListings();
    const foundService = listings.find(s => 
      createServiceSlug(s.name).toLowerCase() === slug?.toLowerCase()
    );
    
    setService(foundService);
    setIsLoading(false);
  }, [slug]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.loadingContainer}>
          <div className={styles.loader}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.errorContainer}>
          <h1>Service Not Found</h1>
          <Link href="/" className={styles.backButton}>← Back to Search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.serviceMain}>
        <div className={styles.serviceDetailContainer}>
          <div className={styles.serviceHeader}>
            <h1 className={styles.serviceTitle}>{service.name}</h1>
            <span className={styles.serviceType}>{service.type}</span>
          </div>
            <div className={styles.serviceDetails}>
            <div className={styles.serviceCard}>
              <h3><span role="img" aria-label="location">📍</span> Location</h3>
              <p className={styles.addressText}>{service.address}</p>
              
              <MapComponent 
                address={service.address}
                name={service.name}
              />
              
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.name + " " + service.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionLink}
              >
                Get Directions →
              </a>
            </div>

            <div className={styles.serviceCard}>
              <h3>📞 Contact Details</h3>
              <div className={styles.contactDetails}>
                <p><strong>Phone:</strong> {service.phone}</p>
                {service.mobile && (
                  <p><strong>Mobile:</strong> {service.mobile}</p>
                )}
                {service.email && (
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${service.email}`}>{service.email}</a>
                  </p>
                )}
                {service.website && (
                  <p>
                    <strong>Website:</strong>{' '}
                    <a 
                      href={`https://${service.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {service.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.backLinkContainer}>
            <Link href="/" className={styles.backButton}>
              ← Back to Search
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
