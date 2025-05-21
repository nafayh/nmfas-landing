"use client";

import { useState, useEffect } from 'react';
import styles from '../../page.module.css';
import { useRouter } from 'next/navigation';
import { funeralServices } from '../../data/funeralServices';

export default function AdminDashboard() {
  const router = useRouter();
  const [listings, setListings] = useState(funeralServices);
  const [newListing, setNewListing] = useState({
    name: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    website: '',
    hours: '',
    type: 'Funeral Service',
    description: ''
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const handleAddListing = (e) => {
    e.preventDefault();
    const updatedListings = [...listings, { ...newListing, id: listings.length + 1 }];
    setListings(updatedListings);
    // In a real app, you would make an API call to save to database
    setNewListing({
      name: '',
      address: '',
      phone: '',
      mobile: '',
      email: '',
      website: '',
      hours: '',
      type: 'Funeral Service',
      description: ''
    });
  };

  return (
    <div className={styles.adminDashboard}>
      <nav className={styles.adminNav}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </nav>
      
      <div className={styles.adminContent}>
        <section className={styles.addListing}>
          <h2>Add New Listing</h2>
          <form onSubmit={handleAddListing} className={styles.addListingForm}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Service Name"
                value={newListing.name}
                onChange={(e) => setNewListing({ ...newListing, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={newListing.address}
                onChange={(e) => setNewListing({ ...newListing, address: e.target.value })}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="tel"
                placeholder="Phone Number"
                value={newListing.phone}
                onChange={(e) => setNewListing({ ...newListing, phone: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number (Optional)"
                value={newListing.mobile}
                onChange={(e) => setNewListing({ ...newListing, mobile: e.target.value })}
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                value={newListing.email}
                onChange={(e) => setNewListing({ ...newListing, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Website (Optional)"
                value={newListing.website}
                onChange={(e) => setNewListing({ ...newListing, website: e.target.value })}
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Opening Hours"
                value={newListing.hours}
                onChange={(e) => setNewListing({ ...newListing, hours: e.target.value })}
              />
              <select
                value={newListing.type}
                onChange={(e) => setNewListing({ ...newListing, type: e.target.value })}
              >
                <option value="Funeral Service">Funeral Service</option>
                <option value="Cemetery">Cemetery</option>
                <option value="Support Service">Support Service</option>
              </select>
            </div>
            
            <textarea
              placeholder="Description"
              value={newListing.description}
              onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              required
            />
            
            <button type="submit" className={styles.submitBtn}>Add Listing</button>
          </form>
        </section>

        <section className={styles.listingsTable}>
          <h2>Current Listings</h2>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={index}>
                    <td>{listing.name}</td>
                    <td>{listing.type}</td>
                    <td>{listing.address}</td>
                    <td>{listing.phone}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
