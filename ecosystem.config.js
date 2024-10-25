module.exports = {
  apps: [
    {
      name: "nextjs-astro-sphere",
      script: "server.js",
      instances: Number(process.env.CLUSTER_INSTANCES || "1"),
      exec_mode: "cluster",
      env: {
        PWD: "/app",
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: "3000",
      },
    },
  ],
};
