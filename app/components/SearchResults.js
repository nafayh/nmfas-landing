'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from '../page.module.css';
import { createSlug } from '../utils/urlUtils';
import { funeralServices } from '../data/funeralServices';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'funeral';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchType === 'funeral') {
      const query = searchQuery.toLowerCase();
      const filteredResults = funeralServices.filter(service => 
        service.region.toLowerCase().includes(query) ||
        service.address.toLowerCase().includes(query) ||
        service.name.toLowerCase().includes(query)
      );
      setResults(filteredResults);
    } else {
      setResults([]); // For cemetery searches (not implemented yet)
    }
  }, [searchQuery, searchType]);

  return (
    <>
      <h1 className={styles.heroTitle}>Search Results</h1>
      <p className={styles.heroSubtitle}>
        {searchType === 'funeral' ? 'Funeral Services' : 'Cemeteries'} near "{searchQuery}"
      </p>

      <div className={styles.searchResultsContainer}>
        <div className={styles.resultsContainer}>
          {results.length > 0 ? (
            <div className={styles.resultsGrid}>
              {results.map((service, index) => (
                <Link
                  key={index}
                  href={`/service/${createSlug(service.name)}`}
                  className={styles.cardLink}
                >
                  <div className={styles.searchResultCard}>
                    <h3>{service.name}</h3>
                    <p className={styles.serviceRegion}>{service.region}</p>
                    <span className={styles.serviceType}>{service.type}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              {searchType === "funeral" ? 
                "No funeral services found in this area. Please try a different location." :
                "Cemetery search is coming soon. Please try searching for funeral services instead."
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
}
