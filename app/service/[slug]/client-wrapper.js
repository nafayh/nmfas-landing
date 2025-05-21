'use client';

import dynamic from 'next/dynamic';

const ServiceClientComponent = dynamic(() => import('./client'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function ClientWrapper({ slug }) {
  return <ServiceClientComponent slug={slug} />;
}
