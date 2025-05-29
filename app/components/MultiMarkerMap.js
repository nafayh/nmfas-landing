'use client';

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { geocodeAddress, createServiceSlug } from '../utils/mapUtils';

const MultiMarkerMap = ({ services }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapHtml, setMapHtml] = useState('');

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!services || services.length === 0) {
        setIsLoading(false);
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
          
          // Calculate map bounds
          let minLat = 58.7;
          let maxLat = 49.8;
          let minLon = -8.2;
          let maxLon = 1.8;
          
          newMarkers.forEach(marker => {
            minLat = Math.min(minLat, marker.lat);
            maxLat = Math.max(maxLat, marker.lat);
            minLon = Math.min(minLon, marker.lon);
            maxLon = Math.max(maxLon, marker.lon);
          });
          
          // Add padding to ensure all markers are visible
          const padding = 0.1;
          minLat -= padding;
          maxLat += padding;
          minLon -= padding;
          maxLon += padding;
          
          setMapBounds({ minLat, maxLat, minLon, maxLon });
          
          // Generate HTML for iframe with the Leaflet map
          const html = generateMapHtml(newMarkers);
          setMapHtml(html);
          
        } else {
          setError('No locations found to display');
        }
        
      } catch (err) {
        console.error('Error processing services:', err);
        setError('Failed to load locations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [services]);
  
  // Generate HTML with Leaflet map
  const generateMapHtml = (mapMarkers) => {
    if (!mapMarkers || mapMarkers.length === 0) return '';
    
    // Calculate center of markers
    let totalLat = 0;
    let totalLon = 0;
    mapMarkers.forEach(marker => {
      totalLat += parseFloat(marker.lat);
      totalLon += parseFloat(marker.lon);
    });
    const centerLat = totalLat / mapMarkers.length;
    const centerLon = totalLon / mapMarkers.length;
    
    // Calculate appropriate zoom level based on bounds
    let zoom = 10; // Default zoom
    if (mapBounds) {
      const latDiff = mapBounds.maxLat - mapBounds.minLat;
      const lonDiff = mapBounds.maxLon - mapBounds.minLon;
      if (latDiff > 1 || lonDiff > 1) zoom = 7;
      else if (latDiff > 0.5 || lonDiff > 0.5) zoom = 9;
      else if (latDiff > 0.2 || lonDiff > 0.2) zoom = 11;
      else zoom = 13;
    }
    
    // Generate marker JavaScript code
    const markersJs = mapMarkers.map(marker => {
      return `
        L.marker([${marker.lat}, ${marker.lon}])
          .addTo(map)
          .bindPopup("<strong>${marker.name}</strong><br>${marker.region}<br><a href='/service/${marker.slug}'>View Details</a>");
      `;
    }).join('');
    
    // Complete HTML with Leaflet
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { position: absolute; top: 0; bottom: 0; width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoom});
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          
          ${markersJs}
          
          // Ensure all markers are visible
          const bounds = L.latLngBounds();
          [${mapMarkers.map(m => `[${m.lat}, ${m.lon}]`).join(', ')}].forEach(coords => {
            bounds.extend(coords);
          });
          map.fitBounds(bounds, { padding: [50, 50] });
        </script>
      </body>
      </html>
    `;
  };

  const getIframeDataUri = () => {
    if (!mapHtml) return '';
    return `data:text/html;charset=utf-8,${encodeURIComponent(mapHtml)}`;
  };

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
      
      {!isLoading && !error && mapHtml && (
        <iframe
          className={styles.mapFrame}
          loading="lazy"
          src={getIframeDataUri()}
          title="Map showing locations of funeral services"
          style={{
            width: '100%',
            height: '450px',
            border: 'none',
            borderRadius: '12px',
            transition: 'opacity 0.3s ease-in-out'
          }}
          sandbox="allow-scripts"
        />
      )}
      
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

export default MultiMarkerMap;
