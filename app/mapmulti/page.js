'use client';

import React from 'react';
import MultiMarkerMap from '../components/MultiMarkerMap';
import { funeralServices } from '../data/funeralServices';
import styles from '../page.module.css';

export default function MapMultiPage() {
  // Filter services to those in Birmingham for testing
  const birminghamServices = funeralServices.filter(service => 
    service.region.toLowerCase() === 'birmingham'
  );
  
  return (
    <div className={styles.container}>
      <h1>Multiple Marker Map Test</h1>
      <p>This page shows all funeral services in Birmingham on a map.</p>
      <div className={styles.mapContainer}>
        <MultiMarkerMap services={birminghamServices} />
      </div>
      
      <div className={styles.serviceCount}>
        <h3>Found {birminghamServices.length} services in Birmingham</h3>
      </div>
    </div>
  );
}
