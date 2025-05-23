/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
};

export default nextConfig;
