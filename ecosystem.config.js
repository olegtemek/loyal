module.exports = {
  apps: [
    {
      name: 'LoyalDentFront',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      port: 4070
    },
    {
      name: 'LoyalDentBack',
      instances: 'max',
      script: '../backend/index.js'
    }
  ]
}