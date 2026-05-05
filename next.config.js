/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'www.svgrepo.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      "cdn2.fptshop.com.vn"
    ],
  },
  // Allow importing SVG files
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;