'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const MapComponent = ({ address, name }) => {
  const [coordinates, setCoordinates] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Check if API key is available
  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return (
      <div
        style={{
          width: '100%',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          margin: '20px 0',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <div>
          <p style={{ marginBottom: '10px' }}>Map loading is disabled.</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Please set up your Google Maps API key in the .env.local file.
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              name + ' ' + address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              color: '#0066cc',
              textDecoration: 'none'
            }}
          >
            View on Google Maps &rarr;
          </a>
        </div>
      </div>
    );
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries
  });

  useEffect(() => {
    if (isLoaded && address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { address: `${name}, ${address}` },
        (results, status) => {
          if (status === 'OK') {
            const { lat, lng } = results[0].geometry.location;
            setCoordinates({ lat: lat(), lng: lng() });
          } else {
            console.error('Geocoding failed:', status);
          }
        }
      );
    }
  }, [isLoaded, address, name]);

  if (loadError) {
    return (
      <div
        style={{
          width: '100%',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff1f1',
          borderRadius: '12px',
          margin: '20px 0',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <div>
          <p style={{ marginBottom: '10px', color: '#e60000' }}>
            Error loading the map.
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              name + ' ' + address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              color: '#0066cc',
              textDecoration: 'none'
            }}
          >
            View on Google Maps &rarr;
          </a>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        style={{
          width: '100%',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          margin: '20px 0'
        }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '450px',
        borderRadius: '12px',
        margin: '20px 0'
      }}
      center={coordinates || { lat: 52.4862, lng: -1.8904 }}
      zoom={16}
      options={{
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeId: 'roadmap',
        scrollwheel: true
      }}
    >
      {coordinates && (
        <Marker
          position={coordinates}
          icon={{
            url: '/mosque-marker.svg',
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40)
          }}
          title={name}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
