// the functions will assist other function

function uid() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : "id-" + Math.random().toString(36).slice(2) + Date.now();
}

function parseDollarsToCents(input) {
    //wrap a string constractor, get rid of whitespace
  const str = String(input).trim();
  //use regex to match that the input is a digit
  const match = /^(\d+)(\.(\d{1,2}))?$/.exec(str);
  //edge casing if the number is not a number, return null
  if (!match) return null;
  const dollars = parseInt(match[1], 10);
  const centsFraction = (match[3] || "").padEnd(2, "0");
  const cents = parseInt(centsFraction, 10);
  return dollars * 100 + cents;
}

function formatCents(cents) {
  const sign = cents < 0 ? "-" : "+";
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const remainder = abs % 100;
  return sign + "$" + dollars.toLocaleString() + "." + String(remainder);
}

function todayLocalISODate() {
  const todayDate = new Date();
  return (
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 1) +
    "-" +
    String(todayDate.getDate())
  );
}

function escapeHtml(str) {
  const div = document.createElement("div");
  // tenary operator( one line if statement)
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}
