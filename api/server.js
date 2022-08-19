const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middlewares = jsonServer.defaults([{noCors: true}]);
const bodyParse = jsonServer.bodyParser;

const {db} = router;

server.use(bodyParse);
server.use(middlewares);

server.use('/transactions', (req, res, next) => {
  if (req.method === 'POST') {
    const {body} = req;
    const {debts} = body;
    delete body.debts;
    const {transactions} = db.getState();
    const id = transactions[transactions.length - 1].id;
    const data = debts.map(debt => ({...debt, transactionId: id, lenderId: body.userId}))
    data.forEach(debt => {
      db.get('debts').insert(debt).value()
    })
    req.body.createdAt = Date.now();
  }

  next()
})


server.use(jsonServer.rewriter({
  '/debts\\?:query': '/debts?:query&_expand&_expand=transaction&_expand=user'
}))
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running')
})
