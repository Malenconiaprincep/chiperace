module.exports = {
  apps: [{
    name: 'chi-api',
    script: 'dist/main.js',
    instances: 2,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
} 