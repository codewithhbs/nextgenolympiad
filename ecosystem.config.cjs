module.exports = {
  apps: [
    {
      name: "nextgenolympiad",
      cwd: "/root/nextgenolympiad",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4189",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "production",
        PORT: 4189,
        NEXT_PUBLIC_SITE_URL: "https://nextgenolympiad.in",
      },
      error_file: "/root/.pm2/logs/nextgenolympiad-error.log",
      out_file: "/root/.pm2/logs/nextgenolympiad-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};

