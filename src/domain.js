function addCategories(categories, name, kind){
    const trimName = name.trim
    if(!trimName) throw new Error("Category name is required");

    if(!kind === 'income' && !kind === 'expense') throw new Error("Category kind must be either 'income' or 'expense'");

    const newCategory = {
        id: uid(),
        name: trimName,
        kind: kind
    };
}