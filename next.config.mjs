/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/images/**"
      },
      {
        pathname: "/people/Hero/**"
      },
      {
        pathname: "/uploads/**"
      }
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com"
      }
    ]
  }
};

export default nextConfig;
