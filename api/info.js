// WRITE-ONLY CODE

const TYPES = {
  loan: 'Я одолжил',
  borrow: 'Я должен',
}

const normalizeDebts = (debts, prop) => debts.reduce((acc, debt) => {
  const {[prop]: id} = debt;
  const userDebts = acc[id] ?? [];
  return {...acc, [id]: [...userDebts, debt]}

}, {})


const calculateFns = {
  add: (a, b) => a + b,
  forgive: (a, b) => a - b,
}

/**
 * @param {number} amountOne
 * @param {number} amountTwo
 * @param {'add'|'forgive'} type
 * @return {number}
 **/
const calculateAmount = (amountOne, amountTwo, type) => {
  return calculateFns[type](amountOne, amountTwo);
}

const groupDebts = (debts, transactions) => Object
  .values(debts)
  .map(
    userDebts =>
      userDebts.reduce(
        (acc, item) => ({
          ...acc,
          amount: calculateAmount(acc.amount, item.amount, transactions[item.transactionId].type)
        })
      )
  )

const getBorrowedDebt = (debts, transactions) => {
  const normalizedDebts = normalizeDebts(debts, 'userId');

  return groupDebts(normalizedDebts, transactions)
}

const getLoanedDebts = (debts, transactions) => {
  const normalizedDebts = normalizeDebts(debts, 'lenderId');

  return Object.fromEntries(groupDebts(normalizedDebts, transactions).map(item => [item.lenderId, item]))
}

module.exports = (req, res, db) => {
  const {data} = res.locals;
  const {debts: debtsList, transactions} = db.getState();
  const normalizeTransactions = Object.fromEntries(transactions.map(item => [item.id, item]));
  const loanedDebtsList = debtsList.filter(debts => debts.userId === req.query.lenderId)
  const loanedDebts = getLoanedDebts(loanedDebtsList, normalizeTransactions);
  const borrowedDebts = getBorrowedDebt(data, normalizeTransactions);
  const debts = borrowedDebts.map(credit => {
    const debt = loanedDebts[credit.userId] ?? {amount: 0};
    return {...credit, amount: credit.amount - debt.amount}
  })

  return debts.map(debt => {
    const type = debt.amount > 0 ? 'loan' : 'borrow';
    return ({userId: debt.userId, userName: debt.user.name, amount: Math.abs(debt.amount), type, typeName: TYPES[type]})
  }).filter(debts => debts.amount > 0);
}
