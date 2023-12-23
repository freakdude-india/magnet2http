// http-redirect.js

const http = require('http');

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { 'Location': `https://${req.headers['host']}${req.url}` });
  res.end();
});

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80 (for redirection)');
});
