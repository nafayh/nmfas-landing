        {/* Affiliates Section */}
        <section className={styles.affiliates}>
          <h2>Affiliated Organizations</h2>
          <div className={styles.affiliateGrid}>
            <div className={styles.affiliateCard}>
              <h3>Funeral Services</h3>
              <ul>
                <li><a href="https://www.gardensofpeace.org.uk/" target="_blank" rel="noopener noreferrer">Gardens of Peace</a></li>
                <li><a href="https://www.mbcc.org.uk/" target="_blank" rel="noopener noreferrer">Muslim Burial Council of Leicestershire</a></li>
                <li><a href="https://www.greenlanemasjid.org/services/funeral/" target="_blank" rel="noopener noreferrer">Green Lane Masjid Funeral Service</a></li>
                <li><a href="https://www.eastlondonmosque.org.uk/funeral-service/" target="_blank" rel="noopener noreferrer">East London Mosque Funeral Service</a></li>
                <li><a href="https://www.masjidehidayah.org.uk/" target="_blank" rel="noopener noreferrer">Hadayat ul Muslimeen Mosque</a><br />
                  <small>19 Humphrey Road, Manchester M16 9DD<br />
                  Tel: 07958 908882</small>
                </li>
                <li><a href="https://www.faizaneislam.com/" target="_blank" rel="noopener noreferrer">Faizan e Islam - Funeral Services</a><br />
                  <small>229 Ayres Road, Manchester M16 0NL<br />
                  Tel: 0161 877 4827, 0208 281 7359<br />
                  Email: <a href="mailto:funeral@faizaneislam.com">funeral@faizaneislam.com</a></small>
                </li>
              </ul>
            </div>
            <div className={styles.affiliateCard}>
              <h3>Cemetery Partners</h3>
              <ul>
                <li><a href="https://www.gardensofpeace.org.uk/" target="_blank" rel="noopener noreferrer">Gardens of Peace Muslim Cemetery</a></li>
                <li><a href="https://eternalgardens.org.uk/" target="_blank" rel="noopener noreferrer">Eternal Gardens</a></li>
                <li>Five Ways Muslim Cemetery</li>
                <li>Muslim Burial Ground Peace Garden</li>
              </ul>
            </div>
            <div className={styles.affiliateCard}>
              <h3>Support Organizations</h3>
              <ul>
                <li><a href="https://www.mcb.org.uk/" target="_blank" rel="noopener noreferrer">Muslim Council of Britain</a></li>
                <li><a href="https://www.iccuk.org/" target="_blank" rel="noopener noreferrer">Islamic Cultural Centre</a></li>
                <li><a href="https://www.muslimaid.org/" target="_blank" rel="noopener noreferrer">Muslim Aid UK</a></li>
                <li><a href="https://www.namp-uk.org/" target="_blank" rel="noopener noreferrer">National Association of Muslim Police</a></li>
              </ul>
            </div>
          </div>
        </section>
"use client";

import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import { useState } from 'react';

