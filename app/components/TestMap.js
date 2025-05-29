'use client';

import React from 'react';
import styles from '../page.module.css';
import { geocodeAddress, createMapUrl, createServiceSlug } from '../utils/mapUtils';

// This component is for testing the map utilities with multiple markers
export default function TestMap() {
  const [status, setStatus] = React.useState('Initializing...');
  const [results, setResults] = React.useState([]);
  const [mapUrl, setMapUrl] = React.useState('');
  const [allCoords, setAllCoords] = React.useState([]);
  
  React.useEffect(() => {
    const testMapUtilities = async () => {
      try {
        // Test locations including services in Birmingham
        const testLocations = [
          { name: 'Al-Madina Funeral Services', address: 'St. Mary Row, Birmingham B3' },
          { name: 'Al-Kawther Funeral Services', address: '120-122 Victoria Road, Birmingham, B66 3PJ' },
          { name: 'Al-Rahma Islamic Burial Service', address: '392-394 Green Lane, Small Heath, Birmingham, B9 5DH' },
          { name: 'Leeds Grand Mosque Funeral Services', address: '9 Woodsley Road, Leeds LS3 1DT' }
        ];
        
        setStatus('Geocoding multiple locations...');
        
        const coordsResults = [];
        const coordsList = [];
        
        for (const location of testLocations) {
          const coords = await geocodeAddress(location.name, location.address);
          if (coords) {
            coordsResults.push({ 
              name: location.name, 
              value: `${coords.lat}, ${coords.lon}`
            });
            coordsList.push({
              ...coords,
              name: location.name
            });
          } else {
            coordsResults.push({ 
              name: location.name, 
              value: 'Failed to geocode'
            });
          }
        }
        
        setAllCoords(coordsList);
        setResults(coordsResults);
        
        if (coordsList.length > 0) {
          setStatus('Creating map URL with multiple markers...');
          const testMapUrl = createMapUrl(coordsList);
          setMapUrl(testMapUrl);
          console.log('Test map URL with multiple markers:', testMapUrl);
          setStatus(`Testing completed with ${coordsList.length} markers`);
        } else {
          setStatus('Error: Failed to get any coordinates');
        }
      } catch (error) {
        setStatus(`Error during testing: ${error.message}`);
      }
    };
    
    testMapUtilities();
  }, []);
    return (
    <div className={styles.container}>
      <h1>Map Utilities Test</h1>
      
      {/* Display the map with multiple markers */}
      {mapUrl && (
        <div className={styles.mapWrapper}>
          <h3>Map with Multiple Markers ({allCoords.length})</h3>
          <iframe
            className={styles.mapFrame}
            loading="lazy"
            src={mapUrl}
            title="Test map with multiple markers"
            style={{
              width: '100%',
              height: '450px',
              border: 'none',
              borderRadius: '12px'
            }}
          />
        </div>
      )}
      <div className={styles.testStatus}>
        <p><strong>Status:</strong> {status}</p>
      </div>
      
      {results.length > 0 && (
        <div className={styles.testResults}>
          <h2>Test Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>{result.name}:</strong>
                <pre>{result.value}</pre>
              </li>
            ))}
          </ul>
          
          {results.length >= 3 && (
            <div className={styles.mapContainer}>
              <h3>Test Map Display</h3>
              <iframe
                src={results[2].value}
                style={{
                  width: '100%',
                  height: '400px',
                  border: 'none',
                  borderRadius: '8px'
                }}
                title="Test Map"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
