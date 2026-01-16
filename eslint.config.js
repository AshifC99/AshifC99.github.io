//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    ignores: [
      '.output/**',
      'dist/**',
      'dist-ssr/**',
      '.nitro/**',
      '.tanstack/**',
      '.vinxi/**',
      'legacy/**',
      'app.config.timestamp_*.js',
      'node_modules/**',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
]
