import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Navigation />
      {children}
      <Footer />
    </Layout>
  );
}
