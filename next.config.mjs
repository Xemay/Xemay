/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Раскомментируй строку ниже и замени 'your-repo-name' на имя твоего репозитория
  // basePath: '/Xemay',
}

export default nextConfig
