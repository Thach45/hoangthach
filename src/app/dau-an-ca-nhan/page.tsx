'use client';

import Layout from '@/components/layout/Layout';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PersonalImprints from '@/components/sections/PersonalImprints';

export default function PersonalImprintsPage() {
  return (
    <Layout>
      <Navigation />
      <PersonalImprints variant="page" />
      <Footer />
    </Layout>
  );
}

