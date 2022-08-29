// WRITE-ONLY CODE

const mapEntries = (ojb, fn) => Object.fromEntries(Object.entries(ojb).map(([key, value]) => [key, fn(key, value)]));

const TYPES = {
  loan: 'Я одолжил',
  borrow: 'Я должен',
};

const groupByUser = (debts, prop) =>
  debts.reduce((acc, debt) => {
    const { [prop]: id } = debt;
    const userDebts = acc[id] ?? [];
    return { ...acc, [id]: [...userDebts, debt] };
  }, {});

const calculateDebts = (debts) =>
  mapEntries(debts, (_, userDebts) =>
    userDebts.reduce((acc, item) => ({
      ...acc,
      amount: acc.amount + item.amount,
    })),
  );

const getDebtsByType = (debts, currentUserId, transactions) => {
  const normalizeTransaction = Object.fromEntries(transactions.map((transaction) => [transaction.id, transaction]));
  const debtsWithTransaction = debts.map((debt) => ({
    ...debt,
    transaction: normalizeTransaction[debt.transactionId],
  }));

  const loanedDebts = [];
  const borrowedDebts = [];

  for (const debt of debtsWithTransaction) {
    const transactionType = debt.transaction.type;

    if (transactionType === 'add') {
      if (+debt.lenderId === +currentUserId) {
        loanedDebts.push(debt);
      }
      if (+debt.userId === +currentUserId) {
        borrowedDebts.push(debt);
      }
    }
  }

  return {
    loanedDebts: calculateDebts(groupByUser(loanedDebts, 'userId')),
    borrowedDebts: calculateDebts(groupByUser(borrowedDebts, 'lenderId')),
  };
};

const getUsersDebts = (users, debtsByType) =>
  users.map((user) => {
    return {
      user,
      loanedDebts: debtsByType.loanedDebts[user.id],
      borrowedDebts: debtsByType.borrowedDebts[user.id],
    };
  });

const calculateAmount = (loanedDebt, borrowedDebts) => {
  let amount = 0;
  if (loanedDebt) {
    amount += loanedDebt.amount;
  }
  if (borrowedDebts) {
    amount -= borrowedDebts.amount;
  }

  return amount;
};

module.exports = (req, res, db) => {
  const { debts: debtsList, transactions, users } = db.getState();
  const currentUserId = +req.query.lenderId;
  const debtsByType = getDebtsByType(debtsList, currentUserId, transactions);
  const usersDebts = getUsersDebts(users, debtsByType);

  return usersDebts
    .filter((item) => item.user.id !== currentUserId)
    .filter((item) => item.loanedDebts || item.borrowedDebts)
    .map((item) => {
      const amount = calculateAmount(item.loanedDebts, item.borrowedDebts);
      const type = amount > 0 ? 'loan' : 'borrow';
      return {
        userId: item.user.id,
        userName: item.user.name,
        amount: Math.abs(amount),
        type,
        typeName: TYPES[type],
      };
    });
};
