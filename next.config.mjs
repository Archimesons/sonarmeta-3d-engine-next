/** @type {import('next').NextConfig} */
const nextConfig = {
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
