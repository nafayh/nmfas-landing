"use client";

import { useSearchParams } from 'next/navigation';
import styles from '../page.module.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { funeralServices } from '../data/funeralServices';
import Link from 'next/link';
import { createSlug } from '../utils/urlUtils';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const regions = ['all', ...new Set(funeralServices.map(service => service.region))].sort();
  const types = ['all', ...new Set(funeralServices.map(service => service.type))].sort();

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    const searchTerm = query.toLowerCase();
    let filtered = funeralServices.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.address.toLowerCase().includes(searchTerm) ||
      service.region.toLowerCase().includes(searchTerm)
    );

    if (selectedRegion !== 'all') {
      filtered = filtered.filter(service => service.region === selectedRegion);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(service => service.type === selectedType);
    }

    setResults(filtered);
    setLoading(false);
  }, [query, selectedRegion, selectedType]);

  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        <section className={`${styles.hero} ${styles.searchHero}`}>
          <h1>Search Results</h1>
          {query && <p>Showing results for: {query}</p>}

          <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
              <label htmlFor="region">Region:</label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={styles.filterSelect}
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="type">Service Type:</label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={styles.filterSelect}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.searchResultsContainer}>
            {loading ? (
              <div className={styles.loading}>Loading results...</div>
            ) : results.length > 0 ? (
              <div className={styles.resultsGrid}>
                {results.map((result) => {
                  const slug = createSlug(result.name);
                  return (
                    <Link key={slug} href={`/service/${slug}`} className={styles.cardLink}>
                      <div className={styles.searchResultCard}>
                        <h3>{result.name}</h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={styles.noResults}>No results found</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
