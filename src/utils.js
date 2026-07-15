// the function will assist other functions

function uuid() {}

function parseDollarsToCents(input) {}

function formatCents(cents) {
    const sign = cents < 0 ? '-' : '';
    const abs = Math.abs(cents);
    const dollars = Math.floor(abs / 100);
    const reminder = abs % 100;
    return sign + '$' + dollars + '.' + String(reminder)
}

function todayLocalISODate() {
    const todayDate = new Date();
    return todayDate.getFullYear() + '-' + String(todayDate.getMonth() + 1)
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
}