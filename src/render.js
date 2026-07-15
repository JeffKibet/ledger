// UI only

function renderBalance(transactions) {
  const totalCents = transactions.reduce((sum, t) => sum + t.amountCents)
  const elem = document.getElementById('balanceValue');
  elem.textContent = formatCents(totalCents);
  elem.classList.remove('pos', 'neg');
  elem.classList.add(totalCents < 0 ? 'neg' : 'pos');
}