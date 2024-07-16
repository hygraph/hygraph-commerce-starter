module.exports = {
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'en'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
    // Deprecate domain after asset migration
    domains: ['media.graphassets.com']
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}
