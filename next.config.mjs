/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; connect-src 'self' https://api.devnet.solana.com https://api.dscvr.one https://*.helius-rpc.com; script-src 'self'; object-src 'none';",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
