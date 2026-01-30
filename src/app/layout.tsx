import './globals.css'
import Script from 'next/script'
import { Metadata } from 'next'
import ErrorBoundary from '@/components/ErrorBoundary'
import { siteConfig } from '@/config'
import Providers from '@/providers/Providers'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Portfolio',
    'Backend Developer',
    'Web Development',
    'NextJS',
    'React',
    'Node.js',
    'Python',
  ],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@hoangthach',
  },
  icons: {
    icon: '/anh2.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        {/* Preload critical assets */}
        {/* Consider relying on Next Image priority for above-the-fold imagery to avoid duplicate preloads */}
      </head>
      <body className="min-h-screen antialiased">
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
        
        {/* Third-party scripts */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" 
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js" 
          strategy="lazyOnload"
        />
        <Script 
          src="https://unpkg.com/swiper/swiper-bundle.min.js" 
          strategy="lazyOnload"
        />
        <Script 
          src="https://unpkg.com/aos@2.3.1/dist/aos.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
