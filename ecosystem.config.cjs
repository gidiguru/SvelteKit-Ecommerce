module.exports = {
  apps: [{
    name: 'sveltekit-ecommerce',
    script: 'build/output/server/index.js',
    env: {
      NODE_ENV: 'production',

    },
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    kill_timeout: 3000,
    wait_ready: true,
    listen_timeout: 10000,
    max_restarts: 10,
    restart_delay: 4000,
  }]
};