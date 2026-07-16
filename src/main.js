let state = {
    categories: [],
    transactions: [],
    version: 1
};
 
async function init(){
    document.getElementById("txnDate").value = todayLocalISODate();
    try {
        const loaded_state = await loadState();
        state.categories = loaded_state.categories;
        state.transactions = loaded_state.transactions;
    }
    catch (err) {
        //
}
renderBalance(state.transactions);
}