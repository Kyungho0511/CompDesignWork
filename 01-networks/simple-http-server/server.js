// import http from 'http'
const http = require('http')
const fs = require('fs').promises;

const host = 'localhost';

const port = 8000;

const data = [{
  'name': 'Klee',
  'city': 'New York'
}];

const requestListener = (req, res) => {
  fs.readFile(__dirname + '/index.html')
  .then(content => {
    res.setHeader('Content-type', 'text/html');
    res.writeHead(200); // sets the HTTP status code of the response
    res.end(content); // drop data you want to render to the server
  })
  .catch(err => {
    res.writeHead(500)
    res.end(err)
    return
  })
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});