/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.taipeiwildspa.com',
          },
        ],
        destination: 'https://taipeiwildspa.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;