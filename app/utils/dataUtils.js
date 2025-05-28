import { funeralServices as originalServices } from '../data/funeralServices';

/**
 * Gets the latest funeral service listings, either from localStorage or fallback to original data
 * @returns {Array} The latest funeral service listings
 */
export function getLatestListings() {
  if (typeof window === 'undefined') {
    return originalServices;
  }
  
  const savedListings = localStorage.getItem('funeralListings');
  if (savedListings) {
    try {
      return JSON.parse(savedListings);
    } catch (error) {
      console.error('Error parsing saved listings:', error);
      return originalServices;
    }
  } else {
    return originalServices;
  }
}

/**
 * Saves funeral service listings to localStorage
 * @param {Array} listings - The listings to save
 */
export function saveListings(listings) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('funeralListings', JSON.stringify(listings));
      return true;
    } catch (error) {
      console.error('Error saving listings:', error);
      return false;
    }
  }
  return false;
}

/**
 * Resets funeral service listings to the original data
 */
export function resetListings() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('funeralListings');
  }
  return originalServices;
}
