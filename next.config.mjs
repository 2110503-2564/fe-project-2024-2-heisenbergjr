/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'firebasestorage.googleapis.com', 
            'drive.google.com',
          ],
        remotePatterns: [
        {
            protocol: "http",
            hostname: "localhost",
            port: "5000",
            pathname: "/uploads/**",
        },
        ],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/venue/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    env: {
      NEXT_PUBLIC_BACKEND_URL: "http://localhost:5000",
    },
};

export default nextConfig;
