"use client";

import { useSearchParams } from 'next/navigation';
import styles from '../page.module.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // In the future, this would be an API call to fetch results
    // For now, we'll simulate with the Manchester example
    if (query?.toLowerCase().includes('manchester')) {
      setResults([
        {
          name: 'Hadayat ul Muslimeen Mosque',
          address: '19 Humphrey Road, Manchester M16 9DD',
          phone: '07958 908882',
          website: 'www.masjidehidayah.org.uk'
        },
        {
          name: 'Faizan e Islam - Funeral Services',
          address: '229 Ayres Road, Manchester, England M16 0NL',
          phone: '0161 877 4827, 0208 281 7359',
          email: 'funeral@faizaneislam.com',
          website: 'faizaneislam.com'
        }
      ]);
    } else {
      setResults([]);
    }
    setLoading(false);
  }, [query]);

  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        <section className={`${styles.hero} ${styles.searchHero}`}>
          <h1>Search Results</h1>
          <p>Showing results for: {query}</p>

          <div className={styles.searchResultsContainer}>
            {loading ? (
              <div className={styles.loading}>Loading results...</div>
            ) : results.length > 0 ? (
              results.map((result, index) => (                <div key={index} className={styles.searchResultCard}>
                  <h3>{result.name}</h3>
                  <p className={styles.address}>{result.address}</p>
                  <p className={styles.phone}>Tel: {result.phone}</p>
                  {result.email && (
                    <p className={styles.email}>
                      Email: <a href={`mailto:${result.email}`}>{result.email}</a>
                    </p>
                  )}
                  <a href={`http://${result.website}`} target="_blank" rel="noopener noreferrer" 
                     className={styles.website}>{result.website}</a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.address)}`}
                     target="_blank" rel="noopener noreferrer"
                     className={styles.directions}>Get Directions</a>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>No funeral services found</h3>
                <p>Try searching with a different city or postcode</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
