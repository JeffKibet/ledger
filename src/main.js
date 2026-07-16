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
renderAllFunctions(state);
setEventListeners();
}

function eventListeners(){
    document.getElementById("categoryForm").addEventListener("submit", handleCategorySubmit);
    event.preventDefault();

    try{
        addCategories(
            state.categories,
            document.getElementById("catName").value,
            document.getElementById("catKind").value
        );
    }
)
    }
}