# Videoproductie Live Landing Page

## Run locally
- Install dependencies: `npm install`
- Start dev server: `npm run dev`

## Build
- Production build: `npm run build`
- Local production preview: `npm run preview`

## Deploy (VPS)

### Node (no Docker)
- Build: `npm ci && npm run build`
- Run: `PORT=8080 HOST=0.0.0.0 npm start`

### Docker
- Build image: `docker build -t videoproductie-live .`
- Run container: `docker run --rm -p 8080:8080 videoproductie-live`

### Nginx reverse proxy (example)
```
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
