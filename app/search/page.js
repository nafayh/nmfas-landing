'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import to avoid SSR issues with search params
const SearchResults = dynamic(() => import('../components/SearchResults'), {
  ssr: false
});

export default function Page() {
  return <SearchResults />;
}
