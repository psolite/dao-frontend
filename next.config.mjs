/** @type {import('next').NextConfig} */
module.exports  = {
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "connect-src 'self' https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://api.devnet.solana.com/",
                    },
                ],
            },
        ];
    },
};