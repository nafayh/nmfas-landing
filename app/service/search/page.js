'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { funeralServices } from '../../data/funeralServices';
import styles from '../../page.module.css';
import Link from 'next/link';
import MultiMarkerMap from '../../components/MultiMarkerMap';
import { createServiceSlug } from '../../utils/mapUtils';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  
  useEffect(() => {
    setSearchTerm(query);
    filterServices(query);
    setLoading(false);
  }, [query]);

  const filterServices = (term) => {
    if (!term) {
      setFilteredServices([]);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = funeralServices.filter(service => {
      return (
        service.name.toLowerCase().includes(lowerTerm) ||
        service.region.toLowerCase().includes(lowerTerm) ||
        service.address.toLowerCase().includes(lowerTerm)
      );
    });

    setFilteredServices(filtered);
    
    // Show map when we have results
    if (filtered.length > 0) {
      setShowMap(true);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    filterServices(searchTerm);
  };
  
  // Remove inner page padding when this component mounts
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.remove(styles.innerPage);
    }
    
    // Cleanup when component unmounts
    return () => {
      if (mainContent) {
        mainContent.classList.add(styles.innerPage);
      }
    };
  }, []);
  
  // Add animation for results when they come into view
  useEffect(() => {
    if (!loading && filteredServices.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeInUp);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      const resultCards = document.querySelectorAll(`.${styles.resultCard}`);
      resultCards.forEach((card, index) => {
        // Add a slight delay to each card for a cascade effect
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      });
      
      return () => {
        resultCards.forEach(card => {
          observer.unobserve(card);
        });
      };
    }
  }, [loading, filteredServices, styles.fadeInUp, styles.resultCard]);
    return (
    <div className={styles.searchPageContainer}>
      <div className={`${styles.searchHeader} ${styles.heroSection}`}>
        <div className={styles.heroContent}>
          <h1>Funeral Services Search</h1>
          <p>Find Muslim funeral services in your area</p>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Enter city or region"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
          </form>
        </div>
      </div>

      <div className={styles.searchResultsContainer}>
        {loading ? (
          <div className={styles.loading}>Loading results...</div>
        ) : filteredServices.length > 0 ? (
          <div>
            <h2>Found {filteredServices.length} services in {query}</h2>
              {/* Add the improved map component for multiple markers */}
            {showMap && (
              <div className={styles.mapContainer}>
                <MultiMarkerMap services={filteredServices} />
              </div>
            )}
            
            <div className={styles.resultsGrid}>
              {filteredServices.map((service, index) => {                // Create slug for the service URL using our utility function
                const serviceSlug = createServiceSlug(service.name);

                return (
                  <Link 
                    key={index}
                    href={`/service/${serviceSlug}`}
                    className={styles.resultCard}
                  >
                    <h3>
                      {service.name}
                      <span className={styles.viewDetailsIcon} aria-hidden="true">
                        →
                      </span>
                    </h3>
                    
                    <div className={styles.serviceSummary}>
                      <p><strong>Region:</strong> {service.region}</p>
                      <p className={styles.viewDetails}>Click to view full details</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : query ? (
          <div className={styles.noResults}>
            <h2>No services found in {query}</h2>
            <p>Try searching for a different city or region</p>
          </div>
        ) : (
          <div className={styles.initialState}>
            <h2>Search for funeral services</h2>
            <p>Enter a city or region to find funeral services</p>
          </div>
        )}
      </div>
    </div>
  );
}