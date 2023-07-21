import http from 'http';

const host = 'localhost';
const port = 8000;

const data = [{
  'name': 'Klee',
  'city': 'New York'
}];

const requestListener = (req, res) => {
  res.writeHead(200); // sets the HTTP status code of the response
  res.end(JSON.stringify(data)); // drop data you want to render to the server
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});