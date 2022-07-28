const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const middlewares = jsonServer.defaults([{ noCors: true }]);
const bodyParse = jsonServer.bodyParser;

server.use(bodyParse);
server.use(middlewares);
server.use('/api', router);

server.listen(3000, () => {
  console.log('JSON Server is running')
})
