'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Remove padding-top from body when the hero section is visible
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
  
  // Add scroll animation effect for hero content
  useEffect(() => {
    const handleScroll = () => {
      const heroContent = document.querySelector(`.${styles.heroContent}`);
      if (heroContent) {
        const scrollY = window.scrollY;
        const opacity = Math.max(1 - scrollY / 500, 0.2); // Fade out as you scroll
        const transform = `translateY(${scrollY * 0.2}px)`; // Parallax effect
        heroContent.style.opacity = opacity;
        heroContent.style.transform = transform;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [city, setCity] = useState('');
  const [cemeteryCity, setCemeteryCity] = useState('');
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Add fade-in effect for home page content
  useEffect(() => {
    // Set a small delay for better visual effect
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFuneralSearch = (e) => {
    e.preventDefault();
    if (city) {
      // Make sure the URL path is correct
      window.location.href = `/service/search?query=${encodeURIComponent(city)}`;
    }
  };

  const handleCemeterySearch = (e) => {
    e.preventDefault();
    if (cemeteryCity) {
      // Implement cemetery search functionality
      console.log('Searching for cemeteries in:', cemeteryCity);
    }
  };

  const keyServices = [
    {
      title: "Registration of Death",
      description: "Quick guide to registering a death",
      icon: "/file.svg",
      link: "/guides/registration"
    },
    {
      title: "Find a Funeral Director",
      description: "Local Muslim funeral services",
      icon: "/globe.svg",
      link: "/service/search"
    },
    {
      title: "Islamic Guidance",
      description: "Religious guidance for funerals",
      icon: "/window.svg",
      link: "/islamic-guidance"
    }
  ];

  const quickGuides = [
    {
      title: "Death in Hospital",
      description: "What to do when someone passes away in hospital",
      link: "/guides/death-in-hospital"
    },
    {
      title: "Death at Home",
      description: "Steps to take when someone passes at home",
      link: "/guides/death-at-home"
    },
    {
      title: "Death Referred to Coroner",
      description: "Understanding the coroner's process",
      link: "/guides/death-referred-to-coroners"
    },
    {
      title: "Alternative to Post-Mortem",
      description: "Options and guidance",
      link: "/guides/alternative-to-post-mortem"
    }
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Difficult Times, Made Easier</h1>
          <p>Find Muslim funeral services, cemeteries, and support in your area</p>
        </div>
        
        <div className={`${styles.searchCards} ${pageLoaded ? styles.pageLoaded : styles.contentHidden}`}>
          <div className={styles.card}>
            <h3>Find a Funeral Service</h3>
            <form onSubmit={handleFuneralSearch}>
              <input
                type="text"
                placeholder="Enter your city or postcode"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Search for funeral services"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className={styles.card}>
            <h3>Find a Cemetery</h3>
            <form onSubmit={handleCemeterySearch}>
              <input
                type="text"
                placeholder="Enter your city or postcode"
                value={cemeteryCity}
                onChange={(e) => setCemeteryCity(e.target.value)}
                aria-label="Search for cemeteries"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className={styles.card}>
            <h3>Find Registry Office</h3>
            <a 
              href="https://www.gov.uk/register-offices" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button">Visit Gov.uk</button>
            </a>
          </div>
        </div>
      </div>

      {/* Key Services Section */}
      <section className={`${styles.servicesSection} ${pageLoaded ? styles.pageLoaded : styles.contentHidden}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Key Services</h2>
          <div className={styles.servicesGrid}>
            {keyServices.map((service, index) => (
              <Link href={service.link} key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <Image src={service.icon} alt="" width={40} height={40} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Guides Section */}
      <section className={`${styles.guidesSection} ${pageLoaded ? styles.pageLoaded : styles.contentHidden}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Quick Guides</h2>
          <div className={styles.guidesGrid}>
            {quickGuides.map((guide, index) => (
              <Link href={guide.link} key={index} className={styles.guideCard}>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <span className={styles.readMore}>Read More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className={`${styles.emergencySection} ${pageLoaded ? styles.pageLoaded : styles.contentHidden}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.emergencyContent}>
            <h2>Need Immediate Assistance?</h2>
            <p>Our helpline is available 24/7</p>
            <div className={styles.emergencyNumber}>
              <a href="tel:08001234567">0800 123 4567</a>
            </div>
            <p className={styles.emergencyNote}>
              For urgent matters regarding funeral arrangements or religious guidance
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className={`${styles.resourcesSection} ${pageLoaded ? styles.pageLoaded : styles.contentHidden}`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Helpful Resources</h2>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <h3>Islamic Burial Guidelines</h3>
              <ul>
                <li>Preparing the deceased</li>
                <li>Funeral prayer guidance</li>
                <li>Burial procedures</li>
              </ul>
              <Link href="/resources/islamic-burial">Learn More →</Link>
            </div>
            <div className={styles.resourceCard}>
              <h3>Legal Requirements</h3>
              <ul>
                <li>Death registration</li>
                <li>Required documents</li>
                <li>Time limitations</li>
              </ul>
              <Link href="/resources/legal-requirements">Learn More →</Link>
            </div>
            <div className={styles.resourceCard}>
              <h3>Financial Support</h3>
              <ul>
                <li>Funeral cost assistance</li>
                <li>Government benefits</li>
                <li>Charitable support</li>
              </ul>
              <Link href="/resources/financial-support">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className={`${styles.supportSection} ${pageLoaded ? styles.pageLoaded : styles.contentHidden}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.supportContent}>
            <h2>Community Support Network</h2>
            <p>Connect with local Muslim communities and support groups</p>
            <Link href="/support" className={styles.supportButton}>
              Find Support Near You
            </Link>
          </div>
        </div>
      </section>

      {/* Footer remains the same */}
    </main>
  );
}
