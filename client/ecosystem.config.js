module.exports = {
  apps: [
    {
      name: 'ThuyTungClient',
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      cwd: 'C:\\inetpub\\wwwroot\\ThuyTung\\Thuytung-main\\client',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      node_args: '--expose-gc --max-old-space-size=768',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      error_file: 'C:\\inetpub\\wwwroot\\ThuyTung\\Thuytung-main\\client\\logs\\err.log',
      out_file: 'C:\\inetpub\\wwwroot\\ThuyTung\\Thuytung-main\\client\\logs\\out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      restart_delay: 4000
    }
  ]
};