'use client';

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { geocodeAddress, createMapUrl } from '../utils/mapUtils';

const MapComponent = ({ address, name }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use our utility function for geocoding
        const coords = await geocodeAddress(name, address);
        
        if (coords) {
          setCoordinates(coords);
        } else {
          setError('Location not found');
        }
      } catch (err) {
        console.error('Error getting coordinates:', err);
        setError('Failed to load location');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [address, name]);
  // Create the map URL with the marker and appropriate zoom level
  // Use the same createMapUrl function for consistency with multiple markers,
  // but here we just pass a single marker
  const mapUrl = coordinates
    ? createMapUrl([coordinates])  // Pass an array with a single marker
    : `https://www.openstreetmap.org/export/embed.html?bbox=-5.5,50.5,1.5,56.0&layer=mapnik`;

  return (
    <div className={styles.mapWrapper}>
      {isLoading && (
        <div className={styles.mapLoader}>
          <div className={styles.mapLoaderPulse} />
          <p>Loading map...</p>
        </div>
      )}
      {error && (
        <div className={styles.mapError}>
          <p>{error}</p>
        </div>
      )}
      <iframe
        className={styles.mapFrame}
        loading="lazy"
        src={mapUrl}
        title={`Map showing location of ${name}`}
        onLoad={() => setIsLoading(false)}
        style={{
          width: '100%',
          height: '350px',
          border: 'none',
          borderRadius: '12px',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      {coordinates && (
        <div className={styles.mapFooter}>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewLargerMap}
          >
            Get Directions on Google Maps ↗
          </a>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
