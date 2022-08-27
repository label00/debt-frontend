const jsonServer = require('json-server');
const auth = require('json-server-auth');
const getInfoData = require('./info');

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
    const {debts, type} = body;
    delete body.debts;

    const {transactions} = db.getState();
    const id = transactions[transactions.length - 1]?.id + 1 || 1;
    const data = debts.map(debt => ({...debt, transactionId: id, lenderId: body.userId}))

    data.forEach(debt => {
      db.get('debts').insert(debt).value()
    })

    req.body.createdAt = Date.now();
    if (type === 'forgive') {
      req.body.descriptions = 'Простил долг';
    }
  }

  next()
})


app.use(jsonServer.rewriter({
  '/info/:lenderId': '/debts?lenderId=:lenderId&_expand=transaction&_expand=user&_route=info',
}))
app.use(auth)
app.use(router);

app.listen(3001, () => {
  console.log('JSON Server is running')
})
router.render = (req, res) => {
  if (req.method === 'GET' && req.url?.includes('/debts?lenderId=')) {
    res.jsonp(getInfoData(req, res, db));
    return;
  }
  res.jsonp(res.locals.data);
}