export default function Home() {
  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Add state for search results
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errs.email = 'Enter a valid email';
    }
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    // Simulate async send
    setTimeout(() => {
      setSubmitting(false);
      setFeedback('Thank you for contacting us! We will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    }, 1200);
  }

  // Function to handle search
  const handleFuneralSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>Difficult Times, Made Easier</h1>
          <p>Find Muslim funeral services, cemeteries, and support in your area</p>
          
          {/* Search container */}
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <h3>Find a Funeral Service</h3>
              <div className={styles.searchInputGroup}>
                <input 
                  type="text" 
                  placeholder="Enter your city or postcode"
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleFuneralSearch()}
                />
                <button className={styles.searchBtn} onClick={handleFuneralSearch}>Search</button>
              </div>
            </div>

            <div className={styles.searchBox}>
              <h3>Find a Cemetery</h3>
              <div className={styles.searchInputGroup}>
                <input 
                  type="text" 
                  placeholder="Enter your city or postcode"
                  className={styles.searchInput}
                />
                <button className={styles.searchBtn}>Search</button>
              </div>
            </div>

            <div className={styles.searchBox}>
              <h3>Find Registry Office</h3>
              <a href="https://www.gov.uk/register-offices" className={styles.searchLink}>
                <div className={styles.searchInputGroup}>
                  <input 
                    type="text" 
                    placeholder="Visit gov.uk website"
                    className={styles.searchInput}
                    disabled
                  />
                  <button className={styles.searchBtn}>Visit Gov.uk</button>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* General Guides Section */}
        <section className={styles.guides}>
            <h2>General Guides</h2>
            <div className={styles.guidesGrid}>
              <div className={styles.guideCard}>
                <h3>Coroners and Post Mortems</h3>
                <p>Understanding the role of coroners and what happens during a post-mortem examination.</p>
                <a href="#" className={styles.readMore}>Read More →</a>
              </div>
              <div className={styles.guideCard}>
                <h3>Death Referred to Coroners</h3>
                <p>Learn about when and why deaths are referred to coroners and what to expect.</p>
                <a href="#" className={styles.readMore}>Read More →</a>
              </div>
              <div className={styles.guideCard}>
                <h3>6 Steps to Avoid a Post-Mortem</h3>
                <p>Important steps you can take to potentially avoid an invasive post-mortem.</p>
                <a href="#" className={styles.readMore}>Read More →</a>
              </div>
              <div className={styles.guideCard}>
                <h3>Alternative to Post-Mortem</h3>
                <p>Explore alternative options to traditional post-mortem examinations.</p>
                <a href="#" className={styles.readMore}>Read More →</a>
              </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonials}>
          <h2>What People Say</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"NMFAS is a fantastic resource for Muslims across the UK. It aims to provide useful information in an easy-to-understand format for people who are going through the most difficult time."</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <strong>Iqbal Nasim</strong>
                  <span>MBE</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"NMFAS is a valuable resource for the UK muslim community. The website enabled us to plan ahead and put in place funeral planning arrangements which meant we were able to concentrate on looking after our loved one."</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <strong>Shahan Jamil</strong>
                  <span>Lawyer</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"I just wanted to say how useful this resource was. I was confused about the process but it is now much clearer. Thanks so much for making this resource."</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <strong>Nargis A.</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={styles.about}>
          <div className={styles.sectionWrapper}>
            <h2>About Us</h2>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <p>NMFAS provides expert financial advisory services that respect Islamic principles while maximizing your financial potential. Our team of experienced advisors combines modern financial expertise with deep understanding of Islamic finance.</p>
                <ul>
                  <li>Shariah-compliant financial solutions</li>
                  <li>Expert guidance and support</li>
                  <li>Personalized financial strategies</li>
                </ul>
              </div>
              <div className={styles.aboutImage}>
                <Image src="/globe.svg" alt="Global Reach" width={400} height={400} />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={styles.services}>
          <div className={styles.sectionWrapper}>
            <h2>Our Services</h2>
            <div className={styles.serviceGrid}>
              <div className={styles.serviceCard}>
                <Image src="/window.svg" alt="Investment" width={50} height={50} />
                <h3>Islamic Investments</h3>
                <p>Shariah-compliant investment opportunities for wealth growth</p>
              </div>
              <div className={styles.serviceCard}>
                <Image src="/file.svg" alt="Planning" width={50} height={50} />
                <h3>Financial Planning</h3>
                <p>Comprehensive financial planning aligned with Islamic values</p>
              </div>
              <div className={styles.serviceCard}>
                <Image src="/window.svg" alt="Consultation" width={50} height={50} />
                <h3>Expert Consultation</h3>
                <p>One-on-one guidance from Islamic finance experts</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className={styles.faqs}>
          <div className={styles.sectionWrapper}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <details className={styles.faqItem}>
                <summary>What is Islamic financial planning?</summary>
                <p>Islamic financial planning ensures your investments and financial decisions comply with Shariah principles while helping you achieve your financial goals.</p>
              </details>
              <details className={styles.faqItem}>
                <summary>How do I get started?</summary>
                <p>Simply book a free consultation with our experts who will guide you through our services and help create a personalized financial plan.</p>
              </details>
              <details className={styles.faqItem}>
                <summary>What makes NMFAS different?</summary>
                <p>We combine modern financial expertise with deep understanding of Islamic principles, providing solutions that are both effective and Shariah-compliant.</p>
              </details>
              <details className={styles.faqItem}>
                <summary>What services does NMFAS provide for bereaved families?</summary>
                <p>NMFAS provides comprehensive support for bereaved families including guidance on funeral arrangements, cemetery locations, post-mortem alternatives, and dealing with coroners. We also help with paperwork and registration processes.</p>
              </details>
              <details className={styles.faqItem}>
                <summary>How quickly can funeral arrangements be made?</summary>
                <p>We understand the Islamic requirement for swift burial. Our network of funeral services can typically arrange funerals within 24-48 hours, subject to necessary documentation and coroner approval if required.</p>
              </details>
              <details className={styles.faqItem}>
                <summary>Do you offer services across the UK?</summary>
                <p>Yes, NMFAS has a nationwide network of funeral services, cemeteries, and support services. We can assist families anywhere in the UK through our extensive network of partners.</p>
              </details>
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className={styles.contact}>
          <div className={styles.sectionWrapper}>
            <h2>Contact Us</h2>
            <div className={styles.contactForm}>
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  aria-label="Your Name"
                  aria-invalid={!!errors.name}
                  className={errors.name ? styles.inputError : ''}
                  required
                />
                {errors.name && <div className={styles.formError}>{errors.name}</div>}
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  aria-label="Your Email"
                  aria-invalid={!!errors.email}
                  className={errors.email ? styles.inputError : ''}
                  required
                />
                {errors.email && <div className={styles.formError}>{errors.email}</div>}
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  aria-label="Your Message"
                  aria-invalid={!!errors.message}
                  className={errors.message ? styles.inputError : ''}
                  required
                />
                {errors.message && <div className={styles.formError}>{errors.message}</div>}
                <button type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
                {feedback && <div className={styles.formSuccess}>{feedback}</div>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>NMFAS</h3>
            <p>Professional Muslim Funeral Advisory Services</p>
            <div className={styles.socialLinks}>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Recent Posts</h4>
            <div className={styles.recentPosts}>
              <a href="#">
                <article className={styles.recentPost}>
                  <h5>Understanding Islamic Funeral Practices</h5>
                  <span>May 15, 2025</span>
                </article>
              </a>
              <a href="#">
                <article className={styles.recentPost}>
                  <h5>Guide to Muslim Cemetery Locations</h5>
                  <span>May 12, 2025</span>
                </article>
              </a>
              <a href="#">
                <article className={styles.recentPost}>
                  <h5>Supporting Bereaved Families</h5>
                  <span>May 8, 2025</span>
                </article>
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Helpful Links</h4>
            <div className={styles.helpfulLinks}>
              <div className={styles.linkColumn}>
                <h5>Resources</h5>
                <a href="#">Funeral Guide</a>
                <a href="#">Death Registration</a>
                <a href="#">Burial Services</a>
                <a href="#">Islamic Will</a>
              </div>
              <div className={styles.linkColumn}>
                <h5>Support</h5>
                <a href="#">FAQ</a>
                <a href="#">Contact Us</a>
                <a href="#">Find a Service</a>
                <a href="#">Emergency Help</a>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Contact Info</h4>
            <p>Email: info@nmfas.org.uk</p>
            <p>Emergency: 0800-NMFAS-247</p>
            <p>Available 24/7 for support</p>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; 2025 NMFAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
