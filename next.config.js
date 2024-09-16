/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Avoiding CORS issues
    async rewrites() {
        return [
            {
                source: '/rrhh/api/v1/:slug*',
                destination: 'http://localhost:8080/rrhh/api/v1/:slug*',
            },
        ]
    },
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
}

module.exports = nextConfig
