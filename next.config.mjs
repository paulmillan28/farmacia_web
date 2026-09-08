/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '10mb', // Ajusta el límite de tamaño (ej. '10mb', '20mb')
      },
    },
  };
  
  export default nextConfig;