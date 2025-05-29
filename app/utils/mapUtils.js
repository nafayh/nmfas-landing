// Utility functions for handling geocoding and coordinates

/**
 * Geocode an address using Nominatim OpenStreetMap API
 * 
 * @param {string} name - The name of the location
 * @param {string} address - The address to geocode
 * @param {object} fallbackCoordinates - Optional fallback coordinates
 * @returns {Promise<{lat: number, lon: number} | null>} - The coordinates or null if not found
 */
export async function geocodeAddress(name, address, fallbackCoordinates = null) {
  try {
    // Fallback coordinates for known locations
    const knownLocations = {
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
        return { lat, lon };
      }
    }
    
    // Try fallback coordinates
    if (fallbackCoordinates) {
      return fallbackCoordinates;
    } else if (knownLocations[name]) {
      return knownLocations[name];
    }
    
    return null;
    
  } catch (err) {
    console.error('Error geocoding address:', err);
    
    // Try fallback coordinates
    if (fallbackCoordinates) {
      return fallbackCoordinates;
    } else if (name && knownLocations[name]) {
      return knownLocations[name];
    }
    
    return null;
  }
}

/**
 * Create a map URL with multiple markers for OpenStreetMap
 * 
 * @param {Array} markers - Array of {lat, lon} objects
 * @returns {string} - URL for OpenStreetMap with markers
 */
export function createMapUrl(markers) {
  if (!markers || markers.length === 0) {
    // Default UK bounds
    return `https://www.openstreetmap.org/export/embed.html?bbox=-5.5,50.5,1.5,56.0&layer=mapnik`;
  }
  
  // Calculate bounds from all markers
  let minLat = 58.7; // North boundary of UK
  let maxLat = 49.8; // South boundary of UK
  let minLon = -8.2; // West boundary of UK
  let maxLon = 1.8;  // East boundary of UK
  
  markers.forEach(marker => {
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
    // Create the map URL with bounding box
  let mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik`;
  
  // Add markers - ensuring each marker is added separately with proper URL encoding
  if (markers.length === 1) {
    // Single marker case - simple format
    mapUrl += `&marker=${markers[0].lat},${markers[0].lon}`;
  } else {
    // Multiple markers case
    markers.forEach((marker, index) => {
      // Use the correct syntax for multiple markers
      // Each marker needs to be added with its own &marker parameter
      mapUrl += `&marker=${marker.lat},${marker.lon}`;
      console.log(`Added marker ${index+1} at ${marker.lat},${marker.lon}`);
    });
  }
  
  console.log("Final map URL:", mapUrl);
  return mapUrl;
}

/**
 * Create slug for URLs from a service name
 * 
 * @param {string} name - Service name
 * @returns {string} - URL-friendly slug
 */
export function createServiceSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .trim();
}
