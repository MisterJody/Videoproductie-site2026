import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const port = Number(process.env.PORT ?? 8080);
const host = process.env.HOST ?? '0.0.0.0';

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy':
    "default-src 'self'; base-uri 'self'; form-action 'self' mailto:; frame-src https://www.youtube.com https://www.youtube-nocookie.com; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; connect-src 'self'; object-src 'none';",
};

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.ico':
      return 'image/x-icon';
    case '.woff2':
      return 'font/woff2';
    case '.woff':
      return 'font/woff';
    case '.ttf':
      return 'font/ttf';
    case '.map':
      return 'application/json; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

function applyHeaders(res, headers) {
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
}

async function safeResolveDistPath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const joined = path.join(distDir, decoded);
  const resolved = path.resolve(joined);
  if (!resolved.startsWith(distDir + path.sep) && resolved !== distDir) return null;
  return resolved;
}

async function readFileIfExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return null;
    const data = await fs.readFile(filePath);
    return {stat, data};
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    const pathname = url.pathname === '/' ? '/index.html' : url.pathname;

    applyHeaders(res, securityHeaders);

    let targetPath = await safeResolveDistPath(pathname);
    if (!targetPath) {
      res.statusCode = 400;
      res.end('Bad Request');
      return;
    }

    let file = await readFileIfExists(targetPath);
    if (!file) {
      targetPath = await safeResolveDistPath('/index.html');
      if (!targetPath) {
        res.statusCode = 500;
        res.end('Server Error');
        return;
      }
      file = await readFileIfExists(targetPath);
      if (!file) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }
    }

    if (pathname.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (pathname === '/index.html') {
      res.setHeader('Cache-Control', 'no-cache');
    }

    res.setHeader('Content-Type', contentTypeFor(targetPath));
    res.statusCode = 200;
    res.end(file.data);
  } catch {
    res.statusCode = 500;
    res.end('Server Error');
  }
});

server.listen(port, host);
