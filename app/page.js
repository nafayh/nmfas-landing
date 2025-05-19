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

  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>National Muslim Financial Advisory Service</h1>
          <p>Professional financial guidance aligned with Islamic principles</p>
          <button className={styles.getStartedBtn}>Get Free Consultation</button>
        </section>

        {/* About Section */}
        <section id="about" className={styles.about}>
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
        </section>

        {/* Services Section */}
        <section id="services" className={styles.services}>
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
        </section>

        {/* FAQs Section */}
        <section id="faqs" className={styles.faqs}>
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
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={styles.contact}>
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
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>NMFAS</h3>
            <p>Professional Islamic Financial Advisory Services</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.footerSection}>
            <h4>Contact Info</h4>
            <p>Email: info@nmfas.org.uk</p>
            <p>Phone: +44 (0)20 1234 5678</p>
          </div>
        </div>
        <div className={styles.socialLinks}>
          <a href="https://linkedin.com/company/nmfas" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            LinkedIn
          </a>
          <a href="https://twitter.com/nmfas" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            Twitter
          </a>
          <a href="https://facebook.com/nmfas" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7C18.34 21.21 22 17.06 22 12.06c0-5.53-4.5-10.02-10-10.02z"/></svg>
            Facebook
          </a>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 NMFAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
