const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.method === 'GET') {
    if (req.url === '/') {
      // serve up static html
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(fs.readFileSync('client/index.html'));
      return;
    }
    let data;
    try {
      data = fs.readFileSync(path.join('client', req.url));
    } catch (e) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Not found');
      return;
    }
    res.statusCode = 200;
    // assume javascript. yes I know this is incredibly hacky
    res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    res.end(data);
    return;
  }
  if (req.method === 'POST' && req.url === '/setAmount') {
    let data = '';
    req.on('data', d => data += d);
    req.on('end', async () => {
      // Wait 500ms before sending back anything. Useful for showing that client shows a spinner when request is in flight.
      await new Promise(resolve => setTimeout(resolve, 500));
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      try {
        data = JSON.parse(data);
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Request body is not valid JSON.' }));
        return;
      }
      const amount = data.amount;
      if (typeof amount === 'undefined') {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Amount not specified.' }));
        return;
      }
      if (typeof amount !== 'number') {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Amount must be a number.' }));
        return;
      }
      if (!isFinite(amount)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Amount must be a finite number. Nice try.' }));
        return;
      }
      if (amount < 0) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Amount cannot be less than zero.' }));
        return;
      }
      if (amount > 10) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Amount is too much.' }));
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify({ amount }));
    });
    return;
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
