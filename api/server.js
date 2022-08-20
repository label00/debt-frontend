const jsonServer = require('json-server');
const auth = require('json-server-auth')

const app = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middlewares = jsonServer.defaults([{noCors: true}]);
const bodyParse = jsonServer.bodyParser;

app.db = router.db;
const {db} = router;

app.use(bodyParse);
app.use(middlewares);

app.use('/transactions', (req, res, next) => {
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


app.use(jsonServer.rewriter({
  '/debts\\?:query': '/debts?:query&_expand&_expand=transaction&_expand=user'
}))
app.use(auth)
app.use(router);

app.listen(3001, () => {
  console.log('JSON Server is running')
})
