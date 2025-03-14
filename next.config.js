/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Força a exportação estática
  images: {
    unoptimized: true
  },
  distDir: 'dist', // Especifica o diretório de build
  // Remove APIs e middleware
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
}

export default nextConfig; 