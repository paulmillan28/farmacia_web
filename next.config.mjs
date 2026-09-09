
  /** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // ⚠️ Advertencia: Permite despegues aunque existan errores de tipos
      ignoreBuildErrors: true,
    },
    eslint: {
      // Opcional: ignora advertencias de linter durante el build
      ignoreDuringBuilds: true,
    },
  }
  
  module.exports = nextConfig