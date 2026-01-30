'use client';

import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PersonalImprints from '@/components/PersonalImprints';

export default function PersonalImprintsPage() {
  return (
    <Layout>
      <Navigation />
      <PersonalImprints variant="page" />
      <Footer />
    </Layout>
  );
}

