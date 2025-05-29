'use client';

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { geocodeAddress, createMapUrl, createServiceSlug } from '../utils/mapUtils';

const SearchMapComponent = ({ services }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!services || services.length === 0) {
        setIsLoading(false);
        setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-5.5,50.5,1.5,56.0&layer=mapnik`);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const newMarkers = [];
        
        // Process services in sequence to respect rate limits
        for (const service of services) {
          try {
            // Use the geocodeAddress utility function to get coordinates
            const coordinates = await geocodeAddress(service.name, service.address);
            
            if (coordinates) {
              // Create serviceSlug for linking to detail page
              const serviceSlug = createServiceSlug(service.name);
                
              // Add marker data including service details
              newMarkers.push({
                ...coordinates,
                name: service.name,
                slug: serviceSlug,
                region: service.region,
                address: service.address
              });
              
              console.log(`Added marker for ${service.name} at ${coordinates.lat}, ${coordinates.lon}`);
            } else {
              console.warn(`Could not geocode ${service.name}`);
            }
            
            // Add a small delay between requests to respect Nominatim rate limits
            await new Promise(resolve => setTimeout(resolve, 300));
            
          } catch (err) {
            console.error(`Error processing ${service.name}:`, err);
          }
        }
        
        if (newMarkers.length > 0) {
          setMarkers(newMarkers);
          
          // Create map URL with all markers
          const newMapUrl = createMapUrl(newMarkers);
          setMapUrl(newMapUrl);
          console.log(`Created map with ${newMarkers.length} markers: ${newMapUrl}`);
        } else {
          setError('No locations found to display');
          setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-5.5,50.5,1.5,56.0&layer=mapnik`);
        }
        
      } catch (err) {
        console.error('Error processing services:', err);
        setError('Failed to load locations');
        setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-5.5,50.5,1.5,56.0&layer=mapnik`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [services]);
    return (
    <div className={styles.mapWrapper}>
      <h3 className={styles.mapTitle}>
        {markers.length > 0 
          ? `Showing ${markers.length} services on the map` 
          : 'No services to display on map'}
      </h3>
      
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
        title="Map showing locations of funeral services"
        onLoad={() => setIsLoading(false)}
        style={{
          width: '100%',
          height: '450px',
          border: 'none',
          borderRadius: '12px',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {markers.length > 0 && (
        <div className={styles.markerList}>
          <h4>Found Services:</h4>
          <ul>
            {markers.map((marker, index) => (
              <li key={index}>
                <a href={`/service/${marker.slug}`}>
                  {marker.name} ({marker.region})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchMapComponent;
