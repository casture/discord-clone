/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'github.com',
            'uploadthing.com',
            'utfs.io'
        ]
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/channels/me',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
