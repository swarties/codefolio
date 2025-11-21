/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://github.com/**")],
  },

  reactCompiler: true,
};

export default nextConfig;
