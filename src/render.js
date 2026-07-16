// UI only

function renderBalance(transactions) {
  const totalCents = transactions.reduce((sum, t) => sum + t.amountCents, 0);

  const elem = document.getElementById("balanceValue");

  elem.textContent = formatCents(totalCents);
  elem.classList.remove("pos", "neg");
  elem.classList.add(totalCents < 0 ? "neg" : "pos");
}

function renderCategories(categories, transactions) {
  const grid = getElementById("categoryGrid");

  if(categories.length === 0) {
    grid.innerHTML = <div class="cat empty">No categories yet</div>;
  }
}

function renderTransactions(categories, transactions) {}

function renderAllFunctions(state) {
  renderBalance(state.transactions);
  renderCategories(state.categories, state.transactions);
  renderTransactions(state.categories, state.transactions);
}
