import ClientWrapper from './client-wrapper';

export default function Page({ params }) {
  return <ClientWrapper slug={params.slug} />;
}