"use client";

import { useState } from 'react';
import styles from '../page.module.css';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo purposes, using hardcoded credentials
    // In production, use proper authentication
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Set session/token logic would go here
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.adminLoginContainer}>
      <div className={styles.adminLoginCard}>
        <h1>Admin Login</h1>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
