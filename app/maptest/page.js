'use client';

import React from 'react';
import TestMap from '../components/TestMap';
import styles from '../page.module.css';

export default function MapTestPage() {
  return (
    <div className={styles.container}>
      <h1>Map Testing Page</h1>
      <p>This page is for testing the map functionality with multiple markers.</p>
      <TestMap />
    </div>
  );
}
