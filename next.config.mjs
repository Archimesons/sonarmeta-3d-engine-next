/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Because we don't want that watchers watch twice
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sonarmeta.oss-cn-shenzhen.aliyuncs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
