/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/",
                headers: [

                    {
                        key: "Content-Security-Policy",
                        value: "connect-src 'self' https://api.dscvr.one https://api1.stg.dscvr.one https://*.helius-rpc.com https://api.airbillspay.com",
                    },

                ],
            },
        ];
    },
};

export default nextConfig;
