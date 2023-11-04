/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'upload.wikimedia.org',
            pathname: '/wikipedia/commons/thumb/**',
            port: '',
            protocol: 'https'
        }]
    }
}

module.exports = nextConfig
