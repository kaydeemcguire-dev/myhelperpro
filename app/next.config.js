/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: __dirname, // FORCE Next to use THIS folder as project root
    },
  },
};

module.exports = nextConfig;
