'use client';

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';

const MapComponent = ({ address, name }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fallback coordinates for known locations
        const fallbackCoordinates = {
          'Al-Madina Funeral Services': { lat: 52.4813, lon: -1.9021 }, // Birmingham City Center
          'Al-Kawther Funeral Services': { lat: 52.4979, lon: -1.9674 }, // Smethwick, Birmingham
          'Al-Rahma Islamic Burial Service': { lat: 52.4684, lon: -1.8498 }, // Small Heath, Birmingham
          'Eternal Life Funeral Services': { lat: 53.7996, lon: -1.7553 }, // Bradford
          'Cardiff Muslim Burial Council': { lat: 51.4816, lon: -3.1791 }, // Cardiff
          'ICAS Funeral Services': { lat: 55.8642, lon: -4.2669 }, // Glasgow
          'Manchester Central Mosque Funeral Service': { lat: 53.4970, lon: -2.2405 }, // Manchester
          'Leeds Grand Mosque Funeral Services': { lat: 53.8008, lon: -1.5602 }, // Leeds
          'Liverpool Muslim Burial Services': { lat: 53.4035, lon: -2.9645 }, // Liverpool
          'Newcastle Islamic Funeral Services': { lat: 54.9783, lon: -1.6178 } // Newcastle
        };

        // First try with the full address
        const searchAddress = encodeURIComponent(`${name} ${address}, UK`);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchAddress}&limit=1&countrycodes=gb`,
          { 
            headers: { 'Accept-Language': 'en' },
            // Add a slight delay to respect rate limits
            signal: AbortSignal.timeout(5000)
          }
        );
        
        if (!response.ok) throw new Error('Failed to fetch coordinates');
        
        const data = await response.json();
        
        if (data && data[0]) {
          // Validate the returned coordinates are in the UK
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          if (lat >= 49.8 && lat <= 58.7 && lon >= -8.2 && lon <= 1.8) {
            setCoordinates({
              lat: lat,
              lon: lon
            });
          } else {
            // Use fallback coordinates if available
            if (fallbackCoordinates[name]) {
              setCoordinates(fallbackCoordinates[name]);
            } else {
              setError('Location coordinates seem incorrect');
            }
          }
        } else {
          // Try fallback coordinates
          if (fallbackCoordinates[name]) {
            setCoordinates(fallbackCoordinates[name]);
          } else {
            setError('Location not found');
          }
        }
      } catch (err) {
        console.error('Error getting coordinates:', err);
        // Try fallback coordinates on error
        if (fallbackCoordinates[name]) {
          setCoordinates(fallbackCoordinates[name]);
        } else {
          setError('Failed to load location');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [address, name]);

  // Create the map URL with the marker and appropriate zoom level
  const mapUrl = coordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(coordinates.lon) - 0.005},${parseFloat(coordinates.lat) - 0.005},${parseFloat(coordinates.lon) + 0.005},${parseFloat(coordinates.lat) + 0.005}&layer=mapnik&marker=${coordinates.lat},${coordinates.lon}`
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
