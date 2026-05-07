# Free Local Demo Commands

Start n8n:

```powershell
docker start n8n
```

If the container does not exist:

```powershell
docker volume create n8n_data
docker run -d --name n8n -p 5678:5678 -e GENERIC_TIMEZONE=Asia/Manila -e TZ=Asia/Manila -e N8N_RUNNERS_ENABLED=true -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

Start Cloudflare Tunnel:

```powershell
cloudflared tunnel --protocol http2 --url http://127.0.0.1:5678 --loglevel info
```

Use the latest `trycloudflare.com` link in `assets/js/config.js`.
