/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        domains: [],
        formats: ['image/avif', 'image/webp'],
    },
    headers: async () => [
        {
            source: '/(.*)',
            headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'X-Frame-Options', value: 'DENY' },
                { key: 'X-XSS-Protection', value: '1; mode=block' },
                { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
            ],
        },
    ],
};

module.exports = nextConfig;
