/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath when custom domain (ai.atum.li) is configured
  basePath: '/daily-aisec',
};

module.exports = nextConfig;
