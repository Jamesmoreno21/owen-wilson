/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
	remotePatterns: [
	  {
		protocol: "https",
		port: "",
		hostname: "images.ctfassets.net",
	  },
	],
  },
};
// https://images.ctfassets.net/
export default nextConfig;
