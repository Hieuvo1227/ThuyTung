module.exports = {
  apps: [
    {
      name: 'THỦY TÙNG Server',
      script: 'node_modules/tsx/dist/cli.mjs',
      args: 'src/index.ts',
      cwd: 'C:\\inetpub\\wwwroot\\ThuyTung\\Thuytung-main\\sever',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      node_args: '--expose-gc --max-old-space-size=768',
      env: {
        NODE_ENV: 'production',
        PORT: 4040
      },
      error_file: 'C:\\inetpub\\wwwroot\\ThuyTung\\Thuytung-main\\sever\\logs\\err.log',
      out_file: 'C:\\inetpub\\wwwroot\\ThuyTung\\Thuytung-main\\sever\\logs\\out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      restart_delay: 4000
    }
  ]
};
