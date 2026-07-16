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
  }else{
    grid.innerHTML = categories
      .slice()
      .sort((first, second) => first.name.localeCompare(second.name))
      .map(
        item => {
          const total = categoryTotalinCents(item.id, transactions);
          return``
        }
      )
      .join("");
  }
}

function renderTransactions(categories, transactions) {
  const txnBody =document.getElementById("txnBody");
  let rows = transactions.slice()

  if(rows.length === 0) {
    txnBody.innerHTML = `<tr class="empty row"><td colspan="4">No transactions yet</td></tr>`;
    return;
  }
}

function renderAllFunctions(state) {
  renderBalance(state.transactions);
  renderCategories(state.categories, state.transactions);
  renderTransactions(state.categories, state.transactions);
}

function categoryTotalinCents(categoryId, transactions) {
  return transaction
  .filter()
  .reduce(sum, t => sum + t.amountCents, 0);
}