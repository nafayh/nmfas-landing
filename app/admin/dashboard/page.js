"use client";

import { useState, useEffect } from 'react';
import styles from '../../page.module.css';
import { useRouter } from 'next/navigation';
import { funeralServices } from '../../data/funeralServices';
import { createSlug } from '../../utils/urlUtils';
import { getLatestListings, saveListings, resetListings } from '../../utils/dataUtils';

export default function AdminDashboard() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const regions = [...new Set(funeralServices.map(service => service.region))].sort();

  // If adding a new listing (not editing)
  const emptyListing = {
    name: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    website: '',
    hours: '',
    type: 'Funeral Service',
    region: regions[0] || 'London',
    description: ''
  };

  const [newListing, setNewListing] = useState(emptyListing);
  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }

    // Load listings using the utility function
    const latestListings = getLatestListings();
    setListings(latestListings);
  }, [router]);
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };
  
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all listings to the original data? This will delete any custom listings you have added.')) {
      const originalListings = resetListings();
      setListings(originalListings);
      showSuccessMessage('Listings have been reset to the original data.');
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  const handleAddListing = (e) => {
    e.preventDefault();
    
    if (isEditing && editIndex !== null) {
      // Update existing listing
      const updatedListings = [...listings];
      updatedListings[editIndex] = { ...newListing };
      
      setListings(updatedListings);
      saveListings(updatedListings);
      
      setIsEditing(false);
      setEditIndex(null);
      showSuccessMessage('Listing updated successfully!');
    } else {
      // Add new listing
      const updatedListings = [...listings, { ...newListing, id: Date.now() }];
      setListings(updatedListings);
      saveListings(updatedListings);
      showSuccessMessage('New listing added successfully!');
    }
    
    // Reset form
    setNewListing(emptyListing);
  };
  
  const handleEditListing = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewListing(listings[index]);
    
    // Scroll to top of form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setNewListing(emptyListing);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    const updatedListings = listings.filter((_, index) => index !== deleteIndex);
    setListings(updatedListings);
    saveListings(updatedListings);
    setShowDeleteModal(false);
    showSuccessMessage('Listing deleted successfully!');
  };
  return (
    <div className={styles.adminDashboard}>      <nav className={styles.adminNav}>
        <h1>Admin Dashboard</h1>
        <div className={styles.adminNavBtns}>
          <button onClick={handleReset} className={styles.resetBtn}>Reset Listings</button>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </nav>
      
      <div className={styles.adminContent}>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        
        <section className={styles.addListing}>
          <h2>{isEditing ? 'Edit Listing' : 'Add New Listing'}</h2>
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
                placeholder="Email"                value={newListing.email}
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
                <option value="Mosque & Funeral Service">Mosque & Funeral Service</option>
                <option value="Funeral Service & Support">Funeral Service & Support</option>
                <option value="Burial Council & Funeral Service">Burial Council & Funeral Service</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <select
                value={newListing.region}
                onChange={(e) => setNewListing({ ...newListing, region: e.target.value })}
                required
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Add New Region"
                onBlur={(e) => {
                  if (e.target.value && !regions.includes(e.target.value)) {
                    setNewListing({ ...newListing, region: e.target.value });
                  }
                }}
              />
            </div>
            
            <textarea
              placeholder="Description"
              value={newListing.description}
              onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              required
            />
            
            <div className={styles.formGroup}>
              <button type="submit" className={styles.submitBtn}>
                {isEditing ? 'Update Listing' : 'Add Listing'}
              </button>
              
              {isEditing && (
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>        <section className={styles.listingsTable}>
          <h2>Current Listings ({listings.length})</h2>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Region</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={index}>
                    <td>{listing.name}</td>
                    <td>{listing.type}</td>
                    <td>{listing.region}</td>
                    <td>{listing.address}</td>
                    <td>
                      <button 
                        className={styles.editBtn} 
                        onClick={() => handleEditListing(index)}
                      >
                        Edit
                      </button>
                      <button 
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteClick(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Confirm Delete</h3>
            <p>Are you sure you want to delete this listing? This action cannot be undone.</p>
            
            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelBtn}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmBtn}
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
