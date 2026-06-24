const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  'html': 'text/html', 'css': 'text/css', 'js': 'text/javascript',
  'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'webp': 'image/webp',
  'svg': 'image/svg+xml', 'ico': 'image/x-icon', 'mp4': 'video/mp4'
};
const ROOT = __dirname;
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url === '/' ? '/index.html' : req.url.split('?')[0]);
  const file = path.join(ROOT, url);
  const ext = path.extname(file).slice(1);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(8080, () => console.log('Servidor en http://localhost:8080'));
