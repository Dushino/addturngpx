// POI test – diagnostická aplikace.
// Veškeré čtení dat probíhá v šabloně t.html přes <eval>; main.js jen vrací šablonu.
// Vstupy v manifest.json jsou deklarované hlavně proto, aby byly vidět
// v simulátoru v panelu Input.

function evaluate(input, output) {
  // Záměrně prázdné – nic se nepočítá.
}

function getUserInterface() {
  return { template: 't' };
}
