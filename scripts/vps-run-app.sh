sudo setcap cap_net_bind_service=+ep $(which node)
pm2 start ecosystem.config.js
