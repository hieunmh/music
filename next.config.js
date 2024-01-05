/** @type {import('next').NextConfig} */
const nextConfig = {  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xclsxcnscaupwbekudts.supabase.co'
      }
    ]
  }
}

module.exports = nextConfig
