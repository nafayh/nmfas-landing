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

  const testimonials = [
    {
      quote: "NMFAS is a fantastic resource for Muslims across the UK. It aims to provide useful information in an easy-to-understand format for people who are going through the most difficult time. We should all try to support this effort in every possible way..",
      author: "Iqbal NasimMBE",
      role: "Family Member",
      rating: 5
    },
    {
      quote: "NMFAS is a valuable resource for the UK muslim community. We recently suffered the bereavement of a terminally ill parent and found the NMFAS website to be a great source of guidance, covering complex issues in simple and concise terms. The website enabled us to plan ahead and put in place funeral planning arrangements which meant we were able to concentrate on looking after our loved one at a very difficult time. Much respect and prayers for the the individuals who established NMFAS.",
      author: "Shahan JamilLawyer",
      role: "Community Leader",
      rating: 5
    },
    {
      quote: "I just wanted to say how useful this resource was. I was confused about the process but it is now much clearer. Thanks so much for making this resource.",
      author: "Nargis A.",
      role: "Local Business Owner",
      rating: 5
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Difficult Times, Made Easier</h1>
          <p>Find Muslim funeral services, cemeteries, and support in your area</p>
          <p>At NMFAS ADVISORY, we understand that saying goodbye is never easy. Our dedicated team is here to provide you with compassionate support and personalized funeral services that honor your loved ones.</p>
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
            <form action="https://www.gov.uk/register-offices" target="_blank">
              <input
                type="text"
                placeholder="Enter your city or postcode"
                aria-label="Search for registry offices"
              />
              <button type="submit">Search on Gov.uk</button>
            </form>
          </div>
        </div>
      </div>

      {/* Guidance Services Section */}
      <section className={styles.guidanceSection}>
        <h2 className={styles.guidanceTitle}>
          Compassionate Funeral Planning Tailored<br />
          to Your Unique Needs and Wishes
        </h2>
        
        <div className={styles.guidanceCards}>
          <div className={styles.guidanceCard}>
            <h3>Support for Grieving Families: We're Here to Help You Heal</h3>
            <p>Our funeral planning services ensure every detail is handled with care.</p>
            <Link href="/guides/grief-support" className={styles.guidanceLink}>
              Learn More →
            </Link>
          </div>
          
          <div className={styles.guidanceCard}>
            <h3>Pre-Paid Funeral Plans: Secure Peace of Mind for Your Loved Ones</h3>
            <p>Plan ahead with our pre-paid options to alleviate future burdens.</p>
            <Link href="/guides/pre-paid-plans" className={styles.guidanceLink}>
              Sign Up →
            </Link>
          </div>
          
          <div className={styles.guidanceCard}>
            <h3>Comprehensive Grief Support Services for Individuals and Families in Need</h3>
            <p>We offer compassionate grief support to help you navigate your journey.</p>
            <Link href="/guides/grief-counseling" className={styles.guidanceLink}>
              Contact →
            </Link>
          </div>
        </div>
      </section>

      {/* Our Key Services Section */}
      <section className={styles.servicesSection}>
        <h2 className={styles.servicesTitle}>Our Key Services</h2>
        <p className={styles.servicesSubtitle}>Explore our comprehensive range of financial and administrative services designed to support your success.</p>
        <div className={styles.servicesCards}>
          <div className={styles.serviceCard}>
            <h3>Financial Management</h3>
            <p>Expert guidance on budgeting, accounting, and financial planning to optimize your resources.</p>
            <Link href="/services/financial" className={styles.serviceLink}>Learn More →</Link>
          </div>
          <div className={styles.serviceCard}>
            <h3>Administrative Support</h3>
            <p>Streamline your operations with our efficient administrative solutions and best practices.</p>
            <Link href="/services/admin" className={styles.serviceLink}>Learn More →</Link>
          </div>
          <div className={styles.serviceCard}>
            <h3>Compliance Solutions</h3>
            <p>Stay compliant with regulations and standards through our comprehensive compliance services.</p>
            <Link href="/services/compliance" className={styles.serviceLink}>Learn More →</Link>
          </div>
        </div>
      </section>

      {/* Quick Guides Section */}
      <section className={styles.guidesSection}>
        <h2 className={styles.guidesTitle}>Quick Guides</h2>
        <p className={styles.guidesSubtitle}>Access our collection of step-by-step guides to help you navigate common processes.</p>
        <div className={styles.guidesCards}>
          <div className={styles.guideCard}>
            <h3>Budget Planning</h3>
            <p>Learn effective strategies for creating and managing your departmental budget.</p>
            <Link href="/guides/budget" className={styles.guideLink}>View Guide →</Link>
          </div>
          <div className={styles.guideCard}>
            <h3>Process Documentation</h3>
            <p>Best practices for documenting and standardizing administrative procedures.</p>
            <Link href="/guides/documentation" className={styles.guideLink}>View Guide →</Link>
          </div>
          <div className={styles.guideCard}>
            <h3>Reporting Templates</h3>
            <p>Access standardized templates for common financial and administrative reports.</p>
            <Link href="/guides/templates" className={styles.guideLink}>View Guide →</Link>
          </div>
        </div>
      </section>

      {/* Helpful Resources Section */}
      <section className={styles.resourcesSection}>
        <h2 className={styles.resourcesTitle}>Helpful Resources</h2>
        <p className={styles.resourcesSubtitle}>Find tools and resources to support your administrative and financial management needs.</p>
        <div className={styles.resourcesCards}>
          <div className={styles.resourceCard}>
            <h3>Forms Library</h3>
            <p>Access commonly used forms and documents for various administrative processes.</p>
            <Link href="/resources/forms" className={styles.resourceLink}>Access Forms →</Link>
          </div>
          <div className={styles.resourceCard}>
            <h3>Policy Database</h3>
            <p>Browse our comprehensive collection of policies and procedures.</p>
            <Link href="/resources/policies" className={styles.resourceLink}>View Policies →</Link>
          </div>
          <div className={styles.resourceCard}>
            <h3>Training Materials</h3>
            <p>Educational resources and training materials for professional development.</p>
            <Link href="/resources/training" className={styles.resourceLink}>Start Learning →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`${styles.testimonialsSection} ${pageLoaded ? styles.pageLoaded : styles.contentHidden}`}>
        <div className={styles.testimonialContainer}>
          <h2 className={styles.sectionTitle}>Customer Testimonials</h2>
          <p className={styles.testimonialSubtitle}>
            Their compassion and professionalism made a difficult time easier.
          </p>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className={styles.testimonialQuote}>{testimonial.quote}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <div className={styles.testimonialName}>{testimonial.author}</div>
                    <div className={styles.testimonialRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* About Column */}
            <div className={styles.footerColumn}>
              <h3>About NMFAS</h3>
              <div className={styles.footerAbout}>
                <p>
                  The National Muslim Funeral Advisory Service (NMFAS) is dedicated to providing guidance
                  and support during difficult times. We help connect you with funeral services and
                  resources across the UK.
                </p>
              </div>
              <div className={styles.socialLinks}>
                <a href="https://facebook.com/nmfas" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com/nmfas" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com/nmfas" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerColumn}>
              <h3>Quick Links</h3>
              <ul className={styles.footerLinks}>
                <li><Link href="/guides">Guides</Link></li>
                <li><Link href="/service/search">Find Services</Link></li>
                <li><Link href="/resources/islamic-burial">Islamic Guidelines</Link></li>
                <li><Link href="/resources/legal-requirements">Legal Requirements</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className={styles.footerColumn}>
              <h3>Resources</h3>
              <ul className={styles.footerLinks}>
                <li><Link href="/resources/financial-support">Financial Support</Link></li>
                <li><Link href="/guides/death-in-hospital">Hospital Guide</Link></li>
                <li><Link href="/guides/death-at-home">Home Guide</Link></li>
                <li><Link href="/guides/coroners-and-post-mortems">Coroner's Guide</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.footerColumn}>
              <h3>Contact Us</h3>
              <div className={styles.footerContact}>
                <p>
                  <i className="fas fa-phone"></i>
                  Emergency: 0800 123 4567
                </p>
                <p>
                  <i className="fas fa-envelope"></i>
                  info@nmfas.org.uk
                </p>
                <p>
                  <i className="fas fa-clock"></i>
                  Available 24/7
                </p>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} National Muslim Funeral Advisory Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
    </div>
  );
}
